import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { $Enums } from '../../../../__generated__';
import {ApiPropertyOptional} from "@nestjs/swagger";

const { ConfirmationStatus, ConfirmationType } = $Enums;

export class GetConfirmationsQueryDto {
    @ApiPropertyOptional({ enum: ConfirmationType })
    @IsOptional()
    @IsEnum(ConfirmationType)
    type?: typeof ConfirmationType[keyof typeof ConfirmationType];

    @ApiPropertyOptional({ enum: ConfirmationStatus })
    @IsOptional()
    @IsEnum(ConfirmationStatus)
    status?: typeof ConfirmationStatus[keyof typeof ConfirmationStatus];

    @ApiPropertyOptional({ type: String })
    @IsOptional()
    @IsString()
    addressee?: string;

    @ApiPropertyOptional({ type: Number, default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number;

    @ApiPropertyOptional({ type: Number, default: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit?: number;
}