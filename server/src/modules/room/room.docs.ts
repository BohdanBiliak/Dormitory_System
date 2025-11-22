import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiConsumes,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
} from "@nestjs/swagger";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { BookRoomDto } from "./dto/book-room.dto";
import { RequestAccommmodationDto } from "./dto/requestAccommmodation.dto";
import { RequestMoveOutDto } from "./dto/request-moveout.dto";
import { CreateRoomStatusDto } from "./dto/create-room-status.dto";
import { AssignUserToRoomDto } from "./dto/assign-user.dto";
import { EvictUserFromRoomDto } from "./dto/evict-user.dto";

export const RoomDocs = {
  controller: () => applyDecorators(ApiTags("Rooms"), ApiBearerAuth()),

  getRooms: () =>
    applyDecorators(
      ApiOperation({
        summary: "List all rooms accessible for the user",
        description:
          "Returns rooms based on user's role. Admins see all rooms, dormitory admins see only their dormitory rooms. Includes pricing information.",
      }),
      ApiOkResponse({
        description: "List of rooms returned successfully",
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                format: "uuid",
                example: "123e4567-e89b-12d3-a456-426614174000",
              },
              number: { type: "string", example: "301" },
              floor: { type: "integer", example: 3 },
              capacity: { type: "integer", example: 2 },
              dormitoryId: {
                type: "string",
                format: "uuid",
                example: "123e4567-e89b-12d3-a456-426614174001",
              },
              roomEquipment: {
                type: "array",
                items: { type: "string" },
                example: ["desk", "bed", "wardrobe"],
              },
              photos: {
                type: "array",
                items: { type: "string" },
                example: ["photo1.jpg", "photo2.jpg"],
              },
              price: {
                type: "object",
                properties: {
                  pricePerDay: { type: "number", example: 35 },
                  pricePerMonth: { type: "number", example: 700 },
                },
              },
            },
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Unauthorized - Invalid or missing authentication token",
      }),
    ),

  getAvailableRooms: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get available rooms in date range",
        description:
          "Returns rooms available between specified dates, filtered by dormitory if provided. Includes pricing information.",
      }),
      ApiQuery({
        name: "from",
        required: true,
        type: String,
        example: "2025-08-01",
        description: "Start date (YYYY-MM-DD)",
      }),
      ApiQuery({
        name: "to",
        required: true,
        type: String,
        example: "2025-08-10",
        description: "End date (YYYY-MM-DD)",
      }),
      ApiQuery({
        name: "dormitoryId",
        required: false,
        type: String,
        description: "Filter by dormitory ID (UUID)",
      }),
      ApiOkResponse({
        description: "Filtered available rooms returned",
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              number: { type: "string" },
              floor: { type: "integer" },
              capacity: { type: "integer" },
              dormitoryId: { type: "string", format: "uuid" },
              isAvailable: { type: "boolean" },
              dormitory: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  name: { type: "string" },
                },
              },
              price: {
                type: "object",
                properties: {
                  pricePerDay: { type: "number", example: 35 },
                  pricePerMonth: { type: "number", example: 700 },
                },
              },
            },
          },
        },
      }),
      ApiBadRequestResponse({
        description: "Bad Request - Invalid date format or parameters",
      }),
      ApiForbiddenResponse({
        description: "Unauthorized - Invalid or missing authentication token",
      }),
    ),

  getRoom: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get room by ID if accessible",
        description:
          "Returns detailed information about a specific room including current residents and pricing",
      }),
      ApiParam({ name: "id", type: String, description: "Room ID (UUID)" }),
      ApiOkResponse({
        description: "Room details returned successfully",
        schema: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            number: { type: "string", example: "301" },
            floor: { type: "integer", example: 3 },
            capacity: { type: "integer", example: 2 },
            dormitoryId: { type: "string", format: "uuid" },
            roomEquipment: {
              type: "array",
              items: { type: "string" },
              example: ["desk", "bed", "wardrobe"],
            },
            photos: {
              type: "array",
              items: { type: "string" },
              example: ["photo1.jpg", "photo2.jpg"],
            },
            statuses: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  description: { type: "string" },
                  dateOfStart: { type: "string", format: "date-time" },
                  dateOfEnd: {
                    type: "string",
                    format: "date-time",
                    nullable: true,
                  },
                },
              },
            },
            residents: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  firstName: { type: "string" },
                  lastName: { type: "string" },
                  email: { type: "string" },
                },
              },
            },
            price: {
              type: "object",
              properties: {
                pricePerDay: { type: "number", example: 35 },
                pricePerMonth: { type: "number", example: 700 },
              },
            },
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Unauthorized - Invalid or missing authentication token",
      }),
      ApiNotFoundResponse({
        description: "Not Found - Room with specified ID does not exist",
      }),
    ),

  updateRoom: () =>
    applyDecorators(
      ApiOperation({
        summary: "Update room details (Admin only)",
        description:
          "Updates room information including number, floor, capacity, equipment, and photos. Validates business rules and prevents conflicts.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Room ID (UUID)",
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
      ApiBody({
        type: UpdateRoomDto,
        description: "Room update data. All fields are optional.",
        examples: {
          updateBasicInfo: {
            summary: "Update basic room information",
            value: {
              number: "A301",
              floor: 3,
              capacity: 4,
            },
          },
          updateEquipment: {
            summary: "Update room equipment",
            value: {
              roomEquipment: ["Bed", "Desk", "Chair", "Wardrobe", "AC"],
            },
          },
          updatePhotos: {
            summary: "Update room photos",
            value: {
              photos: [
                "https://imgur.com/room1.jpg",
                "https://cloudinary.com/room2.jpg",
              ],
            },
          },
          fullUpdate: {
            summary: "Complete room update",
            value: {
              number: "B205",
              floor: 2,
              capacity: 2,
              roomEquipment: [
                "Bed",
                "Desk",
                "Chair",
                "Wardrobe",
                "Mini Fridge",
              ],
              photos: [
                "https://imgur.com/updated-room1.jpg",
                "https://cloudinary.com/updated-room2.jpg",
              ],
            },
          },
        },
      }),
      ApiOkResponse({
        description: "Room updated successfully",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "123e4567-e89b-12d3-a456-426614174000",
            },
            number: { type: "string", example: "A301" },
            floor: { type: "integer", example: 3 },
            capacity: { type: "integer", example: 4 },
            dormitoryId: { type: "string", format: "uuid" },
            roomEquipment: {
              type: "array",
              items: { type: "string" },
              example: ["Bed", "Desk", "Chair", "Wardrobe", "AC"],
            },
            photos: {
              type: "array",
              items: { type: "string" },
              example: [
                "https://imgur.com/room1.jpg",
                "https://cloudinary.com/room2.jpg",
              ],
            },
            createdAt: { type: "string", format: "date-time" },
            dormitory: {
              type: "object",
              properties: {
                id: { type: "string", format: "uuid" },
                name: { type: "string", example: "East Wing Dormitory" },
                address: { type: "string", example: "123 University Ave" },
              },
            },
            residents: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  displayName: { type: "string", example: "John Doe" },
                  secondName: { type: "string", example: "Doe" },
                  email: {
                    type: "string",
                    format: "email",
                    example: "john.doe@university.edu",
                  },
                },
              },
            },
            statuses: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  description: { type: "string" },
                  dateOfStart: { type: "string", format: "date-time" },
                  dateOfEnd: {
                    type: "string",
                    format: "date-time",
                    nullable: true,
                  },
                },
              },
            },
          },
        },
      }),
      ApiBadRequestResponse({
        description:
          "Bad Request - Validation failed or business rule violation",
        schema: {
          type: "object",
          properties: {
            statusCode: { type: "number", example: 400 },
            message: {
              oneOf: [
                {
                  type: "string",
                  example:
                    "Cannot reduce capacity to 2. Room currently has 3 occupants",
                },
                {
                  type: "string",
                  example:
                    "Rooms above floor 10 cannot have more than 6 people for safety reasons",
                },
                {
                  type: "string",
                  example: "Room number must contain only letters and numbers",
                },
              ],
            },
            error: { type: "string", example: "Bad Request" },
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Forbidden - User does not have admin privileges",
      }),
      ApiNotFoundResponse({
        description: "Not Found - Room with specified ID does not exist",
        schema: {
          type: "object",
          properties: {
            statusCode: { type: "number", example: 404 },
            message: {
              type: "string",
              example:
                "Room with ID 123e4567-e89b-12d3-a456-426614174000 not found",
            },
            error: { type: "string", example: "Not Found" },
          },
        },
      }),
      ApiConflictResponse({
        description: "Conflict - Room number already exists",
        schema: {
          type: "object",
          properties: {
            statusCode: { type: "number", example: 409 },
            message: {
              type: "string",
              example: "Room number A301 already exists",
            },
            error: { type: "string", example: "Conflict" },
          },
        },
      }),
    ),

  bookRoom: () =>
    applyDecorators(
      ApiOperation({
        summary: "Book a room for specific dates",
        description: "Creates a booking for the specified room and date range",
      }),
      ApiBody({
        type: BookRoomDto,
        description: "Room booking details",
        examples: {
          example1: {
            value: {
              roomId: "123e4567-e89b-12d3-a456-426614174000",
              from: "2025-09-01",
              to: "2025-09-15",
            },
          },
        },
      }),
      ApiCreatedResponse({
        description: "Room booked successfully",
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "Room booked successfully" },
            booking: {
              type: "object",
              properties: {
                id: { type: "string", format: "uuid" },
                userId: { type: "string", format: "uuid" },
                roomId: { type: "string", format: "uuid" },
                status: {
                  type: "string",
                  enum: ["PENDING", "CONFIRMED", "CANCELLED"],
                },
                checkInDate: { type: "string", format: "date-time" },
                checkOutDate: { type: "string", format: "date-time" },
                totalAmount: { type: "number" },
                notes: { type: "string" },
              },
            },
            roomStatus: {
              type: "object",
              properties: {
                id: { type: "string", format: "uuid" },
                roomId: { type: "string", format: "uuid" },
                description: { type: "string" },
                dateOfStart: { type: "string", format: "date-time" },
                dateOfEnd: { type: "string", format: "date-time" },
              },
            },
          },
        },
      }),
      ApiBadRequestResponse({
        description: "Bad Request - Invalid booking parameters",
      }),
      ApiForbiddenResponse({
        description: "Unauthorized - Invalid or missing authentication token",
      }),
      ApiNotFoundResponse({
        description: "Not Found - Room with specified ID does not exist",
      }),
      ApiConflictResponse({
        description: "Conflict - Room already booked for the specified dates",
      }),
    ),

  requestAccommodation: () =>
    applyDecorators(
      ApiOperation({
        summary: "Request to book a room (confirmation flow)",
        description:
          "Creates an accommodation request that requires admin approval",
      }),
      ApiBody({
        type: RequestAccommmodationDto,
        examples: {
          example1: {
            value: {
              roomId: "123e4567-e89b-12d3-a456-426614174000",
              from: "2025-09-01",
              to: "2025-09-15",
              suggestedTime: "Evening (18:00-20:00)",
              alternativeRooms: true,
            },
          },
        },
      }),
      ApiCreatedResponse({
        description: "Accommodation request created",
        schema: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            type: { type: "string", example: "ACCOMMODATION" },
            status: { type: "string", example: "PENDING" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      }),
      ApiBadRequestResponse({
        description: "Bad Request - Invalid request parameters",
      }),
      ApiForbiddenResponse({
        description: "Unauthorized - Invalid or missing authentication token",
      }),
      ApiNotFoundResponse({
        description: "Not Found - Room with specified ID does not exist",
      }),
      ApiConflictResponse({
        description:
          "Conflict - Room already full or not available on selected dates",
      }),
    ),

  requestMoveOut: () =>
    applyDecorators(
      ApiOperation({
        summary: "Resident requests to move out",
        description: "Creates a move-out request that requires admin approval",
      }),
      ApiBody({
        type: RequestMoveOutDto,
        examples: {
          example1: {
            value: {
              moveOutDate: "2025-10-15",
            },
          },
        },
      }),
      ApiCreatedResponse({
        description: "Move out request created",
        schema: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            type: { type: "string", example: "ROOM_VACATION" },
            status: { type: "string", example: "PENDING" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      }),
      ApiBadRequestResponse({
        description:
          "Bad Request - User not assigned to any room or invalid date",
      }),
      ApiForbiddenResponse({
        description: "Unauthorized - Invalid or missing authentication token",
      }),
    ),

  createRoomStatus: () =>
    applyDecorators(
      ApiOperation({
        summary: "Create a room status (Admin only)",
        description:
          "Adds a status record to mark room as unavailable for a specific period",
      }),
      ApiParam({ name: "id", type: String, description: "Room ID (UUID)" }),
      ApiBody({
        type: CreateRoomStatusDto,
        examples: {
          example1: {
            value: {
              dateOfStart: "2025-10-01",
              dateOfEnd: "2025-10-15",
              description: "Maintenance - Plumbing repairs",
            },
          },
          indefinite: {
            value: {
              dateOfStart: "2025-10-01",
              description: "Indefinite closure - Major renovation",
            },
          },
        },
      }),
      ApiCreatedResponse({
        description: "Room status created successfully",
        schema: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            roomId: { type: "string", format: "uuid" },
            description: { type: "string" },
            dateOfStart: { type: "string", format: "date-time" },
            dateOfEnd: { type: "string", format: "date-time", nullable: true },
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Forbidden - User does not have admin privileges",
      }),
      ApiNotFoundResponse({
        description: "Not Found - Room with specified ID does not exist",
      }),
    ),

  deleteRoomStatus: () =>
    applyDecorators(
      ApiOperation({
        summary: "Delete room status (Admin only)",
        description: "Removes a room status record",
      }),
      ApiParam({ name: "roomId", type: String, description: "Room ID (UUID)" }),
      ApiParam({
        name: "statusId",
        type: String,
        description: "Status ID (UUID) to delete",
      }),
      ApiOkResponse({
        description: "Room status deleted successfully",
        schema: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            roomId: { type: "string", format: "uuid" },
            description: { type: "string" },
            dateOfStart: { type: "string", format: "date-time" },
            dateOfEnd: { type: "string", format: "date-time", nullable: true },
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Forbidden - User does not have admin privileges",
      }),
      ApiNotFoundResponse({
        description: "Not Found - Status with specified ID does not exist",
      }),
    ),

  assignUser: () =>
    applyDecorators(
      ApiOperation({
        summary: "Assign user to a room (Admin only)",
        description:
          "Updates a user's room assignment, moving them to the specified room. Optionally, specify start and end dates for the assignment.",
      }),
      ApiParam({ name: "id", type: String, description: "Room ID (UUID)" }),
      ApiBody({
        type: AssignUserToRoomDto,
        examples: {
          example: {
            summary: "Assign user with custom start and end dates",
            value: {
              userId: "123e4567-e89b-12d3-a456-426614174001",
              startDate: "2025-09-29T00:00:00.000Z",
              endDate: "2025-10-29T00:00:00.000Z",
            },
          },
        },
      }),
      ApiOkResponse({
        description: "User assigned to room",
        schema: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            email: { type: "string", format: "email" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            roomId: { type: "string", format: "uuid" },
            startDate: {
              type: "string",
              format: "date-time",
              description: "Start date of the assignment",
            },
            endDate: {
              type: "string",
              format: "date-time",
              nullable: true,
              description: "End date of the assignment (if applicable)",
            },
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Forbidden - User does not have admin privileges",
      }),
      ApiNotFoundResponse({
        description:
          "Not Found - Room or user with specified ID does not exist",
      }),
    ),

  evictUser: () =>
    applyDecorators(
      ApiOperation({
        summary: "Evict user from a room (Admin only)",
        description:
          "Removes a user from their assigned room and ends any active room statuses. Sends notification to the evicted user.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Room ID (UUID)",
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
      ApiBody({
        type: EvictUserFromRoomDto,
        description: "User eviction details",
        examples: {
          example1: {
            summary: "Evict user from room",
            value: {
              userId: "123e4567-e89b-12d3-a456-426614174001",
              description: "Violation of dormitory rules",
            },
          },
        },
      }),
      ApiOkResponse({
        description: "User evicted from room successfully",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "123e4567-e89b-12d3-a456-426614174001",
            },
            email: {
              type: "string",
              format: "email",
              example: "john.doe@university.edu",
            },
            firstName: { type: "string", example: "John" },
            lastName: { type: "string", example: "Doe" },
            roomId: {
              type: "string",
              nullable: true,
              example: null,
              description: "Will be null after eviction",
            },
            displayName: { type: "string", example: "John Doe" },
            role: {
              type: "string",
              enum: ["Admin", "SignedInUser"],
              example: "SignedInUser",
            },
          },
        },
      }),
      ApiBadRequestResponse({
        description: "Bad Request - User is not assigned to the specified room",
        schema: {
          type: "object",
          properties: {
            statusCode: { type: "number", example: 400 },
            message: {
              type: "string",
              example: "User is not assigned to this room",
            },
            error: { type: "string", example: "Bad Request" },
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Forbidden - User does not have admin privileges",
      }),
      ApiNotFoundResponse({
        description:
          "Not Found - Room or user with specified ID does not exist",
        schema: {
          type: "object",
          properties: {
            statusCode: { type: "number", example: 404 },
            message: {
              oneOf: [
                { type: "string", example: "Room not found" },
                { type: "string", example: "User not found" },
              ],
            },
            error: { type: "string", example: "Not Found" },
          },
        },
      }),
    ),

  upload: () =>
    applyDecorators(
      ApiOperation({ summary: "Upload room files" }),
      ApiConsumes("multipart/form-data"),
      ApiBody({
        schema: {
          type: "object",
          properties: {
            files: {
              type: "array",
              items: { type: "string", format: "binary" },
            },
          },
        },
      }),
      ApiCreatedResponse({
        description: "Array of uploaded file URLs",
        schema: {
          type: "object",
          properties: {
            urls: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      }),
    ),

  assignPriceCategory: () =>
    applyDecorators(
      ApiOperation({
        summary: "Assign price category to room",
        description: "Assigns a price category to a specific room. This room will use the category's pricing instead of room type pricing.",
      }),
      ApiParam({ name: "id", description: "Room ID" }),
      ApiBody({
        description: "Price category assignment data",
        schema: {
          type: "object",
          properties: {
            priceCategoryId: {
              type: "string",
              format: "uuid",
              description: "ID of the price category to assign",
              example: "price-category-id-123",
            },
          },
          required: ["priceCategoryId"],
        },
      }),
      ApiOkResponse({
        description: "Price category assigned successfully",
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "Price category assigned successfully" },
            room: {
              type: "object",
              properties: {
                id: { type: "string", format: "uuid" },
                number: { type: "string" },
                priceCategoryId: { type: "string", format: "uuid" },
                priceCategory: {
                  type: "object",
                  properties: {
                    id: { type: "string", format: "uuid" },
                    name: { type: "string" },
                    pricePerMonth: { type: "number" },
                    pricePerDay: { type: "number" },
                  },
                },
              },
            },
          },
        },
      }),
      ApiNotFoundResponse({ description: "Room or price category not found" }),
      ApiForbiddenResponse({ description: "Access denied" }),
    ),

  unassignPriceCategory: () =>
    applyDecorators(
      ApiOperation({
        summary: "Remove price category from room",
        description: "Removes the price category assignment from a room. The room will fall back to room type pricing.",
      }),
      ApiParam({ name: "id", description: "Room ID" }),
      ApiOkResponse({
        description: "Price category unassigned successfully",
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "Price category unassigned successfully" },
            room: {
              type: "object",
              properties: {
                id: { type: "string", format: "uuid" },
                number: { type: "string" },
                priceCategoryId: { type: "null" },
              },
            },
          },
        },
      }),
      ApiNotFoundResponse({ description: "Room not found" }),
      ApiForbiddenResponse({ description: "Access denied" }),
    ),

  getRoomPricing: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get room pricing information",
        description: "Returns the current pricing for a room, including price source (room-specific, room type, or legacy).",
      }),
      ApiParam({ name: "id", description: "Room ID" }),
      ApiOkResponse({
        description: "Room pricing information",
        schema: {
          type: "object",
          properties: {
            roomId: { type: "string", format: "uuid" },
            pricePerMonth: { type: "number", example: 500 },
            pricePerDay: { type: "number", example: 20 },
            source: {
              type: "string",
              enum: ["room_price_category", "room_type_price_category", "legacy_pricing"],
              description: "Source of the pricing information",
            },
            priceCategory: {
              type: "object",
              nullable: true,
              properties: {
                id: { type: "string", format: "uuid" },
                name: { type: "string" },
                description: { type: "string", nullable: true },
              },
            },
          },
        },
      }),
      ApiNotFoundResponse({ description: "Room not found" }),
      ApiForbiddenResponse({ description: "Access denied" }),
    ),

  assignStatus: () =>
    applyDecorators(
      ApiOperation({
        summary: "Assign status to room",
        description:
          "Assigns a status type to a room with a date range. Automatically ends any existing active statuses if the new status has no end date.",
      }),
      ApiParam({ name: "id", description: "Room ID (UUID)" }),
      ApiBody({
        schema: {
          type: "object",
          required: ["statusTypeId", "dateOfStart"],
          properties: {
            statusTypeId: {
              type: "string",
              format: "uuid",
              description: "ID of the status type to assign",
            },
            description: {
              type: "string",
              example: "Room undergoing scheduled maintenance",
              description: "Optional description for this status assignment",
            },
            dateOfStart: {
              type: "string",
              format: "date-time",
              example: "2025-11-22T10:00:00.000Z",
              description: "Start date of the status",
            },
            dateOfEnd: {
              type: "string",
              format: "date-time",
              example: "2025-11-25T18:00:00.000Z",
              description: "Optional end date of the status",
            },
          },
        },
      }),
      ApiOkResponse({
        description: "Status assigned to room successfully",
        schema: {
          example: {
            id: "123e4567-e89b-12d3-a456-426614174000",
            roomId: "room-uuid",
            statusTypeId: "status-type-uuid",
            dateOfStart: "2025-11-22T10:00:00.000Z",
            dateOfEnd: null,
            description: "Room undergoing scheduled maintenance",
            createdById: "user-uuid",
            statusType: {
              id: "status-type-uuid",
              name: "Under Maintenance",
              color: "#F59E0B",
            },
          },
        },
      }),
      ApiNotFoundResponse({ description: "Room or status type not found" }),
      ApiBadRequestResponse({ description: "Cannot assign inactive status type" }),
      ApiForbiddenResponse({ description: "Insufficient permissions" }),
    ),

  getRoomStatuses: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get all statuses for a room",
        description: "Returns all status assignments for a room, ordered by start date (newest first)",
      }),
      ApiParam({ name: "id", description: "Room ID (UUID)" }),
      ApiOkResponse({
        description: "List of room statuses",
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              roomId: { type: "string", format: "uuid" },
              statusTypeId: { type: "string", format: "uuid" },
              dateOfStart: { type: "string", format: "date-time" },
              dateOfEnd: { type: "string", format: "date-time", nullable: true },
              description: { type: "string", nullable: true },
              statusType: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  name: { type: "string", example: "Occupied" },
                  color: { type: "string", example: "#EF4444" },
                },
              },
            },
          },
        },
      }),
      ApiNotFoundResponse({ description: "Room not found" }),
    ),

  getCurrentStatus: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get current active status for a room",
        description: "Returns the current active status (with no end date) for a room",
      }),
      ApiParam({ name: "id", description: "Room ID (UUID)" }),
      ApiOkResponse({
        description: "Current room status (or null if no active status)",
        schema: {
          type: "object",
          nullable: true,
          properties: {
            id: { type: "string", format: "uuid" },
            roomId: { type: "string", format: "uuid" },
            statusTypeId: { type: "string", format: "uuid" },
            dateOfStart: { type: "string", format: "date-time" },
            dateOfEnd: { type: "null" },
            description: { type: "string", nullable: true },
            statusType: {
              type: "object",
              properties: {
                id: { type: "string", format: "uuid" },
                name: { type: "string", example: "Available" },
                color: { type: "string", example: "#10B981" },
              },
            },
          },
        },
      }),
      ApiNotFoundResponse({ description: "Room not found" }),
    ),

  endRoomStatus: () =>
    applyDecorators(
      ApiOperation({
        summary: "End a room status",
        description: "Sets the end date of an active room status to the current time",
      }),
      ApiParam({ name: "roomId", description: "Room ID (UUID)" }),
      ApiParam({ name: "statusId", description: "Status ID (UUID)" }),
      ApiOkResponse({
        description: "Room status ended successfully",
        schema: {
          example: {
            id: "status-uuid",
            roomId: "room-uuid",
            statusTypeId: "status-type-uuid",
            dateOfStart: "2025-11-22T10:00:00.000Z",
            dateOfEnd: "2025-11-22T15:30:00.000Z",
            statusType: {
              name: "Under Maintenance",
            },
          },
        },
      }),
      ApiNotFoundResponse({ description: "Room or status not found" }),
      ApiBadRequestResponse({ description: "Room status has already ended" }),
      ApiForbiddenResponse({ description: "Insufficient permissions" }),
    ),
};
