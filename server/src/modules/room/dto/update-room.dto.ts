import {
  IsArray,
  IsOptional,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
export class UpdateRoomDto {
  @ApiPropertyOptional()
  @MinLength(1)
  @MaxLength(10)
  @IsOptional()
  @IsString()
  number?: string;

  @ApiPropertyOptional()
  @MinLength(1)
  @MaxLength(10)
  @IsOptional()
  @IsString()
  floor?: string;

  @ApiPropertyOptional()
  @MinLength(1)
  @MaxLength(2)
  @IsOptional()
  @IsString()
  capacity?: string;

  @ApiPropertyOptional({ type: [String], description: "Equipment in the room" })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  roomEquipment!: string[];

  @ApiPropertyOptional({
    type: [String],
    description: "Photo URLs of the room",
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  photos!: string[];
}
