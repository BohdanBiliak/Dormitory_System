import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import {PrismaService} from "@/prisma/prisma.service";
import {UserModule} from "@/modules/user/user.module";

@Module({
  imports: [UserModule],
  controllers: [RoomController],
  providers: [RoomService, PrismaService],
})
export class RoomModule {}
