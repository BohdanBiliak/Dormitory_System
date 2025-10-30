import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { UpdateRoomTypeDto } from "../dto/update-room-type.dto";
import { S3Service } from "@/libs/common/s3/s3.service";

@Injectable()
export class UpdateRoomTypeUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: S3Service
  ) {}

  async execute(
    id: string,
    dto: UpdateRoomTypeDto,
    photos?: Express.Multer.File[],
  ) {
    // Check if room type exists
    const existingRoomType = await this.prisma.roomType.findUnique({
      where: { id },
    });

    if (!existingRoomType) {
      throw new NotFoundException(`Room type with ID ${id} not found`);
    }

    // If updating typeCode, check for uniqueness
    if (dto.typeCode && dto.typeCode !== existingRoomType.typeCode) {
      const duplicateTypeCode = await this.prisma.roomType.findUnique({
        where: { typeCode: dto.typeCode },
      });

      if (duplicateTypeCode) {
        throw new BadRequestException(
          `Room type with code "${dto.typeCode}" already exists`,
        );
      }
    }

    // Handle photo uploads if provided
    let photoUrls = existingRoomType.photos;
    if (photos && photos.length > 0) {
      photoUrls = photos.map(
        (photo, index) =>
          `https://s3.example.com/room-types/${dto.typeCode || existingRoomType.typeCode}/photo-${Date.now()}-${index}.jpg`,
      );
    }

    // Parse equipment if it's a string
    let equipment: string[] | undefined;
    if (typeof dto.equipment === "string") {
      try {
        equipment = JSON.parse(dto.equipment);
      } catch (error) {
        throw new BadRequestException(
          "Invalid equipment format. Must be a valid JSON array.",
        );
      }
    } else {
      equipment = dto.equipment;
    }

    // Ensure equipment is an array if it exists
    if (equipment && !Array.isArray(equipment)) {
      equipment = [equipment];
    }

    // Update the room type
    const updatedRoomType = await this.prisma.roomType.update({
      where: { id },
      data: {
        ...dto,
        equipment,
        photos: photoUrls,
        updatedAt: new Date(),
      },
    });

    // If capacity changed, update related rooms
    if (dto.capacity && dto.capacity !== existingRoomType.capacity) {
      await this.prisma.room.updateMany({
        where: { roomTypeId: id },
        data: { capacity: dto.capacity },
      });
    }

    // If equipment changed, update related rooms
    if (
      equipment &&
      JSON.stringify(equipment) !== JSON.stringify(existingRoomType.equipment)
    ) {
      await this.prisma.room.updateMany({
        where: { roomTypeId: id },
        data: {
          roomEquipment: Array.isArray(equipment) ? equipment : [equipment],
        },
      });
    }


    return updatedRoomType;
  }

   async uploadFiles(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    return Promise.all(files.map((file) => this.s3.uploadFile(file, folder)));
  }
}
