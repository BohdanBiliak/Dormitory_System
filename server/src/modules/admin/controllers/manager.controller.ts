import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CreateManagerUseCase } from '../use-cases/manager/CreateManagerUseCase';
import { GetManagersUseCase } from '../use-cases/manager/GetManagerUseCase';
import { UpdateManagerUseCase } from '../use-cases/manager/UpdateManagerUseCase';
import { DeactivateManagerUseCase } from '../use-cases/manager/DeactivateManagerUseCase';
import { CreateManagerDto } from '../dto/CreateMeneger.dto';
import { UpdateManagerDto } from '../dto/UpdateManager.dto';
import { ManagerFiltersDto } from '../dto/ManagerFilters.dto';
import { Authorization } from '@/libs/common/decorators/auth.decorator';
import { CurrentUser } from '@/libs/common/decorators/current-user.decorator';
import { $Enums } from '../../../../__generated__';
import { ManagerDocs } from '../docs/manager.docs';

@ManagerDocs.controller()
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
  @ManagerDocs.createManager()
  async createManager(
    @Body() dto: CreateManagerDto,
    @CurrentUser('id') currentUserId: string,
  ) {
    return this.createManagerUseCase.execute(dto, currentUserId);
  }

  @Get()
  @Authorization($Enums.UserRole.SuperAdmin, $Enums.UserRole.Admin)
  @ManagerDocs.getManagers()
  async getManagers(@Query() filters: ManagerFiltersDto) {
    return this.getManagersUseCase.execute(filters);
  }

  @Get(':id')
  @Authorization($Enums.UserRole.SuperAdmin, $Enums.UserRole.Admin)
  @ManagerDocs.getManagerById()
  async getManagerById(@Param('id') id: string) {
    // This would use a GetManagerByIdUseCase
    return { message: 'Get manager by ID implementation needed' };
  }

  @Patch(':id')
  @Authorization($Enums.UserRole.SuperAdmin)
  @ManagerDocs.updateManager()
  async updateManager(
    @Param('id') id: string,
    @Body() dto: UpdateManagerDto,
  ) {
    return this.updateManagerUseCase.execute(id, dto);
  }

  @Delete(':id/deactivate')
  @Authorization($Enums.UserRole.SuperAdmin, $Enums.UserRole.Admin)
  @ManagerDocs.deactivateManager()
  async deactivateManager(
    @Param('id') id: string,
    @CurrentUser('id') currentUserId: string,
  ) {
    return this.deactivateManagerUseCase.execute(id, currentUserId);
  }

  @Post(':id/activate')
  @Authorization($Enums.UserRole.SuperAdmin, $Enums.UserRole.Admin)
  @ManagerDocs.activateManager()
  async activateManager(@Param('id') id: string) {
    // This would use an ActivateManagerUseCase
    return { message: 'Activate manager implementation needed' };
  }
}