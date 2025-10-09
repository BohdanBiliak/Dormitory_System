import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateDormitoryDto } from "@/modules/dormitory/dto/create-dormitory.dto";
import { UpdateDormitoryDto } from "@/modules/dormitory/dto/update-dormitory.dto";
import { S3Service } from "@/libs/common/s3/s3.service";
import { FloorRoomAssignmentDto } from "./dto/room-assignment.dto";

@Injectable()
export class DormitoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service,
  ) { }

  async create(
  dto: CreateDormitoryDto & { floorAssignments: FloorRoomAssignmentDto[] },
  files: { photos?: Express.Multer.File[], roomPhotos?: Express.Multer.File[] }
) {
  // Add debugging logs
  console.log('=== DORMITORY CREATION DEBUG ===');
  console.log('DTO received:', JSON.stringify(dto, null, 2));
  console.log('Floor assignments count:', dto.floorAssignments?.length);
  
  dto.floorAssignments?.forEach((floor, floorIndex) => {
    console.log(`Floor ${floorIndex + 1}:`, {
      floorNumber: floor.floorNumber,
      roomAssignmentsCount: floor.roomAssignments?.length
    });
    
    floor.roomAssignments?.forEach((roomAssignment, roomIndex) => {
      console.log(`  Room assignment ${roomIndex + 1}:`, {
        roomTypeId: roomAssignment.roomTypeId,
        roomNumbers: roomAssignment.roomNumbers,
        roomNumbersType: typeof roomAssignment.roomNumbers,
        roomNumbersLength: Array.isArray(roomAssignment.roomNumbers) ? roomAssignment.roomNumbers.length : 'not array'
      });
    });
  });

  const existingDormitory = await this.prismaService.dormitory.findFirst({
    where: { name: dto.name },
  });

  if (existingDormitory) {
    throw new BadRequestException(`Dormitory with name "${dto.name}" already exists`);
  }

  // Upload photos
  const photoUrls = files.photos
    ? await Promise.all(
      files.photos.map((file) => this.s3Service.uploadFile(file, "dormitories"))
    )
    : [];

  const roomPhotoUrls = files.roomPhotos
    ? await Promise.all(
      files.roomPhotos.map((file) => this.s3Service.uploadFile(file, "rooms"))
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

    console.log('Dormitory created:', dormitory.id);

    // Create floors and rooms based on assignments
    for (const floorAssignment of dto.floorAssignments) {
      console.log(`Creating floor ${floorAssignment.floorNumber}`);
      
      // Create floor
      const floor = await tx.floor.create({
        data: {
          floorNumber: floorAssignment.floorNumber,
          dormitoryId: dormitory.id,
        }
      });

      console.log(`Floor created with ID: ${floor.id}`);

      // Process room assignments for this floor
      for (const roomAssignment of floorAssignment.roomAssignments) {
        console.log(`Processing room assignment:`, {
          roomTypeId: roomAssignment.roomTypeId,
          roomNumbers: roomAssignment.roomNumbers
        });

        // Get room type details
        const roomType = await tx.roomType.findUnique({
          where: { id: roomAssignment.roomTypeId }
        });

        if (!roomType) {
          throw new BadRequestException(`Room type ${roomAssignment.roomTypeId} not found`);
        }

        console.log(`Room type found:`, {
          id: roomType.id,
          typeCode: roomType.typeCode,
          capacity: roomType.capacity
        });

        // Create floor room assignment record
        await tx.floorRoomAssignment.create({
          data: {
            floorId: floor.id,
            roomTypeId: roomType.id,
            roomNumbers: roomAssignment.roomNumbers,
          }
        });

        console.log('Floor room assignment created');

        // Create individual rooms
        const rooms = roomAssignment.roomNumbers.map(roomNumber => ({
          number: `${floorAssignment.floorNumber}${roomNumber.toString().padStart(2, '0')}`,
          floorId: floor.id,
          capacity: roomType.capacity,
          dormitoryId: dormitory.id,
          roomEquipment: roomType.equipment,
          photos: this.assignPhotosToRoom(roomPhotoUrls, roomType.typeCode),
          roomTypeId: roomType.id,
        }));

        console.log(`Creating ${rooms.length} rooms:`, rooms.map(r => r.number));
        
        const result = await tx.room.createMany({ data: rooms });
        console.log(`Rooms created successfully, count: ${result.count}`);
      }
    }

    // Create pricing
    const uniqueCapacities = new Set<number>();
    for (const floorAssignment of dto.floorAssignments) {
      for (const roomAssignment of floorAssignment.roomAssignments) {
        const roomType = await tx.roomType.findUnique({
          where: { id: roomAssignment.roomTypeId },
          select: { capacity: true }
        });
        if (roomType) {
          uniqueCapacities.add(roomType.capacity);
        }
      }
    }

    const prices = Array.from(uniqueCapacities).map((capacity) => ({
      roomId: null,
      roomCapacity: capacity,
      pricePerMonth: +dto.pricePerMonth,
      pricePerDay: +dto.pricePerDay,
      dateFrom: new Date(),
      dateTo: null,
    }));

    await tx.price.createMany({ data: prices });

    console.log('Pricing created');

    // Return dormitory with created structure
    const result = await tx.dormitory.findUnique({
      where: { id: dormitory.id },
      include: {
        floors: {
          include: {
            rooms: {
              include: {
                roomType: true
              }
            },
            floorRoomAssignments: {
              include: {
                roomType: true
              }
            }
          },
          orderBy: { floorNumber: 'asc' }
        }
      }
    });

    console.log('Final result floors:', result?.floors?.length);
    console.log('Total rooms created:', result?.floors?.reduce((acc, floor) => acc + floor.rooms.length, 0));
    console.log('=== END DEBUG ===');

    return result;
  });
}
   private assignPhotosToRoom(photoUrls: string[], typeCode: string): string[] {
    if (!photoUrls.length) return [];
    
    // Simple assignment based on type code
    const maxPhotos = 3;
    const startIndex = typeCode.charCodeAt(0) % photoUrls.length;
    
    const assigned: string[] = [];
    for (let i = 0; i < Math.min(maxPhotos, photoUrls.length); i++) {
      const index = (startIndex + i) % photoUrls.length;
      assigned.push(photoUrls[index]);
    }
    
    return assigned;
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