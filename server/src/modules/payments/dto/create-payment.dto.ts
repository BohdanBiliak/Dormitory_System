import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentItemDto {
  @ApiProperty({ example: 'RENT', description: 'Type of payment item' })
  @IsString()
  @IsNotEmpty()
  itemType: string;

  @ApiProperty({ example: 'Monthly dorm rent', description: 'Item description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 500, description: 'Amount for this item' })
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({ example: '2025-07', description: 'Period (optional)' })
  @IsOptional()
  @IsString()
  period?: string;
}

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid-user', description: 'User ID' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({ example: 'uuid-booking', description: 'Booking ID (optional)' })
  @IsOptional()
  @IsString()
  bookingId?: string;

  @ApiProperty({ example: 500, description: 'Total payment amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'ONLINE', description: 'Payment type' })
  @IsString()
  paymentType: string;

  @ApiProperty({ example: 'CARD', description: 'Payment method' })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ example: '2025-08-01T00:00:00Z', description: 'Due date' })
  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @ApiPropertyOptional({ example: 'Payment for July rent' })
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
