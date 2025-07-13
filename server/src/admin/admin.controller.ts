import {Body, Controller, Get, Param, Patch, UseGuards} from "@nestjs/common";
import {RolesGuard} from "@/libs/common/guards/roles.guard";
import {Roles} from "@/libs/common/decorators/roles.decorator";
import {$Enums, ConfirmationStatus} from "../../__generated__";
import UserRole = $Enums.UserRole;
import {ConfirmationService} from "@/admin/confirmation/confirmation.service";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {UpdateConfirmationStatusDto} from "@/admin/confirmation/dto/UpdateConfirmationStatus.dto";

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(UserRole.Admin)
@Controller('admin')
export class AdminController {
  constructor(private readonly confirmationService: ConfirmationService) {}

  @ApiOperation({ summary: 'Get all confirmations' })
  @Get('confirmations')
  getAllConfirmations() {
    return this.confirmationService.getAll();
  }

  @ApiOperation({ summary: 'Update confirmation status' })
  @ApiBody({ type: UpdateConfirmationStatusDto })
  @Patch('confirmations/:id')
  updateStatus(
      @Param('id') id: string,
      @Body('status') status: ConfirmationStatus,
  ) {
    return this.confirmationService.updateStatus(id, status);
  }
}
