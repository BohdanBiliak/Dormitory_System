import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PricingService } from './pricing.service';
import { Authorization } from '@/libs/common/decorators/auth.decorator';

@ApiTags('Pricing')
@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get('room/:roomId')
  @Authorization()
  @ApiOperation({
    summary: 'Get pricing for a specific room',
    description: 'Returns pricing information for a room from price categories assigned to the room or room type'
  })
  @ApiParam({ name: 'roomId', description: 'Room ID' })
  @ApiResponse({
    status: 200,
    description: 'Room pricing information',
    schema: {
      example: {
        pricePerDay: 30,
        pricePerMonth: 600,
        source: 'price_category_room',
        categoryName: 'Standard Single',
        categoryId: 'uuid'
      }
    }
  })
  async getRoomPricing(@Param('roomId') roomId: string) {
    return this.pricingService.getRoomPricing(roomId);
  }

  @Get('room/:roomId/details')
  @Authorization()
  @ApiOperation({
    summary: 'Get detailed pricing information for a room',
    description: 'Returns comprehensive pricing and room information'
  })
  @ApiParam({ name: 'roomId', description: 'Room ID' })
  async getRoomPricingDetails(@Param('roomId') roomId: string) {
    return this.pricingService.getRoomPricingDetails(roomId);
  }

  @Get('dormitory/:dormitoryId')
  @Authorization()
  @ApiOperation({
    summary: 'Get pricing information for all rooms in a dormitory',
    description: 'Returns pricing statistics and details for all rooms in a dormitory'
  })
  @ApiParam({ name: 'dormitoryId', description: 'Dormitory ID' })
  async getDormitoryPricing(@Param('dormitoryId') dormitoryId: string) {
    return this.pricingService.getDormitoryRoomsPricing(dormitoryId);
  }

  @Get('statistics/global')
  @Authorization()
  @ApiOperation({
    summary: 'Get global pricing statistics',
    description: 'Returns system-wide pricing statistics showing price category coverage'
  })
  @ApiResponse({
    status: 200,
    description: 'Global pricing statistics',
    schema: {
      example: {
        totalRooms: 150,
        roomsWithPriceCategory: 120,
        roomsWithoutAnyPricing: 30,
        priceCategoryCoverage: 80,
        activeCategories: 8,
        migrationProgress: {
          total: 150,
          migrated: 120,
          remaining: 30,
          percentage: 80
        }
      }
    }
  })
  async getGlobalStatistics() {
    return this.pricingService.getGlobalPricingStatistics();
  }

  @Get('rooms')
  @Authorization()
  @ApiOperation({
    summary: 'Get pricing for multiple rooms',
    description: 'Returns pricing information for specified room IDs'
  })
  @ApiQuery({ 
    name: 'roomIds', 
    description: 'Comma-separated list of room IDs',
    example: 'uuid1,uuid2,uuid3'
  })
  async getMultipleRoomsPricing(@Query('roomIds') roomIds: string) {
    const roomIdArray = roomIds.split(',').map(id => id.trim());
    return this.pricingService.getMultipleRoomsPricing(roomIdArray);
  }
}