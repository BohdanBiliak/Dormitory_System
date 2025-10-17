import {
  PrismaClient,
  Payment,
  PaymentStatus,
  Prisma,
} from "../../../__generated__";
import { IPaymentRepository } from "./interfaces/payments-repository.interfaces";

export class PaymentRepository implements IPaymentRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: Prisma.PaymentCreateInput): Promise<Payment> {
    return this.prisma.payment.create({
      data,
      include: {
        user: true,
        booking: true,
        paymentItems: true,
      },
    });
  }

  async findById(id: string): Promise<Payment | null> {
    return this.prisma.payment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            displayName: true,
            dormitoryId: true,
            roomId: true,
          },
        },
        booking: true,
        paymentItems: true,
        confirmedByUser: {
          select: {
            id: true,
            displayName: true,
          },
        },
      },
    });
  }

  async findByUserId(
    userId: string,
    limit = 50,
    offset = 0,
  ): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: { userId },
      include: {
        paymentItems: true,
        booking: true,
      },
      orderBy: { dueDate: "desc" },
      take: limit,
      skip: offset,
    });
  }

  async update(id: string, data: Prisma.PaymentUpdateInput): Promise<Payment> {
    return this.prisma.payment.update({
      where: { id },
      data,
      include: {
        user: true,
        paymentItems: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.payment.delete({
      where: { id },
    });
  }

  async findPendingPayments(dormitoryId?: string): Promise<Payment[]> {
    const whereClause: Prisma.PaymentWhereInput = {
      status: PaymentStatus.PENDING,
    };

    if (dormitoryId) {
      whereClause.user = {
        dormitoryId,
      };
    }

    return this.prisma.payment.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            email: true,
            roomId: true,
          },
        },
        paymentItems: true,
      },
      orderBy: { dueDate: "asc" },
    });
  }

  async findAwaitingConfirmation(dormitoryId?: string): Promise<Payment[]> {
    const whereClause: Prisma.PaymentWhereInput = {
      status: PaymentStatus.AWAITING_CONFIRMATION,
    };

    if (dormitoryId) {
      whereClause.user = {
        dormitoryId,
      };
    }

    return this.prisma.payment.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            email: true,
            roomId: true,
          },
        },
        paymentItems: true,
      },
      orderBy: { updatedAt: "asc" },
    });
  }
  async findRecurringPaymentById(id: string) {
    return this.prisma.recurringPayment.findUnique({ where: { id } });
  }

  async updateRecurringPayment(
    id: string,
    data: Prisma.RecurringPaymentUpdateInput,
  ) {
    return this.prisma.recurringPayment.update({
      where: { id },
      data,
    });
  }

  async findOverduePayments(): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: {
        status: PaymentStatus.PENDING,
        dueDate: {
          lt: new Date(),
        },
      },
      include: {
        user: true,
        paymentItems: true,
      },
    });
  }

  async findPaymentsByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: {
        dueDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        user: true,
        paymentItems: true,
      },
      orderBy: { dueDate: "asc" },
    });
  }

  async find(filters: Prisma.PaymentFindManyArgs): Promise<Payment[]> {
    return this.prisma.payment.findMany(filters);
  }

  async findRecurringPaymentsDue(): Promise<Payment[]> {
    const today = new Date();
    return this.prisma.payment.findMany({
      where: {
        recurringPayment: {
          isActive: true,
          nextDueDate: {
            lte: today,
          },
        },
      },
      include: {
        recurringPayment: true,
        user: true,
      },
    });
  }

  async updatePaymentProof(
    id: string,
    proofUrl: string,
    filename: string,
  ): Promise<Payment> {
    return this.prisma.payment.update({
      where: { id },
      data: {
        paymentProofUrl: proofUrl,
        paymentProofFilename: filename,
        paymentProofUploadedAt: new Date(),
        status: PaymentStatus.AWAITING_CONFIRMATION,
      },
      include: {
        user: true,
        paymentItems: true,
      },
    });
  }

  async confirmPayment(
    id: string,
    confirmedBy: string,
    managerNotes?: string,
  ): Promise<Payment> {
    return this.prisma.payment.update({
      where: { id },
      data: {
        status: PaymentStatus.PAID,
        confirmedBy,
        confirmedAt: new Date(),
        paidAt: new Date(),
        managerNotes,
      },
      include: {
        user: true,
        confirmedByUser: true,
      },
    });
  }

  async rejectPayment(
    id: string,
    rejectedBy: string,
    rejectionReason: string,
  ): Promise<Payment> {
    return this.prisma.payment.update({
      where: { id },
      data: {
        status: PaymentStatus.REJECTED,
        confirmedBy: rejectedBy,
        rejectionReason,
        paymentProofUrl: null,
        paymentProofFilename: null,
        paymentProofUploadedAt: null,
      },
      include: {
        user: true,
        confirmedByUser: true,
      },
    });
  }

  async getPaymentStats(
    userId?: string,
    dormitoryId?: string,
  ): Promise<{
    total: number;
    paid: number;
    pending: number;
    overdue: number;
  }> {
    const whereClause: Prisma.PaymentWhereInput = {};

    if (userId) {
      whereClause.userId = userId;
    } else if (dormitoryId) {
      whereClause.user = {
        dormitoryId,
      };
    }

    const [total, paid, pending, overdue] = await Promise.all([
      this.prisma.payment.count({ where: whereClause }),
      this.prisma.payment.count({
        where: { ...whereClause, status: PaymentStatus.PAID },
      }),
      this.prisma.payment.count({
        where: { ...whereClause, status: PaymentStatus.PENDING },
      }),
      this.prisma.payment.count({
        where: {
          ...whereClause,
          status: PaymentStatus.PENDING,
          dueDate: { lt: new Date() },
        },
      }),
    ]);

    return { total, paid, pending, overdue };
  }
}
