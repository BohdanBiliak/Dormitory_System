import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UnauthorizedException, UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import {Authorized} from "@/libs/common/decorators/authtorized.decorator";
import {Authorization} from "@/libs/common/decorators/auth.decorator";
import {$Enums} from "../../__generated__";
import UserRole = $Enums.UserRole;
import {UpdateUserDto} from "@/user/dto/update-user.dto";
import {Request} from "express"
import {ApiBearerAuth, ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {SessionGuard} from "@/libs/common/guards/SessionGuard.guard";
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @ApiOperation({ summary: 'Get current user profile' })
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
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiBody({ type: UpdateUserDto })
  @Patch('profile')
  public async updateProfile(

      @Authorized('id') userId: string,
      @Authorized('role') role: UserRole,

      @Body() dto: UpdateUserDto
  ) {

    if (role !== UserRole.SignedInUser) {
      throw new ForbiddenException('Only verified users can update profile');
    }
    return this.userService.update(userId, dto)
  }

}
