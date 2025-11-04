import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  ValidateNested,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";
import { PaymentType, PaymentMethod } from "../../../../__generated__";

export class BulkPaymentUserDto {
  @ApiProperty({ description: "User ID" })
  @IsString()
  userId: string;

  @ApiPropertyOptional({ description: "Custom amount for this user (overrides calculated amount)" })
  @IsOptional()
  @IsNumber()
  customAmount?: number;

  @ApiPropertyOptional({ description: "Room ID for this user (if not using global roomIds)" })
  @IsOptional()
  @IsString()
  roomId?: string;
}

export class CreateBulkPaymentDto {
  @ApiProperty({ 
    type: [BulkPaymentUserDto],
    description: "List of users and their payment details" 
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkPaymentUserDto)
  users: BulkPaymentUserDto[];

  @ApiPropertyOptional({ 
    description: "Base amount to use if not calculating from room/price category" 
  })
  @IsOptional()
  @IsNumber()
  baseAmount?: number;

  @ApiProperty({
    description: "Payment type",
    enum: PaymentType,
    enumName: "PaymentType",
    example: "MONTHLY_RENT"
  })
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiProperty({
    description: "Payment method",
    enum: PaymentMethod,
    enumName: "PaymentMethod",
    example: "BANK_TRANSFER"
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ 
    description: "Due date for all payments",
    example: "2025-12-01T00:00:00Z"
  })
  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @ApiPropertyOptional({ description: "Description/notes for all payments" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ 
    description: "Price category ID to use for calculating amounts (if applicable)" 
  })
  @IsOptional()
  @IsString()
  priceCategoryId?: string;

  @ApiPropertyOptional({ 
    description: "List of room IDs to create payments for (will use room residents)" 
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roomIds?: string[];

  @ApiPropertyOptional({ 
    description: "Dormitory ID to filter rooms/users" 
  })
  @IsOptional()
  @IsString()
  dormitoryId?: string;

  @ApiPropertyOptional({ 
    description: "If true, calculate amount from room's price category automatically" 
  })
  @IsOptional()
  @IsBoolean()
  useRoomPricing?: boolean;

  @ApiPropertyOptional({ 
    description: "Period in days for daily rent calculation (if applicable)" 
  })
  @IsOptional()
  @IsNumber()
  periodInDays?: number;
}
