import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class AssignPriceCategoryDto {
  @ApiProperty({
    description: "ID of the price category to assign",
    example: "uuid-of-price-category",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  priceCategoryId?: string | null;
}