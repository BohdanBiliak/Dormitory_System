import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Authorization } from '@/libs/common/decorators/auth.decorator';
import { $Enums } from '../../../../__generated__';
import { CreateRoomTypeUseCase } from './use-cases/create-room-type.use-case';
import { GetRoomTypesUseCase } from './use-cases/get-room-types.use-case';
import { UpdateRoomTypeUseCase } from './use-cases/update-room-type.use-case';
import { DeleteRoomTypeUseCase } from './use-cases/delete-room-type.use-case';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';

@ApiTags('Room Types')
@ApiBearerAuth()
@Controller('room-types')
export class RoomTypesController {
  constructor(
    private readonly createRoomTypeUseCase: CreateRoomTypeUseCase,
    private readonly getRoomTypesUseCase: GetRoomTypesUseCase,
    private readonly updateRoomTypeUseCase: UpdateRoomTypeUseCase,
    private readonly deleteRoomTypeUseCase: DeleteRoomTypeUseCase,
  ) {}

  @Post()
  @Authorization($Enums.UserRole.Admin, $Enums.UserRole.SuperAdmin)
  @ApiOperation({ summary: 'Create a new room type template' })
  @ApiResponse({ status: 201, description: 'Room type created successfully' })
  @ApiResponse({ status: 400, description: 'Room type with this code already exists' })
  async create(@Body() createRoomTypeDto: CreateRoomTypeDto) {
    return this.createRoomTypeUseCase.execute(createRoomTypeDto);
  }

  @Get()
  @Authorization($Enums.UserRole.Admin, $Enums.UserRole.SuperAdmin)
  @ApiOperation({ summary: 'Get all room types' })
  @ApiResponse({ status: 200, description: 'List of room types' })
  async findAll() {
    return this.getRoomTypesUseCase.execute();
  }

  @Get(':id')
  @Authorization($Enums.UserRole.Admin, $Enums.UserRole.SuperAdmin)
  @ApiOperation({ summary: 'Get room type by ID' })
  @ApiParam({ name: 'id', description: 'Room type ID' })
  @ApiResponse({ status: 200, description: 'Room type details' })
  @ApiResponse({ status: 404, description: 'Room type not found' })
  async findOne(@Param('id') id: string) {
    return this.getRoomTypesUseCase.execute(id);
  }

  @Patch(':id')
  @Authorization($Enums.UserRole.Admin, $Enums.UserRole.SuperAdmin)
  @ApiOperation({ summary: 'Update room type' })
  @ApiParam({ name: 'id', description: 'Room type ID' })
  @ApiResponse({ status: 200, description: 'Room type updated successfully' })
  @ApiResponse({ status: 404, description: 'Room type not found' })
  @ApiResponse({ status: 400, description: 'Room type code already exists' })
  async update(@Param('id') id: string, @Body() updateRoomTypeDto: UpdateRoomTypeDto) {
    return this.updateRoomTypeUseCase.execute(id, updateRoomTypeDto);
  }

  @Delete(':id')
  @Authorization($Enums.UserRole.Admin, $Enums.UserRole.SuperAdmin)
  @ApiOperation({ summary: 'Delete room type' })
  @ApiParam({ name: 'id', description: 'Room type ID' })
  @ApiResponse({ status: 200, description: 'Room type deleted successfully' })
  @ApiResponse({ status: 404, description: 'Room type not found' })
  @ApiResponse({ status: 400, description: 'Room type is in use and cannot be deleted' })
  async remove(@Param('id') id: string) {
    return this.deleteRoomTypeUseCase.execute(id);
  }
}