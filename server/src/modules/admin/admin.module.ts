import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { ConfirmationService } from '@/modules/confirmation/services/confirmation.service';
import {PrismaModule} from "@/prisma/prisma.module";
import {S3Service} from "@/libs/common/s3/s3.service";
import {UserModule} from "@modules/user/user.module";
import { NotificationsService } from '@/modules/notifications/notifications.service';
import { NotificationGateway } from '../notifications/NotificationGateway';
import { MailService } from '@/libs/mail/mail.service';
import { ManagerRepository } from './repositories/managerRepository';
import { GetManagersUseCase } from './services/manager/GetManagerUseCase';
import { CreateManagerUseCase } from './services/manager/CreateManagerUseCase';
import { UpdateManagerUseCase } from './services/manager/UpdateManagerUseCase';
import { DeactivateManagerUseCase } from './services/manager/DeactivateManagerUseCase';
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
