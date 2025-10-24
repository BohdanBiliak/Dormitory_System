import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { PaymentType, PaymentMethod } from "../../../../__generated__";
import { CreatePaymentItemDto } from "./create-payment-item.dto";

export class CreatePaymentDto {
  @ApiProperty({ example: "uuid-user", description: "User ID" })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({
    example: "uuid-booking",
    description: "Booking ID (optional)",
  })
  @IsOptional()
  @IsString()
  bookingId?: string;

  @ApiProperty({ example: 500, description: "Total payment amount" })
  @IsNumber()
  amount: number;

  @ApiProperty({ 
    example: "MONTHLY_RENT", 
    description: "Payment type",
    enum: PaymentType,
    enumName: 'PaymentType'
  })
  @IsString()
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiProperty({ 
    example: "BANK_TRANSFER", 
    description: "Payment method",
    enum: PaymentMethod,
    enumName: 'PaymentMethod'
  })
  @IsString()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ example: "2025-08-01T00:00:00Z", description: "Due date" })
  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @ApiPropertyOptional({ example: "Payment for July rent" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: [CreatePaymentItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentItemDto)
  paymentItems?: CreatePaymentItemDto[];
}
