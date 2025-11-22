import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateRoomStatusTypeDto } from "./dto/create-room-status-type.dto";
import { UpdateRoomStatusTypeDto } from "./dto/update-room-status-type.dto";

@Injectable()
export class RoomStatusTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRoomStatusTypeDto) {
    // Check if name already exists
    const existing = await this.prisma.roomStatusType.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException(
        `Room status type with name "${dto.name}" already exists`,
      );
    }

    return this.prisma.roomStatusType.create({
      data: {
        name: dto.name,
        description: dto.description,
        color: dto.color || "#6B7280",
        isActive: dto.isActive ?? true,
      },
    });
  }

  async findAll(includeInactive = false) {
    return this.prisma.roomStatusType.findMany({
      where: includeInactive ? {} : { isActive: true },
      include: {
        _count: {
          select: { roomStatuses: true },
        },
      },
      orderBy: { name: "asc" },
    });
  }

  async findOne(id: string) {
    const statusType = await this.prisma.roomStatusType.findUnique({
      where: { id },
      include: {
        _count: {
          select: { roomStatuses: true },
        },
      },
    });

    if (!statusType) {
      throw new NotFoundException(`Room status type with ID "${id}" not found`);
    }

    return statusType;
  }

  async findByName(name: string) {
    return this.prisma.roomStatusType.findUnique({
      where: { name },
    });
  }

  async update(id: string, dto: UpdateRoomStatusTypeDto) {
    const statusType = await this.findOne(id);

    if (statusType.isSystem) {
      throw new BadRequestException("Cannot modify system room status types");
    }

    // Check name uniqueness if updating name
    if (dto.name && dto.name !== statusType.name) {
      const existing = await this.prisma.roomStatusType.findUnique({
        where: { name: dto.name },
      });

      if (existing) {
        throw new ConflictException(
          `Room status type with name "${dto.name}" already exists`,
        );
      }
    }

    return this.prisma.roomStatusType.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    const statusType = await this.findOne(id);

    if (statusType.isSystem) {
      throw new BadRequestException("Cannot delete system room status types");
    }

    // Check if it's being used
    if (statusType._count.roomStatuses > 0) {
      throw new BadRequestException(
        `Cannot delete room status type "${statusType.name}" because it is currently assigned to ${statusType._count.roomStatuses} room(s)`,
      );
    }

    return this.prisma.roomStatusType.delete({
      where: { id },
    });
  }

  async activate(id: string) {
    const statusType = await this.findOne(id);

    return this.prisma.roomStatusType.update({
      where: { id },
      data: { isActive: true },
    });
  }

  async deactivate(id: string) {
    const statusType = await this.findOne(id);

    if (statusType.isSystem) {
      throw new BadRequestException(
        "Cannot deactivate system room status types",
      );
    }

    return this.prisma.roomStatusType.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // Helper method to get or create system status types
  async getOrCreateSystemStatus(name: string, color: string, description: string) {
    let statusType = await this.findByName(name);

    if (!statusType) {
      statusType = await this.prisma.roomStatusType.create({
        data: {
          name,
          color,
          description,
          isSystem: true,
          isActive: true,
        },
      });
    }

    return statusType;
  }

  // Initialize default system statuses
  async initializeSystemStatuses() {
    const systemStatuses = [
      {
        name: "Available",
        color: "#10B981",
        description: "Room is available for occupancy",
      },
      {
        name: "Occupied",
        color: "#EF4444",
        description: "Room is currently occupied",
      },
      {
        name: "Under Maintenance",
        color: "#F59E0B",
        description: "Room is under maintenance or repair",
      },
      {
        name: "Reserved",
        color: "#3B82F6",
        description: "Room is reserved but not yet occupied",
      },
      {
        name: "Deactivated",
        color: "#6B7280",
        description: "Room is deactivated and not available",
      },
    ];

    for (const status of systemStatuses) {
      await this.getOrCreateSystemStatus(
        status.name,
        status.color,
        status.description,
      );
    }
  }
}
