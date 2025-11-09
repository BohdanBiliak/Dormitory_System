import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from "class-validator";

export class RequestAccommmodationDto {
  @IsString()
  roomId: string;

  @IsDateString()
  from: string;

  @IsDateString()
  to: string;

  @IsString()
  @IsOptional()
  suggestedTime?: string;

  @IsBoolean()
  @IsOptional()
  alternativeRooms?: boolean;
}
