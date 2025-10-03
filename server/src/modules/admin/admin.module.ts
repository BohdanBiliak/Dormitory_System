import { Module } from '@nestjs/common';
import { AdminService } from './use-cases/admin.service';
import { AdminController } from './controllers/admin.controller';
import { ConfirmationService } from '@/modules/confirmation/services/confirmation.service';
import {PrismaModule} from "@/prisma/prisma.module";
import {S3Service} from "@/libs/common/s3/s3.service";
import {UserModule} from "@modules/user/user.module";
import { NotificationsService } from '@/modules/notifications/notifications.service';
import { NotificationGateway } from '../notifications/NotificationGateway';
import { MailService } from '@/libs/mail/mail.service';
import { ManagerRepository } from './manager.repository';
import { GetManagersUseCase } from './use-cases/manager/GetManagerUseCase';
import { CreateManagerUseCase } from './use-cases/manager/CreateManagerUseCase';
import { UpdateManagerUseCase } from './use-cases/manager/UpdateManagerUseCase';
import { DeactivateManagerUseCase } from './use-cases/manager/DeactivateManagerUseCase';
import { DormitoryModule } from '@/modules/dormitory/dormitory.module';
import { DormitoryService } from '../dormitory/dormitory.service';
import { ManagerController } from './controllers/manager.controller';

@Module({
  imports: [PrismaModule, UserModule, DormitoryModule, UserModule],
  controllers: [AdminController, ManagerController],
  providers: [AdminService, ConfirmationService, S3Service, NotificationsService, NotificationGateway, MailService, ManagerRepository, CreateManagerUseCase,
    GetManagersUseCase,
    UpdateManagerUseCase,
    DeactivateManagerUseCase,
    DormitoryService
  ],
})
export class AdminModule {}
