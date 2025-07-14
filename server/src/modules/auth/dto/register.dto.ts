import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    Validate
} from 'class-validator'

import { IsPasswordsMatchingConstraint } from '@/libs/common/decorators/is-passwords-matching-constraint.decorator'
import {ApiProperty} from "@nestjs/swagger";


export class RegisterDto {
    @ApiProperty({ example: 'Bohdan', description: 'User\'s first name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Bilak', description: 'User\'s last name' })
    @IsString()
    secondName: string;

    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password123', description: 'Password (min 6 chars)' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'password123', description: 'Repeat password (must match)' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Validate(IsPasswordsMatchingConstraint)
    passwordRepeat: string;
}
