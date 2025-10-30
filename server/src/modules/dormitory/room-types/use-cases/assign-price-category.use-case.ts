import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class AssignPriceCategoryToRoomTypeUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(roomTypeId: string, priceCategoryId?: string | null) {
    // Verify room type exists
    const roomType = await this.prisma.roomType.findUnique({
      where: { id: roomTypeId },
    });
    
    if (!roomType) {
      throw new NotFoundException("Room type not found");
    }

    // If assigning a price category, verify it exists and is active
    if (priceCategoryId) {
      const priceCategory = await this.prisma.priceCategory.findUnique({
        where: { id: priceCategoryId },
      });
      
      if (!priceCategory) {
        throw new NotFoundException("Price category not found");
      }
      
      if (!priceCategory.isActive) {
        throw new NotFoundException("Price category is not active");
      }
    }

    // Update room type with price category assignment
    const updatedRoomType = await this.prisma.roomType.update({
      where: { id: roomTypeId },
      data: {
        priceCategoryId,
        updatedAt: new Date(),
      },
      include: {
        priceCategory: true,
      },
    });

    return {
      message: priceCategoryId 
        ? "Price category assigned successfully" 
        : "Price category unassigned successfully",
      roomType: updatedRoomType,
    };
  }
}