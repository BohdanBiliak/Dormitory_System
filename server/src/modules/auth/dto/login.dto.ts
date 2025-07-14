import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Registered user email address',
  })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Not a valid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password (at least 6 characters)',
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  password: string;

  @ApiPropertyOptional({
    example: '578342',
    description: 'Optional 2FA verification code if 2FA is enabled',
  })
  @IsOptional()
  @IsString()
  code?: string;
}
