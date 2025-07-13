import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "@/prisma/prisma.service";
import { $Enums } from "../../__generated__";
import AuthMethod = $Enums.AuthMethod;
import { hash } from "argon2";
import {UpdateUserDto} from "@/user/dto/update-user.dto";

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
        displayName: dto.name,
        isTwoFactorEnabled: dto.isTwoFactorEnabled
      }
    })

    return updatedUser
  }

}
