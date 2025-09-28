import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import { RoomService } from "../services/room.service";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import { Authorized } from "@/libs/common/decorators/authtorized.decorator";
import {$Enums, User} from "../../../../__generated__";
import {Authorization} from "@/libs/common/decorators/auth.decorator";
import {AvailableRoomsDto} from "../dto/availableRooms.dto"
import {BookRoomDto} from "@modules/room/dto/book-room.dto";
import {RequestMoveOutDto} from "@modules/room/dto/request-moveout.dto";
import {RequestAccommmodationDto} from "../dto/requestAccommmodation.dto";
import {CreateRoomStatusDto} from "@modules/room/dto/create-room-status.dto";
import {AssignUserToRoomDto} from "@/modules/room/dto/assign-user.dto";
import {SetPriceDto} from "@modules/room/dto/set-price.dto";
import {UpdateRoomDto} from "@modules/room/dto/update-room.dto";
import UserRole = $Enums.UserRole;
import { EvictUserFromRoomDto } from "../dto/evict-user.dto";

@ApiTags("Rooms")
@ApiBearerAuth()
@Controller("rooms")
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  @Authorization()
  @ApiOperation({ 
    summary: "List all rooms accessible for the user",
    description: "Returns rooms based on user's role. Admins see all rooms, dormitory admins see only their dormitory rooms. Includes pricing information."
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of rooms returned successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' },
          number: { type: 'string', example: '301' },
          floor: { type: 'integer', example: 3 },
          capacity: { type: 'integer', example: 2 },
          dormitoryId: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174001' },
          roomEquipment: { type: 'array', items: { type: 'string' }, example: ['desk', 'bed', 'wardrobe'] },
          photos: { type: 'array', items: { type: 'string' }, example: ['photo1.jpg', 'photo2.jpg'] },
          price: {
            type: 'object',
            properties: {
              pricePerDay: { type: 'number', example: 35 },
              pricePerMonth: { type: 'number', example: 700 }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing authentication token' })
  async getRooms(@Authorized() user: User) {
    return this.roomService.findAll(user);
  }

  @Get("available")
  @Authorization(UserRole.Admin, UserRole.SignedInUser)
  @ApiOperation({ 
    summary: "Get available rooms in date range",
    description: "Returns rooms available between specified dates, filtered by dormitory if provided. Includes pricing information."
  })
  @ApiQuery({ name: 'from', required: true, type: String, example: '2025-08-01', description: 'Start date (YYYY-MM-DD)' })
  @ApiQuery({ name: 'to', required: true, type: String, example: '2025-08-10', description: 'End date (YYYY-MM-DD)' })
  @ApiQuery({ name: 'dormitoryId', required: false, type: String, description: 'Filter by dormitory ID (UUID)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Filtered available rooms returned',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          number: { type: 'string' },
          floor: { type: 'integer' },
          capacity: { type: 'integer' },
          dormitoryId: { type: 'string', format: 'uuid' },
          isAvailable: { type: 'boolean' },
          dormitory: { 
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' }
            }
          },
          price: {
            type: 'object',
            properties: {
              pricePerDay: { type: 'number', example: 35 },
              pricePerMonth: { type: 'number', example: 700 }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid date format or parameters' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing authentication token' })
  async getAvailableRooms(@Query() query: AvailableRoomsDto) {
    return this.roomService.findAvailableRooms(query);
  }

  @Get(":id")
  @Authorization()
  @ApiOperation({ 
    summary: "Get room by ID if accessible",
    description: "Returns detailed information about a specific room including current residents and pricing"
  })
  @ApiParam({ name: 'id', type: String, description: 'Room ID (UUID)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Room details returned successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        number: { type: 'string', example: '301' },
        floor: { type: 'integer', example: 3 },
        capacity: { type: 'integer', example: 2 },
        dormitoryId: { type: 'string', format: 'uuid' },
        roomEquipment: { type: 'array', items: { type: 'string' }, example: ['desk', 'bed', 'wardrobe'] },
        photos: { type: 'array', items: { type: 'string' }, example: ['photo1.jpg', 'photo2.jpg'] },
        statuses: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              description: { type: 'string' },
              dateOfStart: { type: 'string', format: 'date-time' },
              dateOfEnd: { type: 'string', format: 'date-time', nullable: true }
            }
          }
        },
        residents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              email: { type: 'string' }
            }
          }
        },
        price: {
          type: 'object',
          properties: {
            pricePerDay: { type: 'number', example: 35 },
            pricePerMonth: { type: 'number', example: 700 }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing authentication token' })
  @ApiResponse({ status: 404, description: 'Not Found - Room with specified ID does not exist' })
  async getRoom(@Param("id") id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(":id")
  @Authorization(UserRole.Admin)
  @ApiOperation({ 
    summary: "Update room details (Admin only)",
    description: "Updates room information including number, floor, capacity, equipment, and photos. Validates business rules and prevents conflicts."
  })
  @ApiParam({ 
    name: 'id', 
    type: String, 
    description: 'Room ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ 
    type: UpdateRoomDto,
    description: 'Room update data. All fields are optional.',
    examples: {
      updateBasicInfo: {
        summary: 'Update basic room information',
        value: {
          number: 'A301',
          floor: 3,
          capacity: 4
        }
      },
      updateEquipment: {
        summary: 'Update room equipment',
        value: {
          roomEquipment: ['Bed', 'Desk', 'Chair', 'Wardrobe', 'AC']
        }
      },
      updatePhotos: {
        summary: 'Update room photos',
        value: {
          photos: [
            'https://imgur.com/room1.jpg',
            'https://cloudinary.com/room2.jpg'
          ]
        }
      },
      fullUpdate: {
        summary: 'Complete room update',
        value: {
          number: 'B205',
          floor: 2,
          capacity: 2,
          roomEquipment: ['Bed', 'Desk', 'Chair', 'Wardrobe', 'Mini Fridge'],
          photos: [
            'https://imgur.com/updated-room1.jpg',
            'https://cloudinary.com/updated-room2.jpg'
          ]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Room updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' },
        number: { type: 'string', example: 'A301' },
        floor: { type: 'integer', example: 3 },
        capacity: { type: 'integer', example: 4 },
        dormitoryId: { type: 'string', format: 'uuid' },
        roomEquipment: { 
          type: 'array', 
          items: { type: 'string' }, 
          example: ['Bed', 'Desk', 'Chair', 'Wardrobe', 'AC'] 
        },
        photos: { 
          type: 'array', 
          items: { type: 'string' }, 
          example: ['https://imgur.com/room1.jpg', 'https://cloudinary.com/room2.jpg'] 
        },
        createdAt: { type: 'string', format: 'date-time' },
        dormitory: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'East Wing Dormitory' },
            address: { type: 'string', example: '123 University Ave' }
          }
        },
        residents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              displayName: { type: 'string', example: 'John Doe' },
              secondName: { type: 'string', example: 'Doe' },
              email: { type: 'string', format: 'email', example: 'john.doe@university.edu' }
            }
          }
        },
        statuses: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              description: { type: 'string' },
              dateOfStart: { type: 'string', format: 'date-time' },
              dateOfEnd: { type: 'string', format: 'date-time', nullable: true }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad Request - Validation failed or business rule violation',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { 
          oneOf: [
            { type: 'string', example: 'Cannot reduce capacity to 2. Room currently has 3 occupants' },
            { type: 'string', example: 'Rooms above floor 10 cannot have more than 6 people for safety reasons' },
            { type: 'string', example: 'Room number must contain only letters and numbers' }
          ]
        },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing authentication token' })
  @ApiResponse({ status: 403, description: 'Forbidden - User does not have admin privileges' })
  @ApiResponse({ 
    status: 404, 
    description: 'Not Found - Room with specified ID does not exist',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Room with ID 123e4567-e89b-12d3-a456-426614174000 not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Room number already exists',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Room number A301 already exists' },
        error: { type: 'string', example: 'Conflict' }
      }
    }
  })
  async updateRoom(
    @Param("id") id: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @Authorized() user: User
  ) {
    return this.roomService.updateRoom(id, updateRoomDto, user.id);
  }

  @Post("book")
  @Authorization(UserRole.SignedInUser, UserRole.Admin)
  @ApiOperation({ 
    summary: "Book a room for specific dates",
    description: "Creates a booking for the specified room and date range"
  })
  @ApiBody({ 
    type: BookRoomDto,
    description: 'Room booking details',
    examples: {
      example1: {
        value: {
          roomId: '123e4567-e89b-12d3-a456-426614174000',
          from: '2025-09-01',
          to: '2025-09-15'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Room booked successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Room booked successfully' },
        booking: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            roomId: { type: 'string', format: 'uuid' },
            status: { type: 'string', enum: ['PENDING', 'CONFIRMED', 'CANCELLED'] },
            checkInDate: { type: 'string', format: 'date-time' },
            checkOutDate: { type: 'string', format: 'date-time' },
            totalAmount: { type: 'number' },
            notes: { type: 'string' }
          }
        },
        roomStatus: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            roomId: { type: 'string', format: 'uuid' },
            description: { type: 'string' },
            dateOfStart: { type: 'string', format: 'date-time' },
            dateOfEnd: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid booking parameters' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing authentication token' })
  @ApiResponse({ status: 404, description: 'Not Found - Room with specified ID does not exist' })
  @ApiResponse({ status: 409, description: 'Conflict - Room already booked for the specified dates' })
  async bookRoom(@Authorized() user: User, @Body() dto: BookRoomDto) {
    return this.roomService.bookRoom(dto, user.id);
  }

  @Post("request-accommodation")
  @Authorization(UserRole.SignedInUser)
  @ApiOperation({ 
    summary: "Request to book a room (confirmation flow)",
    description: "Creates an accommodation request that requires admin approval"
  })
  @ApiBody({ 
    type: RequestAccommmodationDto,
    examples: {
      example1: {
        value: {
          roomId: '123e4567-e89b-12d3-a456-426614174000',
          from: '2025-09-01',
          to: '2025-09-15',
          roommateIds: ['123e4567-e89b-12d3-a456-426614174001'],
          numberOfPeople: 2
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Accommodation request created',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        userId: { type: 'string', format: 'uuid' },
        type: { type: 'string', example: 'ACCOMMODATION' },
        status: { type: 'string', example: 'PENDING' },
        createdAt: { type: 'string', format: 'date-time' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid request parameters' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing authentication token' })
  @ApiResponse({ status: 404, description: 'Not Found - Room with specified ID does not exist' })
  @ApiResponse({ status: 409, description: 'Conflict - Room already full or not available on selected dates' })
  async requestAccommodation(
      @Authorized() user: User,
      @Body() dto: RequestAccommmodationDto,
  ) {
    return this.roomService.requestAccommodation(user, dto);
  }

  @Post("request-move-out")
  @Authorization(UserRole.SignedInUser)
  @ApiOperation({ 
    summary: "Resident requests to move out",
    description: "Creates a move-out request that requires admin approval"
  })
  @ApiBody({ 
    type: RequestMoveOutDto,
    examples: {
      example1: {
        value: {
          moveOutDate: '2025-10-15'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Move out request created',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        userId: { type: 'string', format: 'uuid' },
        type: { type: 'string', example: 'ROOM_VACATION' },
        status: { type: 'string', example: 'PENDING' },
        createdAt: { type: 'string', format: 'date-time' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad Request - User not assigned to any room or invalid date' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing authentication token' })
  async requestMoveOut(
      @Authorized() user: User,
      @Body() dto: RequestMoveOutDto,
  ) {
    return this.roomService.requestMoveOut(user, dto);
  }

  @Post(":id/statuses")
  @Authorization(UserRole.Admin)
  @ApiOperation({ 
    summary: "Create a room status (Admin only)",
    description: "Adds a status record to mark room as unavailable for a specific period"
  })
  @ApiParam({ name: "id", type: String, description: 'Room ID (UUID)' })
  @ApiBody({ 
    type: CreateRoomStatusDto,
    examples: {
      example1: {
        value: {
          dateOfStart: '2025-10-01',
          dateOfEnd: '2025-10-15',
          description: 'Maintenance - Plumbing repairs'
        }
      },
      indefinite: {
        value: {
          dateOfStart: '2025-10-01',
          description: 'Indefinite closure - Major renovation'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Room status created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        roomId: { type: 'string', format: 'uuid' },
        description: { type: 'string' },
        dateOfStart: { type: 'string', format: 'date-time' },
        dateOfEnd: { type: 'string', format: 'date-time', nullable: true }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing authentication token' })
  @ApiResponse({ status: 403, description: 'Forbidden - User does not have admin privileges' })
  @ApiResponse({ status: 404, description: 'Not Found - Room with specified ID does not exist' })
  async createRoomStatus(
      @Param("id") roomId: string,
      @Body() dto: CreateRoomStatusDto,
  ) {
    return this.roomService.createRoomStatus(roomId, dto);
  }

  @Delete(":id/statuses/:id")
  @Authorization(UserRole.Admin)
  @ApiOperation({ 
    summary: "Delete room status (Admin only)",
    description: "Removes a room status record"
  })
  @ApiParam({ name: "id", type: String, description: 'Room ID (UUID)' })
  @ApiParam({ name: "sid", type: String, description: 'Status ID (UUID) to delete' })
  @ApiResponse({ 
    status: 200, 
    description: 'Room status deleted successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        roomId: { type: 'string', format: 'uuid' },
        description: { type: 'string' },
        dateOfStart: { type: 'string', format: 'date-time' },
        dateOfEnd: { type: 'string', format: 'date-time', nullable: true }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing authentication token' })
  @ApiResponse({ status: 403, description: 'Forbidden - User does not have admin privileges' })
  @ApiResponse({ status: 404, description: 'Not Found - Status with specified ID does not exist' })
  async deleteRoomStatus(
      @Param("id") roomId: string,
      @Param("sid") statusId: string,
  ) {
    return this.roomService.deleteRoomStatus(statusId);
  }

  @Patch(":id/assign-user")
  @Authorization(UserRole.Admin)
  @ApiOperation({ 
    summary: "Assign user to a room (Admin only)",
    description: "Updates a user's room assignment, moving them to the specified room"
  })
  @ApiParam({ name: "id", type: String, description: 'Room ID (UUID)' })
  @ApiBody({ 
    type: AssignUserToRoomDto,
    examples: {
      example1: {
        value: {
          userId: '123e4567-e89b-12d3-a456-426614174001'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User assigned to room',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        email: { type: 'string', format: 'email' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        roomId: { type: 'string', format: 'uuid' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing authentication token' })
  @ApiResponse({ status: 403, description: 'Forbidden - User does not have admin privileges' })
  @ApiResponse({ status: 404, description: 'Not Found - Room or user with specified ID does not exist' })
  async assignUser(
      @Param("id") roomId: string,
      @Body() dto: AssignUserToRoomDto,
  ) {
    return this.roomService.assignUserToRoom(roomId, dto.userId);
  }

@Patch(":id/evict-user")
@Authorization(UserRole.Admin)
@ApiOperation({ 
  summary: "Evict user from a room (Admin only)",
  description: "Removes a user from their assigned room and ends any active room statuses. Sends notification to the evicted user."
})
@ApiParam({ 
  name: "id", 
  type: String, 
  description: 'Room ID (UUID)',
  example: '123e4567-e89b-12d3-a456-426614174000'
})
@ApiBody({ 
  type: EvictUserFromRoomDto, // Reusing the DTO since it has the same structure
  description: 'User eviction details',
  examples: {
    example1: {
      summary: 'Evict user from room',
      value: {
        userId: '123e4567-e89b-12d3-a456-426614174001',
        description: 'Violation of dormitory rules'
      }
    }
  }
})
@ApiResponse({ 
  status: 200, 
  description: 'User evicted from room successfully',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174001' },
      email: { type: 'string', format: 'email', example: 'john.doe@university.edu' },
      firstName: { type: 'string', example: 'John' },
      lastName: { type: 'string', example: 'Doe' },
      roomId: { type: 'string', nullable: true, example: null, description: 'Will be null after eviction' },
      displayName: { type: 'string', example: 'John Doe' },
      role: { type: 'string', enum: ['Admin', 'SignedInUser'], example: 'SignedInUser' }
    }
  }
})
@ApiResponse({ 
  status: 400, 
  description: 'Bad Request - User is not assigned to the specified room',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'User is not assigned to this room' },
      error: { type: 'string', example: 'Bad Request' }
    }
  }
})
@ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing authentication token' })
@ApiResponse({ status: 403, description: 'Forbidden - User does not have admin privileges' })
@ApiResponse({ 
  status: 404, 
  description: 'Not Found - Room or user with specified ID does not exist',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 404 },
      message: { 
        oneOf: [
          { type: 'string', example: 'Room not found' },
          { type: 'string', example: 'User not found' }
        ]
      },
      error: { type: 'string', example: 'Not Found' }
    }
  }
})
async evictUser(
    @Param("id") roomId: string,
    @Body() dto: EvictUserFromRoomDto,
) {
  return this.roomService.evictUserFromRoom(roomId, dto);
}




  @Post("/prices")
  @Authorization(UserRole.Admin)
  @ApiOperation({ 
    summary: "Set pricing for room capacity (Admin only)",
    description: "Creates a new pricing configuration for rooms based on capacity and date range"
  })
  @ApiBody({ 
    type: SetPriceDto,
    examples: { 
      example1: {
        value: {
          roomCapacity: 2,
          pricePerMonth: 700,
          pricePerDay: 35,
          dateFrom: '2025-09-01',
          dateTo: '2026-08-31'
        }
      },
      indefinite: {
        value: {
          roomCapacity: 1,
          pricePerMonth: 900,
          pricePerDay: 45,
          dateFrom: '2025-09-01'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Price created',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        roomCapacity: { type: 'integer' },
        pricePerDay: { type: 'number' },
        pricePerMonth: { type: 'number' },
        dateFrom: { type: 'string', format: 'date-time' },
        dateTo: { type: 'string', format: 'date-time', nullable: true }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing authentication token' })
  @ApiResponse({ status: 403, description: 'Forbidden - User does not have admin privileges' })
  async setPrice(@Body() dto: SetPriceDto) {
    return this.roomService.setRoomPrice(dto);
  }
}