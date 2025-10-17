import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsArray, Min } from "class-validator";

export class CreateFloorRoomAssignmentDto {
  @ApiProperty({ example: "1" })
  @IsString()
  dormitoryId: string;

  @ApiProperty({ example: 1, minimum: 1 })
  @IsNumber()
  @Min(1)
  floorNumber: number;

  @ApiProperty({ example: "1" })
  @IsString()
  roomTypeId: string;

  @ApiProperty({
    type: [Number],
    example: [101, 102, 103, 104],
    description: "Room numbers on this floor that will use this room type",
  })
  @IsArray()
  @IsNumber({}, { each: true })
  roomNumbers: number[];
}
