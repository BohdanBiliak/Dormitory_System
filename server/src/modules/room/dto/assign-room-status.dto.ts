import { IsString, IsOptional, IsDateString } from "class-validator";

export class AssignRoomStatusDto {
  @IsString()
  statusTypeId: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  dateOfStart: string;

  @IsOptional()
  @IsDateString()
  dateOfEnd?: string;
}
