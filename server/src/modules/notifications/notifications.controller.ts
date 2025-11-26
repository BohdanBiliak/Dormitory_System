import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  Req,
} from "@nestjs/common";
import {
  NotificationsService,
  NotificationFilters,
} from "./notifications.service";
import { $Enums, UserRole } from "@prisma/client";
import { Authorization } from "@/libs/common/decorators/auth.decorator";
import { NotificationsDocs } from "./notifications.docs";

@NotificationsDocs.controller()
@Controller("notifications")
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) { }

  @Get()
  @Authorization()
  @NotificationsDocs.getNotifications()
  async getNotifications(
    @Req() req: any,
    @Query("type") type?: $Enums.NotificationType,
    @Query("isArchived") isArchived?: string,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string,
    @Query("priority") priority?: $Enums.NotificationPriority,
  ) {
    const filters: NotificationFilters = {
      userId: req.user.id,
      type,
      isArchived: isArchived === "true",
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      priority,
    };

    return this.notificationsService.getUserNotifications(filters);
  }


  @Get("unread-count")
  @Authorization()
  @NotificationsDocs.getUnreadCount()
  async getUnreadCount(@Req() req: any) {
    const count = await this.notificationsService.getUnreadCount(req.user.id);
    return { unreadCount: count };
  }

  @Get("stats")
  @Authorization()
  @NotificationsDocs.getNotificationStats()
  async getNotificationStats(@Req() req: any) {
    return await this.notificationsService.getNotificationStats(req.user.id);
  }

  @Patch(":id/read")
  @Authorization()
  @NotificationsDocs.markAsRead()
  async markAsRead(@Param("id") id: string, @Req() req: any) {
    return await this.notificationsService.markAsRead(id, req.user.id);
  }

  @Post("admin/announcement")
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @NotificationsDocs.createAnnouncement()
  async createAnnouncement(
    @Body()
    body: {
      title: string;
      message: string;
      targetUserIds: string[];
    },
    @Req() req: any,
  ) {
    return await this.notificationsService.createAdminAnnouncementNotification(
      body.title,
      body.message,
      body.targetUserIds,
      req.user.id,
    );
  }

  @Post("test")
  @Authorization()
  @NotificationsDocs.createTestNotification()
  async createTestNotification(@Req() req: any) {
    return await this.notificationsService.createNotification({
      toUserId: req.user.id,
      type: $Enums.NotificationType.ROOM_BOOKING_REQUEST,
      title: "Test Notification",
      message: "This is a test notification to verify the system works",
      priority: $Enums.NotificationPriority.NORMAL,
    });
  }
}
