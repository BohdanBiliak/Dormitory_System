import { IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MaintenanceStatus, MaintenanceCategory, MaintenancePriority } from '@prisma/client';

export class GetMaintenanceReportsDto {
  @ApiPropertyOptional({ 
    description: 'Page number',
    example: 1,
    minimum: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ 
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
    maximum: 100
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({ 
    enum: MaintenanceStatus,
    description: 'Filter by status',
    example: MaintenanceStatus.PENDING
  })
  @IsOptional()
  @IsEnum(MaintenanceStatus)
  status?: MaintenanceStatus;

  @ApiPropertyOptional({ 
    enum: MaintenanceCategory,
    description: 'Filter by category',
    example: MaintenanceCategory.PLUMBING
  })
  @IsOptional()
  @IsEnum(MaintenanceCategory)
  category?: MaintenanceCategory;

  @ApiPropertyOptional({ 
    enum: MaintenancePriority,
    description: 'Filter by priority',
    example: MaintenancePriority.HIGH
  })
  @IsOptional()
  @IsEnum(MaintenancePriority)
  priority?: MaintenancePriority;
}
