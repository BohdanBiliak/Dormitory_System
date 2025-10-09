import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFloorRoomAssignmentDto } from '../room-types/dto/create-floor-room-assignment.dto';

export class CreateDormitoryWithFloorsDto {
  @ApiProperty({ example: 'Dormitory A' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Main campus dormitory building' })
  @IsString()
  description: string;

  @ApiProperty({ example: '123 University St, City' })
  @IsString()
  address: string;

  @ApiProperty({ example: 5, minimum: 1 })
  @IsNumber()
  @Min(1)
  numberOfFloors: number;

  @ApiProperty({ 
    type: [CreateFloorRoomAssignmentDto],
    description: 'Room type assignments for each floor'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFloorRoomAssignmentDto)
  floorAssignments: CreateFloorRoomAssignmentDto[];
}