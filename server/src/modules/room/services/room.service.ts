import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { $Enums, User } from "../../../../__generated__";
import { AvailableRoomsDto } from "@/modules/room/dto/availableRooms.dto";
import { BookRoomDto } from "@modules/room/dto/book-room.dto";
import { RequestAccommmodationDto } from "@/modules/room/dto/requestAccommmodation.dto";
import { RequestMoveOutDto } from "@modules/room/dto/request-moveout.dto";
import { CreateRoomStatusDto } from "@modules/room/dto/create-room-status.dto";
import { SetPriceDto } from "@modules/room/dto/set-price.dto";
import { AuditService } from "@modules/audit/audit.service";
import { NotificationsService } from "@modules/notifications/notifications.service"

@Injectable()
export class RoomService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly auditService: AuditService,
    private readonly notificationService: NotificationsService,
  ) {}

  async findAll(user: User) {
    let rooms;

    if (user.role === $Enums.UserRole.Admin) {
      rooms = await this.prismaService.room.findMany({
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
              name: true
            }
          }
        }
      });
    } else {
      const assignments = await this.prismaService.dormitoryAdmin.findMany({
        where: { userId: user.id },
        select: { dormitoryId: true },
      });

      rooms = await this.prismaService.room.findMany({
        where: {
          dormitoryId: { in: assignments.map((a) => a.dormitoryId) },
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
              name: true
            }
          }
        }
      });
    }
    
    // Add price information to each room
    return await Promise.all(rooms.map(async (room) => {
      const price = await this.getRoomPriceByCapacity(room.capacity);
      return {
        ...room,
        price
      };
    }));
  }

  async findOne(id: string) {
    const room = await this.prismaService.room.findUniqueOrThrow({ 
      where: { id },
      include: {
        statuses: true,
        dormitory: {
          select: {
            id: true,
            name: true,
            address: true
          }
        },
        residents: {
          select: {
            id: true,
            displayName: true,
            secondName: true,
            email: true
          }
        }
      }
    });

    // Add price information
    const price = await this.getRoomPriceByCapacity(room.capacity);
    
    return {
      ...room,
      price
    };
  }

  async findAvailableRooms(dto: AvailableRoomsDto) {
    const from = new Date(dto.from);
    const to = new Date(dto.to);

    const rooms = await this.prismaService.room.findMany({
      where: dto.dormitoryId ? { dormitoryId: dto.dormitoryId } : {},
      include: {
        statuses: true,
        dormitory: true,
        residents: {
          select: {
            id: true,
            displayName: true,
            secondName: true,
            email: true
          }
        }
      },
    });

    // Get current prices for each room capacity
    const capacityPriceMap = new Map();
    const prices = await this.prismaService.price.findMany({
      where: {
        OR: [
          {
            dateFrom: { lte: to },
            dateTo: { gte: from }
          },
          {
            dateFrom: { lte: to },
            dateTo: null
          }
        ]
      }
    });

    // Create a map of capacity to price
    prices.forEach(price => {
      capacityPriceMap.set(price.roomCapacity, {
        pricePerDay: price.pricePerDay,
        pricePerMonth: price.pricePerMonth
      });
    });

    return Promise.all(rooms.map(async (room) => {
      const isAvailable = !room.statuses.some(
        (status) =>
          !(
            new Date(status.dateOfEnd ?? new Date(9999, 1, 1)) <= from ||
            new Date(status.dateOfStart) >= to
          ),
      ) && room.residents.length < room.capacity;

      // Get price for this room capacity
      const price = capacityPriceMap.get(room.capacity) || 
        await this.getRoomPriceByCapacity(room.capacity);

      return {
        ...room,
        isAvailable,
        price
      };
    }));
  }

  async getRoomPriceByCapacity(capacity: number) {
    const now = new Date();
    
    // Find the most recent price for this capacity
    const price = await this.prismaService.price.findFirst({
      where: {
        roomCapacity: capacity,
        OR: [
          {
            dateFrom: { lte: now },
            dateTo: { gte: now }
          },
          {
            dateFrom: { lte: now },
            dateTo: null
          }
        ]
      },
      orderBy: {
        dateFrom: 'desc'
      }
    });

    // If no specific price for this capacity, return the default price
    if (!price) {
      return {
        pricePerDay: 0,
        pricePerMonth: 0,
        note: 'No price configured for this room capacity'
      };
    }

    return {
      pricePerDay: price.pricePerDay,
      pricePerMonth: price.pricePerMonth
    };
  }

  async bookRoom(dto: BookRoomDto, userId: string) {
    const room = await this.prismaService.room.findUnique({
      where: { id: dto.roomId },
      include: { 
        statuses: true, 
        dormitory: true,
        residents: true 
      },
    });

    if (!room) throw new NotFoundException("Room not found");
    
    // Check if room has capacity
    if (room.residents.length >= room.capacity) {
      throw new ConflictException("Room is already at full capacity");
    }

    const from = new Date(dto.from);
    const to = new Date(dto.to);

    const msInDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor((to.getTime() - from.getTime()) / msInDay);

    if (diffDays < 1) {
      throw new BadRequestException("Booking must be at least 1 night long");
    }

    const isTaken = room.statuses.some(
      (status) =>
        !(
          new Date(status.dateOfEnd ?? new Date(9999, 1, 1)) <= from ||
          new Date(status.dateOfStart) >= to
        ),
    );

    if (isTaken)
      throw new ConflictException("Room already booked or unavailable");

    // Get price for this room
    const price = await this.getRoomPriceByCapacity(room.capacity);
    const totalAmount = diffDays <= 30 
      ? diffDays * price.pricePerDay 
      : price.pricePerMonth * (diffDays / 30);

    const booking = await this.prismaService.booking.create({
      data: {
        userId,
        roomId: room.id,
        status: 'PENDING',
        checkInDate: from,
        checkOutDate: to,
        totalAmount,
        notes: `Direct booking by user`,
      },
    });

    const roomStatus = await this.prismaService.roomStatus.create({
      data: {
        roomId: room.id,
        dateOfStart: from,
        dateOfEnd: to,
        description: `Booking by user ${userId}`,
      },
    });

    await this.prismaService.user.update({
      where: { id: userId },
      data: { roomId: room.id },
    });

    try {
      await this.notificationService.createNotification({
        toUserId: String(userId),
        type: $Enums.NotificationType.ROOM_BOOKING_APPROVED,
        title: 'Room Booking Confirmed',
        message: `Your booking for room ${room.number} in ${room.dormitory?.name || 'Unknown Dormitory'} has been confirmed for ${from.toDateString()} to ${to.toDateString()}`,
        bookingId: String(booking.id), 
        roomId: String(room.id),
      });

      // Notify dormitory admins
      const dormitoryAdmins = await this.prismaService.dormitoryAdmin.findMany({
        where: { dormitoryId: room.dormitoryId },
        include: { user: true },
      });

      for (const admin of dormitoryAdmins) {
        await this.notificationService.createNotification({
          toUserId: admin.userId, 
          fromUserId: userId, 
          type: $Enums.NotificationType.ROOM_BOOKING_REQUEST,
          title: 'New Room Booking',
          message: `Room ${room.number} has been booked by a student for ${from.toDateString()} to ${to.toDateString()}`,
          bookingId: booking.id, 
          roomId: room.id,
        });
      }

      // Send email notification
      await this.notificationService.sendEmailNotification({
        to: userId,
        subject: 'Room Booking Confirmation',
        template: 'room-booking-confirmation',
        data: {
          roomNumber: room.number,
          dormitoryName: room.dormitory?.name || 'Unknown Dormitory',
          checkIn: from.toDateString(),
          checkOut: to.toDateString(),
          bookingId: booking.id,
          totalAmount,
        },
      });
    } catch (notificationError) {
      console.error('❌ Error sending notifications:', notificationError);
      // Don't throw - booking was successful, notifications are optional
    }

    await this.auditService.log({
      userId,
      action: 'BOOK_ROOM',
      entity: 'Booking',
      entityId: booking.id,
      meta: {
        roomId: room.id,
        from: from.toISOString(),
        to: to.toISOString(),
        totalAmount
      },
    });

    return {
      message: "Room booked successfully",
      booking,
      roomStatus,
    };
  }

  async requestAccommodation(user: User, dto: RequestAccommmodationDto) {
    const { from, to, roomId, roommateIds, numberOfPeople } = dto;

    const room = await this.prismaService.room.findUnique({
      where: { id: roomId },
      include: { residents: true },
    });

    if (!room) throw new NotFoundException("Room not found");
    if (room.residents.length >= room.capacity)
      throw new ConflictException("Room already full");

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const overlapping = await this.prismaService.roomStatus.findFirst({
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

    if (overlapping) {
      throw new ConflictException("Room not available on selected dates");
    }

    // Confirmation request → for admin
    return this.prismaService.confirmation.create({
     data: {
      userId: user.id,
      type: "ACCOMMODATION",
      status: "PENDING",
      roomId: roomId,
      from: fromDate,
      to: toDate,
      roommateIds: roommateIds || [],
      numberOfPeople: numberOfPeople || 1
    },
      });
  }

  async requestMoveOut(user: User, dto: RequestMoveOutDto) {
    if (!user.roomId) {
      throw new BadRequestException("You are not assigned to any room");
    }

    const date = new Date(dto.moveOutDate);

    return this.prismaService.confirmation.create({
      data: {
        userId: user.id,
        type: "ROOM_VACATION",
        status: "PENDING",
        metadata: {
          moveOutDate: date.toISOString(),
          currentRoomId: user.roomId
        }
      },
    });
  }

  async createRoomStatus(roomId: string, dto: CreateRoomStatusDto) {
    return this.prismaService.roomStatus.create({
      data: {
        roomId,
        description: dto.description,
        dateOfStart: new Date(dto.dateOfStart),
        dateOfEnd: dto.dateOfEnd ? new Date(dto.dateOfEnd) : null,
      },
    });
  }

  async deleteRoomStatus(statusId: string) {
    return this.prismaService.roomStatus.delete({ where: { id: statusId } });
  }

  async assignUserToRoom(roomId: string, userId: string) {
    const room = await this.prismaService.room.findUnique({
      where: { id: roomId },
      include: { residents: true }
    });

    if (!room) throw new NotFoundException("Room not found");
    
    if (room.residents.length >= room.capacity) {
      throw new ConflictException("Room is already at full capacity");
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException("User not found");

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: { roomId },
    });

    await this.auditService.log({
      userId,
      action: 'ASSIGN_USER_TO_ROOM',
      entity: 'User',
      entityId: userId,
      meta: {
        roomId,
        previousRoomId: user.roomId
      },
    });

    return updatedUser;
  }

  async setRoomPrice(dto: SetPriceDto) {
    return this.prismaService.price.create({
      data: {
        roomCapacity: dto.roomCapacity,
        pricePerDay: dto.pricePerDay,
        pricePerMonth: dto.pricePerMonth,
        dateFrom: new Date(dto.dateFrom),
        dateTo: dto.dateTo ? new Date(dto.dateTo) : null,
      },
    });
  }
}