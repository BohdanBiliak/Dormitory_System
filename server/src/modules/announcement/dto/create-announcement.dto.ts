import {
  IsString,
  IsDateString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsInt,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
  @IsInt({ each: true })
  floorNumbers?: number[];
}
