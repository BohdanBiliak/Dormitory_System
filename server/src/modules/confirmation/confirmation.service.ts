import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import {
  $Enums,
  Confirmation,
  ConfirmationType,
} from "../../../__generated__";
import ConfirmationStatus = $Enums.ConfirmationStatus;
import UserRole = $Enums.UserRole;
import { MailService } from "@/libs/mail/mail.service";

@Injectable()
export class ConfirmationService {
  constructor(private readonly prisma: PrismaService, private readonly mailService: MailService) { }

  async getAll(): Promise<Confirmation[]> {
    return this.prisma.confirmation.findMany({
      include: {
        requester: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateStatus(id: string, status: ConfirmationStatus) {
    const updated = await this.prisma.confirmation.update({
      where: { id },
      include: { requester: true },
      data: {
        status,
        resolvedAt: new Date(),
      },
    });
    if (
      status === ConfirmationStatus.APPROVED &&
      updated.type === ConfirmationType.IDENTITY_VERIFICATION
    ) {
      await this.prisma.user.update({
        where: { id: updated.userId },
        data: { role: UserRole.SignedInUser },
      });
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
        include: { requester: true },
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
    const userId = await this.prisma.confirmation
      .findUnique({ where: { id } })
      .then((conf) => conf?.userId);

    if (!userId) {
      throw new Error("Confirmation not found");
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

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

    // Send rejection email to the requester
    await this.sendRejectionEmail(user.email, user.displayName, reason, updated.type);

    return updated;
  }

  private async sendRejectionEmail(
    email: string,
    name: string,
    reason: string,
    type: ConfirmationType
  ) {

    const subject = `Your ${type.toLowerCase().replace('_', ' ')} request has been rejected`;
    const template = 'confirmation-rejection'; // Create this template

    await this.mailService.sendRejectionEmail(email, name, reason, type);
  }
}