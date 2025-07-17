import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Param, Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Authorized } from "@/libs/common/decorators/authtorized.decorator";
import { Authorization } from "@/libs/common/decorators/auth.decorator";
import { $Enums } from "../../../../__generated__";
import UserRole = $Enums.UserRole;
import { UpdateUserDto } from "@/modules/user/dto/update-user.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {Roles} from "@libs/common/decorators/roles.decorator";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Returns the profile of the currently authenticated user.'
  })
  @ApiOkResponse({
    description: 'Current user profile',
    schema: {
      example: {
        id: 'uuid',
        email: 'user@example.com',
        displayName: 'Bohdan',
        isTwoFactorEnabled: true,
        createdAt: '2024-07-01T12:00:00.000Z'
      }
    }
  })
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  public async findProfile(
      @Authorized('id') userId: string
  ) {
    return this.userService.findById(userId);
  }

  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Returns the profile of a user by their ID. Only for debugging or internal use.'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User ID to look up'
  })
  @ApiOkResponse({
    description: 'User profile by ID',
    schema: {
      example: {
        id: 'uuid',
        email: 'user@example.com',
        displayName: 'Bohdan',
        isTwoFactorEnabled: true,
        createdAt: '2024-07-01T12:00:00.000Z'
      }
    }
  })
  @HttpCode(HttpStatus.OK)

  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @Get('by-id/:id')
  public async findById(
      @Param('id') id: string
  ) {
    return this.userService.findById(id);
  }

  @Authorization()
  @ApiOperation({
    summary: 'Update current user profile',
    description: 'Allows a verified user to update their profile details.'
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Data to update in the user profile'
  })
  @ApiOkResponse({
    description: 'Updated user profile',
    schema: {
      example: {
        id: 'uuid',
        email: 'updated@example.com',
        displayName: 'Updated Name',
        isTwoFactorEnabled: true
      }
    }
  })
  @HttpCode(HttpStatus.OK)
  @Patch('profile')
  public async updateProfile(
      @Authorized('id') userId: string,
      @Authorized('role') role: UserRole,
      @Body() dto: UpdateUserDto
  ) {
    return this.userService.update(userId, dto);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.SuperAdmin)
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() filters: any) {
    return this.userService.findAll(filters);
  }
}
