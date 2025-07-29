import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNumber, IsDate, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BulkPaymentUserDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  customAmount?: number; // If different from base amount
}

export class CreateBulkPaymentDto {
  @ApiProperty({ type: [BulkPaymentUserDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkPaymentUserDto)
  users: BulkPaymentUserDto[];

  @ApiProperty()
  @IsNumber()
  baseAmount: number;

  @ApiProperty()
  @IsString()
  paymentType: string;

  @ApiProperty()
  @IsString()
  paymentMethod: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}