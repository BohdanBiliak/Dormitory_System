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
  ) { }
  async create(dto: CreateDormitoryDto, files: Express.Multer.File[]) {
    const photoUrls = await Promise.all(
      files.map((file) => this.s3Service.uploadFile(file, "dormitories")),
    );

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

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.dormitory.findMany({
        where: { status: 'Active' },
        orderBy: { name: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.dormitory.count({
        where: { status: 'Active' },
      }),
    ]);
    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  async findDeactivated() {
  const [data, total] = await this.prismaService.$transaction([
    this.prismaService.dormitory.findMany({
      where: { status: 'NotActive' },
      orderBy: { name: "asc" },
    }),
    this.prismaService.dormitory.count({
      where: { status: 'NotActive' },
    }),
  ]);

  return {
    data,
    total,
  };
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
