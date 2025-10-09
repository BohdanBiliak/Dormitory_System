import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from './room-type.entity';

export class FloorRoomAssignment {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: '1' })
  dormitoryId: string;

  @ApiProperty({ example: 1 })
  floorNumber: number;

  @ApiProperty({ example: '1' })
  roomTypeId: string;

  @ApiProperty({ type: [Number], example: [101, 102, 103] })
  roomNumbers: number[];

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt: Date;

  roomType?: RoomType;
}