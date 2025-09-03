import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Authorized } from "@/libs/common/decorators/authtorized.decorator";
import { Authorization } from "@/libs/common/decorators/auth.decorator";
import { $Enums } from "../../../../__generated__";
import UserRole = $Enums.UserRole;
import { UpdateUserDto } from "@/modules/user/dto/update-user.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
  ApiForbiddenResponse,
  ApiNotFoundResponse
} from "@nestjs/swagger";
import { Roles } from "@libs/common/decorators/roles.decorator";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
   * GET /users/profile
   * Returns the profile of the currently authenticated user
   */
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
        createdAt: '2024-07-01T12:00:00.000Z',
        updatedAt: '2024-07-01T12:00:00.000Z'
      }
    }
  })
  @ApiForbiddenResponse({ description: 'Unauthorized access' })
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  @Authorization()
  public async findProfile(
    @Authorized('id') userId: string
  ) {
    return this.userService.findById(userId);
  }

  /**
   * GET /users/by-id/:id
   * Returns a user profile by user ID. Only Admins or SuperAdmins.
   */
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Returns the profile of a user by their ID. Only for Admin or SuperAdmin.'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User ID to look up'
  })
  @ApiOkResponse({
    description: 'User profile found',
    schema: {
      example: {
        id: 'uuid',
        email: 'user@example.com',
        displayName: 'Bohdan',
        isTwoFactorEnabled: true,
        createdAt: '2024-07-01T12:00:00.000Z',
        updatedAt: '2024-07-01T12:00:00.000Z'
      }
    }
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized or insufficient role' })
  @HttpCode(HttpStatus.OK)
  @Get('by-id/:id')
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  public async findById(
    @Param('id') id: string
  ) {
    return this.userService.findById(id);
  }

  /**
   * PATCH /users/profile
   * Update the profile of the currently authenticated user
   */
  @ApiOperation({
    summary: 'Update current user profile',
    description: 'Allows a verified user to update their profile details.'
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Data to update in the user profile',
    examples: {
      updateExample: {
        summary: 'Update display name and 2FA status',
        value: {
          name: 'Updated Name',
          email: 'updated@example.com',
          isTwoFactorEnabled: true
        }
      }
    }
  })
  @ApiOkResponse({
    description: 'Updated user profile',
    schema: {
      example: {
        id: 'uuid',
        email: 'updated@example.com',
        displayName: 'Updated Name',
        isTwoFactorEnabled: true,
        updatedAt: '2025-08-26T12:00:00.000Z'
      }
    }
  })
  @ApiForbiddenResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @HttpCode(HttpStatus.OK)
  @Patch('profile')
  @Authorization()
  public async updateProfile(
    @Authorized('id') userId: string,
    @Authorized('role') role: UserRole,
    @Body() dto: UpdateUserDto
  ) {
    return this.userService.update(userId, dto);
  }

  @ApiOperation({
    summary: 'Get all users',
    description: 'Returns a list of users with pagination. Can be filtered by query parameters. Admin/SuperAdmin only.'
  })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Filter users by email',
    example: 'user@example.com'
  })
  @ApiQuery({
    name: 'displayName',
    required: false,
    description: 'Filter users by display name',
    example: 'Bohdan'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (default: 1)',
    example: 2
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page (default: 10)',
    example: 5
  })
  @ApiOkResponse({
    description: 'Paginated list of users',
    schema: {
      example: {
        data: [
          {
            "data": [
              {
                "id": "eddccfd0-040c-4e44-9e5d-0f1cbde840fc",
                "email": "arheroha@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$JTW1v6RX5oLxgMmolWMEYA$X2KgCJZss8AV/4TmSpmGT9jzLXF0REbkCtJUmKrAwMQ",
                "displayName": "Bohdan",
                "picture": "",
                "isVerified": true,
                "isTwoFactorEnabled": false,
                "method": "CREDENTIALS",
                "role": "Admin",
                "secondName": "Bilak",
                "studentIdFront": "",
                "studentIdBack": "",
                "isActive": true,
                "dormitoryId": null,
                "roomId": null,
                "createdAt": "2025-08-28T12:32:14.349Z",
                "updatedAt": "2025-08-28T12:32:14.349Z"
              }
            ],
            "total": 1,
            "page": 1,
            "last_page": 1
          }
        ]
      }
    }
  })
  @ApiForbiddenResponse({ description: 'Unauthorized or insufficient role' })
  @HttpCode(HttpStatus.OK)
  @Get()
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  async findAll(
    @Query('email') email?: string,
    @Query('displayName') displayName?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const filters: any = {};
    if (email) filters.email = { contains: email, mode: 'insensitive' };
    if (displayName) filters.displayName = { contains: displayName, mode: 'insensitive' };

    return this.userService.findAll(filters, Number(page), Number(limit));
  }


}
