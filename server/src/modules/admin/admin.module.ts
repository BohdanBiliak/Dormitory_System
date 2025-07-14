import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { ConfirmationService } from '@/modules/confirmation/services/confirmation.service';
import {PrismaModule} from "@/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [AdminService, ConfirmationService],
})
export class AdminModule {}
