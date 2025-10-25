import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, IsBoolean, Min } from "class-validator";
import { Transform } from "class-transformer";

export class CreatePriceCategoryDto {
  @ApiProperty({ 
    example: "Standard Single Room",
    description: "Name of the price category"
  })
  @IsString()
  name: string;

  @ApiProperty({ 
    example: "Standard pricing for single occupancy rooms",
    description: "Optional description of the price category",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    example: 600,
    description: "Monthly price in PLN"
  })
  @Transform(({ value }) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num) ? value : num;
  })
  @IsNumber()
  @Min(0)
  pricePerMonth: number;

  @ApiProperty({ 
    example: 25,
    description: "Daily price in PLN"
  })
  @Transform(({ value }) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num) ? value : num;
  })
  @IsNumber()
  @Min(0)
  pricePerDay: number;

  @ApiProperty({ 
    example: true,
    description: "Whether the price category is active",
    required: false,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}