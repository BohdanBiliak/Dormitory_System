import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateManagerUseCase } from '../services/manager/CreateManagerUseCase';
import { GetManagersUseCase } from '../services/manager/GetManagerUseCase';
import { UpdateManagerUseCase } from '../services/manager/UpdateManagerUseCase';
import { DeactivateManagerUseCase } from '../services/manager/DeactivateManagerUseCase';
import { CreateManagerDto } from '../dto/CreateMeneger.dto';
import { UpdateManagerDto } from '../dto/UpdateManager.dto';
import { ManagerFiltersDto } from '../dto/ManagerFilters.dto';
import { ManagerResponseDto } from '../dto/ManagerResponse.dto';
import { Authorization } from '@/libs/common/decorators/auth.decorator';
import { CurrentUser } from '@/libs/common/decorators/current-user.decorator';
import { $Enums } from '../../../../__generated__';

@ApiTags('Manager')
@ApiBearerAuth()
@Controller('admin/managers')
export class ManagerController {
  constructor(
    private readonly createManagerUseCase: CreateManagerUseCase,
    private readonly getManagersUseCase: GetManagersUseCase,
    private readonly updateManagerUseCase: UpdateManagerUseCase,
    private readonly deactivateManagerUseCase: DeactivateManagerUseCase,
  ) {}

  @Post()
  @Authorization($Enums.UserRole.SuperAdmin)
  @ApiOperation({ 
    summary: 'Create new manager',
    description: 'Creates a new dormitory manager account'
  })
  @ApiBody({ type: CreateManagerDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Manager created successfully',
    type: ManagerResponseDto 
  })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @ApiResponse({ status: 400, description: 'Passwords do not match' })
  async createManager(
    @Body() dto: CreateManagerDto,
    @CurrentUser('id') currentUserId: string,
  ) {
    return this.createManagerUseCase.execute(dto, currentUserId);
  }

  @Get()
  @Authorization($Enums.UserRole.SuperAdmin, $Enums.UserRole.Admin)
  @ApiOperation({ 
    summary: 'Get all managers',
    description: 'Returns paginated list of dormitory managers with filtering and sorting'
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['Name', 'Email'], example: 'Name' })
  @ApiQuery({ name: 'show', required: false, enum: ['All', 'Residents only'], example: 'All' })
  @ApiQuery({ name: 'dormitoryId', required: false, type: String })
  @ApiResponse({ 
    status: 200, 
    description: 'Managers retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array', items: { $ref: '#/components/schemas/ManagerResponseDto' } },
        total: { type: 'number' },
        page: { type: 'number' },
        pageCount: { type: 'number' },
      },
    },
  })
  async getManagers(@Query() filters: ManagerFiltersDto) {
    return this.getManagersUseCase.execute(filters);
  }

  @Get(':id')
  @Authorization($Enums.UserRole.SuperAdmin, $Enums.UserRole.Admin)
  @ApiOperation({ 
    summary: 'Get manager by ID',
    description: 'Returns detailed information about a specific manager'
  })
  @ApiParam({ name: 'id', type: String, description: 'Manager ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Manager found',
    type: ManagerResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Manager not found' })
  async getManagerById(@Param('id') id: string) {
    // This would use a GetManagerByIdUseCase
    return { message: 'Get manager by ID implementation needed' };
  }

  @Patch(':id')
  @Authorization($Enums.UserRole.SuperAdmin)
  @ApiOperation({ 
    summary: 'Update manager',
    description: 'Updates manager profile information'
  })
  @ApiParam({ name: 'id', type: String, description: 'Manager ID' })
  @ApiBody({ type: UpdateManagerDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Manager updated successfully',
    type: ManagerResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Manager not found' })
  async updateManager(
    @Param('id') id: string,
    @Body() dto: UpdateManagerDto,
  ) {
    return this.updateManagerUseCase.execute(id, dto);
  }

  @Delete(':id/deactivate')
  @Authorization($Enums.UserRole.SuperAdmin)
  @ApiOperation({ 
    summary: 'Deactivate manager',
    description: 'Deactivates a manager account (soft delete)'
  })
  @ApiParam({ name: 'id', type: String, description: 'Manager ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Manager deactivated successfully',
    type: ManagerResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Manager not found' })
  @ApiResponse({ status: 400, description: 'Manager is already deactivated' })
  async deactivateManager(
    @Param('id') id: string,
    @CurrentUser('id') currentUserId: string,
  ) {
    return this.deactivateManagerUseCase.execute(id, currentUserId);
  }

  @Post(':id/activate')
  @Authorization($Enums.UserRole.SuperAdmin)
  @ApiOperation({ 
    summary: 'Activate manager',
    description: 'Reactivates a deactivated manager account'
  })
  @ApiParam({ name: 'id', type: String, description: 'Manager ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Manager activated successfully',
    type: ManagerResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Manager not found' })
  async activateManager(@Param('id') id: string) {
    // This would use an ActivateManagerUseCase
    return { message: 'Activate manager implementation needed' };
  }
}