import { Module } from '@nestjs/common';
import { RoomService } from '../services/room.service';
import { RoomController } from '../controllers/room.controller';
import {PrismaService} from "@/prisma/prisma.service";
import {UserModule} from "@/modules/user/user.module";
import {AuditService} from "@modules/audit/audit.service";
import { NotificationsService } from '../../notifications/notifications.service';
import { MailService } from '@/libs/mail/mail.service';
import { NotificationGateway } from '../../notifications/NotificationGateway';
import {RoomRepository} from "@modules/room/repositories/room.repository";

@Module({
  imports: [UserModule],
  controllers: [RoomController],
  providers: [RoomService, PrismaService, AuditService, NotificationsService, MailService, NotificationGateway, RoomRepository],
})
export class RoomModule {}
