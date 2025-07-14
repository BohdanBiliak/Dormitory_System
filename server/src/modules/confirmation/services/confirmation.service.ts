import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import {
  $Enums,
  Confirmation,
  ConfirmationType,
} from "../../../../__generated__";
import ConfirmationStatus = $Enums.ConfirmationStatus;
import UserRole = $Enums.UserRole;

@Injectable()
export class ConfirmationService {
  constructor(private readonly prisma: PrismaService) {}

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
}
