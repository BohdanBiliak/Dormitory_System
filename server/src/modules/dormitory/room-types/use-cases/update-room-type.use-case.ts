import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { UpdateRoomTypeDto } from '../dto/update-room-type.dto';

@Injectable()
export class UpdateRoomTypeUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, dto: UpdateRoomTypeDto) {
    // Check if room type exists
    const existingRoomType = await this.prisma.roomType.findUnique({
      where: { id }
    });

    if (!existingRoomType) {
      throw new NotFoundException(`Room type with ID ${id} not found`);
    }

    // If updating typeCode, check for uniqueness
    if (dto.typeCode && dto.typeCode !== existingRoomType.typeCode) {
      const duplicateTypeCode = await this.prisma.roomType.findUnique({
        where: { typeCode: dto.typeCode }
      });

      if (duplicateTypeCode) {
        throw new BadRequestException(`Room type with code "${dto.typeCode}" already exists`);
      }
    }

    // Update the room type
    const updatedRoomType = await this.prisma.roomType.update({
      where: { id },
      data: {
        ...dto,
        updatedAt: new Date()
      }
    });

    // If capacity changed, update related rooms
    if (dto.capacity && dto.capacity !== existingRoomType.capacity) {
      await this.prisma.room.updateMany({
        where: { roomTypeId: id },
        data: { capacity: dto.capacity }
      });
    }

    // If equipment changed, update related rooms
    if (dto.equipment && JSON.stringify(dto.equipment) !== JSON.stringify(existingRoomType.equipment)) {
      await this.prisma.room.updateMany({
        where: { roomTypeId: id },
        data: { roomEquipment: dto.equipment }
      });
    }

    return updatedRoomType;
  }
}