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
  controller: () =>
    applyDecorators(
      ApiTags("Announcements"),
      ApiBearerAuth()
    ),

  create: () =>
    applyDecorators(
      ApiOperation({ 
        summary: 'Create announcement', 
        description: 'Creates a new announcement that can be public or private. Only admins can create announcements.'
      }),
      ApiBody({ 
        type: CreateAnnouncementDto,
        examples: {
          publicAnnouncement: {
            summary: "Public announcement",
            value: {
              title: "Dormitory Maintenance",
              content: "Water will be shut off tomorrow from 9 AM to 5 PM for maintenance work.",
              isPublic: true,
              isImportant: true,
              validFrom: "2025-10-03T00:00:00.000Z",
              validTo: "2025-10-04T23:59:59.000Z",
              attachments: ["https://s3.example.com/maintenance-notice.pdf"]
            }
          },
          privateAnnouncement: {
            summary: "Private announcement (admin only)",
            value: {
              title: "Staff Meeting",
              content: "Monthly staff meeting scheduled for next Friday at 2 PM in the conference room.",
              isPublic: false,
              isImportant: false,
              validFrom: "2025-10-03T00:00:00.000Z",
              validTo: "2025-10-10T23:59:59.000Z"
            }
          }
        }
      }),
      ApiCreatedResponse({ 
        description: 'Announcement created successfully', 
        type: AnnouncementResponseDto,
        schema: {
          example: {
            id: "uuid",
            title: "Dormitory Maintenance",
            content: "Water will be shut off tomorrow from 9 AM to 5 PM for maintenance work.",
            isPublic: true,
            isImportant: true,
            isHidden: false,
            validFrom: "2025-10-03T00:00:00.000Z",
            validTo: "2025-10-04T23:59:59.000Z",
            attachments: ["https://s3.example.com/maintenance-notice.pdf"],
            authorId: "uuid",
            author: {
              id: "uuid",
              displayName: "Admin User"
            },
            createdAt: "2025-10-03T10:00:00.000Z",
            updatedAt: "2025-10-03T10:00:00.000Z"
          }
        }
      }),
      ApiBadRequestResponse({ description: 'Invalid announcement data' }),
      ApiForbiddenResponse({ description: 'Only admins can create announcements' })
    ),

  findPublic: () =>
    applyDecorators(
      ApiOperation({ 
        summary: 'Get all public announcements (for everyone)',
        description: 'Returns paginated list of public announcements. No authentication required.'
      }),
      ApiQuery({ name: 'showHidden', required: false, type: Boolean, description: 'Include hidden announcements (admin only)' }),
      ApiQuery({ name: 'showExpired', required: false, type: Boolean, description: 'Include expired announcements' }),
      ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (pagination)', example: 1 }),
      ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (pagination)', example: 20 }),
      ApiOkResponse({
        description: 'List of public announcements with pagination',
        schema: {
          type: 'object',
          properties: {
            data: { 
              type: 'array', 
              items: { 
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  title: { type: 'string' },
                  content: { type: 'string' },
                  isPublic: { type: 'boolean', example: true },
                  isImportant: { type: 'boolean' },
                  isHidden: { type: 'boolean', example: false },
                  validFrom: { type: 'string', format: 'date-time' },
                  validTo: { type: 'string', format: 'date-time' },
                  attachments: { type: 'array', items: { type: 'string' } },
                  author: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', format: 'uuid' },
                      displayName: { type: 'string' }
                    }
                  },
                  createdAt: { type: 'string', format: 'date-time' }
                }
              }
            },
            pagination: {
              type: 'object',
              properties: {
                total: { type: 'number', example: 100 },
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 20 },
                totalPages: { type: 'number', example: 5 },
              },
            },
          },
        },
      })
    ),

  findAll: () =>
    applyDecorators(
      ApiOperation({ 
        summary: 'Get all announcements (admin only)',
        description: 'Returns paginated list of all announcements including private ones. Admin access required.'
      }),
      ApiQuery({ name: 'showHidden', required: false, type: Boolean, description: 'Include hidden announcements' }),
      ApiQuery({ name: 'showExpired', required: false, type: Boolean, description: 'Include expired announcements' }),
      ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Page number' }),
      ApiQuery({ name: 'limit', required: false, type: Number, example: 20, description: 'Items per page' }),
      ApiOkResponse({
        description: 'List of announcements with pagination',
        schema: {
          type: 'object',
          properties: {
            data: { 
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  title: { type: 'string' },
                  content: { type: 'string' },
                  isPublic: { type: 'boolean' },
                  isImportant: { type: 'boolean' },
                  isHidden: { type: 'boolean' },
                  validFrom: { type: 'string', format: 'date-time' },
                  validTo: { type: 'string', format: 'date-time' },
                  attachments: { type: 'array', items: { type: 'string' } },
                  author: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', format: 'uuid' },
                      displayName: { type: 'string' }
                    }
                  },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' }
                }
              }
            },
            pagination: {
              type: 'object',
              properties: {
                total: { type: 'number', example: 100 },
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 20 },
                totalPages: { type: 'number', example: 5 },
              },
            },
          },
        },
      }),
      ApiForbiddenResponse({ description: 'Admin access required' })
    ),

  getById: () =>
    applyDecorators(
      ApiOperation({ 
        summary: 'Get announcement by ID',
        description: 'Returns detailed information about a specific announcement'
      }),
      ApiParam({ name: 'id', type: String, description: 'Announcement ID (UUID)' }),
      ApiOkResponse({ 
        description: 'Announcement found', 
        type: AnnouncementResponseDto,
        schema: {
          example: {
            id: "uuid",
            title: "Dormitory Maintenance",
            content: "Water will be shut off tomorrow from 9 AM to 5 PM for maintenance work.",
            isPublic: true,
            isImportant: true,
            isHidden: false,
            validFrom: "2025-10-03T00:00:00.000Z",
            validTo: "2025-10-04T23:59:59.000Z",
            attachments: ["https://s3.example.com/maintenance-notice.pdf"],
            authorId: "uuid",
            author: {
              id: "uuid",
              displayName: "Admin User",
              email: "admin@university.edu"
            },
            createdAt: "2025-10-03T10:00:00.000Z",
            updatedAt: "2025-10-03T10:00:00.000Z"
          }
        }
      }),
      ApiNotFoundResponse({ description: 'Announcement not found' }),
      ApiForbiddenResponse({ description: 'Access denied for private announcements' })
    ),

  remove: () =>
    applyDecorators(
      ApiOperation({ 
        summary: 'Delete announcement (soft delete)',
        description: 'Marks an announcement as deleted (soft delete). Only admins can delete announcements.'
      }),
      ApiParam({ name: 'id', type: String, description: 'Announcement ID (UUID)' }),
      ApiOkResponse({ 
        description: 'Announcement deleted (soft)',
        schema: {
          example: {
            id: "uuid",
            title: "Dormitory Maintenance",
            isDeleted: true,
            deletedAt: "2025-10-03T15:00:00.000Z"
          }
        }
      }),
      ApiNotFoundResponse({ description: 'Announcement not found' }),
      ApiForbiddenResponse({ description: 'Only admins can delete announcements' }),
      ApiBadRequestResponse({ description: 'Announcement already deleted' })
    ),

  upload: () =>
    applyDecorators(
      ApiOperation({ 
        summary: 'Upload announcement attachments',
        description: 'Uploads files to be used as attachments in announcements. Returns array of file URLs.'
      }),
      ApiConsumes('multipart/form-data'),
      ApiBody({
        schema: {
          type: 'object',
          properties: {
            files: {
              type: 'array',
              items: { type: 'string', format: 'binary' },
              description: 'Files to upload (documents, images, etc.)'
            }
          }
        }
      }),
      ApiCreatedResponse({ 
        description: 'Files uploaded successfully',
        schema: {
          type: 'object',
          properties: {
            urls: {
              type: 'array',
              items: { type: 'string' },
              example: [
                "https://s3.example.com/announcements/document1.pdf",
                "https://s3.example.com/announcements/image1.jpg"
              ]
            }
          }
        }
      }),
      ApiBadRequestResponse({ description: 'Invalid file format or size' }),
      ApiForbiddenResponse({ description: 'Only admins can upload files' })
    ),
};