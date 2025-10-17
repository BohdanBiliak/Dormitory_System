import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePaymentItemDto {
  @ApiProperty({
    example: "RENT",
    description: "Type of the payment item (e.g., RENT, UTILITY, DEPOSIT)",
  })
  @IsString()
  @IsNotEmpty()
  itemType: string;

  @ApiProperty({
    example: "Monthly dorm rent for August 2025",
    description: "Detailed description of the payment item",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 500,
    description: "Amount for this payment item (in currency units)",
  })
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({
    example: "2025-08",
    description:
      "Optional period for which this item applies (e.g., month/year)",
  })
  @IsOptional()
  @IsString()
  period?: string;
}
