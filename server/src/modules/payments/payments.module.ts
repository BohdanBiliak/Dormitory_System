import { Module } from "@nestjs/common";
import { PaymentsController } from "./payments.controllers";
import { PaymentsService } from "./payments.service";
import { PaymentRepository } from "./payment.repositories";
import { PrismaModule } from "../../prisma/prisma.module";
import { S3Module } from "../../libs/common/s3/s3.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { UserModule } from "../user/user.module";
import { PricingModule } from "../pricing/pricing.module";

@Module({
  imports: [PrismaModule, S3Module, NotificationsModule, UserModule, PricingModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    {
      provide: "IPaymentRepository",
      useClass: PaymentRepository,
    },
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
