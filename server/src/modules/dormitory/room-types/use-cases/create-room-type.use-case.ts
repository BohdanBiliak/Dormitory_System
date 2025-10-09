import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateRoomTypeDto } from '../dto/create-room-type.dto'; 
@Injectable()
export class CreateRoomTypeUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: CreateRoomTypeDto) {
    const existingType = await this.prisma.roomType.findFirst({
      where: { typeCode: dto.typeCode }
    });

    if (existingType) {
      throw new Error(`Room type with code already exists`);
    }

    return this.prisma.roomType.create({
      data: {
        name: dto.name,
        description: dto.description,
        capacity: dto.capacity,
        equipment: dto.equipment,
        typeCode: dto.typeCode,
      }
    });
  }
}