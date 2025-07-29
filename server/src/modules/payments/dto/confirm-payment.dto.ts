import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ConfirmPaymentDto {
  @ApiProperty({ example: 'uuid-payment', description: 'Payment ID' })
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @ApiProperty({ example: 'uuid-manager', description: 'Manager who confirms payment' })
  @IsString()
  @IsNotEmpty()
  confirmedBy: string;

  @ApiPropertyOptional({ example: 'All good' })
  @IsOptional()
  @IsString()
  managerNotes?: string;
}
