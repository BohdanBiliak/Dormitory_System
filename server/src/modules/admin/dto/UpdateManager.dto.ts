import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  MinLength,
  MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateManagerDto {
  @ApiProperty({ example: "Adam", required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(26)
  @IsOptional()
  displayName?: string;

  @ApiProperty({ example: "", required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(26)
  @IsOptional()
  middleName?: string;

  @ApiProperty({ example: "Martyna", required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(26)
  @IsOptional()
  secondName?: string;

  @ApiProperty({ example: "a.martyna@pollub.com", required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: "NewPassword123", required: false })
  @IsString()
  @IsOptional()
  password?: string;
}
