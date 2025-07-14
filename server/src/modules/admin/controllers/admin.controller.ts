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
  ApiOkResponse,
  ApiOperation,
  ApiParam,
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

  @ApiOperation({
    summary: "Get all confirmations",
    description: "Returns a paginated list of confirmations filtered by type, status, and requester name."
  })
  @ApiQuery({
    name: "type",
    enum: ConfirmationType,
    required: false,
    description: "Filter by confirmation type"
  })
  @ApiQuery({
    name: "status",
    enum: ConfirmationStatus,
    required: false,
    description: "Filter by confirmation status"
  })
  @ApiQuery({
    name: "addressee",
    type: String,
    required: false,
    description: "Filter by requester name"
  })
  @ApiQuery({
    name: "page",
    type: Number,
    required: false,
    example: 1,
    description: "Page number (default: 1)"
  })
  @ApiQuery({
    name: "limit",
    type: Number,
    required: false,
    example: 10,
    description: "Items per page (default: 10)"
  })
  @ApiOkResponse({
    description: "Paginated list of confirmations",
    schema: {
      example: {
        data: [
          {
            id: "uuid",
            status: "PENDING",
            type: "IDENTITY_VERIFICATION",
            requester: {
              id: "uuid",
              displayName: "John Doe"
            },
            createdAt: "2024-06-30T12:00:00.000Z"
          }
        ],
        total: 42,
        page: 1,
        pageCount: 5
      }
    }
  })
  @Get("confirmations")
  getAllConfirmations(@Query() query: GetConfirmationsQueryDto) {
    return this.confirmationService.getAllFiltered(query);
  }

  @ApiOperation({
    summary: "Update a confirmation status",
    description: "Allows an admin to change the status of a confirmation request."
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Confirmation ID to update"
  })
  @ApiBody({
    type: UpdateConfirmationStatusDto,
    description: "New confirmation status"
  })
  @ApiOkResponse({
    description: "Updated confirmation object"
  })
  @Patch("confirmations/:id")
  updateStatus(
      @Param("id") id: string,
      @Body("status") status: ConfirmationStatus,
  ) {
    return this.confirmationService.updateStatus(id, status);
  }

  @ApiOperation({
    summary: "Get current admin profile",
    description: "Returns the profile details of the currently authenticated admin."
  })
  @ApiOkResponse({
    description: "Current admin profile",
    schema: {
      example: {
        id: "uuid",
        displayName: "Joanna",
        secondName: "Goździk",
        email: "j.gozdzik@pollub.com",
        picture: "https://example.com/photo.png",
        role: "Admin"
      }
    }
  })
  @Get("profile")
  getMyProfile(@CurrentUser("id") id: string) {
    return this.adminService.getById(id);
  }

  @ApiOperation({
    summary: "Update current admin profile",
    description: "Allows the currently authenticated admin to update their profile details."
  })
  @ApiBody({
    type: UpdateAdminProfileDto,
    description: "Fields to update in the admin profile"
  })
  @ApiOkResponse({
    description: "Updated admin profile",
    schema: {
      example: {
        id: "uuid",
        displayName: "Joanna",
        secondName: "Goździk",
        email: "j.gozdzik@pollub.com",
        picture: "https://example.com/photo-updated.png",
        role: "Admin"
      }
    }
  })
  @Patch("profile")
  updateMyProfile(
      @CurrentUser("id") id: string,
      @Body() dto: UpdateAdminProfileDto,
  ) {
    return this.adminService.updateById(id, dto);
  }
}
