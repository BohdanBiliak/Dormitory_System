import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req, UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiConsumes, ApiParam, ApiQuery
} from '@nestjs/swagger';
import { CreateAnnouncementDto } from "../dto/create-announcement.dto";
import { CreateAnnouncementUseCase } from "@modules/announcement/use-cases/create-announcement.use-case";
import { GetAnnouncementsUseCase } from "@modules/announcement/use-cases/get-announcements.use-case";
import { DeleteAnnouncementUseCase } from "@modules/announcement/use-cases/delete-announcement.use-case";
import {UploadAnnouncementAttachmentsUseCase} from "@modules/announcement/use-cases/upload-announcement-attachments.use-case";
import { GetAnnouncementByIdUseCase } from "@modules/announcement/use-cases/get-announcement-by-id.use-case";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AnnouncementResponseDto } from "@modules/announcement/dto/announcement-response.dto";
import { $Enums } from "../../../../__generated__";
import UserRole = $Enums.UserRole;
import { GetPublicAnnouncementsUseCase } from "@modules/announcement/use-cases/get-public-announcements.use-case";
import { Authorization } from "@libs/common/decorators/auth.decorator";

@ApiTags('Announcements')
@ApiBearerAuth()
@Controller('announcements')
export class AnnouncementController {
  constructor(
    private readonly createUseCase: CreateAnnouncementUseCase,
    private readonly getAllUseCase: GetAnnouncementsUseCase,
    private readonly deleteUseCase: DeleteAnnouncementUseCase,
    private readonly uploadUseCase: UploadAnnouncementAttachmentsUseCase,
    private readonly getAnnouncementByIdUseCase: GetAnnouncementByIdUseCase,
    private readonly getPublicAnnouncementsUseCase: GetPublicAnnouncementsUseCase
  ) { }

  @Post()
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @ApiOperation({ summary: 'Create announcement', description: 'Створення оголошення адміністратором' })
  @ApiResponse({ status: 201, description: 'Announcement created', type: AnnouncementResponseDto })
  @ApiBody({ type: CreateAnnouncementDto })
  create(@Body() dto: CreateAnnouncementDto, @Req() req) {
    return this.createUseCase.execute(dto, req.user.id);
  }
@Get('public')
  @ApiOperation({ summary: 'Get all public announcements (for everyone)' })
  @ApiQuery({ name: 'showHidden', required: false, type: Boolean, description: 'Include hidden announcements' })
  @ApiQuery({ name: 'showExpired', required: false, type: Boolean, description: 'Include expired announcements' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (pagination)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (pagination)' })
  @ApiResponse({
    status: 200,
    description: 'List of public announcements with pagination',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array', items: { $ref: '#/components/schemas/AnnouncementResponseDto' } },
        pagination: {
          type: 'object',
          properties: {
            total: { type: 'number', example: 100 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 20 },
            totalPages: { type: 'number', example: 5 },
          },
        },
      },
    },
  })
  findPublic(
    @Query('showHidden') showHidden: string,
    @Query('showExpired') showExpired: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.getPublicAnnouncementsUseCase.execute(  {
      showHidden: showHidden === 'true',
      showExpired: showExpired === 'true',
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,})
  }

  @Get()
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @ApiOperation({ summary: 'Get all announcements' })
  @ApiQuery({ name: 'showHidden', required: false, type: Boolean })
  @ApiQuery({ name: 'showExpired', required: false, type: Boolean })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiResponse({
    status: 200,
    description: 'List of announcements with pagination',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array' },
        pagination: {
          type: 'object',
          properties: {
            total: { type: 'number', example: 100 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 20 },
            totalPages: { type: 'number', example: 5 },
          },
        },
      },
    },
  })
  findAll(
    @Query('showHidden') showHidden: string,
    @Query('showExpired') showExpired: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.getAllUseCase.execute({
      showHidden: showHidden === 'true',
      showExpired: showExpired === 'true',
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get announcement by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Announcement', type: AnnouncementResponseDto })
  async getById(@Param('id') id: string) {
    return this.getAnnouncementByIdUseCase.execute(id);
  }

  @Delete(':id')
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @ApiOperation({ summary: 'Delete announcement (soft)' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Announcement deleted (soft)' })
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }

  @Post('upload')
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @ApiOperation({ summary: 'Upload announcement attachments' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' }
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Array of uploaded file URLs', type: String, isArray: true })
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = await this.uploadUseCase.execute(files, 'announcements');
    return { urls };
  }


}
