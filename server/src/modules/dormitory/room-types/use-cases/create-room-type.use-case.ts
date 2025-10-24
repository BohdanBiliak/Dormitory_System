import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { S3Service } from "@/libs/common/s3/s3.service";
import { CreateRoomTypeDto } from "../dto/create-room-type.dto";

@Injectable()
export class CreateRoomTypeUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async execute(dto: CreateRoomTypeDto, photoFiles?: Express.Multer.File[]) {
    const existingType = await this.prisma.roomType.findFirst({
      where: { typeCode: dto.typeCode },
    });

    if (existingType) {
      throw new Error(`Room type with code already exists`);
    }

    // Upload photos to S3 if provided
    let photoUrls: string[] = [];
    if (photoFiles && photoFiles.length > 0) {
      photoUrls = await Promise.all(
        photoFiles.map(async (file) => {
          const photoKey = `room-types/${dto.typeCode}/${Date.now()}-${file.originalname}`;
          return await this.s3Service.uploadFile(file, photoKey);
        }),
      );
    }

    // Use uploaded photo URLs or provided URLs from DTO
    const finalPhotos = photoUrls.length > 0 ? photoUrls : dto.photos;

    return this.prisma.roomType.create({
      data: {
        name: dto.name,
        description: dto.description,
        capacity: dto.capacity,
        equipment: dto.equipment,
        typeCode: dto.typeCode,
        photos: finalPhotos,
      },
    });
  }
}
