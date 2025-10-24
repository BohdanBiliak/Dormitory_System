import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDormitoryDto {
  @ApiProperty({ example: "East Wing Dormitory" })
  @IsString()
  name: string;

  @ApiProperty({ example: "123 University Ave" })
  @IsString()
  address: string;

  @ApiProperty({ example: "+380123456789" })
  @IsString()
  groundFloorPhoneNumber: string;
}
