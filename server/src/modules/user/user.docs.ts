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
} from "@nestjs/swagger";
import { UpdateUserDto } from "@/modules/user/dto/update-user.dto";

export const UserDocs = {
  controller: () => applyDecorators(ApiTags("Users"), ApiBearerAuth()),

  findProfile: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get current user profile",
        description: "Returns the profile of the currently authenticated user.",
      }),
      ApiOkResponse({
        description: "Current user profile",
        schema: {
          example: {
            id: "uuid",
            email: "user@example.com",
            displayName: "Bohdan",
            isTwoFactorEnabled: true,
            createdAt: "2024-07-01T12:00:00.000Z",
            updatedAt: "2024-07-01T12:00:00.000Z",
          },
        },
      }),
      ApiForbiddenResponse({ description: "Unauthorized access" }),
    ),

  findById: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get user by ID",
        description:
          "Returns the profile of a user by their ID. Only for Admin or SuperAdmin.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "User ID to look up",
      }),
      ApiOkResponse({
        description: "User profile found",
        schema: {
          example: {
            id: "uuid",
            email: "user@example.com",
            displayName: "Bohdan",
            isTwoFactorEnabled: true,
            createdAt: "2024-07-01T12:00:00.000Z",
            updatedAt: "2024-07-01T12:00:00.000Z",
          },
        },
      }),
      ApiNotFoundResponse({ description: "User not found" }),
      ApiForbiddenResponse({
        description: "Unauthorized or insufficient role",
      }),
    ),

  updateProfile: () =>
    applyDecorators(
      ApiOperation({
        summary: "Update current user profile",
        description: "Allows a verified user to update their profile details.",
      }),
      ApiBody({
        type: UpdateUserDto,
        description: "Data to update in the user profile",
        examples: {
          updateExample: {
            summary: "Update display name and 2FA status",
            value: {
              name: "Updated Name",
              email: "updated@example.com",
              isTwoFactorEnabled: true,
            },
          },
        },
      }),
      ApiOkResponse({
        description: "Updated user profile",
        schema: {
          example: {
            id: "uuid",
            email: "updated@example.com",
            displayName: "Updated Name",
            secondName: "Updated Second Name",
            isTwoFactorEnabled: true,
            updatedAt: "2025-08-26T12:00:00.000Z",
          },
        },
      }),
      ApiForbiddenResponse({ description: "Unauthorized" }),
      ApiNotFoundResponse({ description: "User not found" }),
    ),

  findAll: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get all users",
        description:
          "Returns a list of users with pagination. Can be filtered by query parameters. Admin/SuperAdmin only.",
      }),
      ApiQuery({
        name: "email",
        required: false,
        description: "Filter users by email",
        example: "user@example.com",
      }),
      ApiQuery({
        name: "displayName",
        required: false,
        description: "Filter users by display name",
        example: "Bohdan",
      }),
      ApiQuery({
        name: "page",
        required: false,
        description: "Page number (default: 1)",
        example: 2,
      }),
      ApiQuery({
        name: "limit",
        required: false,
        description: "Items per page (default: 10)",
        example: 5,
      }),
      ApiOkResponse({
        description: "Paginated list of users",
        schema: {
          example: {
            data: [
              {
                id: "uuid",
                email: "user@example.com",
                displayName: "Bohdan",
                role: "Admin",
                createdAt: "2025-08-28T12:32:14.349Z",
                updatedAt: "2025-08-28T12:32:14.349Z",
              },
            ],
            total: 1,
            page: 1,
            last_page: 1,
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Unauthorized or insufficient role",
      }),
    ),

  getAllResidents: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get all active residents",
        description:
          "Retrieves a list of all users with the role of Resident who are currently active",
      }),
      ApiResponse({
        status: 200,
        description: "Successfully retrieved all active residents",
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              email: { type: "string", format: "email" },
              displayName: { type: "string" },
              secondName: { type: "string" },
              role: { type: "string", enum: ["Admin", "Resident"] },
              isActive: { type: "boolean" },
              isVerified: { type: "boolean" },
              isTwoFactorEnabled: { type: "boolean" },
              picture: { type: "string", nullable: true },
              dormitoryId: { type: "string", format: "uuid", nullable: true },
              roomId: { type: "string", format: "uuid", nullable: true },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
      }),
    ),

  deactivateUser: () =>
    applyDecorators(
      ApiOperation({
        summary: "Deactivate user",
        description: "Deactivates a user account (soft delete)",
      }),
      ApiParam({ name: "id", type: String, description: "User ID" }),
      ApiOkResponse({ description: "User deactivated successfully" }),
      ApiResponse({ status: 404, description: "User not found" }),
      ApiResponse({ status: 400, description: "User is already deactivated" }),
    ),

  activateUser: () =>
    applyDecorators(
      ApiOperation({
        summary: "Activate user",
        description: "Activates a previously deactivated user account",
      }),
      ApiParam({ name: "id", type: String, description: "User ID" }),
      ApiOkResponse({ description: "User activated successfully" }),
      ApiResponse({ status: 404, description: "User not found" }),
    ),
};
