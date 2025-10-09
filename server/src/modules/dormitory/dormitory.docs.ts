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
import { CreateDormitoryDto } from "./dto/create-dormitory.dto";
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
        description: "Creates a new dormitory with optional photo uploads, auto-generated floors and rooms with equipment. Admins only.",
      }),
      ApiConsumes("multipart/form-data"),
      ApiBody({
        schema: {
          type: "object",
          properties: {
            name: { type: "string", example: "East Wing Dormitory", description: "Dormitory name" },
            address: { type: "string", example: "123 University Ave", description: "Physical address" },
            groundFloorPhoneNumber: { type: "string", example: "+380123456789", description: "Reception phone number" },
            roomGeneration: {
              type: "string",
              description: "JSON string containing room generation parameters",
              example: JSON.stringify({
                numberOfFloors: 3,
                roomsPerFloor: 4,
                pricePerDay: 30,
                pricePerMonth: 600,
                roomEquipment: ["Bed", "Desk", "Chair", "Wardrobe", "Air Conditioner"],
              }),
            },
            photos: {
              type: "array",
              items: { type: "string", format: "binary" },
              description: "Dormitory exterior/interior photos",
            },
            roomPhotos: {
              type: "array",
              items: { type: "string", format: "binary" },
              description: "Sample room photos to be assigned during room generation",
            },
          },
          required: ["name", "address", "groundFloorPhoneNumber"]
        },
      }),
      ApiCreatedResponse({ 
        description: "Dormitory successfully created with generated floors, rooms and pricing",
        schema: {
          example: {
            id: "uuid",
            name: "East Wing Dormitory",
            address: "123 University Ave",
            groundFloorPhoneNumber: "+380123456789",
            photos: ["https://s3.example.com/dormitory1.jpg"],
            status: "Active",
            createdAt: "2025-10-03T10:00:00.000Z",
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
                    capacity: 2,
                    roomEquipment: ["Bed", "Desk", "Chair", "Wardrobe"],
                    photos: ["https://s3.example.com/room1.jpg"],
                    dormitoryId: "uuid"
                  },
                  {
                    id: "uuid",
                    number: "102",
                    floorId: "cuid",
                    capacity: 2,
                    roomEquipment: ["Bed", "Desk", "Chair", "Wardrobe"],
                    photos: ["https://s3.example.com/room2.jpg"],
                    dormitoryId: "uuid"
                  }
                ]
              }
            ],
            generationSummary: {
              floorsCreated: 3,
              roomsPerFloor: 4,
              totalRooms: 12,
              priceConfiguration: {
                pricePerDay: 30,
                pricePerMonth: 600,
                roomCapacity: 2
              }
            }
          }
        }
      }),
      ApiBadRequestResponse({ description: "Invalid dormitory data or room generation parameters" }),
      ApiForbiddenResponse({ description: "Only admins can create dormitories" }),
      ApiConflictResponse({ description: "Dormitory with this name already exists" })
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
        description: "Returns detailed information about a specific dormitory including floors, rooms and statistics"
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
            photos: ["https://s3.example.com/dormitory1.jpg"],
            status: "Active",
            createdAt: "2025-10-03T10:00:00.000Z",
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
                    capacity: 2,
                    roomEquipment: ["Bed", "Desk", "Chair", "Wardrobe"],
                    photos: ["https://s3.example.com/room1.jpg"],
                    dormitoryId: "uuid",
                    residents: [],
                    currentOccupants: 0,
                    isAvailable: true
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
              occupancyRate: 0.5
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
          updatePhotos: {
            summary: "Update photos",
            value: {
              photos: [
                "https://s3.example.com/new-photo1.jpg",
                "https://s3.example.com/new-photo2.jpg"
              ]
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
            photos: ["https://s3.example.com/new-photo1.jpg"],
            status: "Active",
            updatedAt: "2025-10-03T12:00:00.000Z"
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
            activatedAt: "2025-10-03T12:30:00.000Z",
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
            deactivatedAt: "2025-10-03T13:00:00.000Z",
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