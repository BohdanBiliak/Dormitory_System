import { IsString, IsEnum, IsOptional, IsArray, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MaintenanceCategory, MaintenancePriority } from '@prisma/client';

export class CreateMaintenanceReportDto {
  @ApiProperty({ 
    enum: MaintenanceCategory,
    description: 'Category of the maintenance issue',
    example: MaintenanceCategory.PLUMBING
  })
  @IsEnum(MaintenanceCategory)
  category: MaintenanceCategory;

  @ApiProperty({ 
    enum: MaintenancePriority,
    description: 'Priority level of the issue',
    example: MaintenancePriority.HIGH
  })
  @IsEnum(MaintenancePriority)
  priority: MaintenancePriority;

  @ApiProperty({ 
    description: 'Brief title of the issue',
    example: 'Broken faucet in bathroom',
    minLength: 5,
    maxLength: 200
  })
  @IsString()
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  @MaxLength(200, { message: 'Title cannot exceed 200 characters' })
  title: string;

  @ApiProperty({ 
    description: 'Detailed description of the issue',
    example: 'The faucet in the bathroom has been leaking for 2 days. Water drips continuously even when turned off completely.',
    minLength: 10
  })
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  description: string;

  @ApiProperty({ 
    description: 'Specific location of the issue',
    example: 'Room 203, Bathroom',
    minLength: 3
  })
  @IsString()
  @MinLength(3, { message: 'Location must be at least 3 characters long' })
  location: string;

  @ApiProperty({ 
    description: 'Room ID (optional)',
    example: 'clm123456789',
    required: false
  })
  @IsOptional()
  @IsString()
  roomId?: string;

  @ApiProperty({ 
    description: 'Array of attachment URLs (images or documents)',
    example: ['https://s3.amazonaws.com/bucket/image1.jpg', 'https://s3.amazonaws.com/bucket/image2.jpg'],
    required: false,
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];
}
