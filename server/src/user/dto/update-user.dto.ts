import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string

    @IsString({ message: 'email must be a string' })
    @IsEmail({}, { message: 'Must be a valid email' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string

    @IsBoolean({ message: 'isTwoFactorEnabled must be a boolean' })
    isTwoFactorEnabled: boolean
}
