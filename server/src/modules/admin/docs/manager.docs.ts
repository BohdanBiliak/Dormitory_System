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
import { CreateManagerDto } from "../dto/CreateMeneger.dto";
import { UpdateManagerDto } from "../dto/UpdateManager.dto";
import { ManagerResponseDto } from "../dto/ManagerResponse.dto";

export const ManagerDocs = {
  controller: () => applyDecorators(ApiTags("Manager"), ApiBearerAuth()),

  createManager: () =>
    applyDecorators(
      ApiOperation({
        summary: "Create new manager",
        description:
          "Creates a new dormitory manager account. Only SuperAdmin can create managers.",
      }),
      ApiBody({
        type: CreateManagerDto,
        examples: {
          example1: {
            summary: "Create dormitory manager",
            value: {
              email: "manager@university.edu",
              name: "John",
              middleName: "Robert",
              lastName: "Manager",
              password: "SecurePassword123!",
              repeatPassword: "SecurePassword123!",
              dormitoryId: "123e4567-e89b-12d3-a456-426614174000",
            },
          },
        },
      }),
      ApiCreatedResponse({
        description: "Manager created successfully",
        type: ManagerResponseDto,
        schema: {
          example: {
            id: "uuid",
            email: "manager@university.edu",
            displayName: "John",
            secondName: "Manager",
            role: "Admin",
            isActive: true,
            dormitoryId: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: "2025-10-03T12:00:00.000Z",
          },
        },
      }),
      ApiConflictResponse({ description: "Email already exists" }),
      ApiBadRequestResponse({
        description: "Passwords do not match or invalid data",
      }),
      ApiForbiddenResponse({
        description: "Only SuperAdmin can create managers",
      }),
    ),

  getManagers: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get all managers",
        description:
          "Returns paginated list of dormitory managers with filtering and sorting",
      }),
      ApiQuery({
        name: "page",
        required: false,
        type: Number,
        example: 1,
        description: "Page number",
      }),
      ApiQuery({
        name: "limit",
        required: false,
        type: Number,
        example: 10,
        description: "Items per page",
      }),
      ApiQuery({
        name: "search",
        required: false,
        type: String,
        description: "Search by name or email",
      }),
      ApiQuery({
        name: "sortBy",
        required: false,
        enum: ["Name", "Email"],
        example: "Name",
        description: "Sort by field",
      }),
      ApiQuery({
        name: "show",
        required: false,
        enum: ["All", "Residents only"],
        example: "All",
        description: "Filter by type",
      }),
      ApiQuery({
        name: "dormitoryId",
        required: false,
        type: String,
        description: "Filter by dormitory ID",
      }),
      ApiOkResponse({
        description: "Managers retrieved successfully",
        schema: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  email: { type: "string", format: "email" },
                  displayName: { type: "string" },
                  secondName: { type: "string" },
                  role: { type: "string", example: "Admin" },
                  isActive: { type: "boolean" },
                  dormitoryId: { type: "string", format: "uuid" },
                  dormitory: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      name: { type: "string" },
                    },
                  },
                  createdAt: { type: "string", format: "date-time" },
                },
              },
            },
            total: { type: "number", example: 25 },
            page: { type: "number", example: 1 },
            pageCount: { type: "number", example: 3 },
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Unauthorized or insufficient role",
      }),
    ),

  getManagerById: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get manager by ID",
        description: "Returns detailed information about a specific manager",
      }),
      ApiParam({ name: "id", type: String, description: "Manager ID (UUID)" }),
      ApiOkResponse({
        description: "Manager found",
        type: ManagerResponseDto,
        schema: {
          example: {
            id: "uuid",
            email: "manager@university.edu",
            displayName: "John",
            secondName: "Manager",
            role: "Admin",
            isActive: true,
            dormitoryId: "123e4567-e89b-12d3-a456-426614174000",
            dormitory: {
              id: "123e4567-e89b-12d3-a456-426614174000",
              name: "East Wing Dormitory",
              address: "123 University Ave",
            },
            createdAt: "2025-10-03T12:00:00.000Z",
            updatedAt: "2025-10-03T12:00:00.000Z",
          },
        },
      }),
      ApiNotFoundResponse({ description: "Manager not found" }),
      ApiForbiddenResponse({
        description: "Unauthorized or insufficient role",
      }),
    ),

  updateManager: () =>
    applyDecorators(
      ApiOperation({
        summary: "Update manager",
        description:
          "Updates manager profile information. Only SuperAdmin can update managers.",
      }),
      ApiParam({ name: "id", type: String, description: "Manager ID (UUID)" }),
      ApiBody({
        type: UpdateManagerDto,
        examples: {
          updateProfile: {
            summary: "Update manager profile",
            value: {
              displayName: "Updated Name",
              secondName: "Updated Surname",
              email: "updated.manager@university.edu",
            },
          },
          changeDormitory: {
            summary: "Change assigned dormitory",
            value: {
              dormitoryId: "456e7890-e89b-12d3-a456-426614174001",
            },
          },
        },
      }),
      ApiOkResponse({
        description: "Manager updated successfully",
        type: ManagerResponseDto,
        schema: {
          example: {
            id: "uuid",
            email: "updated.manager@university.edu",
            displayName: "Updated Name",
            secondName: "Updated Surname",
            role: "Admin",
            isActive: true,
            dormitoryId: "456e7890-e89b-12d3-a456-426614174001",
            updatedAt: "2025-10-03T12:30:00.000Z",
          },
        },
      }),
      ApiNotFoundResponse({ description: "Manager not found" }),
      ApiBadRequestResponse({ description: "Invalid update data" }),
      ApiForbiddenResponse({
        description: "Only SuperAdmin can update managers",
      }),
    ),

  deactivateManager: () =>
    applyDecorators(
      ApiOperation({
        summary: "Deactivate manager",
        description:
          "Deactivates a manager account (soft delete). Manager will lose access to the system.",
      }),
      ApiParam({ name: "id", type: String, description: "Manager ID (UUID)" }),
      ApiOkResponse({
        description: "Manager deactivated successfully",
        type: ManagerResponseDto,
        schema: {
          example: {
            id: "uuid",
            email: "manager@university.edu",
            displayName: "John",
            secondName: "Manager",
            role: "Admin",
            isActive: false,
            dormitoryId: "123e4567-e89b-12d3-a456-426614174000",
            deactivatedAt: "2025-10-03T12:45:00.000Z",
          },
        },
      }),
      ApiNotFoundResponse({ description: "Manager not found" }),
      ApiBadRequestResponse({ description: "Manager is already deactivated" }),
      ApiForbiddenResponse({
        description: "Unauthorized or insufficient role",
      }),
    ),

  activateManager: () =>
    applyDecorators(
      ApiOperation({
        summary: "Activate manager",
        description:
          "Reactivates a deactivated manager account. Manager will regain access to the system.",
      }),
      ApiParam({ name: "id", type: String, description: "Manager ID (UUID)" }),
      ApiOkResponse({
        description: "Manager activated successfully",
        type: ManagerResponseDto,
        schema: {
          example: {
            id: "uuid",
            email: "manager@university.edu",
            displayName: "John",
            secondName: "Manager",
            role: "Admin",
            isActive: true,
            dormitoryId: "123e4567-e89b-12d3-a456-426614174000",
            reactivatedAt: "2025-10-03T13:00:00.000Z",
          },
        },
      }),
      ApiNotFoundResponse({ description: "Manager not found" }),
      ApiBadRequestResponse({ description: "Manager is already active" }),
      ApiForbiddenResponse({
        description: "Unauthorized or insufficient role",
      }),
    ),
};
