import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { PriceCategory } from "@prisma/client";
import { IPriceCategoryRepository } from "./interfaces/price-category-repository.interface";
import { CreatePriceCategoryDto, UpdatePriceCategoryDto, PriceCategoryFilterDto } from "./dto";

@Injectable()
export class PriceCategoryRepository implements IPriceCategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePriceCategoryDto): Promise<PriceCategory> {
    return this.prisma.priceCategory.create({
      data: {
        name: data.name,
        description: data.description,
        pricePerMonth: data.pricePerMonth,
        pricePerDay: data.pricePerDay,
        isActive: data.isActive ?? true,
      },
    });
  }

  async findById(id: string): Promise<PriceCategory | null> {
    return this.prisma.priceCategory.findUnique({
      where: { id },
    });
  }

  async findAll(filters?: PriceCategoryFilterDto): Promise<PriceCategory[]> {
    const where: any = {};
    
    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive;
    }
    
    if (filters?.search) {
      where.name = {
        contains: filters.search,
        mode: 'insensitive',
      };
    }

    return this.prisma.priceCategory.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByName(name: string): Promise<PriceCategory | null> {
    return this.prisma.priceCategory.findUnique({
      where: { name },
    });
  }

  async update(id: string, data: UpdatePriceCategoryDto): Promise<PriceCategory> {
    return this.prisma.priceCategory.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    // First, unassign from rooms and room types
    await this.prisma.$transaction([
      this.prisma.room.updateMany({
        where: { priceCategoryId: id },
        data: { priceCategoryId: null },
      }),
      this.prisma.roomType.updateMany({
        where: { priceCategoryId: id },
        data: { priceCategoryId: null },
      }),
      this.prisma.priceCategory.delete({
        where: { id },
      }),
    ]);
  }

  async assignToRoomTypes(categoryId: string, roomTypeIds: string[]): Promise<void> {
    await this.prisma.roomType.updateMany({
      where: { id: { in: roomTypeIds } },
      data: { priceCategoryId: categoryId },
    });

    // Also update all rooms of these types
    await this.prisma.room.updateMany({
      where: { roomTypeId: { in: roomTypeIds } },
      data: { priceCategoryId: categoryId },
    });
  }

  async assignToRooms(categoryId: string, roomIds: string[]): Promise<void> {
    await this.prisma.room.updateMany({
      where: { id: { in: roomIds } },
      data: { priceCategoryId: categoryId },
    });
  }

  async unassignFromRoomTypes(roomTypeIds: string[]): Promise<void> {
    await this.prisma.roomType.updateMany({
      where: { id: { in: roomTypeIds } },
      data: { priceCategoryId: null },
    });

    // Also unassign from rooms of these types
    await this.prisma.room.updateMany({
      where: { roomTypeId: { in: roomTypeIds } },
      data: { priceCategoryId: null },
    });
  }

  async unassignFromRooms(roomIds: string[]): Promise<void> {
    await this.prisma.room.updateMany({
      where: { id: { in: roomIds } },
      data: { priceCategoryId: null },
    });
  }

  async findRoomTypesByCategory(categoryId: string): Promise<any[]> {
    return this.prisma.roomType.findMany({
      where: { priceCategoryId: categoryId },
      include: {
        _count: {
          select: { rooms: true },
        },
      },
    });
  }

  async findRoomsByCategory(categoryId: string): Promise<any[]> {
    return this.prisma.room.findMany({
      where: { priceCategoryId: categoryId },
      include: {
        roomType: true,
        dormitory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}