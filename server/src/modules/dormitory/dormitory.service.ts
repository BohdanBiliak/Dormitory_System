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
    files: { photos?: Express.Multer.File[] }, // Removed roomPhotos since we'll use room type photos
  ) {
    // Add debugging logs
    console.log("=== DORMITORY CREATION DEBUG ===");
    console.log("DTO received:", JSON.stringify(dto, null, 2));
    console.log("Floor assignments count:", dto.floorAssignments?.length);

    dto.floorAssignments?.forEach((floor, floorIndex) => {
      console.log(`Floor ${floorIndex + 1}:`, {
        floorNumber: floor.floorNumber,
        roomAssignmentsCount: floor.roomAssignments?.length,
      });

      floor.roomAssignments?.forEach((roomAssignment, roomIndex) => {
        console.log(`  Room assignment ${roomIndex + 1}:`, {
          roomTypeId: roomAssignment.roomTypeId,
          roomNumbers: roomAssignment.roomNumbers,
          roomNumbersType: typeof roomAssignment.roomNumbers,
          roomNumbersLength: Array.isArray(roomAssignment.roomNumbers)
            ? roomAssignment.roomNumbers.length
            : "not array",
        });
      });
    });

    const existingDormitory = await this.prismaService.dormitory.findFirst({
      where: { name: dto.name },
    });

    if (existingDormitory) {
      throw new BadRequestException(
        `Dormitory with name "${dto.name}" already exists`,
      );
    }

    // Upload dormitory photos only
    const photoUrls = files.photos
      ? await Promise.all(
        files.photos.map((file) =>
          this.s3Service.uploadFile(file, "dormitories"),
        ),
      )
      : [];

    return this.prismaService.$transaction(async (tx) => {
      // Create the dormitory
      const dormitory = await tx.dormitory.create({
        data: {
          name: dto.name,
          address: dto.address,
          groundFloorPhoneNumber: dto.groundFloorPhoneNumber,
          photos: photoUrls,
        },
      });

      console.log("Dormitory created:", dormitory.id);

      // Create floors and rooms based on assignments
      for (const floorAssignment of dto.floorAssignments) {
        console.log(`Creating floor ${floorAssignment.floorNumber}`);

        // Create floor
        const floor = await tx.floor.create({
          data: {
            floorNumber: floorAssignment.floorNumber,
            dormitoryId: dormitory.id,
          },
        });

        console.log(`Floor created with ID: ${floor.id}`);

        // Process room assignments for this floor
        for (const roomAssignment of floorAssignment.roomAssignments) {
          console.log(`Processing room assignment:`, {
            roomTypeId: roomAssignment.roomTypeId,
            roomNumbers: roomAssignment.roomNumbers,
          });

          // Get room type details INCLUDING PHOTOS
          const roomType = await tx.roomType.findUnique({
            where: { id: roomAssignment.roomTypeId },
            select: {
              id: true,
              typeCode: true,
              capacity: true,
              equipment: true,
              photos: true, // Include photos from room type
            },
          });

          if (!roomType) {
            throw new BadRequestException(
              `Room type ${roomAssignment.roomTypeId} not found`,
            );
          }

          console.log(`Room type found:`, {
            id: roomType.id,
            typeCode: roomType.typeCode,
            capacity: roomType.capacity,
            photosCount: roomType.photos?.length || 0,
          });

          // Create floor room assignment record
          await tx.floorRoomAssignment.create({
            data: {
              floorId: floor.id,
              roomTypeId: roomType.id,
              roomNumbers: roomAssignment.roomNumbers,
            },
          });

          console.log("Floor room assignment created");

          // Create individual rooms using room type photos
          const rooms = roomAssignment.roomNumbers.map((roomNumber) => ({
            number: `${floorAssignment.floorNumber}${roomNumber.toString().padStart(2, "0")}`,
            floorId: floor.id,
            capacity: roomType.capacity,
            dormitoryId: dormitory.id,
            roomEquipment: roomType.equipment,
            photos: roomType.photos || [], // Use room type photos directly
            roomTypeId: roomType.id,
          }));

          console.log(
            `Creating ${rooms.length} rooms:`,
            rooms.map((r) => ({
              number: r.number,
              photosCount: r.photos.length,
            })),
          );

          const result = await tx.room.createMany({ data: rooms });
          console.log(`Rooms created successfully, count: ${result.count}`);
        }
      }

      console.log("Rooms and floors created successfully");

      // Return dormitory with created structure
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

      console.log("Final result floors:", result?.floors?.length);
      console.log(
        "Total rooms created:",
        result?.floors?.reduce((acc, floor) => acc + floor.rooms.length, 0),
      );
      console.log("=== END DEBUG ===");

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
