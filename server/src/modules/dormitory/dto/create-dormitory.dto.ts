import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested, IsInt, IsNumber, IsOptional } from 'class-validator';

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

    @ApiProperty({ 
        type: [String], 
        description: "Equipment to be added to each room",
        example: ["Bed", "Desk", "Chair", "Wardrobe", "Air Conditioner"]
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    roomEquipment?: string[];
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