import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import {PrismaService} from "@/prisma/prisma.service";
import {UserModule} from "@/modules/user/user.module";
import {AuditService} from "@modules/audit/audit.service";
import { NotificationsService } from '../notifications/notifications.service';
import { MailService } from '@/libs/mail/mail.service';
import { NotificationGateway } from '../notifications/NotificationGateway';

@Module({
  imports: [UserModule],
  controllers: [RoomController],
  providers: [RoomService, PrismaService, AuditService, NotificationsService, MailService, NotificationGateway],
})
export class RoomModule {}
