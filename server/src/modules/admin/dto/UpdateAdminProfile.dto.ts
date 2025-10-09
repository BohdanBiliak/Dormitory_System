import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsEmail, IsOptional, IsString, IsUrl} from "class-validator";

export class UpdateAdminProfileDto {
    @ApiPropertyOptional({ example: 'Joanna' })
    @IsOptional()
    @IsString()
    displayName?: string; 

    @ApiPropertyOptional({ example: 'Goździk' })
    @IsOptional()
    @IsString()
    secondName?: string; 

    @ApiPropertyOptional({ example: 'j.gozdzik@pollub.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ example: 'https://example.com/photo.png' })
    @IsOptional()
    @IsUrl()
    picture?: string;
}