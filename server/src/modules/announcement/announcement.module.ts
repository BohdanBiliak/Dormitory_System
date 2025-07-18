import { Module } from '@nestjs/common';
import { AnnouncementController } from './controllers/announcement.controller';

import { CreateAnnouncementUseCase } from './use-cases/create-announcement.use-case';
import { GetAnnouncementsUseCase } from './use-cases/get-announcements.use-case';
import { UpdateAnnouncementUseCase } from './use-cases/update-announcement.use-case';
import { DeleteAnnouncementUseCase } from './use-cases/delete-announcement.use-case';
import {AnnouncementRepository} from "@modules/announcement/repositories/announcement.repository";
import {PrismaModule} from "@/prisma/prisma.module";
import {S3Module} from "@libs/common/s3/s3.module";
import {
  UploadAnnouncementAttachmentsUseCase
} from "@modules/announcement/use-cases/upload-announcement-attachments.use-case";
import {GetAnnouncementByIdUseCase} from "@modules/announcement/use-cases/get-announcement-by-id.use-case";
import {GetPublicAnnouncementsUseCase} from "@modules/announcement/use-cases/get-public-announcements.use-case";
import {UserModule} from "@modules/user/user.module";

@Module({
  imports: [PrismaModule, S3Module, UserModule],
  controllers: [AnnouncementController],
  providers: [
    AnnouncementRepository,
    CreateAnnouncementUseCase,
    GetAnnouncementsUseCase,
    UpdateAnnouncementUseCase,
    DeleteAnnouncementUseCase,
    UploadAnnouncementAttachmentsUseCase,
    GetAnnouncementByIdUseCase,
      GetPublicAnnouncementsUseCase

  ],
  exports: [
    CreateAnnouncementUseCase,
    GetAnnouncementsUseCase,
    UpdateAnnouncementUseCase,
    DeleteAnnouncementUseCase
  ],
})
export class AnnouncementModule {}
