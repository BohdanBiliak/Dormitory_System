import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray, IsOptional } from "class-validator";

export class AssignRoomTypesToCategoryDto {
  @ApiProperty({ 
    example: ["room-type-id-1", "room-type-id-2"],
    description: "Array of room type IDs to assign to this price category"
  })
  @IsArray()
  @IsString({ each: true })
  roomTypeIds: string[];
}

export class AssignRoomsToCategory {
  @ApiProperty({ 
    example: ["room-id-1", "room-id-2"],
    description: "Array of room IDs to assign to this price category"
  })
  @IsArray()
  @IsString({ each: true })
  roomIds: string[];
}

export class PriceCategoryFilterDto {
  @ApiProperty({ 
    required: false,
    description: "Filter by active status"
  })
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ 
    required: false,
    description: "Search by name"
  })
  @IsOptional()
  @IsString()
  search?: string;
}