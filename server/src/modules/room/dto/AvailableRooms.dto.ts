import { IsDateString, IsOptional, IsUUID } from "class-validator";

export class AvailableRoomsDto {
    @IsDateString()
    from: string;

    @IsDateString()
    to: string;

    @IsUUID()
    @IsOptional()
    dormitoryId?: string;
}
