import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "@/prisma/prisma.service";
import { $Enums } from "../../../../__generated__";
import AuthMethod = $Enums.AuthMethod;
import { hash } from "argon2";
import {UpdateUserDto} from "@/modules/user/dto/update-user.dto";

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    console.log('Looking up user by ID:', id);

    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    console.log('User found:', user);
    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  public async create(
      email: string,
      password: string,
      displayName: string,
      secondName: string,
      method: AuthMethod,
      isVerified: boolean,
      avatarUrl: string,
      frontUrl: string,
      backUrl: string
  ) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: await hash(password),
        displayName,
        secondName,
        picture: avatarUrl,
        studentIdFront: frontUrl,
        studentIdBack: backUrl,
        method,
        isVerified,
      },
    });
    return user;
  }

  public async update(userId: string, dto: UpdateUserDto) {
    const user = await this.findById(userId)

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: user.id
      },
      data: {
        email: dto.email,
        displayName: dto.displayName,
        isTwoFactorEnabled: dto.isTwoFactorEnabled,
        secondName: dto.secondName
      }
    })

    return updatedUser
  }

  async findAll(queryParams: any = {}, page: number = 1, limit: number = 12) {
  const skip = (page - 1) * limit;
  
  // Build filters object
  const filters: any = {};
  
  // String filters with case-insensitive search
  if (queryParams.email) {
    filters.email = { contains: queryParams.email, mode: 'insensitive' };
  }
  if (queryParams.displayName) {
    filters.displayName = { contains: queryParams.displayName, mode: 'insensitive' };
  }
  if (queryParams.secondName) {
    filters.secondName = { contains: queryParams.secondName, mode: 'insensitive' };
  }
  
  // Enum filters
  if (queryParams.role) {
    filters.role = queryParams.role;
  }
  if (queryParams.method) {
    filters.method = queryParams.method;
  }
  
  // Boolean filters
  if (queryParams.isVerified !== undefined) {
    filters.isVerified = queryParams.isVerified === 'true';
  }
  if (queryParams.isTwoFactorEnabled !== undefined) {
    filters.isTwoFactorEnabled = queryParams.isTwoFactorEnabled === 'true';
  }
  if (queryParams.isActive !== undefined) {
    filters.isActive = queryParams.isActive === 'true';
  }
  
  // UUID filters
  if (queryParams.dormitoryId) {
    filters.dormitoryId = queryParams.dormitoryId;
  }
  if (queryParams.roomId) {
    filters.roomId = queryParams.roomId;
  }

  const [data, total] = await this.prismaService.$transaction([
    this.prismaService.user.findMany({
      where: filters,
      orderBy: { displayName: 'asc' },
      skip,
      take: limit
    }),
    this.prismaService.user.count({ where: filters })
  ]);

  return {
    data,
    total,
    page,
    last_page: Math.ceil(total / limit)
  };
}

  async deactivateUser(id: string, deactivateBy: string){
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.isActive) {
      throw new NotFoundException('User is already deactivated');
    }

    const deactivatedUser = await this.prismaService.user.update({
      where: { id },
      data: { isActive: false }
    });

    return {
      ...deactivatedUser,
      deactivateBy
    };
  } 

  async activateUser(id: string, activateBy: string){
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.isActive) {
      throw new NotFoundException('User is already active');
    }

    const activatedUser = await this.prismaService.user.update({
      where: { id },
      data: { isActive: true }
    });

    return {
      ...activatedUser,
      activateBy
    };
  }

}
