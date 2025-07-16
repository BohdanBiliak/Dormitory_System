import {IsArray, IsInt, IsString, IsUUID} from "class-validator";

export class CreateRoomDto {
    @IsString() number: string;
    @IsInt() floor: number;
    @IsInt() capacity: number;
    @IsArray() @IsString({ each: true }) roomEquipment: string[];
    @IsArray() @IsString({ each: true }) photos: string[];
    @IsUUID() dormitoryId: string;
}
