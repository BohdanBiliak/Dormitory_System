import { ApiProperty } from '@nestjs/swagger';

export class ManagerResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  secondName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  picture?: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  roomId?: string;

  @ApiProperty()
  paymentsStatus: string;

  @ApiProperty()
  dormitory: {
    id: string;
    name: string;
  };

  @ApiProperty()
  createdAt: Date;
}