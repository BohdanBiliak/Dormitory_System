import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsArray, IsString, ValidateNested } from "class-validator";
import { Type, Transform } from "class-transformer";

export class RoomAssignmentDto {
  @ApiProperty({ example: "cmgjauk7z0000qy01d5g4j8jp" })
  @IsString()
  roomTypeId: string;

  @ApiProperty({ example: [1, 2, 3, 4, 5] })
  @Transform(({ value }) => {
    console.log(
      "Transform roomNumbers - received value:",
      value,
      "type:",
      typeof value,
    );

    // If it's already an array of numbers, return as is
    if (Array.isArray(value) && value.every((v) => typeof v === "number")) {
      return value;
    }

    // If it's an array of strings, convert to numbers
    if (Array.isArray(value)) {
      return value.map((v) => {
        const num = typeof v === "string" ? parseInt(v) : v;
        return isNaN(num) ? v : num;
      });
    }

    // If it's a string, try to parse it
    if (typeof value === "string") {
      // Try JSON parsing first (for "[1,2,3,4,5]" format)
      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            return parsed.map((v) => {
              const num = parseInt(v);
              return isNaN(num) ? v : num;
            });
          }
        } catch (e) {
          console.log("JSON parse failed, trying comma split");
        }
      }

      // Try comma-separated values (for "1,2,3,4,5" format)
      if (value.includes(",")) {
        return value.split(",").map((v) => {
          const num = parseInt(v.trim());
          return isNaN(num) ? v.trim() : num;
        });
      }

      // Single number as string
      const num = parseInt(value);
      return isNaN(num) ? [value] : [num];
    }

    // Fallback: convert to array
    return Array.isArray(value) ? value : [value];
  })
  @IsArray()
  @IsInt({ each: true })
  roomNumbers: number[];
}

export class FloorRoomAssignmentDto {
  @ApiProperty({ example: 1 })
  @Transform(({ value }) => {
    const num = typeof value === "string" ? parseInt(value) : value;
    return isNaN(num) ? value : num;
  })
  @IsInt()
  floorNumber: number;

  @ApiProperty({ type: [RoomAssignmentDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomAssignmentDto)
  roomAssignments: RoomAssignmentDto[];
}
