import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsInt,
  IsArray,
  IsOptional,
  Min,
  Max,
  IsNumber,
  IsEnum,
} from "class-validator";
import { Transform } from "class-transformer";

export class UpdateRoomTypeDto {
  @ApiPropertyOptional({ example: "Updated Standard Double Room" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: "Updated room description with enhanced amenities",
  })
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
      example: ["lamp", "table", "chair", "wardrobe", "bed"],
      description: "List of equipment in the room",
    })
    @Transform(({ value }) => {
      if (typeof value === "string") {
        return value.split(",").map((item) => item.trim());
      }
      if (Array.isArray(value)) {
        return value;
      }
      return [];
    })
    @IsArray()
    @IsString({ each: true })
    equipment: string[];

  @ApiPropertyOptional({
    example: "B",
    description: "Updated room type identifier (A, B, C, etc.)",
  })
  @IsOptional()
  @IsString()
  typeCode?: string;

  @ApiPropertyOptional({ description: "Price category ID" })
  @IsOptional()
  @IsString()
  priceCategoryId?: string;
}
