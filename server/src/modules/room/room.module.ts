import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import {PrismaService} from "@/prisma/prisma.service";
import {UserModule} from "@/modules/user/user.module";
import {AuditService} from "@modules/audit/audit.service";

@Module({
  imports: [UserModule],
  controllers: [RoomController],
  providers: [RoomService, PrismaService, AuditService],
})
export class RoomModule {}
