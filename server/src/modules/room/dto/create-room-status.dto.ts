import { IsDateString, IsString, IsUUID, IsOptional } from "class-validator";

export class CreateRoomStatusDto {
    @IsDateString()
    dateOfStart: string;

    @IsDateString()
    @IsOptional()
    dateOfEnd?: string;

    @IsString()
    description: string;
}
