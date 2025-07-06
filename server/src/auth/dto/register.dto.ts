import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    Validate
} from 'class-validator'

import { IsPasswordsMatchingConstraint } from '@/libs/common/decorators/is-passwords-matching-constraint.decorator'

export class RegisterDto {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  name: string;

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

  @IsString({ message: "Password must be a string" })
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, {
    message: "Password must be at least 6 characters",
  })
  @Validate(IsPasswordsMatchingConstraint, {
    message: "Password is different matching constraint",
  })
  passwordRepeat: string;
}
