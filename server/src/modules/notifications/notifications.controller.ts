import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Param, 
  Query, 
  Body, 
  UseGuards,
  Req 
} from '@nestjs/common';
import { NotificationsService, NotificationFilters } from './notifications.service';
import { Prisma, $Enums, UserRole } from "../../../__generated__";
import { Authorization } from '@/libs/common/decorators/auth.decorator';
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}


  @Authorization()
  @Get()
  async getNotifications(
    @Req() req: any,
    @Query('type') type?: $Enums.NotificationType,
    @Query('isRead') isRead?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('priority') priority?: $Enums.NotificationPriority,
  ) {
    const filters: NotificationFilters = {
      userId: req.user.id,
      type,
      isRead: isRead ? isRead === 'true' : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      priority,
    };

    return await this.notificationsService.getUserNotifications(filters);
  }
  @Authorization()
  @Get('unread-count')
  async getUnreadCount(@Req() req: any) {
    const count = await this.notificationsService.getUnreadCount(req.user.id);
    return { unreadCount: count };
  }

    @Authorization()
  @Get('stats')
  async getNotificationStats(@Req() req: any) {
    return await this.notificationsService.getNotificationStats(req.user.id);
  }
  @Authorization()
  @Patch(':id/read')
  async markAsRead(@Param('id') id: string, @Req() req: any) {
    return await this.notificationsService.markAsRead(
      id, 
      req.user.id
    );
  }
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @Post('admin/announcement')
  async createAnnouncement(
    @Body() body: {
      title: string;
      message: string;
      targetUserIds: string[];
    },
    @Req() req: any
  ) {
    return await this.notificationsService.createAdminAnnouncementNotification(
      body.title,
      body.message,
      body.targetUserIds,
      req.user.id
    );
  }

   @Authorization()
  @Post('test')
  async createTestNotification(@Req() req: any) {
    return await this.notificationsService.createNotification({
      toUserId: req.user.id,
      type: $Enums.NotificationType.ROOM_BOOKING_REQUEST, // Replace with a valid NotificationType value
      title: 'Test Notification',
      message: 'This is a test notification to verify the system works',
      priority: $Enums.NotificationPriority.NORMAL,
    });
  }
}
