import { BadRequestException, Injectable } from "@nestjs/common";
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
  ) {}
  async create(dto: CreateDormitoryDto, files: Express.Multer.File[]) {
    const photoUrls = await Promise.all(
        files.map((file) => this.s3Service.uploadFile(file, "dormitories")),
    );

    // !!! Парсимо поле
    const roomGeneration = JSON.parse(dto.roomGeneration);

    const { roomGeneration: _removed, ...rest } = dto;

    const dormitory = await this.prismaService.dormitory.create({
      data: {
        ...rest,
        photos: photoUrls,
      },
    });

    // Далі як і було
    const rooms: Prisma.RoomCreateManyInput[] = [];

    for (let floor = 1; floor <= roomGeneration.numberOfFloors; floor++) {
      for (let i = 1; i <= roomGeneration.roomsPerFloor; i++) {
        rooms.push({
          number: `${floor}${i.toString().padStart(2, "0")}`,
          floor,
          capacity: 2,
          dormitoryId: dormitory.id,
          roomEquipment: [],
          photos: [],
        });
      }
    }

    await this.prismaService.room.createMany({ data: rooms });

    return dormitory;
  }

  findAll() {
    return this.prismaService.dormitory.findMany({
      where: { status: 'Active' },
      orderBy: { name: "asc" },
    });
  }

  findOne(id: string) {
    return this.prismaService.dormitory.findUniqueOrThrow({ where: { id } });
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
      data: { status: 'NotActive' },
    });
  }
}
