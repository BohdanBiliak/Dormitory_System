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
import {MailModule} from "@libs/mail/mail.module";
import {S3Module} from "@libs/common/s3/s3.module";
import {S3Service} from "@libs/common/s3/s3.service";
@Module({
  imports: [UserModule, MailModule, S3Module],
  controllers: [RoomController],
  providers: [RoomService, PrismaService, AuditService, NotificationsService, MailService, NotificationGateway, RoomRepository, S3Service],
})
export class RoomModule {}
