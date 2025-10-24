import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";

export interface PricingInfo {
  pricePerDay: number;
  pricePerMonth: number;
  source: 'price_category_room' | 'price_category_room_type' | 'no_pricing';
  categoryName?: string;
  categoryId?: string;
}

export interface RoomPricingDetails {
  roomId: string;
  roomNumber: string;
  capacity: number;
  dormitoryId: string;
  dormitoryName: string;
  pricing: PricingInfo;
}

@Injectable()
export class PricingService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Get comprehensive pricing information for a room
   * Priority: Room price category > Room type price category > No pricing
   */
  async getRoomPricing(roomId: string): Promise<PricingInfo> {
    const room = await this.prismaService.room.findUnique({
      where: { id: roomId },
      include: {
        priceCategory: true,
        roomType: {
          include: {
            priceCategory: true,
          },
        },
      },
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    // Priority 1: Room-specific price category
    if (room.priceCategory) {
      return {
        pricePerDay: room.priceCategory.pricePerDay,
        pricePerMonth: room.priceCategory.pricePerMonth,
        source: 'price_category_room',
        categoryName: room.priceCategory.name,
        categoryId: room.priceCategory.id,
      };
    }

    // Priority 2: Room type price category
    if (room.roomType?.priceCategory) {
      return {
        pricePerDay: room.roomType.priceCategory.pricePerDay,
        pricePerMonth: room.roomType.priceCategory.pricePerMonth,
        source: 'price_category_room_type',
        categoryName: room.roomType.priceCategory.name,
        categoryId: room.roomType.priceCategory.id,
      };
    }

    // Priority 3: No pricing available
    return {
      pricePerDay: 0,
      pricePerMonth: 0,
      source: 'no_pricing',
    };
  }

  /**
   * Get detailed pricing information for a room including room details
   */
  async getRoomPricingDetails(roomId: string): Promise<RoomPricingDetails> {
    const room = await this.prismaService.room.findUnique({
      where: { id: roomId },
      include: {
        dormitory: {
          select: { id: true, name: true },
        },
      },
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    const pricing = await this.getRoomPricing(roomId);

    return {
      roomId: room.id,
      roomNumber: room.number,
      capacity: room.capacity,
      dormitoryId: room.dormitoryId,
      dormitoryName: room.dormitory.name,
      pricing,
    };
  }

  /**
   * Get pricing information for multiple rooms
   */
  async getMultipleRoomsPricing(roomIds: string[]): Promise<RoomPricingDetails[]> {
    return Promise.all(
      roomIds.map(roomId => this.getRoomPricingDetails(roomId))
    );
  }

  /**
   * Get all rooms with their pricing information by dormitory
   */
  async getDormitoryRoomsPricing(dormitoryId: string) {
    const dormitory = await this.prismaService.dormitory.findUnique({
      where: { id: dormitoryId },
      include: {
        rooms: {
          select: { id: true },
        },
      },
    });

    if (!dormitory) {
      throw new NotFoundException(`Dormitory with ID ${dormitoryId} not found`);
    }

    const roomIds = dormitory.rooms.map(room => room.id);
    const roomsPricing = await this.getMultipleRoomsPricing(roomIds);

    // Calculate statistics
    const roomsWithPricing = roomsPricing.filter(r => r.pricing.source !== 'no_pricing');
    const roomsWithoutPricing = roomsPricing.filter(r => r.pricing.source === 'no_pricing');
    
    const averageDaily = roomsWithPricing.length > 0 
      ? roomsWithPricing.reduce((sum, room) => sum + room.pricing.pricePerDay, 0) / roomsWithPricing.length 
      : 0;
    
    const averageMonthly = roomsWithPricing.length > 0 
      ? roomsWithPricing.reduce((sum, room) => sum + room.pricing.pricePerMonth, 0) / roomsWithPricing.length 
      : 0;

    // Group by pricing source
    const pricingSources = roomsPricing.reduce((acc, room) => {
      const source = room.pricing.source;
      if (!acc[source]) {
        acc[source] = [];
      }
      acc[source].push(room);
      return acc;
    }, {} as Record<string, RoomPricingDetails[]>);

    return {
      dormitoryId,
      dormitoryName: dormitory.name,
      totalRooms: roomsPricing.length,
      roomsWithPricing: roomsWithPricing.length,
      roomsWithoutPricing: roomsWithoutPricing.length,
      averagePricePerDay: averageDaily,
      averagePricePerMonth: averageMonthly,
      pricingSources,
      rooms: roomsPricing,
    };
  }

  /**
   * Calculate payment amount based on room pricing and period
   */
  async calculatePaymentAmount(
    roomId: string, 
    startDate: Date, 
    endDate: Date
  ): Promise<{ amount: number; pricing: PricingInfo; periodDays: number }> {
    const pricing = await this.getRoomPricing(roomId);
    
    if (pricing.source === 'no_pricing') {
      throw new Error(`No pricing information available for room ${roomId}`);
    }

    const periodDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Use daily rate for periods <= 30 days, monthly rate for longer periods
    const amount = periodDays <= 30 
      ? periodDays * pricing.pricePerDay
      : Math.ceil(periodDays / 30) * pricing.pricePerMonth;

    return {
      amount: Math.round(amount * 100) / 100, // Round to 2 decimal places
      pricing,
      periodDays,
    };
  }

  /**
   * Get pricing statistics across all dormitories
   */
  async getGlobalPricingStatistics() {
    const [totalRooms, roomsWithPriceCategory] = await Promise.all([
      this.prismaService.room.count(),
      this.prismaService.room.count({
        where: {
          OR: [
            { priceCategoryId: { not: null } },
            { roomType: { priceCategoryId: { not: null } } },
          ],
        },
      }),
    ]);

    const roomsWithoutAnyPricing = totalRooms - roomsWithPriceCategory;

    // Get active price categories
    const activeCategories = await this.prismaService.priceCategory.count({
      where: { isActive: true },
    });

    return {
      totalRooms,
      roomsWithPriceCategory,
      roomsWithoutAnyPricing,
      priceCategoryCoverage: Math.round((roomsWithPriceCategory / totalRooms) * 100),
      activeCategories,
      migrationProgress: {
        total: totalRooms,
        migrated: roomsWithPriceCategory,
        remaining: roomsWithoutAnyPricing,
        percentage: Math.round((roomsWithPriceCategory / totalRooms) * 100),
      },
    };
  }
}