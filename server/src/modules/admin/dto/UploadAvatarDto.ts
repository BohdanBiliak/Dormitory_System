import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UploadAvatarDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userLastName: string;

    @ApiPropertyOptional({ enum: ['original', 'mobile', 'tablet', 'desktop'] })
    @IsOptional()
    @IsIn(['original', 'mobile', 'tablet', 'desktop'])
    @Type(() => String)
    version?: 'original' | 'mobile' | 'tablet' | 'desktop';
}
