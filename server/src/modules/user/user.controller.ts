import {
  Body,
  Controller,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  Param,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Authorized } from "@/libs/common/decorators/authtorized.decorator";
import { Authorization } from "@/libs/common/decorators/auth.decorator";
import { $Enums } from "../../../__generated__";
import { UpdateUserDto } from "@/modules/user/dto/update-user.dto";
import { CurrentUser } from "@/libs/common/decorators/current-user.decorator";
import { UserDocs } from "./user.docs";

import UserRole = $Enums.UserRole;

@UserDocs.controller()
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UserDocs.findProfile()
  @Get("profile")
  @HttpCode(HttpStatus.OK)
  @Authorization()
  public async findProfile(@Authorized("id") userId: string) {
    return this.userService.findById(userId);
  }

  @UserDocs.findById()
  @Get("by-id/:id")
  @HttpCode(HttpStatus.OK)
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  public async findById(@Param("id") id: string) {
    return this.userService.findById(id);
  }

  @UserDocs.updateProfile()
  @Patch("profile")
  @HttpCode(HttpStatus.OK)
  @Authorization()
  public async updateProfile(
    @Authorized("id") userId: string,
    @Authorized("role") role: UserRole,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(userId, dto);
  }

  @UserDocs.findAll()
  @Get()
  @HttpCode(HttpStatus.OK)
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  async findAll(
    @Query("email") email?: string,
    @Query("displayName") displayName?: string,
    @Query("secondName") secondName?: string,
    @Query("role") role?: string,
    @Query("method") method?: string,
    @Query("isVerified") isVerified?: string,
    @Query("isTwoFactorEnabled") isTwoFactorEnabled?: string,
    @Query("isActive") isActive?: string,
    @Query("dormitoryId") dormitoryId?: string,
    @Query("roomId") roomId?: string,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
  ) {
    const queryParams = {
      email,
      displayName,
      secondName,
      role,
      method,
      isVerified,
      isTwoFactorEnabled,
      isActive,
      dormitoryId,
      roomId,
    };

    return this.userService.findAll(queryParams, Number(page), Number(limit));
  }

  @UserDocs.getAllResidents()
  @Get("residents")
  async getAllResidents() {
    return this.userService.getAllResidents();
  }

  @UserDocs.deactivateUser()
  @Delete(":id/deactivate")
  @Authorization(UserRole.SuperAdmin, UserRole.Admin)
  async deactivateUser(
    @Param("id") id: string,
    @CurrentUser("id") currentUserId: string,
  ) {
    return this.userService.deactivateUser(id, currentUserId);
  }

  @UserDocs.activateUser()
  @Patch(":id/activate")
  @Authorization(UserRole.SuperAdmin, UserRole.Admin)
  async activateUser(
    @Param("id") id: string,
    @CurrentUser("id") currentUserId: string,
  ) {
    return this.userService.activateUser(id, currentUserId);
  }
}
