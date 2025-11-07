import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { CreateAnnouncementDto } from "./dto/create-announcement.dto";
import { CreateAnnouncementUseCase } from "@modules/announcement/use-cases/create-announcement.use-case";
import { GetAnnouncementsUseCase } from "@modules/announcement/use-cases/get-announcements.use-case";
import { DeleteAnnouncementUseCase } from "@modules/announcement/use-cases/delete-announcement.use-case";
import { UploadAnnouncementAttachmentsUseCase } from "@modules/announcement/use-cases/upload-announcement-attachments.use-case";
import { GetAnnouncementByIdUseCase } from "@modules/announcement/use-cases/get-announcement-by-id.use-case";
import { FilesInterceptor } from "@nestjs/platform-express";
import { $Enums } from "../../../__generated__";
import UserRole = $Enums.UserRole;
import { GetPublicAnnouncementsUseCase } from "@modules/announcement/use-cases/get-public-announcements.use-case";
import { GetUserAnnouncementsUseCase } from "@modules/announcement/use-cases/get-user-announcements.use-case";
import { Authorization } from "@libs/common/decorators/auth.decorator";
import { AnnouncementDocs } from "./announcements.docs";

@AnnouncementDocs.controller()
@Controller("announcements")
export class AnnouncementController {
  constructor(
    private readonly createUseCase: CreateAnnouncementUseCase,
    private readonly getAllUseCase: GetAnnouncementsUseCase,
    private readonly deleteUseCase: DeleteAnnouncementUseCase,
    private readonly uploadUseCase: UploadAnnouncementAttachmentsUseCase,
    private readonly getAnnouncementByIdUseCase: GetAnnouncementByIdUseCase,
    private readonly getPublicAnnouncementsUseCase: GetPublicAnnouncementsUseCase,
    private readonly getUserAnnouncementsUseCase: GetUserAnnouncementsUseCase,
  ) {}

  @Post()
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @AnnouncementDocs.create()
  create(@Body() dto: CreateAnnouncementDto, @Req() req) {
    return this.createUseCase.execute(dto, req.user.id);
  }

  @Get("public")
  @AnnouncementDocs.findPublic()
  findPublic(
    @Query("showHidden") showHidden: string,
    @Query("showExpired") showExpired: string,
    @Query("page") page: string,
    @Query("limit") limit: string,
  ) {
    return this.getPublicAnnouncementsUseCase.execute({
      showHidden: showHidden === "true",
      showExpired: showExpired === "true",
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get("my")
  @Authorization(UserRole.SignedInUser, UserRole.Resident, UserRole.Admin, UserRole.SuperAdmin)
  findMy(
    @Query("showHidden") showHidden: string,
    @Query("showExpired") showExpired: string,
    @Query("page") page: string,
    @Query("limit") limit: string,
    @Req() req,
  ) {
    const userId = req.user.id;
    const roomId = req.user.roomId;
    const floorId = req.user.room?.floorId;
    const dormitoryId = req.user.dormitoryId;
    
    console.log("Controller - User data:", {
      userId,
      roomId,
      floorId,
      dormitoryId,
      hasRoom: !!req.user.room,
    });
    
    return this.getUserAnnouncementsUseCase.execute(
      userId,
      roomId,
      floorId,
      dormitoryId,
      {
        showHidden: showHidden === "true",
        showExpired: showExpired === "true",
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
      },
    );
  }

  @Get()
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @AnnouncementDocs.findAll()
  findAll(
    @Query("showHidden") showHidden: string,
    @Query("showExpired") showExpired: string,
    @Query("page") page: string,
    @Query("limit") limit: string,
  ) {
    return this.getAllUseCase.execute({
      showHidden: showHidden === "true",
      showExpired: showExpired === "true",
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get(":id")
  @AnnouncementDocs.getById()
  async getById(@Param("id") id: string) {
    return this.getAnnouncementByIdUseCase.execute(id);
  }

  @Delete(":id")
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @AnnouncementDocs.remove()
  remove(@Param("id") id: string) {
    return this.deleteUseCase.execute(id);
  }

  @Post("upload")
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @AnnouncementDocs.upload()
  @UseInterceptors(FilesInterceptor("files"))
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = await this.uploadUseCase.execute(files, "announcements");
    return { urls };
  }
}
