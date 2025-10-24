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
  ApiConsumes,
  ApiBadRequestResponse,
} from "@nestjs/swagger";
import { UpdateAdminProfileDto } from "../dto/UpdateAdminProfile.dto";
import { UpdateConfirmationStatusDto } from "@/modules/confirmation/dto/UpdateConfirmationStatus.dto";
import { $Enums, ConfirmationStatus } from "../../../../__generated__";
import ConfirmationType = $Enums.ConfirmationType;

const ALLOWED_VERSIONS = ["original", "mobile", "tablet", "desktop"] as const;

export const AdminDocs = {
  controller: () => applyDecorators(ApiTags("Admin"), ApiBearerAuth()),

  getAllConfirmations: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get all confirmations",
        description:
          "Returns a paginated list of confirmations filtered by type, status, and requester name.",
      }),
      ApiQuery({
        name: "type",
        enum: ConfirmationType,
        required: false,
        description: "Filter by confirmation type",
      }),
      ApiQuery({
        name: "status",
        enum: ConfirmationStatus,
        required: false,
        description: "Filter by confirmation status",
      }),
      ApiQuery({
        name: "addressee",
        type: String,
        required: false,
        description: "Filter by requester name",
      }),
      ApiQuery({
        name: "page",
        type: Number,
        required: false,
        example: 1,
        description: "Page number (default: 1)",
      }),
      ApiQuery({
        name: "limit",
        type: Number,
        required: false,
        example: 10,
        description: "Items per page (default: 10)",
      }),
      ApiOkResponse({
        description: "Paginated list of confirmations",
        schema: {
          example: {
            data: [
              {
                id: "uuid",
                status: "PENDING",
                type: "IDENTITY_VERIFICATION",
                requester: {
                  id: "uuid",
                  displayName: "John Doe",
                },
                createdAt: "2024-06-30T12:00:00.000Z",
              },
            ],
            total: 42,
            page: 1,
            pageCount: 5,
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Unauthorized or insufficient role",
      }),
    ),

  updateConfirmationStatus: () =>
    applyDecorators(
      ApiOperation({
        summary: "Update a confirmation status",
        description:
          "Allows an admin to change the status of a confirmation request.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Confirmation ID to update",
      }),
      ApiBody({
        type: UpdateConfirmationStatusDto,
        description: "New confirmation status",
      }),
      ApiOkResponse({
        description: "Updated confirmation object",
        schema: {
          example: {
            id: "uuid",
            status: "APPROVED",
            type: "IDENTITY_VERIFICATION",
            requester: {
              id: "uuid",
              displayName: "John Doe",
            },
            updatedAt: "2024-06-30T12:00:00.000Z",
          },
        },
      }),
      ApiNotFoundResponse({ description: "Confirmation not found" }),
      ApiBadRequestResponse({ description: "Invalid status value" }),
    ),

  getMyProfile: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get current admin profile",
        description:
          "Returns the profile details of the currently authenticated admin.",
      }),
      ApiOkResponse({
        description: "Current admin profile",
        schema: {
          example: {
            id: "uuid",
            displayName: "Joanna",
            secondName: "Goździk",
            email: "j.gozdzik@pollub.com",
            picture: "https://example.com/photo.png",
            role: "Admin",
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Unauthorized or insufficient role",
      }),
      ApiNotFoundResponse({ description: "Admin profile not found" }),
    ),

  updateMyProfile: () =>
    applyDecorators(
      ApiOperation({
        summary: "Update current admin profile",
        description:
          "Allows the currently authenticated admin to update their profile details.",
      }),
      ApiBody({
        type: UpdateAdminProfileDto,
        description: "Fields to update in the admin profile",
        examples: {
          updateName: {
            summary: "Update display name",
            value: {
              displayName: "Updated Name",
            },
          },
          updateComplete: {
            summary: "Update multiple fields",
            value: {
              displayName: "Joanna",
              secondName: "Updated Surname",
              email: "updated.email@pollub.com",
            },
          },
        },
      }),
      ApiOkResponse({
        description: "Updated admin profile",
        schema: {
          example: {
            id: "uuid",
            displayName: "Joanna",
            secondName: "Goździk",
            email: "j.gozdzik@pollub.com",
            picture: "https://example.com/photo-updated.png",
            role: "Admin",
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Unauthorized or insufficient role",
      }),
      ApiNotFoundResponse({ description: "Admin profile not found" }),
      ApiBadRequestResponse({ description: "Invalid profile data" }),
    ),

  uploadAvatar: () =>
    applyDecorators(
      ApiOperation({
        summary: "Upload admin avatar",
        description:
          "Uploads and updates the avatar for the current admin user",
      }),
      ApiConsumes("multipart/form-data"),
      ApiQuery({
        name: "version",
        required: false,
        enum: ALLOWED_VERSIONS,
        description: "Image version to generate",
        example: "original",
      }),
      ApiBody({
        schema: {
          type: "object",
          properties: {
            file: { type: "string", format: "binary" },
          },
        },
      }),
      ApiOkResponse({
        description: "Avatar uploaded and profile updated successfully",
        schema: {
          example: {
            id: "uuid",
            displayName: "Joanna",
            secondName: "Goździk",
            email: "j.gozdzik@pollub.com",
            picture: "https://example.com/new-avatar.png",
            role: "Admin",
          },
        },
      }),
      ApiBadRequestResponse({ description: "Invalid file format or size" }),
      ApiForbiddenResponse({
        description: "Unauthorized or insufficient role",
      }),
    ),

  reject: () =>
    applyDecorators(
      ApiOperation({
        summary: "Reject a confirmation with reason",
        description:
          "Allows an admin to reject a confirmation request with a specified reason.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Confirmation ID to reject",
      }),
      ApiBody({
        schema: {
          type: "object",
          properties: {
            reason: {
              type: "string",
              example: "The provided documents are invalid.",
            },
          },
          required: ["reason"],
        },
        description: "Reason for rejection",
      }),
      ApiOkResponse({
        description: "Rejected confirmation object",
        schema: {
          example: {
            id: "uuid",
            status: "REJECTED",
            type: "IDENTITY_VERIFICATION",
            rejectionReason: "The provided documents are invalid.",
            requester: {
              id: "uuid",
              displayName: "John Doe",
            },
            updatedAt: "2024-06-30T12:00:00.000Z",
          },
        },
      }),
      ApiNotFoundResponse({ description: "Confirmation not found" }),
      ApiBadRequestResponse({
        description: "Invalid reason or confirmation already processed",
      }),
    ),
};
