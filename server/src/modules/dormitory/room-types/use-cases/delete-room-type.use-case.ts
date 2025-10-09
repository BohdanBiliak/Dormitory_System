import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class DeleteRoomTypeUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    // Check if room type exists
    const roomType = await this.prisma.roomType.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            rooms: true,
            floorRoomAssignments: true
          }
        }
      }
    });

    if (!roomType) {
      throw new NotFoundException(`Room type with ID ${id} not found`);
    }

    // Check if room type is in use
    if (roomType._count.rooms > 0) {
      throw new BadRequestException(
        `Cannot delete room type "${roomType.name}" as it is currently used by ${roomType._count.rooms} room(s). Please reassign or remove these rooms first.`
      );
    }

    if (roomType._count.floorRoomAssignments > 0) {
      throw new BadRequestException(
        `Cannot delete room type "${roomType.name}" as it has ${roomType._count.floorRoomAssignments} floor assignment(s). Please remove these assignments first.`
      );
    }

    // Safe to delete
    await this.prisma.roomType.delete({
      where: { id }
    });

    return {
      message: `Room type "${roomType.name}" has been successfully deleted`,
      deletedRoomType: {
        id: roomType.id,
        name: roomType.name,
        typeCode: roomType.typeCode
      }
    };
  }
}