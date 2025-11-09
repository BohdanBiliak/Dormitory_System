import { IsString, IsDateString } from "class-validator";

export class BookRoomDto {
  @IsString()
  roomId: string;

  @IsDateString()
  from: string;

  @IsDateString()
  to: string;
}
