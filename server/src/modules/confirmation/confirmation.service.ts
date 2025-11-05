import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { $Enums, Confirmation, ConfirmationType } from "../../../__generated__";
import ConfirmationStatus = $Enums.ConfirmationStatus;
import UserRole = $Enums.UserRole;
import { MailService } from "@/libs/mail/mail.service";

@Injectable()
export class ConfirmationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async getAll(): Promise<Confirmation[]> {
    return this.prisma.confirmation.findMany({
      include: {
        requester: true,
        payment: {
          include: {
            user: {
              select: {
                displayName: true,
                secondName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateStatus(id: string, status: ConfirmationStatus) {
    const updated = await this.prisma.confirmation.update({
      where: { id },
      include: { 
        requester: true,
        payment: true,
      },
      data: {
        status,
        resolvedAt: new Date(),
      },
    });
    
    if (status === ConfirmationStatus.APPROVED) {
      // Handle identity verification
      if (updated.type === ConfirmationType.IDENTITY_VERIFICATION) {
        await this.prisma.user.update({
          where: { id: updated.userId },
          data: { role: UserRole.SignedInUser },
        });
      }
      
      // Handle payment proof confirmation
      if (updated.type === ConfirmationType.PAYMENT_PROOF && updated.paymentId) {
        await this.prisma.payment.update({
          where: { id: updated.paymentId },
          data: {
            status: 'PAID' as any,
            paidAt: new Date(),
          },
        });
      }
    }

    return updated;
  }

  async getAllFiltered({
    type,
    status,
    addressee,
    page = 1,
    limit = 10,
  }: {
    type?: $Enums.ConfirmationType;
    status?: $Enums.ConfirmationStatus;
    addressee?: string;
    page?: number;
    limit?: number;
  }) {
    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status;
    if (addressee)
      where.requester = { name: { contains: addressee, mode: "insensitive" } };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.confirmation.findMany({
        where,
        include: { 
          requester: true,
          payment: {
            include: {
              user: {
                select: {
                  displayName: true,
                  secondName: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.confirmation.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      pageCount: Math.ceil(total / limit),
    };
  }

  async reject(id: string, reason: string) {
    const confirmation = await this.prisma.confirmation.findUnique({ 
      where: { id },
      include: { payment: true },
    });

    if (!confirmation) {
      throw new Error("Confirmation not found");
    }

    const user = await this.prisma.user.findUnique({ where: { id: confirmation.userId } });

    if (!user) {
      throw new Error("User not found");
    }

    const updated = await this.prisma.confirmation.update({
      where: { id },
      data: {
        status: ConfirmationStatus.REJECTED,
        resolvedAt: new Date(),
        rejectionReason: reason,
      },
    });

    // If it's a payment proof rejection, update payment status
    if (confirmation.type === ConfirmationType.PAYMENT_PROOF && confirmation.paymentId) {
      await this.prisma.payment.update({
        where: { id: confirmation.paymentId },
        data: {
          status: 'REJECTED' as any,
          rejectionReason: reason,
        },
      });
    }

    // Send rejection email to the requester
    await this.sendRejectionEmail(
      user.email,
      user.displayName,
      reason,
      updated.type,
    );

    return updated;
  }

  private async sendRejectionEmail(
    email: string,
    name: string,
    reason: string,
    type: ConfirmationType,
  ) {
    const subject = `Your ${type.toLowerCase().replace("_", " ")} request has been rejected`;
    const template = "confirmation-rejection"; // Create this template

    await this.mailService.sendRejectionEmail(email, name, reason, type);
  }
}
