import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class newPasswordDto{
 @IsString({message: 'Password must be a string'})
 @MinLength(6, {message: 'Password must be at least 6 characters'})
 @IsNotEmpty({message: 'Password are required'})
    password: string;
}