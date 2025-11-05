import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateDormitoryDto } from "@/modules/dormitory/dto/create-dormitory.dto";
import { UpdateDormitoryDto } from "@/modules/dormitory/dto/update-dormitory.dto";
import { S3Service } from "@/libs/common/s3/s3.service";
import { FloorRoomAssignmentDto } from "./dto/room-assignment.dto";
import { PricingService } from "@/modules/pricing/pricing.service";

@Injectable()
export class DormitoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service,
    private readonly pricingService: PricingService,
  ) { }

  async create(
    dto: CreateDormitoryDto & { floorAssignments: FloorRoomAssignmentDto[] },
    files: { photos?: Express.Multer.File[] },
  ) {
    const existingDormitory = await this.prismaService.dormitory.findFirst({
      where: { name: dto.name },
    });
    if (existingDormitory) {
      throw new BadRequestException(
        `Dormitory with name "${dto.name}" already exists`,
      );
    }
    const photoUrls = files.photos
      ? await Promise.all(
        files.photos.map((file) =>
          this.s3Service.uploadFile(file, "dormitories"),
        ),
      )
      : [];

    return this.prismaService.$transaction(async (tx) => {


      const dormitory = await tx.dormitory.create({
        data: {
          name: dto.name,
          address: dto.address,
          groundFloorPhoneNumber: dto.groundFloorPhoneNumber,
          photos: photoUrls,
        },
      });



      for (const floorAssignment of dto.floorAssignments) {
        const floor = await tx.floor.create({
          data: {
            floorNumber: floorAssignment.floorNumber,
            dormitoryId: dormitory.id,
          },
        });
        


        for (const roomAssignment of floorAssignment.roomAssignments) {
          const roomType = await tx.roomType.findUnique({
            where: { id: roomAssignment.roomTypeId },
            select: {
              id: true,
              typeCode: true,
              capacity: true,
              equipment: true,
              photos: true, 
            },
          });
          if (!roomType) {
            throw new BadRequestException(
              `Room type ${roomAssignment.roomTypeId} not found`,
            );
          }
          await tx.floorRoomAssignment.create({
            data: {
              floorId: floor.id,
              roomTypeId: roomType.id,
              roomNumbers: roomAssignment.roomNumbers,
            },
          });
          const rooms = roomAssignment.roomNumbers.map((roomNumber) => ({
            number: `${floorAssignment.floorNumber}${roomNumber.toString().padStart(2, "0")}`,
            floorId: floor.id,
            capacity: roomType.capacity,
            dormitoryId: dormitory.id,
            roomEquipment: roomType.equipment,
            photos: roomType.photos || [], 
            roomTypeId: roomType.id,
          }));

          const result = await tx.room.createMany({ data: rooms });
        }
      }
      const result = await tx.dormitory.findUnique({
        where: { id: dormitory.id },
        include: {
          floors: {
            include: {
              rooms: {
                include: {
                  roomType: true,
                },
              },
              floorRoomAssignments: {
                include: {
                  roomType: true,
                },
              },
            },
            orderBy: { floorNumber: "asc" },
          },
        },
      });
      return result;
    });
  }

  async findAll() {
    const dormitories = await this.prismaService.dormitory.findMany({
      where: { status: 'Active' },
      orderBy: { name: 'asc' },
      include: {
        floors: {
          orderBy: { floorNumber: 'asc' },
          include: {
            rooms: {
              include: {
                residents: {
                  where: { isActive: true },
                },
              },
            },
          },
        },
        managers: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                email: true,
              },
            },
          },
        },
        admins: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    const enrichedDormitories = dormitories.map((dormitory) => {
      const floorCount = dormitory.floors.length;

      const allRooms = dormitory.floors.flatMap((floor) => floor.rooms);
      const roomCount = allRooms.length;
      const totalResidents = allRooms.reduce(
        (sum, room) => sum + room.residents.length,
        0,
      );

      const availableRooms = allRooms.filter(
        (room) => room.residents.length === 0,
      ).length;

      return {
        ...dormitory,
        floorCount,
        roomCount,
        totalResidents,
        availableRooms,
      };
    });

    return {
      data: enrichedDormitories,
      total: enrichedDormitories.length,
    };
  }



  async findDeactivated() {
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.dormitory.findMany({
        where: { status: "Deactivated" },
        orderBy: { name: "asc" },
        include: {
          _count: {
            select: {
              floors: true,
              rooms: true,
            },
          },
        },
      }),
      this.prismaService.dormitory.count({
        where: { status: "Deactivated" },
      }),
    ]);

    return {
      data: data.map((dormitory) => ({
        ...dormitory,
        floorCount: dormitory._count.floors,
        roomCount: dormitory._count.rooms,
      })),
      total,
    };
  }

  async findOne(id: string) {
    const dormitory = await this.prismaService.dormitory.findUnique({
      where: { id },
      include: {
        floors: {
          orderBy: { floorNumber: "asc" },
        },
        managers: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                email: true,
              },
            },
          },
        },
        admins: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!dormitory) {
      throw new NotFoundException(`Dormitory with ID ${id} not found`);
    }
    let rooms = await this.prismaService.room.findMany({
      where: { dormitoryId: id },
      include: {
        residents: true, // Include residents relation
      },
    });
    let residents = await this.prismaService.user.findMany({
      where: { dormitoryId: id },
    });


    // Calculate statistics
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter((room) => room.residents.length > 0).length;
    const availableRooms = totalRooms - occupiedRooms;
    const totalResidents = residents.length;
    const totalCapacity = rooms.reduce(
      (acc, room) => acc + room.capacity,
      0,
    );

    return {
      ...dormitory,
      statistics: {
        totalFloors: dormitory.floors.length,
        totalRooms,
        availableRooms,
        occupiedRooms,
        totalResidents,
        occupancyRate: totalCapacity > 0 ? totalResidents / totalCapacity : 0,
      },
    };
  }

  async activate(id: string) {
    const dormitory = await this.prismaService.dormitory.findUnique({
      where: { id },
    });

    if (!dormitory) {
      throw new NotFoundException(`Dormitory with ID ${id} not found`);
    }

    if (dormitory.status === "Active") {
      throw new BadRequestException("Dormitory is already active");
    }

    return this.prismaService.dormitory.update({
      where: { id },
      data: {
        status: "Active",
      },
    });
  }

  async update(id: string, dto: UpdateDormitoryDto) {
    const dormitory = await this.prismaService.dormitory.findUnique({
      where: { id },
    });

    if (!dormitory) {
      throw new NotFoundException(`Dormitory with ID ${id} not found`);
    }

    return this.prismaService.dormitory.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async deactivate(id: string) {
    const dormitory = await this.prismaService.dormitory.findUnique({
      where: { id },
    });

    if (!dormitory) {
      throw new NotFoundException(`Dormitory with ID ${id} not found`);
    }

    if (dormitory.status === "Deactivated") {
      throw new BadRequestException("Dormitory is already deactivated");
    }

    // Check for active residents
    const activeResidentsCount = await this.prismaService.user.count({
      where: {
        dormitoryId: id,
        isActive: true,
      },
    });

    if (activeResidentsCount > 0) {
      throw new BadRequestException(
        `Cannot deactivate dormitory with ${activeResidentsCount} active residents. Please relocate residents first.`,
      );
    }

    return this.prismaService.dormitory.update({
      where: { id },
      data: {
        status: "Deactivated",
      },
    });
  }

  /**
   * Get price information for a dormitory using the centralized pricing service
   */
  async getDormitoryPricing(dormitoryId: string) {
    return this.pricingService.getDormitoryRoomsPricing(dormitoryId);
  }

  /**
   * Enhanced findAll that includes pricing information
   */
  async findAllWithPricing() {
    const dormitories = await this.findAll();
    
    const enrichedDormitories = await Promise.all(
      dormitories.data.map(async (dormitory) => {
        try {
          const pricing = await this.getDormitoryPricing(dormitory.id);
          return {
            ...dormitory,
            pricing: {
              averagePricePerDay: pricing.averagePricePerDay,
              averagePricePerMonth: pricing.averagePricePerMonth,
              roomsWithPricing: pricing.roomsWithPricing,
              roomsWithoutPricing: pricing.roomsWithoutPricing,
              pricingSources: pricing.pricingSources,
            },
          };
        } catch (error) {
          console.error(`Error getting pricing for dormitory ${dormitory.id}:`, error);
          return {
            ...dormitory,
            pricing: {
              averagePricePerDay: 0,
              averagePricePerMonth: 0,
              roomsWithPricing: 0,
              roomsWithoutPricing: dormitory.roomCount,
              pricingSources: {},
            },
          };
        }
      }),
    );

    return {
      data: enrichedDormitories,
      total: enrichedDormitories.length,
    };
  }
}
