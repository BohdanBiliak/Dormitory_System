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
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        accounts: true,
      },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        accounts: true,
      },
    });
    return user;
  }

  public async create(
    email: string,
    password: string,
    displayName: string,
    picture: string,
    method: AuthMethod,
    isVerified: boolean,
  ) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: password ? await hash(password) : "",
        displayName,
        picture,
        method,
        isVerified,
      },
      include: {
        accounts: true,
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
