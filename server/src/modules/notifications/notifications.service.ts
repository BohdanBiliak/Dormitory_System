import { Injectable } from '@nestjs/common';
import { PrismaService } from "@/prisma/prisma.service";
import { Prisma, $Enums } from "../../../__generated__";
import { MailService } from '../../libs/mail/mail.service';
import { NotificationGateway } from './NotificationGateway';

export interface CreateNotificationDto {
  type: $Enums.NotificationType;
  title: string;
  message: string;
  toUserId: string;
  fromUserId?: string;
  priority?: $Enums.NotificationPriority;
  metadata?: any;
  roomId?: string;
  bookingId?: string;
  paymentId?: string;
}

export interface NotificationFilters {
  userId: string;
  type?: $Enums.NotificationType;
  isRead?: boolean;
  isArchived?: boolean;
  startDate?: Date;
  endDate?: Date;
  priority?: $Enums.NotificationPriority;
}

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private emailService: MailService,
    private notificationGateway: NotificationGateway,
  ) {}

async createNotification(data: CreateNotificationDto) {
  try {
    // Create notification in database
    const notification = await this.prisma.notification.create({
      data: {
        type: data.type,
        title: data.title,
        message: data.message,
        toUserId: String(data.toUserId),
        fromUserId: data.fromUserId ? String(data.fromUserId) : null,
        priority: data.priority || $Enums.NotificationPriority.NORMAL,
        metadata: data.metadata,
        roomId: data.roomId ? String(data.roomId) : null,
        bookingId: data.bookingId ? String(data.bookingId) : null,
        paymentId: data.paymentId ? String(data.paymentId) : null,
      },
      include: {
        fromUser: {
          select: {
            id: true,
            email: true,
          }
        },
        toUser: {
          select: {
            id: true,
            email: true,
            notificationSettings: true,
          }
        },
        room: true,
        booking: true,
        payment: true,
      }
    });

    // Send real-time notification via WebSocket
    await this.notificationGateway.sendNotificationToUser(
      data.toUserId,
      notification
    );

    // Send email if user has email notifications enabled
    await this.sendEmailIfEnabled(notification);

    // Log notification creation
    console.log(`📧 Notification created: ${data.type} for user ${data.toUserId}`);

    return notification;

  } catch (error) {
    console.error('❌ Error creating notification:', error);
    throw error;
  }
}

  async getUserNotifications(filters: NotificationFilters) {
    const {
      userId,
      type,
      isRead,
      isArchived = false, // Default to not archived
      startDate,
      endDate,
      priority
    } = filters;

    const where: Prisma.NotificationWhereInput = {
      toUserId: String(userId),
      isArchived,
    };

    if (type) where.type = type;
    if (isRead !== undefined) where.isRead = isRead;
    if (priority) where.priority = priority;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    const notifications = await this.prisma.notification.findMany({
      where,
      include: {
        fromUser: {
          select: {
            id: true,
            email: true,
          }
        },
        room: {
          select: {
            id: true,
            number: true,
            dormitory: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ],
      take: 50, // Limit for optimization
    });

    return notifications;
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id: String(notificationId),
        toUserId: String(userId),
      }
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    // Mark as read and auto-archive based on user settings
    const user = await this.prisma.user.findUnique({
      where: { id: String(userId) },
      include: { notificationSettings: true }
    });

    const shouldArchive = user?.notificationSettings?.markAsReadOnView ?? true;

    return await this.prisma.notification.update({
      where: { id: String(notificationId) },
      data: {
        isRead: true,
        readAt: new Date(),
        isArchived: shouldArchive,
        archivedAt: shouldArchive ? new Date() : null,
      }
    });
  }

  async getUnreadCount(userId: number): Promise<number> {
    return await this.prisma.notification.count({
      where: {
        toUserId: String(userId),
        isRead: false,
        isArchived: false,
      }
    });
  }

  async getNotificationStats(userId: number) {
    const stats = await this.prisma.notification.groupBy({
      by: ['type', 'isRead'],
      where: {
        toUserId: String(userId),
        isArchived: false,
      },
      _count: true,
    });

    return {
      total: await this.prisma.notification.count({
        where: { toUserId: String(userId), isArchived: false }
      }),
      unread: await this.getUnreadCount(userId),
      byType: stats.reduce((acc, stat) => {
        if (!acc[stat.type]) {
          acc[stat.type] = { total: 0, unread: 0 };
        }
        acc[stat.type].total += stat._count;
        if (!stat.isRead) {
          acc[stat.type].unread += stat._count;
        }
        return acc;
      }, {} as Record<string, { total: number; unread: number }>)
    };
  }

  // Helper methods for specific notification types
  async createRoomBookingNotification(
    bookingId: number,
    toUserId: number,
    fromUserId: number,
    roomNumber: string,
    dormitoryName: string
  ) {
    return await this.createNotification({
      type: $Enums.NotificationType.ROOM_BOOKING_REQUEST,
      title: 'New Room Booking Request',
      message: `You have a new booking request for Room ${roomNumber} in ${dormitoryName}`,
      toUserId: String(toUserId),
      fromUserId: String(fromUserId),
      bookingId: String(bookingId),
      priority: $Enums.NotificationPriority.HIGH,
      metadata: {
        roomNumber,
        dormitoryName,
        action: 'REQUIRES_APPROVAL'
      }
    });
  }

  async createPaymentReminderNotification(
    userId: number,
    amount: number,
    dueDate: Date,
    paymentId?: number
  ) {
    const daysUntilDue = Math.ceil(
      (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    return await this.createNotification({
      type: $Enums.NotificationType.PAYMENT_REMINDER,
      title: 'Payment Reminder',
      message: `Your payment of $${amount} is due in ${daysUntilDue} days`,
      toUserId: String(userId),
      paymentId: String(paymentId),
      priority: daysUntilDue <= 3 ? $Enums.NotificationPriority.HIGH : $Enums.NotificationPriority.NORMAL,
      metadata: {
        amount,
        dueDate,
        daysUntilDue
      }
    });
  }

  async createAdminAnnouncementNotification(
    title: string,
    message: string,
    targetUserIds: string[],
    fromUserId: string
  ) {
    const notifications = await Promise.all(
      targetUserIds.map(userId =>
        this.createNotification({
          type: $Enums.NotificationType.ADMIN_ANNOUNCEMENT,
          title,
          message,
          toUserId: String(userId),
          fromUserId: String(fromUserId),
          priority: $Enums.NotificationPriority.HIGH,
          metadata: {
            isAnnouncement: true,
            announcementDate: new Date()
          }
        })
      )
    );

    return notifications;
  }

  private async sendEmailIfEnabled(notification: any) {
    const user = notification.toUser;
    const settings = user.notificationSettings;

    if (!settings?.emailNotifications) return;

    // Check specific email preferences based on notification type
    const shouldSendEmail = this.shouldSendEmailForType(
      notification.type,
      settings
    );

    if (shouldSendEmail) {
      await this.emailService.sendNotificationEmail(
        user.email,
        notification
      );
    }
  }

  private shouldSendEmailForType(
    type: $Enums.NotificationType,
    settings: any
  ): boolean {
    switch (type) {
      case $Enums.NotificationType.PAYMENT_DUE:
      case $Enums.NotificationType.PAYMENT_OVERDUE:
      case $Enums.NotificationType.PAYMENT_REMINDER:
        return settings.emailPaymentReminders;

      case $Enums.NotificationType.ROOM_BOOKING_APPROVED:
      case $Enums.NotificationType.ROOM_BOOKING_REJECTED:
      case $Enums.NotificationType.ACCOMMODATION_CHANGE_APPROVED:
        return settings.emailBookingUpdates;

      case $Enums.NotificationType.ADMIN_ANNOUNCEMENT:
      case $Enums.NotificationType.POLICY_UPDATE:
        return settings.emailAnnouncements;
      
      default:
        return settings.emailNotifications;
    }
  }

  async sendEmailNotification(emailData: {
  to: string;
  subject: string;
  template: string;
  data: any;
}) {
  try {
    // Get user by ID to get email address
    const user = await this.prisma.user.findUnique({
      where: { id: emailData.to },
      select: { email: true, notificationSettings: true }
    });

    if (!user) {
      console.warn(`⚠️ User ${emailData.to} not found`);
      return { success: false, reason: 'User not found' };
    }

    if (!user.email) {
      console.warn(`⚠️ User ${emailData.to} has no email address`);
      return { success: false, reason: 'No email address' };
    }

    switch (emailData.template) {
      case 'room-booking-confirmation':
        await this.emailService.sendBookingNotificationEmail(user.email, {
          status: 'APPROVED',
          roomNumber: emailData.data.roomNumber,
          dormitoryName: emailData.data.dormitoryName,
          checkInDate: emailData.data.checkIn,
          checkOutDate: emailData.data.checkOut,
          totalAmount: emailData.data.totalAmount || 0,
          actionRequired: false,
        });
        break;

      case 'payment-reminder':
        await this.emailService.sendPaymentReminderEmail(user.email, emailData.data);
        break;

      case 'maintenance-notification':
        await this.emailService.sendMaintenanceNotificationEmail(user.email, emailData.data);
        break;

      case 'room-change-notification':
        await this.emailService.sendRoomChangeNotificationEmail(user.email, emailData.data);
        break;

      case 'announcement':
        await this.emailService.sendAnnouncementEmail(user.email, emailData.data);
        break;

      default:
        // For generic notifications, use the generic notification method
        await this.emailService.sendNotificationEmail(user.email, {
          title: emailData.subject,
          message: emailData.data.message || '',
          type: emailData.data.type || 'GENERAL',
          priority: emailData.data.priority || 'NORMAL',
          actionUrl: emailData.data.actionUrl,
          metadata: emailData.data,
        });
        break;
    }

    console.log(`✅ Email sent to ${user.email}: ${emailData.subject}`);
    return { success: true };

  } catch (error) {
    console.error('❌ Error sending email notification:', error);
    return { success: false, reason: error instanceof Error ? error.message : String(error) };
  }
}

async sendEmail(emailData: {
  to: string;
  subject: string;
  template: string;
  context: any;
}) {
  try {
    const user = await this.prisma.user.findUnique({
      where: { id: emailData.to },
      select: { email: true }
    });

    if (!user?.email) {
      throw new Error(`User ${emailData.to} not found or has no email`);
    }

    // Use the generic notification email method
    await this.emailService.sendNotificationEmail(user.email, {
      title: emailData.subject,
      message: emailData.context.message || '',
      type: emailData.context.type || 'GENERAL',
      priority: emailData.context.priority || 'NORMAL',
      actionUrl: emailData.context.actionUrl,
      metadata: emailData.context,
    });

    return { success: true };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
}
}
  
