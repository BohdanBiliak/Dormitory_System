import {IsArray, IsDateString, IsInt, IsOptional, IsUUID} from "class-validator";

export class RequestAccommmodationDto{
    @IsUUID()
    roomId: string;

    @IsDateString()
    from: string;

    @IsDateString()
    to: string;

    @IsArray()
    @IsUUID("all", {each: true})
    @IsOptional()
    roommateIds?: string[];

    @IsInt()
    @IsOptional()
    numberOfPeople?: number;
}