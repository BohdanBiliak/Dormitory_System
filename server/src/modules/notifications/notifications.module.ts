// server/src/notifications/notifications.module.ts
import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationGateway } from './NotificationGateway';
import { MailService } from '../../libs/mail/mail.service';
import {PrismaModule} from "@/prisma/prisma.module";
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationGateway,
    MailService,
  ],
  exports: [NotificationsService, MailService],
})
export class NotificationsModule {}