import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { Prisma, User, $Enums } from "../../../__generated__";
import { CreateManagerDto } from "./dto/CreateMeneger.dto";
import { UpdateManagerDto } from "./dto/UpdateManager.dto";
import { ManagerFiltersDto } from "./dto/ManagerFilters.dto";
import { IManagerRepository } from "./manager-repository.interface";
import { DormitoryAdminRole } from "./constants/dormitory-admin-roles.constant";

type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    dormitory: { select: { id: true; name: true } };
    room: { select: { id: true; number: true } };
  };
}>;
@Injectable()
export class ManagerRepository implements IManagerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateManagerDto, hashedPassword: string): Promise<User> {
    const displayName = data.middleName 
      ? `${data.name} ${data.middleName}`
      : data.name;

    return this.prisma.user.create({
      data: {
        displayName: displayName,
        secondName: data.lastName,
        email: data.email,
        password: hashedPassword,
        role: $Enums.UserRole.Admin,
        isVerified: true,
        dormitoryId: data.dormitoryId,
        picture: "",
        method: $Enums.AuthMethod.LOCAL,
        studentIdFront: "",
      },
      include: {
        dormitory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAll(
    filters: ManagerFiltersDto,
  ): Promise<{ managers: UserWithRelations[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = "displayName",
      show,
      dormitoryId,
    } = filters;
    const skip = (page - 1) * limit;
    const where: Prisma.UserWhereInput = {
      role: $Enums.UserRole.Admin,
      ...(search && {
        OR: [
          { displayName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { secondName: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(dormitoryId && { dormitoryId }),
      ...(show === "Residents only" && { roomId: { not: null } }),
    };
    const orderBy: Prisma.UserOrderByWithRelationInput = {};
    if (sortBy === "Name") {
      orderBy.displayName = "asc";
    } else if (sortBy === "Email") {
      orderBy.email = "asc";
    } else {
      orderBy.createdAt = "desc";
    }

    const [managers, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          dormitory: {
            select: {
              id: true,
              name: true,
            },
          },
          room: {
            select: {
              id: true,
              number: true,
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { managers, total };
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        dormitory: {
          select: {
            id: true,
            name: true,
          },
        },
        room: {
          select: {
            id: true,
            number: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findManagersByDormitory(dormitoryId: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        role: $Enums.UserRole.Admin,
        dormitoryId,
      },
      include: {
        dormitory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateManagerDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        dormitory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async deactivate(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      include: {
        dormitory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async activate(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: true },
      include: {
        dormitory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async assignToDormitory(
    managerId: string,
    dormitoryId: string,
  ): Promise<void> {
    await this.prisma.dormitoryAdmin.create({
      data: {
        userId: managerId,
        dormitoryId,
        role: DormitoryAdminRole.ADMIN,
      },
    });
  }

  async removeFromDormitory(
    managerId: string,
    dormitoryId: string,
  ): Promise<void> {
    await this.prisma.dormitoryAdmin.deleteMany({
      where: {
        userId: managerId,
        dormitoryId,
      },
    });
  }
}
