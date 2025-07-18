import { IsInt, IsNumber, IsDateString } from "class-validator";

export class SetPriceDto {
    @IsInt()
    roomCapacity: number;

    @IsNumber()
    pricePerMonth: number;

    @IsNumber()
    pricePerDay: number;

    @IsDateString()
    dateFrom: string;

    @IsDateString()
    dateTo?: string;
}
