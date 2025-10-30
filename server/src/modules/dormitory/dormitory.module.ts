import { Module } from "@nestjs/common";
import { DormitoryService } from "./dormitory.service";
import { DormitoryController } from "./dormitory.controller";
import { PrismaService } from "@/prisma/prisma.service";
import { S3Service } from "@/libs/common/s3/s3.service";
import { UserModule } from "@/modules/user/user.module";
import { PricingModule } from "@/modules/pricing/pricing.module";
import { S3Module } from "@/libs/common/s3/s3.module";

@Module({
  imports: [UserModule, PricingModule, S3Module],
  controllers: [DormitoryController],
  providers: [DormitoryService, PrismaService, S3Service],
  exports: [DormitoryService],
})
export class DormitoryModule {}
