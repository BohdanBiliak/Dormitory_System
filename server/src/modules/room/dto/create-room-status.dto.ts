import { IsDateString, IsString, IsOptional } from "class-validator";

export class CreateRoomStatusDto {
  @IsString()
  statusTypeId: string;

  @IsDateString()
  dateOfStart: string;

  @IsDateString()
  @IsOptional()
  dateOfEnd?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
