import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ConfirmationDto {
    @ApiProperty({ example: 'a1b2c3d4e5f6', description: 'Email verification token' })
    @IsString({ message: 'Token must be a string' })
    @IsNotEmpty({ message: 'Token must not be empty' })
    token: string;
}