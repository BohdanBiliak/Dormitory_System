import { PartialType } from "@nestjs/swagger";
import { CreatePriceCategoryDto } from "./create-price-category.dto";

export class UpdatePriceCategoryDto extends PartialType(CreatePriceCategoryDto) {}