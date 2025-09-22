import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateDormitoryDto } from "@/modules/dormitory/dto/create-dormitory.dto";
import { UpdateDormitoryDto } from "@/modules/dormitory/dto/update-dormitory.dto";
import { S3Service } from "@/libs/common/s3/s3.service";
import { Prisma } from "../../../__generated__";

@Injectable()
export class DormitoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service,
  ) { }

  async create(dto: CreateDormitoryDto, files: { photos?: Express.Multer.File[], roomPhotos?: Express.Multer.File[] }) {
  const existingDormitory = await this.prismaService.dormitory.findFirst({
    where: { name: dto.name },
  });

  if (existingDormitory) {
    throw new BadRequestException(`Dormitory with name "${dto.name}" already exists`);
  }

  // Upload dormitory photos
  const photoUrls = files.photos 
    ? await Promise.all(
        files.photos.map((file) => this.s3Service.uploadFile(file, "dormitories"))
      )
    : [];

  // Upload room photos
  const roomPhotoUrls = files.roomPhotos 
    ? await Promise.all(
        files.roomPhotos.map((file) => this.s3Service.uploadFile(file, "rooms"))
      )
    : [];

  const roomGeneration = JSON.parse(dto.roomGeneration);
  const { roomGeneration: _removed, ...rest } = dto;

  return this.prismaService.$transaction(async (tx) => {
    const dormitory = await tx.dormitory.create({
      data: {
        ...rest,
        photos: photoUrls,
      },
    });

    const rooms: Prisma.RoomCreateManyInput[] = [];
    const totalRooms = roomGeneration.numberOfFloors * roomGeneration.roomsPerFloor;
    
    // Default equipment if not provided
    const defaultEquipment = [
      "Bed",
      "Desk", 
      "Chair",
      "Wardrobe",
      "Window",
      "Lighting"
    ];
    
    const roomEquipment = roomGeneration.roomEquipment || defaultEquipment;

    for (let floor = 1; floor <= roomGeneration.numberOfFloors; floor++) {
      for (let i = 1; i <= roomGeneration.roomsPerFloor; i++) {
        const roomIndex = (floor - 1) * roomGeneration.roomsPerFloor + (i - 1);
        
        // Distribute photos evenly across rooms, or assign random photos
        const assignedPhotos = this.distributePhotosToRooms(roomPhotoUrls, roomIndex, totalRooms);
        
        rooms.push({
          number: `${floor}${i.toString().padStart(2, "0")}`,
          floor,
          capacity: 2,
          dormitoryId: dormitory.id,
          roomEquipment,
          photos: assignedPhotos,
        });
      }
    }

    await tx.room.createMany({ data: rooms });

    const savedRooms = await tx.room.findMany({
      where: { dormitoryId: dormitory.id },
    });

    const prices: Prisma.PriceCreateManyInput[] = savedRooms.map((room) => ({
      roomId: null,
      roomCapacity: room.capacity,
      pricePerMonth: roomGeneration.pricePerMonth,
      pricePerDay: roomGeneration.pricePerDay,
      dateFrom: new Date(),
    }));

    await tx.price.createMany({ data: prices });

    return dormitory;
  });
}

private distributePhotosToRooms(roomPhotoUrls: string[], roomIndex: number, totalRooms: number): string[] {
  if (roomPhotoUrls.length === 0) {
    return [];
  }

  // Strategy 1: Distribute photos evenly
  const photosPerRoom = Math.floor(roomPhotoUrls.length / totalRooms);
  const extraPhotos = roomPhotoUrls.length % totalRooms;
  
  const startIndex = roomIndex * photosPerRoom + Math.min(roomIndex, extraPhotos);
  const endIndex = startIndex + photosPerRoom + (roomIndex < extraPhotos ? 1 : 0);
  
  const assignedPhotos = roomPhotoUrls.slice(startIndex, endIndex);
  
  // If no photos assigned due to fewer photos than rooms, assign one random photo
  if (assignedPhotos.length === 0 && roomPhotoUrls.length > 0) {
    const randomIndex = roomIndex % roomPhotoUrls.length;
    return [roomPhotoUrls[randomIndex]];
  }
  
  return assignedPhotos;
}

  async findAll() {
  const [data, total] = await this.prismaService.$transaction([
    this.prismaService.dormitory.findMany({
      where: { status: 'Active' },
      orderBy: { name: "asc" },
    }),
    this.prismaService.dormitory.count({
      where: { status: 'Active' },
    }),
  ]);

  return {
    data,
    total,
  };
}

  async findDeactivated() {
  const [data, total] = await this.prismaService.$transaction([
    this.prismaService.dormitory.findMany({
      where: { status: 'Deactivated' },
      orderBy: { name: "asc" },
    }),
    this.prismaService.dormitory.count({
      where: { status: 'Deactivated' },
    }),
  ]);

  return {
    data,
    total,
  };
}


  async findOne(id: string) {
  const dormitory = await this.prismaService.dormitory.findUnique({ 
    where: { id },
    include: {
      rooms: true,
    }
  });

  
  if (!dormitory) {
    throw new NotFoundException(`Dormitory with ID ${id} not found`);
  }
  
  
  return dormitory;
}
async activate(id: string) {
  const dormitory = await this.prismaService.dormitory.findUnique({
    where: { id },
  });

  if (!dormitory) {
    throw new NotFoundException(`Dormitory with ID ${id} not found`);
  }

  return this.prismaService.dormitory.update({
    where: { id },
    data: { status: 'Active' },
  });
}

  async update(id: string, dto: UpdateDormitoryDto) {

    return this.prismaService.dormitory.update({ where: { id }, data: dto });
  }

  async deactivate(id: string) {
    const residentsCount = await this.prismaService.user.count({
      where: { dormitoryId: id },
    });
    if (residentsCount > 0) {
      throw new BadRequestException(
        "Cannot deactivate dormitory with residents",
      );
    }
    return this.prismaService.dormitory.update({
      where: { id },
      data: { status: 'Deactivated' },
    });
  }
}
