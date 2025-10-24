import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateManagerDto {
  @ApiProperty({ example: "Joe" })
  @MinLength(2)
  @MaxLength(26)
  @IsString()
  name: string;

  @ApiProperty({ example: "Jonowich" })
  @MinLength(2)
  @MaxLength(26)
  @IsString()
  middleName?: string;

  @ApiProperty({ example: "lastJonowich" })
  @IsString()
  @MinLength(2)
  @MaxLength(26)
  lastName: string;

  @ApiProperty({ example: "manager@example.com" })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: "123345678", minLength: 8, maxLength: 26 })
  @IsString()
  @MinLength(8)
  @MaxLength(26)
  password: string;

  @ApiProperty({ example: "123345678", minLength: 8, maxLength: 26 })
  @IsString()
  @MinLength(8)
  @MaxLength(26)
  repeatPassword: string;

  @ApiProperty({ example: "dormitoryId" })
  @IsString()
  dormitoryId: string;
}
