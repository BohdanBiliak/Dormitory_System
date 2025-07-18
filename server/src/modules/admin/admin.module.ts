import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { ConfirmationService } from '@/modules/confirmation/services/confirmation.service';
import {PrismaModule} from "@/prisma/prisma.module";
import {S3Service} from "@/libs/common/s3/s3.service";
import {UserModule} from "@modules/user/user.module";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AdminController],
  providers: [AdminService, ConfirmationService, S3Service],
})
export class AdminModule {}
