import { IsEnum } from "class-validator";
import { $Enums } from "@prisma/client";
import ConfirmationStatus = $Enums.ConfirmationStatus;
import { ApiProperty } from "@nestjs/swagger";

export class UpdateConfirmationStatusDto {
  @ApiProperty({
    enum: ConfirmationStatus,
    example: ConfirmationStatus.APPROVED,
    description: "New status for confirmation",
  })
  @IsEnum(ConfirmationStatus)
  status: ConfirmationStatus;
}
