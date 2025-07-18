import { IsUUID, IsDateString } from "class-validator";

export class BookRoomDto {
    @IsUUID()
    roomId: string;

    @IsDateString()
    from: string;

    @IsDateString()
    to: string;
}
