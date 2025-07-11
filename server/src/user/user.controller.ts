import {Body, Controller, Get, HttpCode, HttpStatus, Patch} from '@nestjs/common';
import { UserService } from './user.service';
import {Authorized} from "@/auth/decorators/authtorized.decorator";
import {Authorization} from "@/auth/decorators/auth.decorator";
import {$Enums} from "../../__generated__";
import UserRole = $Enums.UserRole;
import {UpdateUserDto} from "@/user/dto/update-user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  public async findProfile(@Authorized('id') userId: string){
    return this.userService.findById(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('by-id/:id')
  public async findById(@Authorized('id') userId: string){
    return this.userService.findById(userId);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Patch('profile')
  public async updateProfile(
      @Authorized('id') userId: string,
      @Body() dto: UpdateUserDto
  ) {
    return this.userService.update(userId, dto)
  }

}
