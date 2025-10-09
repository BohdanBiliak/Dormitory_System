import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsArray, IsOptional, Min, Max } from 'class-validator';
import { RoomCategory } from '../../room-types/entities/room-type.entity';

export class CreateRoomTypeDto {
  @ApiProperty({ example: 'Standard Double Room' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'STD-DBL' })
  @IsString()
  typeCode: string;

  @ApiPropertyOptional({ example: 'A standard room with 2 beds and basic amenities' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 2, minimum: 1, maximum: 10 })
  @IsNumber()
  @Min(1)
  @Max(10)
  capacity: number;

  @ApiProperty({ example: 25.5, minimum: 5, maximum: 200 })
  @IsNumber()
  @Min(5)
  @Max(200)
  area: number;

  @ApiProperty({ enum: RoomCategory, example: RoomCategory.RESIDENTIAL })
  @IsEnum(RoomCategory)
  category: RoomCategory;

  @ApiProperty({ 
    type: [String], 
    example: ['lamp', 'table', 'chair', 'wardrobe', 'bed'],
    description: 'List of equipment in the room'
  })
  @IsArray()
  @IsString({ each: true })
  equipment: string[];
}