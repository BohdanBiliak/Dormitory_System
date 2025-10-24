import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RejectPaymentDto {
  @ApiProperty({ example: "uuid-payment", description: "Payment ID" })
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @ApiProperty({
    example: "uuid-manager",
    description: "Manager who rejects payment",
  })
  @IsString()
  @IsNotEmpty()
  rejectedBy: string;

  @ApiProperty({
    example: "Incorrect proof provided",
    description: "Reason for rejection",
  })
  @IsString()
  @IsNotEmpty()
  rejectionReason: string;
}
