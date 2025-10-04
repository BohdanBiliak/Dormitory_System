import { Injectable } from "@nestjs/common";

import { Prisma } from "../../../__generated__";
import { PrismaService } from "@/prisma/prisma.service";

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
    console.log('Repository query filters:', JSON.stringify(filters, null, 2));
    console.log('Repository query options:', options);
    
    const [data, total] = await Promise.all([
      this.prisma.announcement.findMany({
        where: { ...filters },
        include: { 
          attachments: true, 
          recipients: true,
          author: {
            select: {
              id: true,
              displayName: true,
              email: true
            }
          }
        },
        orderBy: { postedAt: "desc" },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.announcement.count({ where: { ...filters } }),
    ]);

    console.log('Repository result - total:', total, 'data length:', data.length);
    if (data.length > 0) {
      console.log('First announcement recipients:', data[0].recipients);
    }

    return [data, total];
  }

  findAll(filters: any, options?: { skip?: number; take?: number }) {
    return this.prisma.announcement.findMany({
        where: { ...filters },
        include: { attachments: true, recipients: true },
        orderBy: { postedAt: "desc" },
        ...(options?.skip !== undefined && { skip: options.skip }),
        ...(options?.take !== undefined && { take: options.take }),
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
