import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceReportDto } from './dto/create-maintenance-report.dto';
import { UpdateMaintenanceStatusDto } from './dto/update-maintenance-status.dto';
import { GetMaintenanceReportsDto } from './dto/get-maintenance-reports.dto';
import { CreateConversationFromReportDto } from './dto/create-conversation-from-report.dto';
import { RolesGuard } from '@/libs/common/guards/roles.guard';
import { Roles } from '@/libs/common/decorators/roles.decorator';
import { UserRole } from '../../../__generated__';

@ApiTags('Maintenance')
@ApiBearerAuth()
@Controller('maintenance-reports')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a maintenance report' })
  @ApiResponse({ status: 201, description: 'Report created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createReport(
    @Request() req,
    @Body() createReportDto: CreateMaintenanceReportDto,
  ) {
    return this.maintenanceService.createReport(req.user.id, createReportDto);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get my maintenance reports' })
  @ApiResponse({ status: 200, description: 'Returns user\'s maintenance reports' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMyReports(
    @Request() req,
    @Query() query: GetMaintenanceReportsDto,
  ) {
    return this.maintenanceService.getMyReports(req.user.id, query);
  }

  @Get('stats')
  @Roles(UserRole.Admin, UserRole.SuperAdmin)
  @ApiOperation({ summary: 'Get maintenance report statistics (Admin only)' })
  @ApiResponse({ status: 200, description: 'Returns statistics' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getStats() {
    return this.maintenanceService.getReportStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a maintenance report by ID' })
  @ApiResponse({ status: 200, description: 'Returns the maintenance report' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getReportById(@Request() req, @Param('id') id: string) {
    return this.maintenanceService.getReportById(id, req.user.id);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.SuperAdmin)
  @ApiOperation({ summary: 'Get all maintenance reports (Admin only)' })
  @ApiResponse({ status: 200, description: 'Returns all maintenance reports' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getAllReports(@Query() query: GetMaintenanceReportsDto) {
    return this.maintenanceService.getAllReports(query);
  }

  @Patch(':id/status')
  @Roles(UserRole.Admin, UserRole.SuperAdmin)
  @ApiOperation({ summary: 'Update maintenance report status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async updateReportStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateMaintenanceStatusDto,
  ) {
    return this.maintenanceService.updateReportStatus(id, req.user.id, updateStatusDto);
  }

  @Post(':id/conversation')
  @Roles(UserRole.Admin, UserRole.SuperAdmin)
  @ApiOperation({ summary: 'Create a conversation from maintenance report (Admin only)' })
  @ApiResponse({ status: 201, description: 'Conversation created successfully' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  @ApiResponse({ status: 400, description: 'Conversation already exists' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async createConversation(
    @Request() req,
    @Param('id') id: string,
    @Body() createConversationDto: CreateConversationFromReportDto,
  ) {
    return this.maintenanceService.createConversationFromReport(
      id,
      req.user.id,
      createConversationDto.initialMessage,
    );
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload maintenance report attachments' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Files uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid files' })
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadAttachments(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = await this.maintenanceService.uploadAttachments(files);
    return { urls };
  }
}
