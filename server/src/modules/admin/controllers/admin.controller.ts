import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { RolesGuard } from "@/libs/common/guards/roles.guard";
import { Roles } from "@/libs/common/decorators/roles.decorator";
import { $Enums, ConfirmationStatus } from "../../../../__generated__";
import UserRole = $Enums.UserRole;
import { ConfirmationService } from "@/modules/confirmation/services/confirmation.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { UpdateConfirmationStatusDto } from "@/modules/confirmation/dto/UpdateConfirmationStatus.dto";
import { GetConfirmationsQueryDto } from "@/modules/confirmation/dto/GetConfirmationsQuery.dto";
import ConfirmationType = $Enums.ConfirmationType;
import { CurrentUser } from "@/libs/common/decorators/current-user.decorator";
import { UpdateAdminProfileDto } from "@/modules/admin/dto/UpdateAdminProfile.dto";
import { AdminService } from "@/modules/admin/services/admin.service";

@ApiTags("Admin")
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(UserRole.Admin)
@Controller("admin")
export class AdminController {
  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly adminService: AdminService,
  ) {}

  @ApiOperation({ summary: "Get all confirmations (filtered and paginated)" })
  @ApiQuery({ name: "type", enum: ConfirmationType, required: false })
  @ApiQuery({ name: "status", enum: ConfirmationStatus, required: false })
  @ApiQuery({ name: "addressee", type: String, required: false })
  @ApiQuery({ name: "page", type: Number, required: false, example: 1 })
  @ApiQuery({ name: "limit", type: Number, required: false, example: 10 })
  @Get("confirmations")
  getAllConfirmations(@Query() query: GetConfirmationsQueryDto) {
    return this.confirmationService.getAllFiltered(query);
  }

  @ApiOperation({ summary: "Update confirmation status" })
  @ApiBody({ type: UpdateConfirmationStatusDto })
  @Patch("confirmations/:id")
  updateStatus(
    @Param("id") id: string,
    @Body("status") status: ConfirmationStatus,
  ) {
    return this.confirmationService.updateStatus(id, status);
  }

  @ApiOperation({ summary: "Get current admin profile" })
  @Get("profile")
  getMyProfile(@CurrentUser("id") id: string) {
    return this.adminService.getById(id);
  }

  @ApiOperation({ summary: "Update current admin profile" })
  @ApiBody({ type: UpdateAdminProfileDto })
  @Patch("profile")
  updateMyProfile(
    @CurrentUser("id") id: string,
    @Body() dto: UpdateAdminProfileDto,
  ) {
    return this.adminService.updateById(id, dto);
  }
}
