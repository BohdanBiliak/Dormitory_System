import { Module } from "@nestjs/common";
import { RoomService } from "./room.service";
import { RoomController } from "./room.controller";
import { RoomStatusTypeService } from "./room-status-type.service";
import { RoomStatusTypeController } from "./room-status-type.controller";
import { PrismaService } from "@/prisma/prisma.service";
import { UserModule } from "@/modules/user/user.module";
import { AuditService } from "@modules/audit/audit.service";
import { NotificationsService } from "../notifications/notifications.service";
import { MailService } from "@/libs/mail/mail.service";
import { NotificationGateway } from "../notifications/NotificationGateway";
import { RoomRepository } from "@/modules/room/room.repository";
import { MailModule } from "@libs/mail/mail.module";
import { S3Module } from "@libs/common/s3/s3.module";
import { S3Service } from "@libs/common/s3/s3.service";
import { PricingModule } from "@/modules/pricing/pricing.module";
@Module({
  imports: [UserModule, MailModule, S3Module, PricingModule],
  controllers: [RoomController, RoomStatusTypeController],
  providers: [
    RoomService,
    RoomStatusTypeService,
    PrismaService,
    AuditService,
    NotificationsService,
    MailService,
    NotificationGateway,
    RoomRepository,
    S3Service,
  ],
  exports: [RoomStatusTypeService],
})
export class RoomModule {}
