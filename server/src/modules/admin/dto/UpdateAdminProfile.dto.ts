import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsEmail, IsOptional, IsString, IsUrl} from "class-validator";

export class UpdateAdminProfileDto {
    @ApiPropertyOptional({ example: 'Joanna' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ example: 'Ewa' })
    @IsOptional()
    @IsString()
    middleName?: string;

    @ApiPropertyOptional({ example: 'Goździk' })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiPropertyOptional({ example: 'j.gozdzik@pollub.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ example: 'https://example.com/photo.png' })
    @IsOptional()
    @IsUrl()
    photoUrl?: string;
}