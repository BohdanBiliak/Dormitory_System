
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'Bohdan', description: 'User\'s name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'user@example.com', description: 'User\'s email' })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: true, description: 'Two-factor enabled or not' })
    @IsBoolean()
    isTwoFactorEnabled: boolean;
}
