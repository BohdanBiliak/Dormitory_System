import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req, UploadedFiles,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiConsumes, ApiParam, ApiQuery
} from '@nestjs/swagger';
import { CreateAnnouncementDto } from "../dto/create-announcement.dto";
import {CreateAnnouncementUseCase} from "@modules/announcement/use-cases/create-announcement.use-case";
import {GetAnnouncementsUseCase} from "@modules/announcement/use-cases/get-announcements.use-case";
import {UpdateAnnouncementUseCase} from "@modules/announcement/use-cases/update-announcement.use-case";
import {DeleteAnnouncementUseCase} from "@modules/announcement/use-cases/delete-announcement.use-case";
import {
  UploadAnnouncementAttachmentsUseCase
} from "@modules/announcement/use-cases/upload-announcement-attachments.use-case";
import {GetAnnouncementByIdUseCase} from "@modules/announcement/use-cases/get-announcement-by-id.use-case";
import {UpdateAnnouncementDto} from "@modules/announcement/dto/update-announcement.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {AnnouncementResponseDto} from "@modules/announcement/dto/announcement-response.dto";
import {RolesGuard} from "@libs/common/guards/roles.guard";
import {Roles} from "@libs/common/decorators/roles.decorator";
import {$Enums} from "../../../../__generated__";
import UserRole = $Enums.UserRole;
import {GetPublicAnnouncementsUseCase} from "@modules/announcement/use-cases/get-public-announcements.use-case";

@ApiTags('Announcements')
@ApiBearerAuth()
@Controller('announcements')
@UseGuards(RolesGuard)
export class AnnouncementController {
  constructor(
      private readonly createUseCase: CreateAnnouncementUseCase,
      private readonly getAllUseCase: GetAnnouncementsUseCase,
      private readonly updateUseCase: UpdateAnnouncementUseCase,
      private readonly deleteUseCase: DeleteAnnouncementUseCase,
      private readonly uploadUseCase: UploadAnnouncementAttachmentsUseCase,
      private readonly getAnnouncementByIdUseCase: GetAnnouncementByIdUseCase,
      private readonly getPublicAnnouncementsUseCase: GetPublicAnnouncementsUseCase
  ){}

  @Post()
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: 'Create announcement', description: 'Створення оголошення адміністратором' })
  @ApiResponse({ status: 201, description: 'Announcement created', type: AnnouncementResponseDto })
  @ApiBody({ type: CreateAnnouncementDto })
  create(@Body() dto: CreateAnnouncementDto, @Req() req) {
    return this.createUseCase.execute(dto, req.user.id);
  }

  @Get()
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: 'Get all announcements' })
  @ApiQuery({ name: 'showHidden', required: false, type: Boolean })
  @ApiQuery({ name: 'showExpired', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'List of announcements', type: [AnnouncementResponseDto] })
  findAll(
      @Query('showHidden') showHidden: string,
      @Query('showExpired') showExpired: string
  ) {
    return this.getAllUseCase.execute({
      showHidden: showHidden === 'true',
      showExpired: showExpired === 'true'
    });
  }

  @Get(':id')
  @Roles(UserRole.Admin, UserRole.SignedInUser, UserRole.Regular)
  @ApiOperation({ summary: 'Get announcement by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Announcement', type: AnnouncementResponseDto })
  async getById(@Param('id') id: string) {
    return this.getAnnouncementByIdUseCase.execute(id);
  }

  @Patch(':id')
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: 'Update announcement' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateAnnouncementDto })
  @ApiResponse({ status: 200, description: 'Announcement updated', type: AnnouncementResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateAnnouncementDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: 'Delete announcement (soft)' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Announcement deleted (soft)' })
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }

  @Post('upload')
  @Roles(UserRole.Admin)
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


  @Get('public')
  @Roles(UserRole.SignedInUser, UserRole.Regular)
  @ApiOperation({ summary: 'Get all public announcements (for everyone)' })
  @ApiResponse({ status: 200, description: 'List of public announcements', type: [AnnouncementResponseDto] })
  findPublic() {
    return this.getPublicAnnouncementsUseCase.execute();
  }
}
