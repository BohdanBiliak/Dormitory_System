import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MaintenanceStatus } from '@prisma/client';

export class UpdateMaintenanceStatusDto {
  @ApiProperty({ 
    enum: MaintenanceStatus,
    description: 'New status for the maintenance report',
    example: MaintenanceStatus.IN_PROGRESS
  })
  @IsEnum(MaintenanceStatus)
  status: MaintenanceStatus;
}
