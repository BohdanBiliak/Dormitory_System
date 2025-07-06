import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class LoginDto {
  @IsString({ message: "Email must be a string" })
  @IsEmail({}, { message: "Not a valid email" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @IsString({ message: "Password must be a string" })
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, {
    message: "Password must be at least 6 characters",
  })
  password: string;

  @IsOptional()
  @IsString()
  code: string;
}
