import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";

export class RejectConfirmationDto {
  @ApiProperty({ example: "The provided documents are not valid." })
  @MinLength(10, { message: "Reason must be at least 10 characters long." })
  @MaxLength(500, { message: "Reason must be at most 500 characters long." })
  reason: string;
}
