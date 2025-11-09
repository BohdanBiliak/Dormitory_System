import { IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ApproveAccommodationDto {
  @ApiProperty({
    description: "Alternative room ID if user selected alternative rooms and admin wants to assign different room",
    example: "123e4567-e89b-12d3-a456-426614174001",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  alternativeRoomId?: string;

  @ApiProperty({
    description: "Admin can override the suggested time provided by user",
    example: "Morning (10:00-12:00)",
    required: false,
  })
  @IsOptional()
  @IsString()
  suggestedTime?: string;

  @ApiProperty({
    description: "Reason for approval or any changes made (alternative room, time change, etc.)",
    example: "Approved with alternative room due to maintenance in original room",
    required: false,
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
