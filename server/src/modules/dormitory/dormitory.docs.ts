import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiOkResponse,
  ApiTags,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiConsumes,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
} from "@nestjs/swagger";
import { UpdateDormitoryDto } from "./dto/update-dormitory.dto";

export const DormitoryDocs = {
  controller: () =>
    applyDecorators(
      ApiTags("Dormitories"),
      ApiBearerAuth()
    ),

  create: () =>
    applyDecorators(
      ApiOperation({
        summary: "Create new dormitory",
        description: "Creates a new dormitory with floor-by-floor room type assignments and pricing configuration. Supports file uploads for dormitory and room photos. Admins only.",
      }),
      ApiConsumes('multipart/form-data'),
      ApiBody({
        description: 'Dormitory creation data with floor assignments and optional photos',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'East Wing Dormitory' },
            address: { type: 'string', example: '123 University Ave' },
            groundFloorPhoneNumber: { type: 'string', example: '+380123456789' },
            pricePerDay: { type: 'string', example: '30', description: 'Will be converted to number' },
            pricePerMonth: { type: 'string', example: '600', description: 'Will be converted to number' },
            'floorAssignments[0][floorNumber]': {
              type: 'string',
              example: '1',
              description: 'Floor number (will be converted to integer)'
            },
            'floorAssignments[0][roomAssignments][0][roomTypeId]': {
              type: 'string',
              example: 'cmgjauk7z0000qy01d5g4j8jp',
              description: 'Room type ID'
            },
            'floorAssignments[0][roomAssignments][0][roomNumbers]': {
              type: 'string',
              example: '[1,2,3,4,5]',
              description: 'JSON array of room numbers or comma-separated values'
            },
            'floorAssignments[1][floorNumber]': {
              type: 'string',
              example: '2',
              description: 'Additional floor (optional)'
            },
            'floorAssignments[1][roomAssignments][0][roomTypeId]': {
              type: 'string',
              example: 'cmgjauk7z0000qy01d5g4j8jp',
              description: 'Room type ID for second floor (optional)'
            },
            'floorAssignments[1][roomAssignments][0][roomNumbers]': {
              type: 'string',
              example: '[6,7,8,9,10]',
              description: 'Room numbers for second floor (optional)'
            },
            photos: {
              type: 'array',
              items: { type: 'string', format: 'binary' },
              description: 'Dormitory photos (max 10 files)',
              maxItems: 10
            },
            roomPhotos: {
              type: 'array',
              items: { type: 'string', format: 'binary' },
              description: 'Room photos (max 50 files)',
              maxItems: 50
            }
          },
          required: ['name', 'address', 'groundFloorPhoneNumber', 'pricePerDay', 'pricePerMonth', 'floorAssignments[0][floorNumber]', 'floorAssignments[0][roomAssignments][0][roomTypeId]', 'floorAssignments[0][roomAssignments][0][roomNumbers]']
        }
      }),
      ApiCreatedResponse({
        description: "Dormitory successfully created with floors and rooms based on assignments",
        schema: {
          example: {
            id: "uuid",
            name: "East Wing Dormitory",
            address: "123 University Ave",
            groundFloorPhoneNumber: "+380123456789",
            status: "Active",
            photos: ["https://s3.example.com/dormitory-photo1.jpg", "https://s3.example.com/dormitory-photo2.jpg"],
            createdAt: "2025-10-09T10:00:00.000Z",
            floors: [
              {
                id: "cuid",
                floorNumber: 1,
                dormitoryId: "uuid",
                rooms: [
                  {
                    id: "uuid",
                    number: "101",
                    floorId: "cuid",
                    roomTypeId: "single-room-uuid",
                    capacity: 1,
                    dormitoryId: "uuid",
                    photos: ["https://s3.example.com/room-photo1.jpg"],
                    roomType: {
                      id: "single-room-uuid",
                      name: "Single Room",
                      capacity: 1,
                      equipment: ["Bed", "Desk", "Chair", "Wardrobe"]
                    }
                  },
                  {
                    id: "uuid",
                    number: "102",
                    floorId: "cuid",
                    roomTypeId: "double-room-uuid",
                    capacity: 2,
                    dormitoryId: "uuid",
                    photos: ["https://s3.example.com/room-photo2.jpg"],
                    roomType: {
                      id: "double-room-uuid",
                      name: "Double Room",
                      capacity: 2,
                      equipment: ["Bed", "Desk", "Chair", "Wardrobe", "Mini Fridge"]
                    }
                  }
                ]
              }
            ],
            creationSummary: {
              floorsCreated: 2,
              totalRoomsCreated: 12,
              roomTypeBreakdown: [
                { roomTypeName: "Single Room", quantity: 5 },
                { roomTypeName: "Double Room", quantity: 6 },
                { roomTypeName: "Triple Room", quantity: 1 }
              ],
              priceConfiguration: {
                pricePerDay: 30,
                pricePerMonth: 600
              }
            }
          }
        }
      }),
      ApiBadRequestResponse({
        description: "Invalid dormitory data, floor assignments, room type references, or file upload errors",
        schema: {
          example: {
            statusCode: 400,
            message: [
              "Room type with ID 'invalid-uuid' not found",
              "Floor number must be positive",
              "roomNumbers must be an array of integers",
              "File size exceeds limit",
              "Invalid file format for photos"
            ],
            error: "Bad Request"
          }
        }
      }),
      ApiForbiddenResponse({ description: "Only admins can create dormitories" }),
      ApiConflictResponse({
        description: "Dormitory with this name already exists",
        schema: {
          example: {
            statusCode: 409,
            message: "Dormitory with name 'East Wing Dormitory' already exists",
            error: "Conflict"
          }
        }
      })
    ),

  findAll: () =>
    applyDecorators(
      ApiOperation({
        summary: "List all active dormitories",
        description: "Returns list of all active dormitories with floor and room counts. No authentication required."
      }),
      ApiOkResponse({
        description: "List of active dormitories",
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              name: { type: "string", example: "East Wing Dormitory" },
              address: { type: "string", example: "123 University Ave" },
              groundFloorPhoneNumber: { type: "string", example: "+380123456789" },
              pricePerDay: { type: "number", example: 30 },
              pricePerMonth: { type: "number", example: 600 },
              photos: {
                type: "array",
                items: { type: "string" },
                example: ["https://s3.example.com/photo1.jpg"]
              },
              status: { type: "string", example: "Active" },
              floorCount: { type: "number", example: 3 },
              roomCount: { type: "number", example: 12 },
              availableRooms: { type: "number", example: 8 },
              createdAt: { type: "string", format: "date-time" },
            }
          }
        }
      })
    ),

  findDeactivated: () =>
    applyDecorators(
      ApiOperation({
        summary: "List all deactivated dormitories",
        description: "Returns list of deactivated dormitories. Admin access required."
      }),
      ApiOkResponse({
        description: "List of deactivated dormitories",
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              name: { type: "string", example: "Old West Wing" },
              address: { type: "string", example: "456 Campus Rd" },
              groundFloorPhoneNumber: { type: "string", example: "+380987654321" },
              pricePerDay: { type: "number", example: 25 },
              pricePerMonth: { type: "number", example: 500 },
              photos: {
                type: "array",
                items: { type: "string" },
                example: ["https://s3.example.com/photo2.jpg"]
              },
              status: { type: "string", example: "Deactivated" },
              createdAt: { type: "string", format: "date-time" },
            }
          }
        }
      }),
      ApiForbiddenResponse({ description: "Admin access required" })
    ),

  findOne: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get dormitory by ID",
        description: "Returns detailed information about a specific dormitory including floors, rooms with their types and statistics"
      }),
      ApiParam({ name: "id", description: "Dormitory UUID" }),
      ApiOkResponse({
        description: "Dormitory details",
        schema: {
          example: {
            id: "uuid",
            name: "East Wing Dormitory",
            address: "123 University Ave",
            groundFloorPhoneNumber: "+380123456789",
            pricePerDay: 30,
            pricePerMonth: 600,
            photos: ["https://s3.example.com/dormitory1.jpg"],
            status: "Active",
            createdAt: "2025-10-09T10:00:00.000Z",
            floors: [
              {
                id: "cuid",
                floorNumber: 1,
                dormitoryId: "uuid",
                rooms: [
                  {
                    id: "uuid",
                    number: "101",
                    floorId: "cuid",
                    roomTypeId: "single-room-uuid",
                    capacity: 1,
                    dormitoryId: "uuid",
                    residents: [],
                    currentOccupants: 0,
                    isAvailable: true,
                    roomType: {
                      id: "single-room-uuid",
                      name: "Single Room",
                      capacity: 1,
                      equipment: ["Bed", "Desk", "Chair", "Wardrobe"],
                      photos: ["https://s3.example.com/single-room.jpg"]
                    }
                  }
                ]
              }
            ],
            manager: {
              id: "uuid",
              displayName: "John Manager",
              email: "manager@university.edu"
            },
            admins: [
              {
                id: "uuid",
                role: "dormitory_admin",
                user: {
                  id: "uuid",
                  displayName: "Admin User",
                  email: "admin@university.edu"
                }
              }
            ],
            residents: [
              {
                id: "uuid",
                displayName: "Student Name",
                email: "student@university.edu",
                roomId: "uuid"
              }
            ],
            statistics: {
              totalFloors: 3,
              totalRooms: 12,
              availableRooms: 8,
              occupiedRooms: 4,
              totalResidents: 6,
              occupancyRate: 0.5,
              roomTypeBreakdown: [
                { roomTypeName: "Single Room", total: 4, occupied: 2, available: 2 },
                { roomTypeName: "Double Room", total: 6, occupied: 2, available: 4 },
                { roomTypeName: "Triple Room", total: 2, occupied: 0, available: 2 }
              ]
            }
          },
        },
      }),
      ApiNotFoundResponse({ description: "Dormitory not found" })
    ),

  update: () =>
    applyDecorators(
      ApiOperation({
        summary: "Update dormitory information",
        description: "Updates dormitory details. Only admins can update dormitories."
      }),
      ApiParam({ name: "id", description: "Dormitory UUID" }),
      ApiBody({
        type: UpdateDormitoryDto,
        description: "Fields to update in dormitory",
        examples: {
          updateBasicInfo: {
            summary: "Update basic information",
            value: {
              name: "Updated Dormitory Name",
              address: "456 New Address St",
              groundFloorPhoneNumber: "+380999888777"
            }
          },
          updatePricing: {
            summary: "Update pricing",
            value: {
              pricePerDay: 35,
              pricePerMonth: 650
            }
          }
        }
      }),
      ApiOkResponse({
        description: "Dormitory updated successfully",
        schema: {
          example: {
            id: "uuid",
            name: "Updated Dormitory Name",
            address: "456 New Address St",
            groundFloorPhoneNumber: "+380999888777",
            pricePerDay: 35,
            pricePerMonth: 650,
            photos: ["https://s3.example.com/new-photo1.jpg"],
            status: "Active",
            updatedAt: "2025-10-09T12:00:00.000Z"
          }
        }
      }),
      ApiNotFoundResponse({ description: "Dormitory not found" }),
      ApiBadRequestResponse({ description: "Invalid update data" }),
      ApiForbiddenResponse({ description: "Only admins can update dormitories" })
    ),

  activate: () =>
    applyDecorators(
      ApiOperation({
        summary: "Activate dormitory",
        description: "Reactivates a deactivated dormitory, making it available for new residents"
      }),
      ApiParam({ name: "id", description: "Dormitory UUID" }),
      ApiOkResponse({
        description: "Dormitory activated successfully",
        schema: {
          example: {
            id: "uuid",
            name: "East Wing Dormitory",
            status: "Active",
            activatedAt: "2025-10-09T12:30:00.000Z",
            message: "Dormitory is now active and accepting new residents"
          }
        }
      }),
      ApiNotFoundResponse({ description: "Dormitory not found" }),
      ApiBadRequestResponse({
        description: "Cannot activate dormitory",
        schema: {
          example: {
            statusCode: 400,
            message: "Dormitory is already active",
            error: "Bad Request"
          }
        }
      }),
      ApiForbiddenResponse({ description: "Admin access required" })
    ),

  deactivate: () =>
    applyDecorators(
      ApiOperation({
        summary: "Deactivate dormitory",
        description: "Deactivates a dormitory if no active residents remain. Prevents new bookings."
      }),
      ApiParam({ name: "id", description: "Dormitory UUID" }),
      ApiOkResponse({
        description: "Dormitory deactivated successfully",
        schema: {
          example: {
            id: "uuid",
            name: "East Wing Dormitory",
            status: "Deactivated",
            deactivatedAt: "2025-10-09T13:00:00.000Z",
            message: "Dormitory has been deactivated"
          }
        }
      }),
      ApiNotFoundResponse({ description: "Dormitory not found" }),
      ApiBadRequestResponse({
        description: "Cannot deactivate dormitory with active residents",
        schema: {
          example: {
            statusCode: 400,
            message: "Cannot deactivate dormitory with 15 active residents. Please relocate residents first.",
            error: "Bad Request",
            activeResidents: 15
          }
        }
      }),
      ApiForbiddenResponse({ description: "Only admins can deactivate dormitories" })
    ),
};