import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
} from "@nestjs/swagger";

export const RoomStatusTypeDocs = {
  controller: () => applyDecorators(ApiTags("Room Status Types"), ApiBearerAuth()),

  create: () =>
    applyDecorators(
      ApiOperation({
        summary: "Create room status type",
        description:
          "Creates a new room status type. Admins can create custom status types like 'Under Renovation', 'Cleaning', etc.",
      }),
      ApiBody({
        schema: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              example: "Under Renovation",
              description: "Unique name for the status type",
            },
            description: {
              type: "string",
              example: "Room is currently being renovated",
              description: "Optional description of the status",
            },
            color: {
              type: "string",
              pattern: "^#[0-9A-Fa-f]{6}$",
              example: "#F59E0B",
              description: "Hex color code for UI display (default: #6B7280)",
            },
            isActive: {
              type: "boolean",
              example: true,
              description: "Whether the status type is active (default: true)",
            },
          },
        },
      }),
      ApiCreatedResponse({
        description: "Room status type created successfully",
        schema: {
          example: {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Under Renovation",
            description: "Room is currently being renovated",
            color: "#F59E0B",
            isActive: true,
            isSystem: false,
            createdAt: "2025-11-22T10:00:00.000Z",
            updatedAt: "2025-11-22T10:00:00.000Z",
          },
        },
      }),
      ApiConflictResponse({
        description: "Status type with this name already exists",
      }),
      ApiForbiddenResponse({ description: "Insufficient permissions" }),
    ),

  findAll: () =>
    applyDecorators(
      ApiOperation({
        summary: "List all room status types",
        description:
          "Returns all room status types. Can optionally include inactive types.",
      }),
      ApiQuery({
        name: "includeInactive",
        required: false,
        type: String,
        description: 'Set to "true" to include inactive status types',
        example: "false",
      }),
      ApiOkResponse({
        description: "List of room status types",
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              name: { type: "string", example: "Occupied" },
              description: {
                type: "string",
                example: "Room is currently occupied",
              },
              color: { type: "string", example: "#EF4444" },
              isActive: { type: "boolean", example: true },
              isSystem: { type: "boolean", example: true },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              _count: {
                type: "object",
                properties: {
                  roomStatuses: { type: "number", example: 15 },
                },
              },
            },
          },
        },
      }),
    ),

  findOne: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get room status type by ID",
        description: "Returns a specific room status type with usage count",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Status type ID (UUID)",
      }),
      ApiOkResponse({
        description: "Room status type found",
        schema: {
          example: {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Occupied",
            description: "Room is currently occupied",
            color: "#EF4444",
            isActive: true,
            isSystem: true,
            createdAt: "2025-11-22T10:00:00.000Z",
            updatedAt: "2025-11-22T10:00:00.000Z",
            _count: {
              roomStatuses: 25,
            },
          },
        },
      }),
      ApiNotFoundResponse({ description: "Room status type not found" }),
    ),

  update: () =>
    applyDecorators(
      ApiOperation({
        summary: "Update room status type",
        description:
          "Updates a room status type. System status types cannot be modified.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Status type ID (UUID)",
      }),
      ApiBody({
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Under Renovation",
            },
            description: {
              type: "string",
              example: "Room is being renovated and upgraded",
            },
            color: {
              type: "string",
              pattern: "^#[0-9A-Fa-f]{6}$",
              example: "#F59E0B",
            },
            isActive: {
              type: "boolean",
              example: true,
            },
          },
        },
      }),
      ApiOkResponse({
        description: "Room status type updated successfully",
      }),
      ApiNotFoundResponse({ description: "Room status type not found" }),
      ApiBadRequestResponse({
        description: "Cannot modify system status types or name already exists",
      }),
      ApiForbiddenResponse({ description: "Insufficient permissions" }),
    ),

  delete: () =>
    applyDecorators(
      ApiOperation({
        summary: "Delete room status type",
        description:
          "Deletes a room status type. Cannot delete system types or types currently in use.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Status type ID (UUID)",
      }),
      ApiOkResponse({
        description: "Room status type deleted successfully",
      }),
      ApiNotFoundResponse({ description: "Room status type not found" }),
      ApiBadRequestResponse({
        description:
          "Cannot delete system status types or types that are currently assigned to rooms",
      }),
      ApiForbiddenResponse({ description: "Insufficient permissions" }),
    ),

  activate: () =>
    applyDecorators(
      ApiOperation({
        summary: "Activate room status type",
        description: "Activates an inactive room status type",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Status type ID (UUID)",
      }),
      ApiOkResponse({
        description: "Room status type activated successfully",
      }),
      ApiNotFoundResponse({ description: "Room status type not found" }),
      ApiForbiddenResponse({ description: "Insufficient permissions" }),
    ),

  deactivate: () =>
    applyDecorators(
      ApiOperation({
        summary: "Deactivate room status type",
        description:
          "Deactivates a room status type. System status types cannot be deactivated.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Status type ID (UUID)",
      }),
      ApiOkResponse({
        description: "Room status type deactivated successfully",
      }),
      ApiNotFoundResponse({ description: "Room status type not found" }),
      ApiBadRequestResponse({
        description: "Cannot deactivate system status types",
      }),
      ApiForbiddenResponse({ description: "Insufficient permissions" }),
    ),

  initializeSystemStatuses: () =>
    applyDecorators(
      ApiOperation({
        summary: "Initialize system statuses",
        description:
          "Creates default system status types (Available, Occupied, Under Maintenance, Reserved, Deactivated). Only SuperAdmin can use this endpoint.",
      }),
      ApiOkResponse({
        description: "System statuses initialized successfully",
        schema: {
          example: {
            message: "System statuses initialized successfully",
          },
        },
      }),
      ApiForbiddenResponse({ description: "Only SuperAdmin can initialize system statuses" }),
    ),
};
