import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDormitoryDto {
  @ApiProperty({ example: 'East Wing Dormitory' })
  @IsString()
  name: string;

  @ApiProperty({ example: '123 University Ave' })
  @IsString()
  address: string;

  @ApiProperty({ example: '+380123456789' })
  @IsString()
  groundFloorPhoneNumber: string;

  @ApiProperty({ example: 30 })
  @Transform(({ value }) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? value : num;
  })
  @IsNumber()
  pricePerDay: number;

  @ApiProperty({ example: 600 })
  @Transform(({ value }) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? value : num;
  })
  @IsNumber()
  pricePerMonth: number;
}