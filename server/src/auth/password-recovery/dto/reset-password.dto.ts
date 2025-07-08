import {IsEmail, IsNotEmpty} from "class-validator";

export class ResetPasswordDto{
    @IsEmail({}, {message: 'Must be a valid email'})
    @IsNotEmpty({message: 'Email is required'})
    email: string;
}