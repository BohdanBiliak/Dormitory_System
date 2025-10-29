import { applyDecorators } from "@nestjs/common";
import {
  ApiOperation,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
} from "@nestjs/swagger";

export const RoomTypesDocs = {
  create: () =>
    applyDecorators(
      ApiOperation({
        summary: "Create new room type",
        description:
          "Creates a new room type with photos. Photos are required and will be inherited by all rooms of this type when creating dormitories. Admin access required.",
      }),
      ApiConsumes("multipart/form-data"),
      ApiBody({
        description: "Room type creation data with required photos",
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Standard Double Room",
              description: "Display name of the room type",
            },
            typeCode: {
              type: "string",
              example: "STD-DBL",
              description: "Unique code for the room type",
            },
            description: {
              type: "string",
              example: "A standard room with 2 beds and basic amenities",
              description: "Optional description of the room type",
            },
            capacity: {
              type: "number",
              example: 2,
              minimum: 1,
              maximum: 10,
              description: "Maximum number of residents",
            },
            equipment: {
              type: "string",
              example: '["bed", "desk", "chair", "wardrobe"]',
              description: "JSON string of equipment array (will be parsed)",
            },
            photos: {
              type: "array",
              items: { type: "string", format: "binary" },
              description:
                "Room type photos (required, max 10 files). These photos will be inherited by all rooms of this type.",
              maxItems: 10,
            },
            priceCategoryId:{
              type: "string",
              example: "pcgjauk7z0000qy01d5g4j8jp",
              description: "Optional ID of the price category to assign to this room type upon creation",
            }
          
          },
          required: [
            "name",
            "typeCode",
            "capacity",
            "equipment",
            "photos",
          ],
        },
      }),
      ApiCreatedResponse({
        description: "Room type created successfully with uploaded photos",
        schema: {
          example: {
            id: "cmgjauk7z0000qy01d5g4j8jp",
            name: "Standard Double Room",
            typeCode: "STD-DBL",
            description: "A standard room with 2 beds and basic amenities",
            capacity: 2,
            equipment: ["bed", "desk", "chair", "wardrobe"],
            photos: [
              "https://s3.example.com/room-types/STD-DBL/1729123456789-photo1.jpg",
              "https://s3.example.com/room-types/STD-DBL/1729123456790-photo2.jpg",
            ],
            createdAt: "2025-10-14T10:00:00.000Z",
            updatedAt: "2025-10-14T10:00:00.000Z",
          },
        },
      }),
      ApiBadRequestResponse({
        description: "Invalid room type data or missing photos",
        schema: {
          example: {
            statusCode: 400,
            message: [
              "At least one photo is required",
              "Room type with code 'STD-DBL' already exists",
              "capacity must be between 1 and 10",

              "equipment must be an array",
              "Invalid file format for photos",
            ],
            error: "Bad Request",
          },
        },
      }),
    ),
  findAll: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get all room types",
        description:
          "Returns list of all room types with their photos and equipment. Admin access required.",
      }),
      ApiOkResponse({
        description: "List of room types",
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", format: "cuid" },
              name: { type: "string", example: "Standard Double Room" },
              typeCode: { type: "string", example: "STD-DBL" },
              description: {
                type: "string",
                example: "A standard room with 2 beds",
              },
              capacity: { type: "number", example: 2 },
              photos: {
                type: "array",
                items: { type: "string" },
                example: [
                  "https://s3.example.com/room-types/STD-DBL/photo1.jpg",
                ],
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
      }),
    ),

  findOne: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get room type by ID",
        description:
          "Returns detailed information about a specific room type including usage statistics",
      }),
      ApiParam({
        name: "id",
        description: "Room type ID (CUID)",
        example: "cmgjauk7z0000qy01d5g4j8jp",
      }),
      ApiOkResponse({
        description: "Room type details",
        schema: {
          example: {
            id: "cmgjauk7z0000qy01d5g4j8jp",
            name: "Standard Double Room",
            typeCode: "STD-DBL",
            description: "A standard room with 2 beds and basic amenities",
            capacity: 2,
            equipment: ["bed", "desk", "chair", "wardrobe"],
            photos: [
              "https://s3.example.com/room-types/STD-DBL/photo1.jpg",
              "https://s3.example.com/room-types/STD-DBL/photo2.jpg",
            ],
            usage: {
              totalRooms: 45,
              occupiedRooms: 23,
              availableRooms: 22,
              dormitoriesUsing: ["East Wing", "West Wing"],
            },
            createdAt: "2025-10-14T10:00:00.000Z",
            updatedAt: "2025-10-14T10:00:00.000Z",
          },
        },
      }),
      ApiNotFoundResponse({
        description: "Room type not found",
        schema: {
          example: {
            statusCode: 404,
            message: "Room type with ID 'invalid-id' not found",
            error: "Not Found",
          },
        },
      }),
    ),

  update: () =>
    applyDecorators(
      ApiOperation({
        summary: "Update room type",
        description:
          "Updates room type information. Changes to equipment and photos will affect all existing rooms of this type.",
      }),
      ApiConsumes("multipart/form-data"),
      ApiParam({ name: "id", description: "Room type ID (CUID)" }),
      ApiBody({
        description: "Room type update data with optional new photos",
        schema: {
          type: "object",
          properties: {
            name: { type: "string", example: "Updated Double Room" },
            description: { type: "string", example: "Updated description" },
            capacity: { type: "number", example: 2 },
            equipment: {
              type: "string",
              example: '["bed", "desk", "chair", "wardrobe", "mini-fridge"]',
              description: "JSON string of equipment array",
            },
            photos: {
              type: "array",
              items: { type: "string", format: "binary" },
              description: "New photos to replace existing ones (optional)",
            },
            priceCategoryId: {
              type: "string",
              example: "pcgjauk7z0000qy01d5g4j8jp",
              description: "Optional ID of the price category to assign to this room type upon update",
            }
          },
        },
      }),
      ApiOkResponse({
        description: "Room type updated successfully",
        schema: {
          example: {
            id: "cmgjauk7z0000qy01d5g4j8jp",
            name: "Updated Double Room",
            typeCode: "STD-DBL",
            description: "Updated description",
            capacity: 2,
            equipment: ["bed", "desk", "chair", "wardrobe", "mini-fridge"],
            photos: [
              "https://s3.example.com/room-types/STD-DBL/new-photo1.jpg",
            ],
            updatedAt: "2025-10-14T12:00:00.000Z",
          },
        },
      }),
      ApiNotFoundResponse({ description: "Room type not found" }),
      ApiBadRequestResponse({
        description: "Invalid update data or room type code conflict",
        schema: {
          example: {
            statusCode: 400,
            message: "Room type code 'NEW-CODE' already exists",
            error: "Bad Request",
          },
        },
      }),
    ),

  delete: () =>
    applyDecorators(
      ApiOperation({
        summary: "Delete room type",
        description:
          "Deletes a room type if it is not currently used by any rooms. This action cannot be undone.",
      }),
      ApiParam({ name: "id", description: "Room type ID (CUID)" }),
      ApiOkResponse({
        description: "Room type deleted successfully",
        schema: {
          example: {
            message: "Room type 'Standard Double Room' deleted successfully",
            deletedId: "cmgjauk7z0000qy01d5g4j8jp",
            deletedAt: "2025-10-14T13:00:00.000Z",
          },
        },
      }),
      ApiNotFoundResponse({ description: "Room type not found" }),
      ApiBadRequestResponse({
        description: "Room type is in use and cannot be deleted",
        schema: {
          example: {
            statusCode: 400,
            message:
              "Room type 'Standard Double Room' is currently used by 45 rooms and cannot be deleted",
            error: "Bad Request",
            usageDetails: {
              totalRooms: 45,
              dormitories: ["East Wing", "West Wing"],
            },
          },
        },
      }),
    ),
};
