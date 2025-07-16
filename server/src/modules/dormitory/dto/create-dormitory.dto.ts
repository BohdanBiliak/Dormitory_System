import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested, IsInt, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class RoomGenerationDto {
    @ApiProperty()
    @IsInt()
    numberOfFloors: number;

    @ApiProperty()
    @IsInt()
    roomsPerFloor: number;

    @ApiProperty()
    @IsNumber()
    pricePerDay: number;

    @ApiProperty()
    @IsNumber()
    pricePerMonth: number;
}

export class CreateDormitoryDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    groundFloorPhoneNumber: string;

    @ApiProperty({ type: String, description: "Stringified JSON" })
    @IsString()
    roomGeneration: string;
}
