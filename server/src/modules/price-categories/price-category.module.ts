import { Module } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { UserModule } from "@/modules/user/user.module";
import { PriceCategoryController } from "./price-category.controller";
import { PriceCategoryService } from "./price-category.service";
import { PriceCategoryRepository } from "./price-category.repository";

@Module({
  imports: [UserModule],
  controllers: [PriceCategoryController],
  providers: [
    PriceCategoryService,
    PrismaService,
    {
      provide: "IPriceCategoryRepository",
      useClass: PriceCategoryRepository,
    },
  ],
  exports: [PriceCategoryService],
})
export class PriceCategoryModule {}