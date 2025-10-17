import { IsString, IsUUID, IsOptional, IsDateString } from "class-validator";

export class AssignUserToRoomDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
