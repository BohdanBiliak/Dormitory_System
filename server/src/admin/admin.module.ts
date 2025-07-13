import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ConfirmationService } from './confirmation/confirmation.service';
import {PrismaModule} from "@/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [AdminService, ConfirmationService],
})
export class AdminModule {}
