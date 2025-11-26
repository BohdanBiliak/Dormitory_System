import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { Room, Prisma, $Enums } from "@prisma/client";
import { AvailableRoomsDto } from "./dto/availableRooms.dto";

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
    floor: {
      select: {
        id: true;
        floorNumber: true;
        dormitoryId: true;
      };
    };
    statuses: true;
    priceCategory: {
      select: {
        id: true;
        name: true;
        pricePerDay: true;
        pricePerMonth: true;
      };
    };
  };
}>;

export interface UpdateRoomData {
  number?: string;
  floorId?: string; 
  capacity?: number;
  roomEquipment?: string[];
  photos?: string[];
  priceCategoryId?: string | null;
  updatedAt?: Date;
}

@Injectable()
export class RoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(dormitoryIds?: string[]): Promise<RoomWithRelations[]> {
    return this.prisma.room.findMany({
      where: dormitoryIds
        ? {
            dormitoryId: { in: dormitoryIds },
          }
        : {},
      include: {
        residents: {
          select: {
            id: true,
            displayName: true,
            secondName: true,
            email: true,
          },
        },
        dormitory: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        floor: {
          select: {
            id: true,
            floorNumber: true,
            dormitoryId: true,
          },
        },
        statuses: true,
        priceCategory: {
          select: {
            id: true,
            name: true,
            pricePerDay: true,
            pricePerMonth: true,
          },
        },
      },
    });
  }

  async findStatusesByUserAndRoom(userId: string, roomId: string) {
    return this.prisma.roomStatus.findMany({
      where: {
        roomId: roomId,
      },
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
            email: true,
          },
        },
        dormitory: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        floor: {
          select: {
            id: true,
            floorNumber: true,
            dormitoryId: true,
          },
        },
        statuses: true,
        priceCategory: {
          select: {
            id: true,
            name: true,
            pricePerDay: true,
            pricePerMonth: true,
          },
        },
      },
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
            email: true,
          },
        },
        dormitory: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        floor: {
          select: {
            id: true,
            floorNumber: true,
            dormitoryId: true,
          },
        },
        statuses: true,
        priceCategory: {
          select: {
            id: true,
            name: true,
            pricePerDay: true,
            pricePerMonth: true,
          },
        },
      },
    });
  }

  async findByNumber(
    number: string,
    floorId?: string,
    excludeId?: string,
  ): Promise<Room | null> {
    return this.prisma.room.findFirst({
      where: {
        number,
        ...(floorId && { floorId }),
        ...(excludeId && { id: { not: excludeId } }),
      },
    });
  }

  async findAvailableRooms(dto: AvailableRoomsDto) {
    const fromDate = new Date(dto.from);
    const toDate = new Date(dto.to);
    toDate.setHours(23, 59, 59, 999);

    const rooms = await this.prisma.room.findMany({
      where: {
        ...(dto.dormitoryId && { dormitoryId: dto.dormitoryId }),
        statuses: {
          none: {
            AND: [
              { dateOfStart: { lt: toDate } },
              {
                OR: [{ dateOfEnd: { gt: fromDate } }, { dateOfEnd: null }],
              },
            ],
          },
        },
      },
      include: {
        residents: {
          select: {
            id: true,
            displayName: true,
            secondName: true,
            email: true,
          },
        },
        dormitory: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        floor: {
          select: {
            id: true,
            floorNumber: true,
            dormitoryId: true,
          },
        },
        statuses: true,
        priceCategory: {
          select: {
            id: true,
            name: true,
            pricePerDay: true,
            pricePerMonth: true,
          },
        },
      },
    });

    const availableRooms = rooms.filter(
      (room) => room.residents.length < room.capacity,
    );

    const capacityPriceMap = new Map<
      string,
      { pricePerDay: number; pricePerMonth: number }
    >();
    const prices = await this.findPrices({ from: fromDate, to: toDate });
    prices.forEach((price) => {
      capacityPriceMap.set(String(price.roomCapacity), {
        pricePerDay: price.pricePerDay,
        pricePerMonth: price.pricePerMonth,
      });
    });

    return Promise.all(
      availableRooms.map(async (room) => {
        const price =
          capacityPriceMap.get(String(room.capacity)) ||
          (await this.findPriceByCapacity(room.capacity));
        return {
          ...room,
          isAvailable: true,
          price,
        };
      }),
    );
  }

  async countOccupants(roomId: string): Promise<number> {
    return this.prisma.user.count({
      where: {
        roomId,
        isActive: true,
      },
    });
  }

  async update(id: string, data: UpdateRoomData) {
    return this.prisma.room.update({
      where: { id },
      data: {
        ...(data.number && { number: data.number }),
        ...(data.floorId && { floor: { connect: { id: data.floorId } } }),
        ...(data.capacity && { capacity: data.capacity }),
        ...(data.roomEquipment && {
          roomEquipment: { set: data.roomEquipment },
        }),
        ...(data.photos && { photos: { set: data.photos } }),
       ...(data.priceCategoryId && {
      priceCategory: { connect: { id: data.priceCategoryId } },
}),



      },
      include: {
        residents: {
          select: {
            id: true,
            displayName: true,
            secondName: true,
            email: true,
          },
        },
        dormitory: { select: { id: true, name: true, address: true } },
        floor: { select: { id: true, floorNumber: true, dormitoryId: true } },
        statuses: true,
        priceCategory: {
          select: {
            id: true,
            name: true,
            pricePerDay: true,
            pricePerMonth: true,
          },
        },
      },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.room.count({
      where: { id },
    });
    return count > 0;
  }

  async isRoomNumberUnique(
    number: string,
    floorId: string,
    excludeId?: string,
  ): Promise<boolean> {
    const existingRoom = await this.findByNumber(number, floorId, excludeId);
    return !existingRoom;
  }

  async getRoomStatistics(roomId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: {
        _count: {
          select: {
            residents: {
              where: { isActive: true },
            },
          },
        },
      },
    });

    if (!room) return null;

    return {
      occupancyCount: room._count.residents,
      capacity: room.capacity,
      isAvailable: room._count.residents < room.capacity,
      occupancyPercentage: Math.round(
        (room._count.residents / room.capacity) * 100,
      ),
      availableSpots: room.capacity - room._count.residents,
    };
  }

  // Floor-related methods
  async findFloorById(floorId: string) {
    return this.prisma.floor.findUnique({
      where: { id: floorId },
      include: {
        dormitory: {
          select: {
            id: true,
            name: true,
          },
        },
        rooms: {
          select: {
            id: true,
            number: true,
            capacity: true,
          },
        },
      },
    });
  }

  async findFloorsByDormitory(dormitoryId: string) {
    return this.prisma.floor.findMany({
      where: { dormitoryId },
      orderBy: { floorNumber: "asc" },
      include: {
        rooms: {
          select: {
            id: true,
            number: true,
            capacity: true,
            residents: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
  }

  // ...existing code...
  async createRoomStatus(roomId: string, data: any) {
    return this.prisma.roomStatus.create({
      data: {
        roomId,
        ...data,
      },
    });
  }

  async deleteRoomStatus(roomId: string, statusId: string) {
    const status = await this.prisma.roomStatus.findUnique({
      where: { id: statusId },
    });
    if (!status || status.roomId !== roomId) {
      throw new NotFoundException("RoomStatus not found for this room");
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
      role: roomId ? $Enums.UserRole.Resident : $Enums.UserRole.SignedInUser,
      ...(data.startDate !== undefined
        ? { startReservationDate: data.startDate }
        : {}),
      ...(data.endDate !== undefined
        ? { endReservationDate: data.endDate }
        : {}),
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
            dateOfEnd: { gte: fromDate },
          },
        ],
      },
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
            dateTo: { gte: dateRange.from },
          },
          {
            dateFrom: { lte: dateRange.to },
            dateTo: null,
          },
        ],
      },
    });
  }

  async findPriceByCapacity(capacity: number, date: Date = new Date()) {
    return this.prisma.price.findFirst({
      where: {
        roomCapacity: capacity,
        OR: [
          {
            dateFrom: { lte: date },
            dateTo: { gte: date },
          },
          {
            dateFrom: { lte: date },
            dateTo: null,
          },
        ],
      },
      orderBy: {
        dateFrom: "desc",
      },
    });
  }

  async findDormitoryAdmins(dormitoryId: string) {
    return this.prisma.dormitoryAdmin.findMany({
      where: { dormitoryId },
      include: { user: true },
    });
  }

  async findUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async endUserRoomStatuses(userId: string, roomId: string) {
    return this.prisma.roomStatus.updateMany({
      where: {
        roomId,
        description: {
          contains: userId,
        },
        dateOfEnd: null,
      },
      data: {
        dateOfEnd: new Date(),
      },
    });
  }

  async findRoomWithPricing(roomId: string): Promise<any> {
    return this.prisma.room.findUnique({
      where: { id: roomId },
      include: {
        priceCategory: true,
        roomType: {
          include: {
            priceCategory: true,
          },
        },
        dormitory: true,
      },
    });
  }
}
