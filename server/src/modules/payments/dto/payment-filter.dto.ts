import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { PaymentStatus } from "../../../../__generated__";
export class PaymentFilterDto {
  @ApiPropertyOptional({ example: "uuid-user" })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({ example: "uuid-dormitory" })
  @IsOptional()
  @IsString()
  dormitoryId?: string;

  @ApiPropertyOptional({ example: PaymentStatus.PAID, description: "Filter by status" })
  @IsOptional()
  @IsString()
  status?: PaymentStatus;

  @ApiPropertyOptional({ example: "2025-07-01T00:00:00Z" })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({ example: "2025-07-31T00:00:00Z" })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  offset?: number;
}
