import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Room, Prisma, $Enums } from '../../../../__generated__';
import { AvailableRoomsDto } from '../dto/availableRooms.dto';
export type RoomWithRelations = Prisma.RoomGetPayload<{
  include: {
    residents: {
      select: {
        id: true;
        displayName: true;
        secondName: true;
        email: true;
      };
    };
    dormitory: {
      select: {
        id: true;
        name: true;
        address: true;
      };
    };
    statuses: true;
  };
}>;

export interface UpdateRoomData {
  number?: string;
  floor?: number;
  capacity?: number;
  roomEquipment?: string[];
  photos?: string[];
  updatedAt?: Date;
}

@Injectable()
export class RoomRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(dormitoryIds?: string[]): Promise<RoomWithRelations[]> {
    return this.prisma.room.findMany({
      where: dormitoryIds ? {
        dormitoryId: { in: dormitoryIds }
      } : {},
      include: {
        residents: {
          select: {
            id: true,
            displayName: true,
            secondName: true,
            email: true
          }
        },
        dormitory: {
          select: {
            id: true,
            name: true,
            address: true
          }
        },
        statuses: true
      }
    });
  }
  async findStatusesByUserAndRoom(userId: string, roomId: string) {
    return this.prisma.roomStatus.findMany({
      where: {
        roomId: roomId,
      }
    });
  }

  async findById(id: string): Promise<RoomWithRelations | null> {
    return this.prisma.room.findUnique({
      where: { id },
      include: {
        residents: {
          select: {
            id: true,
            displayName: true,
            secondName: true,
            email: true
          }
        },
        dormitory: {
          select: {
            id: true,
            name: true,
            address: true
          }
        },
        statuses: true
      }
    });
  }

  async findByIdOrThrow(id: string): Promise<RoomWithRelations> {
    return this.prisma.room.findUniqueOrThrow({
      where: { id },
      include: {
        residents: {
          select: {
            id: true,
            displayName: true,
            secondName: true,
            email: true
          }
        },
        dormitory: {
          select: {
            id: true,
            name: true,
            address: true
          }
        },
        statuses: true
      }
    });
  }

  async findByNumber(number: string, excludeId?: string): Promise<Room | null> {
    return this.prisma.room.findFirst({
      where: {
        number,
        ...(excludeId && { id: { not: excludeId } })
      }
    });
  }

  async findAvailableRooms(dto: AvailableRoomsDto) {
    // Парсимо дати і підганяємо кінець дня для 'to'
    const fromDate = new Date(dto.from);
    const toDate = new Date(dto.to);
    toDate.setHours(23, 59, 59, 999);

    // Отримуємо всі кімнати (з фільтром по гуртожитку, якщо є)
    const rooms = await this.prisma.room.findMany({
      where: {
        ...(dto.dormitoryId && { dormitoryId: dto.dormitoryId }),
        statuses: {
          none: {
            AND: [
              { dateOfStart: { lt: toDate } },
              {
                OR: [
                  { dateOfEnd: { gt: fromDate } },
                  { dateOfEnd: null }
                ]
              }
            ]
          }
        }
      },
      include: {
        residents: {
          select: {
            id: true,
            displayName: true,
            secondName: true,
            email: true
          }
        },
        dormitory: {
          select: {
            id: true,
            name: true,
            address: true
          }
        },
        statuses: true
      }
    });

    const availableRooms = rooms.filter(room => room.residents.length < room.capacity);

    const capacityPriceMap = new Map<string, { pricePerDay: number; pricePerMonth: number }>();
    const prices = await this.findPrices({ from: fromDate, to: toDate });
    prices.forEach(price => {
      capacityPriceMap.set(String(price.roomCapacity), {
        pricePerDay: price.pricePerDay,
        pricePerMonth: price.pricePerMonth
      });
    });

    return Promise.all(
      availableRooms.map(async room => {
        const price = capacityPriceMap.get(String(room.capacity)) || await this.findPriceByCapacity(room.capacity);
        return {
          ...room,
          isAvailable: true,
          price
        };
      })
    );
  }



  async countOccupants(roomId: string): Promise<number> {
    return this.prisma.user.count({
      where: {
        roomId,
        isActive: true
      }
    });
  }

  async update(id: string, data: UpdateRoomData): Promise<RoomWithRelations> {
    return this.prisma.room.update({
      where: { id },
      data: {
        ...(data.number && { number: data.number }),
        ...(data.floor && { floor: data.floor }),
        ...(data.capacity && { capacity: data.capacity }),
        ...(data.roomEquipment && { roomEquipment: data.roomEquipment }),
        ...(data.photos && { photos: data.photos })
      },
      include: {
        residents: {
          select: { id: true, displayName: true, secondName: true, email: true }
        },
        dormitory: { select: { id: true, name: true, address: true } },
        statuses: true
      }
    });
  }


  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.room.count({
      where: { id }
    });
    return count > 0;
  }

  async isRoomNumberUnique(number: string, excludeId?: string): Promise<boolean> {
    const existingRoom = await this.findByNumber(number, excludeId);
    return !existingRoom;
  }

  async getRoomStatistics(roomId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: {
        _count: {
          select: {
            residents: {
              where: { isActive: true }
            }
          }
        }
      }
    });

    if (!room) return null;

    return {
      occupancyCount: room._count.residents,
      capacity: room.capacity,
      isAvailable: room._count.residents < room.capacity,
      occupancyPercentage: Math.round((room._count.residents / room.capacity) * 100),
      availableSpots: room.capacity - room._count.residents
    };
  }

  // Original methods for existing functionality
  async createRoomStatus(roomId: string, data: any) {
    return this.prisma.roomStatus.create({
      data: {
        roomId,
        ...data
      }
    });
  }

  async deleteRoomStatus(roomId: string, statusId: string) {
    const status = await this.prisma.roomStatus.findUnique({
      where: { id: statusId },
    });
    if (!status || status.roomId !== roomId) {
      throw new NotFoundException('RoomStatus not found for this room');
    }

    return this.prisma.roomStatus.delete({
      where: { id: statusId },
    });
  }

  async updateUserRoom(
    userId: string,
    roomId: string | null,
    data: { startDate?: Date; endDate?: Date } = {},
  ) {
    const updatePayload: Prisma.UserUpdateInput = {
      room: roomId ? { connect: { id: roomId } } : { disconnect: true },
      ...(data.startDate !== undefined ? { startReservationDate: data.startDate } : {}),
      ...(data.endDate !== undefined ? { endReservationDate: data.endDate } : {}),
    };

    return this.prisma.user.update({
      where: { id: userId },
      data: updatePayload,
    });
  }

  async findRoomStatus(roomId: string, fromDate: Date, toDate: Date) {
    return this.prisma.roomStatus.findFirst({
      where: {
        roomId,
        OR: [
          {
            dateOfStart: { lte: toDate },
            dateOfEnd: { gte: fromDate }
          }
        ]
      }
    });
  }

  async createBooking(data: any) {
    return this.prisma.booking.create({ data });
  }

  async createConfirmation(data: any) {
    return this.prisma.confirmation.create({ data });
  }

  async createPrice(data: any) {
    return this.prisma.price.create({ data });
  }

  async findPrices(dateRange: { from: Date; to: Date }) {
    return this.prisma.price.findMany({
      where: {
        OR: [
          {
            dateFrom: { lte: dateRange.to },
            dateTo: { gte: dateRange.from }
          },
          {
            dateFrom: { lte: dateRange.to },
            dateTo: null
          }
        ]
      }
    });
  }

  async findPriceByCapacity(capacity: number, date: Date = new Date()) {
    return this.prisma.price.findFirst({
      where: {
        roomCapacity: capacity,
        OR: [
          {
            dateFrom: { lte: date },
            dateTo: { gte: date }
          },
          {
            dateFrom: { lte: date },
            dateTo: null
          }
        ]
      },
      orderBy: {
        dateFrom: 'desc'
      }
    });
  }

  async findDormitoryAdmins(dormitoryId: string) {
    return this.prisma.dormitoryAdmin.findMany({
      where: { dormitoryId },
      include: { user: true }
    });
  }

  async findUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId }
    });
  }
  async endUserRoomStatuses(userId: string, roomId: string) {
    return this.prisma.roomStatus.updateMany({
      where: {
        roomId,
        description: {
          contains: userId
        },
        dateOfEnd: null
      },
      data: {
        dateOfEnd: new Date()
      }
    });
  }
}