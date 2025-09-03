import { Injectable } from "@nestjs/common";

import { Prisma } from "../../../../__generated__";
import { PrismaService } from "@/prisma/prisma.service";
import { S3Service } from "@libs/common/s3/s3.service";

@Injectable()
export class AnnouncementRepository {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  create(data: Prisma.AnnouncementCreateInput) {
    return this.prisma.announcement.create({
      data,
      include: { attachments: true, recipients: true },
    });
  }
  async findAndCount(
    filters: any,
    options: { skip: number; take: number } = { skip: 0, take: 20 }
  ): Promise<[Prisma.AnnouncementGetPayload<any>[], number]> {
    const [data, total] = await Promise.all([
      this.prisma.announcement.findMany({
        where: { ...filters },
        include: { attachments: true, recipients: true },
        orderBy: { postedAt: "desc" },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.announcement.count({ where: { ...filters } }),
    ]);

    return [data, total];
  }


  findAll(filters: any) {
    return this.prisma.announcement.findMany({
      where: { ...filters },
      include: { attachments: true, recipients: true },
      orderBy: { postedAt: "desc" },
    });
  }

  findById(id: string) {
    return this.prisma.announcement.findUnique({
      where: { id },
      include: { attachments: true, recipients: true },
    });
  }

  update(id: string, data: Prisma.AnnouncementUpdateInput) {
    return this.prisma.announcement.update({
      where: { id },
      data,
      include: { attachments: true, recipients: true },
    });
  }

  softDelete(id: string) {
    return this.prisma.announcement.update({
      where: { id },
      data: { isHidden: true },
    });
  }
}
