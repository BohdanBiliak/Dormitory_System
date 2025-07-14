import {IsEmail, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ResetPasswordDto {
    @ApiProperty({ example: 'user@example.com', description: 'Email to reset password' })
    @IsEmail({}, { message: 'Must be a valid email' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;
}