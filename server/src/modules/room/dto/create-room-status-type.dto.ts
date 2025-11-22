import { IsString, IsOptional, IsBoolean, Matches } from "class-validator";

export class CreateRoomStatusTypeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message: "Color must be a valid hex color code (e.g., #FF5733)",
  })
  color?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
