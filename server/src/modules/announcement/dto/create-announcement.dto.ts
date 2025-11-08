import {
  IsString,
  IsDateString,
  IsOptional,
  IsArray,
  IsBoolean,
  ValidateIf,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateAnnouncementDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsDateString()
  expiresAt: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachmentUrls?: string[];

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true)
  forEveryone?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  userIds?: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roomIds?: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  floorIds?: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dormitoryIds?: string[];
}
