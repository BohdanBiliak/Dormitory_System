import {
  BadRequestException, Body,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { $Enums, User } from "../../../__generated__";
import { AvailableRoomsDto } from "@modules/room/dto/AvailableRooms.dto";
import { BookRoomDto } from "@modules/room/dto/book-room.dto";
import { RequestAccommmodationDto } from "@modules/room/dto/RequestAccommmodation.dto";
import {RequestMoveOutDto} from "@modules/room/dto/request-moveout.dto";
import {CreateRoomStatusDto} from "@modules/room/dto/create-room-status.dto";
import {SetPriceDto} from "@modules/room/dto/set-price.dto";

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(user: User) {
    if (user.role === $Enums.UserRole.Admin) {
      return this.prismaService.room.findMany();
    }

    const assignments = await this.prismaService.dormitoryAdmin.findMany({
      where: { userId: user.id },
      select: { dormitoryId: true },
    });

    return this.prismaService.room.findMany({
      where: {
        dormitoryId: { in: assignments.map((a) => a.dormitoryId) },
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.room.findUniqueOrThrow({ where: { id } });
  }

  async findAvailableRooms(dto: AvailableRoomsDto) {
    const from = new Date(dto.from);
    const to = new Date(dto.to);

    const rooms = await this.prismaService.room.findMany({
      where: dto.dormitoryId ? { dormitoryId: dto.dormitoryId } : {},
      include: {
        statuses: true,
        dormitroy: true,
      },
    });

    return rooms.map((room) => {
      const isAvailable = !room.statuses.some(
        (status) =>
          !(
            new Date(status.dateOfEnd ?? new Date(9999, 1, 1)) <= from ||
            new Date(status.dateOfStart) >= to
          ),
      );

      return {
        ...room,
        isAvailable,
      };
    });
  }

  async bookRoom(dto: BookRoomDto, userId: string) {
    const room = await this.prismaService.room.findUnique({
      where: { id: dto.roomId },
      include: { statuses: true },
    });

    if (!room) throw new NotFoundException("Room not found");

    const from = new Date(dto.from);
    const to = new Date(dto.to);

    const isTaken = room.statuses.some(
      (status) =>
        !(
          new Date(status.dateOfEnd ?? new Date(9999, 1, 1)) <= from ||
          new Date(status.dateOfStart) >= to
        ),
    );

    if (isTaken)
      throw new ConflictException("Room already booked or unavailable");

    await this.prismaService.roomStatus.create({
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

    return { message: "Room booked successfully" };
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
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException("User not found");

    return this.prismaService.user.update({
      where: { id: userId },
      data: { roomId },
    });
  }

  async setRoomPrice(dto: SetPriceDto) {
    return this.prismaService.price.create({
      data: {
        ...dto,
        dateFrom: new Date(dto.dateFrom),
        dateTo: dto.dateTo ? new Date(dto.dateTo) : null,
      },
    });
  }
}
