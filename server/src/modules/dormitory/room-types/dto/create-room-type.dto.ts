import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  IsOptional,
  Min,
  Max,
  ArrayMinSize,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateRoomTypeDto {
  @ApiProperty({ example: "Standard Double Room" })
  @IsString()
  name: string;

  @ApiProperty({ example: "STD-DBL" })
  @IsString()
  typeCode: string;

  @ApiPropertyOptional({
    example: "A standard room with 2 beds and basic amenities",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 2, minimum: 1, maximum: 10 })
  @IsNumber()
  @Min(1)
  @Max(10)
  capacity: number;
  
  @ApiProperty({
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
    type: "array",
    items: { type: "string", format: "binary" },
    description: "Array of photo URLs (optional when uploading files)",
    example: [
      "https://example.com/photo1.jpg",
      "https://example.com/photo2.jpg",
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];

  @ApiPropertyOptional({ description: "Price category ID" })
  @IsOptional()
  @IsString()
  priceCategoryId?: string;
}
