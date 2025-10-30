import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class AssignPriceCategoryDto {
  @ApiProperty({ 
    example: "price-category-id-123",
    description: "ID of the price category to assign to this room"
  })
  @IsString()
  priceCategoryId: string;
}