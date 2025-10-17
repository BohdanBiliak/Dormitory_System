import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UploadPaymentProofDto {
  @ApiProperty({ example: "uuid-payment", description: "Payment ID" })
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @ApiProperty({ example: "uuid-user", description: "User ID" })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    type: "string",
    format: "binary",
    description: "Proof file (image/pdf)",
  })
  file: Express.Multer.File;
}
