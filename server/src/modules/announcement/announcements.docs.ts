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
  ApiCreatedResponse,
} from "@nestjs/swagger";
import { CreateAnnouncementDto } from "./dto/create-announcement.dto";
import { AnnouncementResponseDto } from "./dto/announcement-response.dto";

export const AnnouncementDocs = {
  controller: () => applyDecorators(ApiTags("Announcements"), ApiBearerAuth()),

  create: () =>
    applyDecorators(
      ApiOperation({
        summary: "Create new announcement",
        description:
          "Creates a new announcement that may be public or targeted to specific users, rooms, or floors. Only Admins can perform this action.",
      }),
      ApiBody({
        type: CreateAnnouncementDto,
        examples: {
          forEveryone: {
            summary: "Public announcement for everyone",
            value: {
              title: "Electricity Maintenance",
              content:
                "Electricity will be unavailable on Tuesday between 10:00 and 16:00 due to maintenance work.",
              expiresAt: "2025-10-12T16:00:00.000Z",
              forEveryone: true,
              attachmentUrls: [
                "https://s3.example.com/announcements/maintenance-info.pdf",
              ],
            },
          },
          forSpecificUsers: {
            summary: "Announcement for specific users and rooms",
            value: {
              title: "Room Inspection",
              content:
                "Scheduled room inspection for selected rooms this weekend.",
              expiresAt: "2025-10-10T23:59:59.000Z",
              userIds: ["uuid-user-1", "uuid-user-2"],
              roomIds: ["uuid-room-101", "uuid-room-202"],
              floorIds: ["uuid-floor-1", "uuid-floor-2"],
              attachmentUrls: [
                "https://s3.example.com/announcements/inspection-schedule.pdf",
              ],
            },
          },
        },
      }),
      ApiCreatedResponse({
        description: "Announcement created successfully",
        type: AnnouncementResponseDto,
        schema: {
          example: {
            id: "uuid-announcement-1",
            title: "Electricity Maintenance",
            content:
              "Electricity will be unavailable on Tuesday between 10:00 and 16:00 due to maintenance work.",
            expiresAt: "2025-10-12T16:00:00.000Z",
            isHidden: false,
            postedAt: "2025-10-07T10:00:00.000Z",
            attachments: [
              {
                id: "uuid-attach-1",
                url: "https://s3.example.com/announcements/maintenance-info.pdf",
                filename: "maintenance-info.pdf",
              },
            ],
            recipients: [{ id: "uuid-rec-1", forEveryone: true }],
            authorId: "uuid-admin-1",
            author: {
              id: "uuid-admin-1",
              displayName: "Admin User",
              email: "admin@university.edu",
            },
            createdAt: "2025-10-07T10:00:00.000Z",
            updatedAt: "2025-10-07T10:00:00.000Z",
          },
        },
      }),
      ApiBadRequestResponse({ description: "Invalid announcement data" }),
      ApiForbiddenResponse({
        description: "Only admins can create announcements",
      }),
    ),

  findPublic: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get all public announcements",
        description:
          "Returns a paginated list of announcements visible to everyone (no authentication required).",
      }),
      ApiQuery({
        name: "showHidden",
        required: false,
        type: Boolean,
        description: "Include hidden announcements (admin only)",
      }),
      ApiQuery({
        name: "showExpired",
        required: false,
        type: Boolean,
        description: "Include expired announcements",
      }),
      ApiQuery({ name: "page", required: false, type: Number, example: 1 }),
      ApiQuery({ name: "limit", required: false, type: Number, example: 20 }),
      ApiOkResponse({
        description: "List of public announcements with pagination",
        schema: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  title: { type: "string" },
                  content: { type: "string" },
                  isHidden: { type: "boolean", example: false },
                  validTo: { type: "string", format: "date-time" },
                  attachments: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        url: { type: "string" },
                        filename: { type: "string" },
                      },
                    },
                  },
                  recipients: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        forEveryone: { type: "boolean" },
                        roomId: { type: "string", nullable: true },
                        userId: { type: "string", nullable: true },
                        floorId: { type: "string", nullable: true },
                      },
                    },
                  },
                  author: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      displayName: { type: "string" },
                    },
                  },
                  createdAt: { type: "string", format: "date-time" },
                },
              },
            },
            pagination: {
              type: "object",
              properties: {
                total: { type: "number", example: 42 },
                page: { type: "number", example: 1 },
                limit: { type: "number", example: 10 },
                totalPages: { type: "number", example: 5 },
              },
            },
          },
        },
      }),
    ),

  findAll: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get all announcements (admin only)",
        description:
          "Returns all announcements including private and hidden ones. Admin access required.",
      }),
      ApiQuery({ name: "showHidden", required: false, type: Boolean }),
      ApiQuery({ name: "showExpired", required: false, type: Boolean }),
      ApiQuery({ name: "page", required: false, type: Number, example: 1 }),
      ApiQuery({ name: "limit", required: false, type: Number, example: 20 }),
      ApiOkResponse({
        description: "List of all announcements (admin)",
        schema: {
          example: {
            data: [
              {
                id: "uuid-announcement-1",
                title: "Staff Meeting",
                content:
                  "Staff meeting next Friday at 14:00 in conference room.",
                isHidden: false,
                expiresAt: "2025-10-15T00:00:00.000Z",
                attachments: [],
                recipients: [
                  {
                    id: "uuid-rec-1",
                    userId: "uuid-user-2",
                    forEveryone: false,
                  },
                ],
                author: {
                  id: "uuid-admin-1",
                  displayName: "Admin User",
                },
                createdAt: "2025-10-07T10:00:00.000Z",
              },
            ],
            pagination: {
              total: 1,
              page: 1,
              limit: 20,
              totalPages: 1,
            },
          },
        },
      }),
      ApiForbiddenResponse({ description: "Admin access required" }),
    ),

  getById: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get announcement by ID",
        description:
          "Returns full details of a single announcement including recipients and attachments.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Announcement ID (UUID)",
      }),
      ApiOkResponse({
        description: "Announcement found",
        type: AnnouncementResponseDto,
        schema: {
          example: {
            id: "uuid-announcement-1",
            title: "Dormitory Maintenance",
            content:
              "Water will be shut off tomorrow from 9 AM to 5 PM for maintenance work.",
            expiresAt: "2025-10-09T17:00:00.000Z",
            postedAt: "2025-10-07T09:00:00.000Z",
            attachments: [
              {
                id: "uuid-attach-1",
                url: "https://s3.example.com/maintenance.pdf",
                filename: "maintenance.pdf",
              },
            ],
            recipients: [
              { id: "uuid-rec-1", forEveryone: true },
              { id: "uuid-rec-2", roomId: "uuid-room-101" },
              { id: "uuid-rec-3", floorId: "uuid-floor-3" },
            ],
            authorId: "uuid-admin-1",
            author: {
              id: "uuid-admin-1",
              displayName: "Admin User",
              email: "admin@university.edu",
            },
            createdAt: "2025-10-07T10:00:00.000Z",
            updatedAt: "2025-10-07T10:00:00.000Z",
          },
        },
      }),
      ApiNotFoundResponse({ description: "Announcement not found" }),
    ),

  remove: () =>
    applyDecorators(
      ApiOperation({
        summary: "Soft delete announcement (admin only)",
        description:
          "Marks announcement as hidden instead of removing it permanently.",
      }),
      ApiParam({ name: "id", type: String }),
      ApiOkResponse({
        description: "Announcement hidden successfully",
        schema: {
          example: {
            id: "uuid-announcement-1",
            title: "Dormitory Maintenance",
            isHidden: true,
          },
        },
      }),
      ApiNotFoundResponse({ description: "Announcement not found" }),
      ApiForbiddenResponse({
        description: "Only admins can delete announcements",
      }),
    ),

  upload: () =>
    applyDecorators(
      ApiOperation({
        summary: "Upload announcement attachments",
        description:
          "Uploads files and returns their URLs for use in announcements.",
      }),
      ApiConsumes("multipart/form-data"),
      ApiBody({
        schema: {
          type: "object",
          properties: {
            files: {
              type: "array",
              items: { type: "string", format: "binary" },
              description: "Files to upload (PDF, images, etc.)",
            },
          },
        },
      }),
      ApiCreatedResponse({
        description: "Files uploaded successfully",
        schema: {
          example: {
            urls: [
              "https://s3.example.com/announcements/notice1.pdf",
              "https://s3.example.com/announcements/image2.png",
            ],
          },
        },
      }),
      ApiBadRequestResponse({
        description: "Invalid file format or upload error",
      }),
    ),
};
