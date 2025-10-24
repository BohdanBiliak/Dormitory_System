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
    oneOf: [
      { type: "array", items: { type: "string" } },
      { type: "string", description: "JSON string of equipment array" },
    ],
    example: [
      "Bed",
      "Desk",
      "Chair",
      "Wardrobe",
      "Air Conditioner",
      "Mini Fridge",
    ],
    description: "Updated list of equipment/furniture in this room type",
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  equipment?: string[] | string;

  @ApiPropertyOptional({
    example: "B",
    description: "Updated room type identifier (A, B, C, etc.)",
  })
  @IsOptional()
  @IsString()
  typeCode?: string;
}
