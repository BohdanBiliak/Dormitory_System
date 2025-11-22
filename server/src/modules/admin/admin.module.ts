import { Module } from "@nestjs/common";
import { AdminService } from "./use-cases/admin.service";
import { AdminController } from "./controllers/admin.controller";
import { ConfirmationService } from "@/modules/confirmation/confirmation.service";
import { PrismaModule } from "@/prisma/prisma.module";
import { S3Service } from "@/libs/common/s3/s3.service";
import { UserModule } from "@modules/user/user.module";
import { NotificationsService } from "@/modules/notifications/notifications.service";
import { NotificationGateway } from "../notifications/NotificationGateway";
import { MailService } from "@/libs/mail/mail.service";
import { ManagerRepository } from "./manager.repository";
import { GetManagersUseCase } from "./use-cases/manager/GetManagerUseCase";
import { GetManagerByIdUseCase } from "./use-cases/manager/GetManagerByIdUseCase";
import { CreateManagerUseCase } from "./use-cases/manager/CreateManagerUseCase";
import { UpdateManagerUseCase } from "./use-cases/manager/UpdateManagerUseCase";
import { DeactivateManagerUseCase } from "./use-cases/manager/DeactivateManagerUseCase";
import { ActivateManagerUseCase } from "./use-cases/manager/ActivateManagerUseCase";
import { ResetManagerPasswordUseCase } from "./use-cases/manager/ResetManagerPasswordUseCase";
import { DormitoryModule } from "@/modules/dormitory/dormitory.module";
import { DormitoryService } from "../dormitory/dormitory.service";
import { ManagerController } from "./controllers/manager.controller";
import { PricingModule } from "@/modules/pricing/pricing.module";

@Module({
  imports: [PrismaModule, UserModule, DormitoryModule, PricingModule],
  controllers: [AdminController, ManagerController],
  providers: [
    AdminService,
    ConfirmationService,
    S3Service,
    NotificationsService,
    NotificationGateway,
    MailService,
    ManagerRepository,
    CreateManagerUseCase,
    GetManagersUseCase,
    GetManagerByIdUseCase,
    UpdateManagerUseCase,
    DeactivateManagerUseCase,
    ActivateManagerUseCase,
    ResetManagerPasswordUseCase,
    DormitoryService,
  ],
})
export class AdminModule {}
