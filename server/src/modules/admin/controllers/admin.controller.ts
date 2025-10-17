import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
} from "@nestjs/common";
import { $Enums, ConfirmationStatus } from "../../../../__generated__";
import { ConfirmationService } from "@/modules/confirmation/confirmation.service";
import { GetConfirmationsQueryDto } from "@/modules/confirmation/dto/GetConfirmationsQuery.dto";
import { CurrentUser } from "@/libs/common/decorators/current-user.decorator";
import { UpdateAdminProfileDto } from "@/modules/admin/dto/UpdateAdminProfile.dto";
import { AdminService } from "@/modules/admin/use-cases/admin.service";
import { UseAvatarInterceptor } from "@/libs/common/decorators/upload-avatar.decorator";
import { Authorization } from "@libs/common/decorators/auth.decorator";
import { AdminDocs } from "../docs/admin.docs";
import UserRole = $Enums.UserRole;
import { RejectConfirmationDto } from "../dto/RejectConfirmation.dto";

const ALLOWED_VERSIONS = ["original", "mobile", "tablet", "desktop"] as const;
type Version = (typeof ALLOWED_VERSIONS)[number];

@AdminDocs.controller()
@Controller("admin")
export class AdminController {
  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly adminService: AdminService,
  ) {}

  @Get("confirmations")
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @AdminDocs.getAllConfirmations()
  getAllConfirmations(@Query() query: GetConfirmationsQueryDto) {
    return this.confirmationService.getAllFiltered(query);
  }

  @Patch("confirmations/:id")
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @AdminDocs.updateConfirmationStatus()
  updateStatus(
    @Param("id") id: string,
    @Body("status") status: ConfirmationStatus,
  ) {
    return this.confirmationService.updateStatus(id, status);
  }

  @Get("profile")
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @AdminDocs.getMyProfile()
  getMyProfile(@CurrentUser("id") id: string) {
    return this.adminService.getById(id);
  }

  @Patch("profile")
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @AdminDocs.updateMyProfile()
  updateMyProfile(
    @CurrentUser("id") id: string,
    @Body() dto: UpdateAdminProfileDto,
  ) {
    return this.adminService.updateById(id, dto);
  }

  @Post("upload-avatar")
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @UseAvatarInterceptor()
  @AdminDocs.uploadAvatar()
  uploadAvatarForAdmin(
    @CurrentUser("id") adminId: string,
    @UploadedFile() file: Express.Multer.File,
    @Query("version") version: Version = "original",
  ) {
    return this.adminService.uploadAndUpdateAvatar(adminId, file, version);
  }

  @Post("reject-confirmation/:id")
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @AdminDocs.reject()
  rejectConfirmation(
    @Param("id") id: string,
    @Body() dto: RejectConfirmationDto,
  ) {
    return this.confirmationService.reject(id, dto.reason);
  }
}
