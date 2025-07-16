import { Module } from '@nestjs/common';
import { DormitoryService } from './dormitory.service';
import { DormitoryController } from './dormitory.controller';
import {PrismaService} from "@/prisma/prisma.service";
import {S3Service} from "@/libs/common/s3/s3.service";
import {UserModule} from "@/modules/user/user.module";

@Module({
  imports: [UserModule],
  controllers: [DormitoryController],
  providers: [DormitoryService, PrismaService, S3Service],
})
export class DormitoryModule {}
