import { Injectable, Inject } from "@nestjs/common";
import {
  Payment,
  PaymentStatus,
  PaymentType,
  PaymentMethod,
  PaymentItemType,
} from "../../../__generated__";
import { $Enums } from "../../../__generated__";
import { IPaymentRepository } from "./interfaces/payments-repository.interfaces";
import { IPaymentService } from "./interfaces/payments-service.interfaces";
import { S3Service } from "../../libs/common/s3/s3.service";
import { NotificationsService } from "../notifications/notifications.service";
import {
  CreatePaymentDto,
  CreateBulkPaymentDto,
  PaymentFilterDto,
  UploadPaymentProofDto,
  RejectPaymentDto,
  ConfirmPaymentDto,
} from "./dto";

@Injectable()
export class PaymentsService implements IPaymentService {
  constructor(
    @Inject("IPaymentRepository")
    private readonly paymentRepository: IPaymentRepository,
    private readonly fileUploadService: S3Service,
    private readonly notificationService: NotificationsService,
  ) {}
  private calculateNextDueDate(
    current: Date,
    interval: "daily" | "weekly" | "monthly",
  ): Date {
    const date = new Date(current);

    switch (interval) {
      case "daily":
        date.setDate(date.getDate() + 1);
        break;
      case "weekly":
        date.setDate(date.getDate() + 7);
        break;
      case "monthly":
        date.setMonth(date.getMonth() + 1);
        break;
    }

    return date;
  }

  async createPayment(data: CreatePaymentDto): Promise<Payment> {
    const paymentData = {
      user: { connect: { id: data.userId } },
      booking: data.bookingId ? { connect: { id: data.bookingId } } : undefined,
      amount: data.amount,
      paymentType: data.paymentType as PaymentType,
      paymentMethod: data.paymentMethod as PaymentMethod,
      dueDate: data.dueDate,
      description: data.description,
      status: PaymentStatus.PENDING,
      // Support both old price system and new price categories
      price: data.priceId ? { connect: { id: data.priceId } } : undefined,
      priceCategory: data.priceCategoryId ? { connect: { id: data.priceCategoryId } } : undefined,
      paymentItems: data.paymentItems
        ? {
            create: data.paymentItems.map((item) => ({
              itemType: item.itemType as PaymentItemType,
              description: item.description,
              amount: item.amount,
              period: item.period,
            })),
          }
        : undefined,
    };
    const payment = await this.paymentRepository.create(paymentData);

    await this.notificationService.createNotification({
      type: $Enums.NotificationType.PAYMENT_CREATED,
      title: "Payment Created",
      message: `Your payment of ${payment.amount} has been created and is pending`,
      toUserId: payment.userId,
      paymentId: payment.id,
      priority: $Enums.NotificationPriority.NORMAL,
      metadata: {
        amount: payment.amount,
        paymentType: payment.paymentType,
        dueDate: payment.dueDate,
      },
    });

    return payment;
  }
  async getPaymentById(id: string): Promise<Payment | null> {
    return this.paymentRepository.findById(id);
  }

  async getPaymentsByUserId(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<Payment[]> {
    return this.paymentRepository.findByUserId(userId, limit, offset);
  }
  async getPaymentsWithFilters(filters: PaymentFilterDto): Promise<Payment[]> {
    const { startDate, endDate, userId, dormitoryId, limit, offset } = filters;

    return this.paymentRepository.find({
      where: {
        ...(startDate &&
          endDate && { createdAt: { gte: startDate, lte: endDate } }),
        ...(userId && { userId }),
        ...(dormitoryId && { dormitoryId }),
      },
      take: limit,
      skip: offset,
    });
  }

  async createBulkPayments(data: CreateBulkPaymentDto): Promise<Payment[]> {
    const payments: Payment[] = [];

    for (const userPayment of data.users) {
      const amount = userPayment.customAmount || data.baseAmount;

      const payment = await this.createPayment({
        userId: userPayment.userId,
        amount,
        paymentType: data.paymentType as PaymentType,
        paymentMethod: data.paymentMethod as PaymentMethod,
        dueDate: data.dueDate,
        description: data.description,
      });

      payments.push(payment);
    }

    return payments;
  }

  async uploadPaymentProof(data: UploadPaymentProofDto): Promise<Payment> {
    const payment = await this.paymentRepository.findById(data.paymentId);
    if (!payment) throw new Error("Payment not found");
    if (payment.userId !== data.userId) throw new Error("Unauthorized");
    const allowedStatuses: PaymentStatus[] = [
      PaymentStatus.PENDING,
      PaymentStatus.REJECTED,
    ];
    if (!allowedStatuses.includes(payment.status)) {
      throw new Error("Cannot upload proof for this payment status");
    }

    const proofUrl = await this.fileUploadService.uploadFile(
      data.file,
      "payments",
    );

    return this.paymentRepository.updatePaymentProof(
      data.paymentId,
      proofUrl,
      data.file.originalname,
    );
  }

  async confirmPayment(data: ConfirmPaymentDto): Promise<Payment> {
    const payment = await this.paymentRepository.findById(data.paymentId);
    if (!payment) {
      throw new Error("Payment not found");
    }

    if (payment.status !== PaymentStatus.AWAITING_CONFIRMATION) {
      throw new Error("Payment is not awaiting confirmation");
    }

    const confirmedPayment = await this.paymentRepository.confirmPayment(
      data.paymentId,
      data.confirmedBy,
      data.managerNotes,
    );

    await this.notificationService.createNotification({
      type: $Enums.NotificationType.PAYMENT_CONFIRMED,
      title: "Payment Confirmed",
      message: `Your payment of ${confirmedPayment.amount} has been confirmed`,
      toUserId: confirmedPayment.userId,
      paymentId: confirmedPayment.id,
      priority: $Enums.NotificationPriority.NORMAL,
      metadata: {
        amount: confirmedPayment.amount,
        paymentType: confirmedPayment.paymentType,
        confirmedBy: data.confirmedBy,
      },
    });

    return confirmedPayment;
  }

  async rejectPayment(data: RejectPaymentDto): Promise<Payment> {
    // Validate payment exists and is awaiting confirmation
    const payment = await this.paymentRepository.findById(data.paymentId);
    if (!payment) {
      throw new Error("Payment not found");
    }

    if (payment.status !== PaymentStatus.AWAITING_CONFIRMATION) {
      throw new Error("Payment is not awaiting confirmation");
    }

    // Reject payment
    const rejectedPayment = await this.paymentRepository.rejectPayment(
      data.paymentId,
      data.rejectedBy,
      data.rejectionReason,
    );

    // Notify user
    await this.notificationService.createNotification({
      type: $Enums.NotificationType.PAYMENT_REJECTED,
      title: "Payment Rejected",
      message: `Your payment of ${rejectedPayment.amount} has been rejected`,
      toUserId: rejectedPayment.userId,
      paymentId: rejectedPayment.id,
      priority: $Enums.NotificationPriority.NORMAL,
      metadata: {
        amount: rejectedPayment.amount,
        paymentType: rejectedPayment.paymentType,
        rejectedBy: data.rejectedBy,
        rejectionReason: data.rejectionReason,
      },
    });

    return rejectedPayment;
  }

  async getPendingPayments(dormitoryId?: string): Promise<Payment[]> {
    return this.paymentRepository.findPendingPayments(dormitoryId);
  }

  async getAwaitingConfirmation(dormitoryId?: string): Promise<Payment[]> {
    return this.paymentRepository.findAwaitingConfirmation(dormitoryId);
  }

  async getOverduePayments(): Promise<Payment[]> {
    return this.paymentRepository.findOverduePayments();
  }

  async getPaymentStats(userId?: string, dormitoryId?: string): Promise<any> {
    return this.paymentRepository.getPaymentStats(userId, dormitoryId);
  }

  async processRecurringPayments(): Promise<void> {
    const recurringPaymentsDue =
      await this.paymentRepository.findRecurringPaymentsDue();

    for (const payment of recurringPaymentsDue) {
      try {
        if (!payment.recurringPaymentId) continue;

        const recurringPayment =
          await this.paymentRepository.findRecurringPaymentById(
            payment.recurringPaymentId,
          );
        if (!recurringPayment) continue;

        const nextDueDate = this.calculateNextDueDate(
          recurringPayment.nextDueDate,
          recurringPayment.interval,
        );

        await this.paymentRepository.updateRecurringPayment(
          recurringPayment.id,
          {
            nextDueDate,
          },
        );
      } catch (error) {
        console.error(
          `Error processing recurring payment for user ${payment.userId}:`,
          error,
        );
      }
    }
  }

  async createRecurringPayment(
    paymentId: string,
    frequency: string,
  ): Promise<void> {}

  /**
   * Create payment based on room's price category
   */
  async createPaymentFromRoom(
    userId: string, 
    roomId: string, 
    paymentType: PaymentType,
    paymentMethod: PaymentMethod,
    dueDate: Date,
    periodInDays?: number
  ): Promise<Payment> {
    // Get room with price category
    const room = await this.paymentRepository.findRoomWithPricing(roomId);
    if (!room) {
      throw new Error("Room not found");
    }

    let amount = 0;
    let priceCategoryId: string | undefined;
    let priceId: string | undefined;

    // Try to get pricing from price category first (new system)
    if (room.priceCategoryId && room.priceCategory) {
      priceCategoryId = room.priceCategoryId;
      amount = periodInDays && periodInDays <= 30 
        ? periodInDays * room.priceCategory.pricePerDay 
        : room.priceCategory.pricePerMonth;
    } else {
      // Fallback to old price system
      const price = await this.paymentRepository.findPriceByCapacity(room.capacity);
      if (price) {
        priceId = price.id;
        amount = periodInDays && periodInDays <= 30 
          ? periodInDays * price.pricePerDay 
          : price.pricePerMonth;
      } else {
        throw new Error("No pricing information found for this room");
      }
    }

    return this.createPayment({
      userId,
      amount,
      paymentType,
      paymentMethod,
      dueDate,
      priceCategoryId,
      priceId,
      description: `${paymentType} for room ${room.number}`,
    });
  }
}
