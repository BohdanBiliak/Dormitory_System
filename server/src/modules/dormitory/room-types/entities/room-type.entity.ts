import { ApiProperty } from "@nestjs/swagger";

export enum RoomCategory {
  RESIDENTIAL = "residential",
  TECHNICAL = "technical",
  COMMON = "common",
}

export class RoomType {
  @ApiProperty({ example: "1" })
  id: string;

  @ApiProperty({ example: "Standard Double Room" })
  name: string;

  @ApiProperty({ example: "A standard room with 2 beds" })
  description?: string;

  @ApiProperty({ example: 2 })
  capacity: number;

  @ApiProperty({ example: 25.5 })
  area: number;

  @ApiProperty({ enum: RoomCategory, example: RoomCategory.RESIDENTIAL })
  category: RoomCategory;

  @ApiProperty({
    type: [String],
    example: ["lamp", "table", "chair", "wardrobe"],
  })
  equipment: string[];

  @ApiProperty({ example: "2024-01-01T00:00:00Z" })
  createdAt: Date;

  @ApiProperty({ example: "2024-01-01T00:00:00Z" })
  updatedAt: Date;
}
