import { IsDateString } from "class-validator";

export class RequestMoveOutDto {
    @IsDateString()
    moveOutDate: string;
}
