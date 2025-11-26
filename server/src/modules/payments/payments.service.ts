import { Injectable, Inject } from "@nestjs/common";
import {
  Payment,
  PaymentStatus,
  PaymentType,
  PaymentMethod,
  PaymentItemType,
} from "@prisma/client";
import { $Enums } from "@prisma/client";
import { IPaymentRepository } from "./interfaces/payments-repository.interfaces";
import { IPaymentService } from "./interfaces/payments-service.interfaces";
import { S3Service } from "../../libs/common/s3/s3.service";
import { NotificationsService } from "../notifications/notifications.service";
import { PricingService } from "../pricing/pricing.service";
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
    private readonly pricingService: PricingService,
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

    return date
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
    const { startDate, endDate, userId, dormitoryId, limit, offset, status } = filters;

    return this.paymentRepository.find({
      where: {
        ...(startDate && endDate && { createdAt: { gte: startDate, lte: endDate } }),
        ...(userId && { userId }),
        ...(dormitoryId && { dormitoryId }),
        ...(status && { status: status as PaymentStatus }),
      },
      take: limit,
      skip: offset,

      include:{
        user:{
          select:{
            displayName:true,
            secondName:true,
            email:true,
            room:{
              select:{
                number:true,
                dormitory:{
                  select:{
                    name:true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async createBulkPayments(data: CreateBulkPaymentDto): Promise<{
    payments: Payment[];
    errors?: Array<{ userId: string; error: string }>;
  }> {
    const payments: Payment[] = [];
    const errors: Array<{ userId: string; error: string }> = [];
    let usersToProcess = [...data.users];
    
    if (data.roomIds && data.roomIds.length > 0) {
      const roomUsers = await this.paymentRepository.findUsersByRoomIds(data.roomIds);
      
      for (const user of roomUsers) {
        if (!usersToProcess.find(u => u.userId === user.id)) {
          usersToProcess.push({
            userId: user.id,
            roomId: user.roomId,
          });
        }
      }
    }

    let priceCategoryData: any = null;
    if (data.priceCategoryId) {
      priceCategoryData = await this.paymentRepository.findPriceCategoryById(data.priceCategoryId);
      if (!priceCategoryData) {
        throw new Error(`Price category ${data.priceCategoryId} not found`);
      }
    }

    for (const userPayment of usersToProcess) {
      try {
        const dueDate = new Date(data.dueDate);
        const startCheck = new Date(dueDate);
        startCheck.setDate(startCheck.getDate() - 15); 
        const endCheck = new Date(dueDate);
        endCheck.setDate(endCheck.getDate() + 15);
        const existingPayments = await this.paymentRepository.findExistingPayments(
          userPayment.userId,
          data.paymentType,
          startCheck,
          endCheck,
        );
        if (existingPayments.length > 0) {
          errors.push({
            userId: userPayment.userId,
            error: `Payment already exists for this period (${existingPayments[0].id})`,
          });
          continue;
        }
        let amount: number;
        let priceCategoryId: string | undefined;
        let priceId: string | undefined;
        let paymentDescription = data.description || '';
        if (userPayment.customAmount) {
          amount = userPayment.customAmount;
        } else if (data.useRoomPricing && userPayment.roomId) {
          try {
            const pricingInfo = await this.pricingService.getRoomPricing(userPayment.roomId);
            
            if (pricingInfo.source === 'no_pricing') {
              errors.push({ 
                userId: userPayment.userId, 
                error: `No pricing found for room ${userPayment.roomId}` 
              });
              continue;
            }
            const room = await this.paymentRepository.findRoomWithPricing(userPayment.roomId);
            if (pricingInfo.categoryId) {
              priceCategoryId = pricingInfo.categoryId;
            }
            amount = data.periodInDays && data.periodInDays <= 30
              ? data.periodInDays * pricingInfo.pricePerDay
              : pricingInfo.pricePerMonth;
            
            paymentDescription = paymentDescription || 
              `${data.paymentType} for room ${room?.number || userPayment.roomId}`;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            errors.push({ 
              userId: userPayment.userId, 
              error: `Failed to get pricing for room ${userPayment.roomId}: ${errorMessage}` 
            });
            continue;
          }
        } else if (data.baseAmount) {
          amount = data.baseAmount;
        } else if (priceCategoryData) {
          priceCategoryId = priceCategoryData.id;
          amount = data.periodInDays && data.periodInDays <= 30
            ? data.periodInDays * priceCategoryData.pricePerDay
            : priceCategoryData.pricePerMonth;
        } else {
          errors.push({ 
            userId: userPayment.userId, 
            error: 'No amount could be determined (provide baseAmount, priceCategoryId, or enable useRoomPricing)' 
          });
          continue;
        }

        const payment = await this.createPayment({
          userId: userPayment.userId,
          amount,
          paymentType: data.paymentType,
          paymentMethod: data.paymentMethod,
          dueDate: data.dueDate,
          description: paymentDescription,
          priceCategoryId,
          priceId,
        });

        payments.push(payment);
      } catch (error) {
        errors.push({ 
          userId: userPayment.userId, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    if (errors.length > 0) {
      console.warn('Bulk payment creation had errors:', errors);
    }

    return {
      payments,
      errors: errors.length > 0 ? errors : undefined,
    };
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
      throw new Error(`Cannot upload proof for this payment status. Current status: ${payment.status}. Allowed statuses: PENDING, REJECTED`);
    }
    const proofUrl = await this.fileUploadService.uploadFile(
      data.file,
      "payments",
    );
    const updatedPayment = await this.paymentRepository.updatePaymentProof(
      data.paymentId,
      proofUrl,
      data.file.originalname,
    );
    await this.paymentRepository.createConfirmation({
      userId: payment.userId,
      type: 'PAYMENT_PROOF',
      paymentId: payment.id,
      status: 'PENDING',
      metadata: {
        amount: payment.amount,
        paymentType: payment.paymentType,
        proofUrl: proofUrl,
        uploadedAt: new Date().toISOString(),
      },
    });
    const adminUsers = await this.paymentRepository.findAdminUsers();
    for (const admin of adminUsers) {
      await this.notificationService.createNotification({
        type: $Enums.NotificationType.PAYMENT_CONFIRMATION_REQUIRED,
        title: "Payment Proof Uploaded",
        message: `Payment proof uploaded for ${payment.amount} ${payment.currency}. Please review and confirm. Payment ID: ${payment.id}`,
        toUserId: admin.id,
        paymentId: payment.id,
        priority: $Enums.NotificationPriority.HIGH,
        metadata: {
          userId: payment.userId,
          amount: payment.amount,
          paymentType: payment.paymentType,
          paymentId: payment.id,
        },
      });
    }
    return updatedPayment;
  }

  async downloadPaymentProof(
    paymentId: string,
    userId: string,
    userRole?: string,
  ): Promise<{ buffer: Buffer; contentType: string; filename: string }> {
    const payment = await this.paymentRepository.findById(paymentId);
    
    if (!payment) {
      throw new Error("Payment not found");
    }
    
    const isAdmin = userRole === 'Admin' || userRole === 'SuperAdmin';
    if (payment.userId !== userId && !isAdmin) {
      throw new Error("Unauthorized");
    }
    
    if (!payment.paymentProofUrl) {
      throw new Error("No payment proof available");
    }

    try {
      const buffer = await this.fileUploadService.downloadFile(payment.paymentProofUrl);
      
      const ext = payment.paymentProofFilename?.split('.').pop()?.toLowerCase();
      let contentType = 'application/octet-stream';
      if (ext === 'pdf') contentType = 'application/pdf';
      else if (['jpg', 'jpeg'].includes(ext || '')) contentType = 'image/jpeg';
      else if (ext === 'png') contentType = 'image/png';

      return {
        buffer,
        contentType,
        filename: payment.paymentProofFilename || `payment-${paymentId}.pdf`,
      };
    } catch (error: any) {
      throw new Error(`Failed to download payment proof: ${error.message || 'Unknown error'}`);
    }
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
    const payment = await this.paymentRepository.findById(data.paymentId);
    if (!payment) {
      throw new Error("Payment not found");
    }

    if (payment.status !== PaymentStatus.AWAITING_CONFIRMATION) {
      throw new Error("Payment is not awaiting confirmation");
    }

    const rejectedPayment = await this.paymentRepository.rejectPayment(
      data.paymentId,
      data.rejectedBy,
      data.rejectionReason,
    );

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

  async updatePaymentStatus(
    paymentId: string,
    status: string,
    updatedBy: string,
    notes?: string,
  ): Promise<Payment> {
    const payment = await this.paymentRepository.findById(paymentId);
    
    if (!payment) {
      throw new Error("Payment not found");
    }

    const validStatuses = Object.values(PaymentStatus);
    if (!validStatuses.includes(status as PaymentStatus)) {
      throw new Error(`Invalid status: ${status}`);
    }

    const updatedPayment = await this.paymentRepository.updatePaymentStatus(
      paymentId,
      status as PaymentStatus,
      notes,
    );

    await this.paymentRepository.createAuditLog({
      paymentId,
      userId: updatedBy,
      action: `Status changed to ${status}`,
      oldValue: payment.status,
      newValue: status,
      notes,
    });

    if (status === PaymentStatus.PAID) {
      await this.notificationService.createNotification({
        type: $Enums.NotificationType.PAYMENT_RECEIVED,
        title: "Payment Received",
        message: `Your payment of ${updatedPayment.amount} ${updatedPayment.currency} has been marked as paid`,
        toUserId: updatedPayment.userId,
        paymentId: updatedPayment.id,
        priority: $Enums.NotificationPriority.NORMAL,
      });
    }

    return updatedPayment;
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

  async createPaymentFromRoom(
    userId: string, 
    roomId: string, 
    paymentType: PaymentType,
    paymentMethod: PaymentMethod,
    dueDate: Date,
    periodInDays?: number
  ): Promise<Payment> {
    const room = await this.paymentRepository.findRoomWithPricing(roomId);
    if (!room) {
      throw new Error("Room not found");
    }

    let amount = 0;
    let priceCategoryId: string | undefined;
    let priceId: string | undefined;

    if (room.priceCategoryId && room.priceCategory) {
      priceCategoryId = room.priceCategoryId;
      amount = periodInDays && periodInDays <= 30 
        ? periodInDays * room.priceCategory.pricePerDay 
        : room.priceCategory.pricePerMonth;
    } else {
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

  async getOccupiedRooms(dormitoryId?: string): Promise<any[]> {
    return this.paymentRepository.findOccupiedRooms(dormitoryId);
  }
}
