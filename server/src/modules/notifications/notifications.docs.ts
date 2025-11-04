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
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from "@nestjs/swagger";
import { $Enums } from "../../../__generated__";

export const NotificationsDocs = {
  controller: () => applyDecorators(ApiTags("Notifications"), ApiBearerAuth()),

  getNotifications: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get user notifications with filters",
        description:
          "Retrieves notifications for the authenticated user with optional filtering by type, read status, date range, and priority. Returns paginated results sorted by creation date (newest first).",
      }),
      ApiQuery({
        name: "type",
        enum: $Enums.NotificationType,
        required: false,
        description: "Filter by notification type",
        examples: {
          roomBooking: {
            summary: "Room booking notifications",
            value: "ROOM_BOOKING_REQUEST",
          },
          payment: {
            summary: "Payment notifications",
            value: "PAYMENT_DUE",
          },
          announcement: {
            summary: "Announcement notifications",
            value: "ANNOUNCEMENT",
          },
        },
      }),
      ApiQuery({
        name: "startDate",
        type: String,
        required: false,
        description: "Filter notifications from this date (ISO 8601 format)",
        example: "2025-10-01T00:00:00.000Z",
      }),
      ApiQuery({
        name: "endDate",
        type: String,
        required: false,
        description: "Filter notifications until this date (ISO 8601 format)",
        example: "2025-10-31T23:59:59.000Z",
      }),
      ApiQuery({
        name: "priority",
        enum: $Enums.NotificationPriority,
        required: false,
        description: "Filter by notification priority",
        examples: {
          high: {
            summary: "High priority notifications",
            value: "HIGH",
          },
          normal: {
            summary: "Normal priority notifications",
            value: "NORMAL",
          },
          low: {
            summary: "Low priority notifications",
            value: "LOW",
          },
        },
      }),
      ApiOkResponse({
        description: "List of notifications with pagination",
        schema: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    format: "uuid",
                    example: "123e4567-e89b-12d3-a456-426614174000",
                  },
                  type: {
                    type: "string",
                    enum: Object.values($Enums.NotificationType),
                    example: "ROOM_BOOKING_REQUEST",
                  },
                  title: {
                    type: "string",
                    example: "Room Booking Request Approved",
                  },
                  message: {
                    type: "string",
                    example:
                      "Your booking request for room 301 has been approved.",
                  },
                  priority: {
                    type: "string",
                    enum: Object.values($Enums.NotificationPriority),
                    example: "HIGH",
                  },
                  isRead: { type: "boolean", example: false },
                  data: {
                    type: "object",
                    description:
                      "Additional notification data (varies by type)",
                    example: {
                      roomId: "456e7890-e89b-12d3-a456-426614174001",
                      roomNumber: "301",
                      checkInDate: "2025-10-15T00:00:00.000Z",
                    },
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-10-03T10:30:00.000Z",
                  },
                  readAt: {
                    type: "string",
                    format: "date-time",
                    nullable: true,
                    example: null,
                    description:
                      "Timestamp when notification was read (null if unread)",
                  },
                },
              },
            },
            pagination: {
              type: "object",
              properties: {
                total: { type: "number", example: 45 },
                page: { type: "number", example: 1 },
                limit: { type: "number", example: 20 },
                totalPages: { type: "number", example: 3 },
                hasNext: { type: "boolean", example: true },
                hasPrev: { type: "boolean", example: false },
              },
            },
            filters: {
              type: "object",
              description: "Applied filters for reference",
              properties: {
                type: { type: "string", nullable: true },
                isRead: { type: "boolean", nullable: true },
                startDate: { type: "string", nullable: true },
                endDate: { type: "string", nullable: true },
                priority: { type: "string", nullable: true },
              },
            },
          },
        },
      }),
      ApiForbiddenResponse({ description: "Authentication required" }),
      ApiBadRequestResponse({
        description: "Invalid filter parameters",
        schema: {
          example: {
            statusCode: 400,
            message: [
              "Invalid date format for startDate",
              "isRead must be a boolean value",
            ],
            error: "Bad Request",
          },
        },
      }),
    ),

  getUnreadCount: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get unread notifications count",
        description:
          "Returns the total number of unread notifications for the authenticated user. Useful for displaying notification badges in the UI.",
      }),
      ApiOkResponse({
        description: "Unread notifications count",
        schema: {
          type: "object",
          properties: {
            unreadCount: {
              type: "number",
              example: 5,
              description: "Total number of unread notifications",
            },
            lastUpdated: {
              type: "string",
              format: "date-time",
              example: "2025-10-03T10:30:00.000Z",
              description: "Timestamp of the last notification",
            },
          },
        },
      }),
      ApiForbiddenResponse({ description: "Authentication required" }),
    ),

  getNotificationStats: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get notification statistics",
        description:
          "Returns comprehensive statistics about user's notifications including counts by type, priority, and read status. Useful for analytics and dashboard displays.",
      }),
      ApiOkResponse({
        description: "Notification statistics",
        schema: {
          type: "object",
          properties: {
            total: {
              type: "number",
              example: 150,
              description: "Total notifications received",
            },
            unread: {
              type: "number",
              example: 12,
              description: "Total unread notifications",
            },
            read: {
              type: "number",
              example: 138,
              description: "Total read notifications",
            },
            byType: {
              type: "object",
              description: "Notification counts grouped by type",
              properties: {
                ROOM_BOOKING_REQUEST: { type: "number", example: 15 },
                PAYMENT_DUE: { type: "number", example: 8 },
                PAYMENT_CONFIRMED: { type: "number", example: 7 },
                ANNOUNCEMENT: { type: "number", example: 45 },
                SYSTEM_MAINTENANCE: { type: "number", example: 3 },
                ROOM_ASSIGNMENT: { type: "number", example: 2 },
              },
            },
            byPriority: {
              type: "object",
              description: "Notification counts grouped by priority",
              properties: {
                HIGH: { type: "number", example: 8 },
                NORMAL: { type: "number", example: 125 },
                LOW: { type: "number", example: 17 },
              },
            },
            recentActivity: {
              type: "object",
              description: "Recent notification activity",
              properties: {
                last24Hours: { type: "number", example: 3 },
                last7Days: { type: "number", example: 12 },
                last30Days: { type: "number", example: 45 },
              },
            },
            oldestUnread: {
              type: "string",
              format: "date-time",
              nullable: true,
              example: "2025-09-28T14:20:00.000Z",
              description: "Timestamp of the oldest unread notification",
            },
          },
        },
      }),
      ApiForbiddenResponse({ description: "Authentication required" }),
    ),

  markAsRead: () =>
    applyDecorators(
      ApiOperation({
        summary: "Mark notification as read",
        description:
          "Marks a specific notification as read for the authenticated user. Updates the readAt timestamp and decreases the unread count.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Notification ID (UUID)",
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
      ApiOkResponse({
        description: "Notification marked as read successfully",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "123e4567-e89b-12d3-a456-426614174000",
            },
            isRead: { type: "boolean", example: true },
            readAt: {
              type: "string",
              format: "date-time",
              example: "2025-10-03T10:45:00.000Z",
              description: "Timestamp when notification was marked as read",
            },
            message: { type: "string", example: "Notification marked as read" },
          },
        },
      }),
      ApiNotFoundResponse({
        description: "Notification not found or not accessible by user",
        schema: {
          example: {
            statusCode: 404,
            message: "Notification not found",
            error: "Not Found",
          },
        },
      }),
      ApiBadRequestResponse({
        description: "Notification already read or invalid ID",
        schema: {
          example: {
            statusCode: 400,
            message: "Notification is already marked as read",
            error: "Bad Request",
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Authentication required or insufficient permissions",
      }),
    ),

  createAnnouncement: () =>
    applyDecorators(
      ApiOperation({
        summary: "Create admin announcement notification",
        description:
          "Creates announcement notifications for specified users. Only admins can send announcements. Supports targeting multiple users simultaneously.",
      }),
      ApiBody({
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Important: Dormitory Maintenance",
              description: "Announcement title (max 200 characters)",
              maxLength: 200,
            },
            message: {
              type: "string",
              example:
                "Dear residents, the dormitory will undergo scheduled maintenance on October 15th from 9 AM to 5 PM. Water and electricity may be temporarily unavailable.",
              description: "Announcement message content (max 1000 characters)",
              maxLength: 1000,
            },
            targetUserIds: {
              type: "array",
              items: { type: "string", format: "uuid" },
              example: [
                "123e4567-e89b-12d3-a456-426614174000",
                "456e7890-e89b-12d3-a456-426614174001",
              ],
              description: "Array of user IDs to receive the announcement",
              minItems: 1,
              maxItems: 1000,
            },
          },
          required: ["title", "message", "targetUserIds"],
        },
        examples: {
          dormitoryMaintenance: {
            summary: "Dormitory maintenance announcement",
            value: {
              title: "Scheduled Maintenance - October 15th",
              message:
                "Water and electricity will be temporarily unavailable during maintenance work.",
              targetUserIds: ["123e4567-e89b-12d3-a456-426614174000"],
            },
          },
          emergencyNotice: {
            summary: "Emergency announcement",
            value: {
              title: "URGENT: Emergency Evacuation Drill",
              message:
                "Emergency evacuation drill will be conducted today at 3 PM. Please follow safety protocols.",
              targetUserIds: [
                "123e4567-e89b-12d3-a456-426614174000",
                "456e7890-e89b-12d3-a456-426614174001",
              ],
            },
          },
        },
      }),
      ApiCreatedResponse({
        description: "Announcement notifications created successfully",
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Announcement sent successfully",
            },
            notificationsCreated: { type: "number", example: 25 },
            targetUsers: { type: "number", example: 25 },
            failedDeliveries: { type: "number", example: 0 },
            announcementId: {
              type: "string",
              format: "uuid",
              example: "789e0123-e89b-12d3-a456-426614174002",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-10-03T11:00:00.000Z",
            },
            summary: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Scheduled Maintenance - October 15th",
                },
                recipientCount: { type: "number", example: 25 },
                priority: { type: "string", example: "HIGH" },
                estimatedReadTime: { type: "string", example: "30 seconds" },
              },
            },
          },
        },
      }),
      ApiBadRequestResponse({
        description: "Invalid announcement data",
        schema: {
          example: {
            statusCode: 400,
            message: [
              "Title is required and cannot be empty",
              "Message exceeds maximum length of 1000 characters",
              "targetUserIds must contain at least 1 user ID",
            ],
            error: "Bad Request",
          },
        },
      }),
      ApiForbiddenResponse({
        description: "Only admins can create announcements",
        schema: {
          example: {
            statusCode: 403,
            message: "Insufficient permissions. Admin role required.",
            error: "Forbidden",
          },
        },
      }),
    ),

  createTestNotification: () =>
    applyDecorators(
      ApiOperation({
        summary: "Create test notification",
        description:
          "Creates a test notification for the authenticated user. Useful for testing notification delivery and UI display. Only available in development/testing environments.",
      }),
      ApiCreatedResponse({
        description: "Test notification created successfully",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "test-123e4567-e89b-12d3-a456-426614174000",
            },
            type: { type: "string", example: "ROOM_BOOKING_REQUEST" },
            title: { type: "string", example: "Test Notification" },
            message: {
              type: "string",
              example: "This is a test notification to verify the system works",
            },
            priority: { type: "string", example: "NORMAL" },
            isRead: { type: "boolean", example: false },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-10-03T11:15:00.000Z",
            },
            testMetadata: {
              type: "object",
              properties: {
                environment: { type: "string", example: "development" },
                purpose: { type: "string", example: "System verification" },
                autoExpire: { type: "boolean", example: true },
                expiresAt: {
                  type: "string",
                  format: "date-time",
                  example: "2025-10-03T12:15:00.000Z",
                },
              },
            },
          },
        },
      }),
      ApiForbiddenResponse({ description: "Authentication required" }),
      ApiBadRequestResponse({
        description: "Test notifications not available in production",
        schema: {
          example: {
            statusCode: 400,
            message:
              "Test notifications are not available in production environment",
            error: "Bad Request",
          },
        },
      }),
    ),
};
