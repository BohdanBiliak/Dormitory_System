import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsArray, IsOptional, Min, Max } from 'class-validator';

export class UpdateRoomTypeDto {
  @ApiPropertyOptional({ example: 'Updated Standard Double Room' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Updated room description with enhanced amenities' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 3, minimum: 1, maximum: 6 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(6)
  capacity?: number;

  @ApiPropertyOptional({ 
    type: [String], 
    example: ['Bed', 'Desk', 'Chair', 'Wardrobe', 'Air Conditioner', 'Mini Fridge'],
    description: 'Updated list of equipment/furniture in this room type'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  equipment?: string[];

  @ApiPropertyOptional({ example: 'B', description: 'Updated room type identifier (A, B, C, etc.)' })
  @IsOptional()
  @IsString()
  typeCode?: string;
}