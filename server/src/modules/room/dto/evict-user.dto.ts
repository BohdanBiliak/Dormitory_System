import { IsString, IsUUID } from "class-validator";

export class EvictUserFromRoomDto {
    @IsUUID()
    userId: string;

    @IsString()
    description?: string;
}
