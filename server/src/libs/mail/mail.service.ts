import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { render } from "@react-email/components";
import {ConfirmationTemplate} from "@/libs/mail/templates/confirmation.template"
import {ResetPasswordTemplate} from "@/libs/mail/templates/reset-password.template";
import {NotificationTemplate} from "@/libs/mail/templates/notification-email-template";
import {BookingNotificationTemplate} from "@/libs/mail/templates/booking-notification-template";
import { PaymentReminderTemplate} from "@/libs/mail/templates/payment-reminder";
import {TwoFactorAuthTemplate} from "@/libs/mail/templates/two-factor-auth.template";
import {AnnouncementTemplate} from "@/libs/mail/templates/announcement-template";

@Injectable()
export class MailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendConfirmationEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN");
    const html = await render(
      ConfirmationTemplate({
        domain,
        token,
      })
    );
    return this.sendMail(email, 'Email Verification', html);
  }
  public async sendPasswordResetEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN");
    const html = await render(
        ResetPasswordTemplate({
          domain,
          token,
        })
    );
    return this.sendMail(email, 'Email Reset', html);
  }
  public async sendTwoFactorTokenEmail(email: string, token: string) {
    const html = await render(TwoFactorAuthTemplate({ token }))

    return this.sendMail(email, 'Approve your identity', html)
  }

  public async sendNotificationEmail(
    email: string,
    notification: {
      title: string;
      message: string;
      type: string;
      priority: string;
      actionUrl?: string;
      metadata?: any;
    }
  ) {
    const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN");
    const html = await render(
      NotificationTemplate({
        domain,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        priority: notification.priority,
        actionUrl: notification.actionUrl,
        metadata: notification.metadata,
      })
    );

    return this.sendMail(email, notification.title, html);
  }

  /**
   * Send booking-related notification
   */
  public async sendBookingNotificationEmail(
    email: string,
    bookingData: {
      status: string;
      roomNumber: string;
      dormitoryName: string;
      checkInDate: string;
      checkOutDate?: string;
      totalAmount: number;
      actionRequired?: boolean;
    }
  ) {
    const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN");
    const title = this.getBookingEmailTitle(bookingData.status);
    
    const html = await render(
      BookingNotificationTemplate({
        domain,
        status: bookingData.status,
        roomNumber: bookingData.roomNumber,
        dormitoryName: bookingData.dormitoryName,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        totalAmount: bookingData.totalAmount,
        actionRequired: bookingData.actionRequired || false,
      })
    );

    return this.sendMail(email, title, html);
  }

  
  /**
   * Send payment reminder email
   */
  public async sendPaymentReminderEmail(
    email: string,
    paymentData: {
      amount: number;
      dueDate: string;
      description: string;
      daysUntilDue: number;
      isOverdue?: boolean;
      roomNumber?: string;
      dormitoryName?: string;
    }
  ) {
    const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN");
    const title = paymentData.isOverdue 
      ? `⚠️ Overdue Payment - $${paymentData.amount}`
      : `💰 Payment Reminder - $${paymentData.amount} due in ${paymentData.daysUntilDue} days`;
    
    const html = await render(
      PaymentReminderTemplate({
        domain,
        amount: paymentData.amount,
        dueDate: paymentData.dueDate,
        description: paymentData.description,
        daysUntilDue: paymentData.daysUntilDue,
        isOverdue: paymentData.isOverdue || false,
        roomNumber: paymentData.roomNumber,
        dormitoryName: paymentData.dormitoryName,
      })
    );

    return this.sendMail(email, title, html);
  }

  /**
   * Send admin announcement email
   */
  public async sendAnnouncementEmail(
    email: string,
    announcementData: {
      title: string;
      content: string;
      authorName: string;
      expiresAt?: string;
      attachments?: Array<{ filename: string; url: string; }>;
      dormitoryName?: string;
    }
  ) {
    const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN");
    const title = `📢 ${announcementData.title}`;
    
    const html = await render(
      AnnouncementTemplate({
        domain,
        title: announcementData.title,
        content: announcementData.content,
        authorName: announcementData.authorName,
        expiresAt: announcementData.expiresAt,
        attachments: announcementData.attachments || [],
        dormitoryName: announcementData.dormitoryName,
      })
    );

    return this.sendMail(email, title, html);
  }

  /**
   * Send room change notification
   */
  public async sendRoomChangeNotificationEmail(
    email: string,
    changeData: {
      oldRoomNumber?: string;
      newRoomNumber: string;
      dormitoryName: string;
      effectiveDate: string;
      reason?: string;
    }
  ) {
    const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN");
    const title = changeData.oldRoomNumber 
      ? `🏠 Room Change: ${changeData.oldRoomNumber} → ${changeData.newRoomNumber}`
      : `🏠 Room Assignment: ${changeData.newRoomNumber}`;

    const html = await render(
      NotificationTemplate({
        domain,
        title,
        message: this.createRoomChangeMessage(changeData),
        type: 'ROOM_ASSIGNMENT_UPDATED',
        priority: 'HIGH',
        actionUrl: `${domain}/dashboard/room`,
      })
    );

    return this.sendMail(email, title, html);
  }

  /**
   * Send maintenance notification
   */
  public async sendMaintenanceNotificationEmail(
    email: string,
    maintenanceData: {
      type: 'SCHEDULED' | 'COMPLETED' | 'URGENT';
      roomNumber: string;
      dormitoryName: string;
      description: string;
      scheduledDate?: string;
      completedDate?: string;
      estimatedDuration?: string;
    }
  ) {
    const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN");
    const title = this.getMaintenanceEmailTitle(maintenanceData.type, maintenanceData.roomNumber);
    
    const html = await render(
      NotificationTemplate({
        domain,
        title,
        message: this.createMaintenanceMessage(maintenanceData),
        type: `MAINTENANCE_${maintenanceData.type}`,
        priority: maintenanceData.type === 'URGENT' ? 'HIGH' : 'NORMAL',
        actionUrl: `${domain}/dashboard/room`,
        metadata: maintenanceData,
      })
    );

    return this.sendMail(email, title, html);
  }

  
  /**
   * Send bulk notifications to multiple users
   */
  public async sendBulkNotificationEmails(
    emails: string[],
    notification: {
      title: string;
      message: string;
      type: string;
      priority: string;
      actionUrl?: string;
    }
  ) {
    const emailPromises = emails.map(email => 
      this.sendNotificationEmail(email, notification)
    );

    const results = await Promise.allSettled(emailPromises);
    
    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;

    return {
      total: emails.length,
      successful,
      failed,
      results,
    };
  }

  // ==========================================
  // 🔧 HELPER METHODS
  // ==========================================

  private getBookingEmailTitle(status: string): string {
    const titles = {
      'PENDING': '⏳ Booking Request Submitted',
      'APPROVED': '✅ Booking Approved',
      'REJECTED': '❌ Booking Rejected', 
      'CANCELLED': '🚫 Booking Cancelled',
      'COMPLETED': '🎉 Booking Completed',
    };
    return titles[status] || `📋 Booking Update: ${status}`;
  }

  private getMaintenanceEmailTitle(type: string, roomNumber: string): string {
    const titles = {
      'SCHEDULED': `🔧 Maintenance Scheduled - Room ${roomNumber}`,
      'COMPLETED': `✅ Maintenance Completed - Room ${roomNumber}`,
      'URGENT': `🚨 Urgent Maintenance - Room ${roomNumber}`,
    };
    return titles[type] || `🔧 Maintenance Update - Room ${roomNumber}`;
  }

  private createRoomChangeMessage(changeData: any): string {
    if (changeData.oldRoomNumber) {
      return `Your room assignment has been changed from Room ${changeData.oldRoomNumber} to Room ${changeData.newRoomNumber} in ${changeData.dormitoryName}. This change will be effective from ${changeData.effectiveDate}.${changeData.reason ? ` Reason: ${changeData.reason}` : ''}`;
    } else {
      return `You have been assigned to Room ${changeData.newRoomNumber} in ${changeData.dormitoryName}. Your move-in date is ${changeData.effectiveDate}.`;
    }
  }

  private createMaintenanceMessage(maintenanceData: any): string {
    const { type, roomNumber, dormitoryName, description } = maintenanceData;
    
    switch (type) {
      case 'SCHEDULED':
        return `Maintenance has been scheduled for Room ${roomNumber} in ${dormitoryName}. Description: ${description}. Scheduled date: ${maintenanceData.scheduledDate}. Estimated duration: ${maintenanceData.estimatedDuration || 'TBD'}.`;
      
      case 'COMPLETED':
        return `Maintenance for Room ${roomNumber} in ${dormitoryName} has been completed. Work performed: ${description}. Completed on: ${maintenanceData.completedDate}.`;
      
      case 'URGENT':
        return `🚨 URGENT: Immediate maintenance required for Room ${roomNumber} in ${dormitoryName}. Issue: ${description}. Please avoid the area and report any safety concerns immediately.`;
      
      default:
        return `Maintenance update for Room ${roomNumber} in ${dormitoryName}: ${description}`;
    }
  }


  private sendMail(email: string, subject: string, html: string) {
    return this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
