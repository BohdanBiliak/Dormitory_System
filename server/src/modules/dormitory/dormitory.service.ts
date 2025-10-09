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
      // Create the dormitory first
      const dormitory = await tx.dormitory.create({
        data: {
          ...rest,
          photos: photoUrls,
        },
      });

      // Create floors
      const floors: Prisma.FloorCreateManyInput[] = [];
      for (let floorNumber = 1; floorNumber <= roomGeneration.numberOfFloors; floorNumber++) {
        floors.push({
          floorNumber,
          dormitoryId: dormitory.id,
        });
      }

      await tx.floor.createMany({ data: floors });

      // Get the created floors
      const createdFloors = await tx.floor.findMany({
        where: { dormitoryId: dormitory.id },
        orderBy: { floorNumber: 'asc' }
      });

      // Create rooms
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

      for (let floorIndex = 0; floorIndex < createdFloors.length; floorIndex++) {
        const floor = createdFloors[floorIndex];

        for (let roomNumber = 1; roomNumber <= roomGeneration.roomsPerFloor; roomNumber++) {
          const roomIndex = floorIndex * roomGeneration.roomsPerFloor + (roomNumber - 1);

          // Distribute photos evenly across rooms, or assign random photos
          const assignedPhotos = this.distributePhotosToRooms(roomPhotoUrls, roomIndex, totalRooms);

          rooms.push({
            number: `${floor.floorNumber}${roomNumber.toString().padStart(2, "0")}`,
            floorId: floor.id,
            capacity: roomGeneration.roomCapacity || 2,
            dormitoryId: dormitory.id,
            roomEquipment,
            photos: assignedPhotos,
          });
        }
      }

      await tx.room.createMany({ data: rooms });

      // Create unique price entries to avoid duplicates
      const uniqueCapacities = new Set<number>();
      const savedRooms = await tx.room.findMany({
        where: { dormitoryId: dormitory.id },
        select: { capacity: true }
      });

      savedRooms.forEach(room => uniqueCapacities.add(room.capacity));

      // Create prices (capacity-based, not room-specific)
      const prices: Prisma.PriceCreateManyInput[] = Array.from(uniqueCapacities).map((capacity) => ({
        roomId: null, // Capacity-based pricing
        roomCapacity: capacity,
        pricePerMonth: roomGeneration.pricePerMonth,
        pricePerDay: roomGeneration.pricePerDay,
        dateFrom: new Date(),
        dateTo: null, // Open-ended pricing
      }));

      await tx.price.createMany({ data: prices });

      // Return dormitory with created floors and rooms for response
      return tx.dormitory.findUnique({
        where: { id: dormitory.id },
        include: {
          floors: {
            include: {
              rooms: {
                select: {
                  id: true,
                  number: true,
                  capacity: true,
                  roomEquipment: true,
                  photos: true,
                  floorId: true
                }
              }
            },
            orderBy: { floorNumber: 'asc' }
          }
        }
      });
    });
  }

  private distributePhotosToRooms(photoUrls: string[], roomIndex: number, totalRooms: number): string[] {
    if (!photoUrls.length) return [];

    // Simple distribution: cycle through photos
    const photosPerRoom = Math.max(1, Math.floor(photoUrls.length / totalRooms));
    const startIndex = (roomIndex * photosPerRoom) % photoUrls.length;

    const assignedPhotos: string[] = [];
    for (let i = 0; i < photosPerRoom && assignedPhotos.length < 3; i++) {
      const photoIndex = (startIndex + i) % photoUrls.length;
      assignedPhotos.push(photoUrls[photoIndex]);
    }

    return assignedPhotos;
  }

  async findAll() {
    const dormitories = await this.prismaService.dormitory.findMany({
      where: { status: 'Active' },
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: {
            floors: true,
            rooms: true,
            residents: {
              where: { isActive: true }
            }
          }
        }
      }
    });

    // Calculate availability statistics
    const enrichedDormitories = await Promise.all(
      dormitories.map(async (dormitory) => {
        const availableRoomsCount = await this.prismaService.room.count({
          where: {
            dormitoryId: dormitory.id,
            residents: {
              every: {
                isActive: false
              }
            }
          }
        });

        return {
          ...dormitory,
          floorCount: dormitory._count.floors,
          roomCount: dormitory._count.rooms,
          availableRooms: availableRoomsCount,
          totalResidents: dormitory._count.residents
        };
      })
    );

    return {
      data: enrichedDormitories,
      total: enrichedDormitories.length,
    };
  }

  async findDeactivated() {
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.dormitory.findMany({
        where: { status: 'Deactivated' },
        orderBy: { name: "asc" },
        include: {
          _count: {
            select: {
              floors: true,
              rooms: true
            }
          }
        }
      }),
      this.prismaService.dormitory.count({
        where: { status: 'Deactivated' },
      }),
    ]);

    return {
      data: data.map(dormitory => ({
        ...dormitory,
        floorCount: dormitory._count.floors,
        roomCount: dormitory._count.rooms
      })),
      total,
    };
  }

  async findOne(id: string) {
    const dormitory = await this.prismaService.dormitory.findUnique({
      where: { id },
      include: {
        floors: {
          include: {
            rooms: {
              include: {
                residents: {
                  select: {
                    id: true,
                    displayName: true,
                    email: true
                  },
                  where: { isActive: true }
                }
              }
            }
          },
          orderBy: { floorNumber: 'asc' }
        },
        manager: {
          select: {
            id: true,
            displayName: true,
            email: true
          }
        },
        admins: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                email: true
              }
            }
          }
        },
        residents: {
          select: {
            id: true,
            displayName: true,
            email: true,
            roomId: true
          },
          where: { isActive: true }
        }
      }
    });

    if (!dormitory) {
      throw new NotFoundException(`Dormitory with ID ${id} not found`);
    }

    // Calculate statistics
    const totalRooms = dormitory.floors.reduce((acc, floor) => acc + floor.rooms.length, 0);
    const occupiedRooms = dormitory.floors.reduce((acc, floor) => 
      acc + floor.rooms.filter(room => room.residents.length > 0).length, 0
    );
    const availableRooms = totalRooms - occupiedRooms;
    const totalResidents = dormitory.residents.length;
    const totalCapacity = dormitory.floors.reduce((acc, floor) => 
      acc + floor.rooms.reduce((roomAcc, room) => roomAcc + room.capacity, 0), 0
    );

    return {
      ...dormitory,
      statistics: {
        totalFloors: dormitory.floors.length,
        totalRooms,
        availableRooms,
        occupiedRooms,
        totalResidents,
        occupancyRate: totalCapacity > 0 ? totalResidents / totalCapacity : 0
      }
    };
  }
  
  async activate(id: string) {
    const dormitory = await this.prismaService.dormitory.findUnique({
      where: { id },
    });

    if (!dormitory) {
      throw new NotFoundException(`Dormitory with ID ${id} not found`);
    }

    if (dormitory.status === 'Active') {
      throw new BadRequestException('Dormitory is already active');
    }

    return this.prismaService.dormitory.update({
      where: { id },
      data: { 
        status: 'Active'
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
        ...dto
      }
    });
  }

  async deactivate(id: string) {
    const dormitory = await this.prismaService.dormitory.findUnique({
      where: { id },
    });

    if (!dormitory) {
      throw new NotFoundException(`Dormitory with ID ${id} not found`);
    }

    if (dormitory.status === 'Deactivated') {
      throw new BadRequestException('Dormitory is already deactivated');
    }

    // Check for active residents
    const activeResidentsCount = await this.prismaService.user.count({
      where: { 
        dormitoryId: id,
        isActive: true
      },
    });

    if (activeResidentsCount > 0) {
      throw new BadRequestException(
        `Cannot deactivate dormitory with ${activeResidentsCount} active residents. Please relocate residents first.`
      );
    }

    return this.prismaService.dormitory.update({
      where: { id },
      data: { 
        status: 'Deactivated'
      },
    });
  }
}