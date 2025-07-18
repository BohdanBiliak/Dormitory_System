import { IsUUID } from "class-validator";

export class AssignUserToRoomDto {
    @IsUUID()
    userId: string;
}
