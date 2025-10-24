import { PriceCategory } from "../../../../__generated__";
import { CreatePriceCategoryDto, UpdatePriceCategoryDto, PriceCategoryFilterDto } from "../dto";

export interface IPriceCategoryRepository {
  create(data: CreatePriceCategoryDto): Promise<PriceCategory>;
  findById(id: string): Promise<PriceCategory | null>;
  findAll(filters?: PriceCategoryFilterDto): Promise<PriceCategory[]>;
  findByName(name: string): Promise<PriceCategory | null>;
  update(id: string, data: UpdatePriceCategoryDto): Promise<PriceCategory>;
  delete(id: string): Promise<void>;
  assignToRoomTypes(categoryId: string, roomTypeIds: string[]): Promise<void>;
  assignToRooms(categoryId: string, roomIds: string[]): Promise<void>;
  unassignFromRoomTypes(roomTypeIds: string[]): Promise<void>;
  unassignFromRooms(roomIds: string[]): Promise<void>;
  findRoomTypesByCategory(categoryId: string): Promise<any[]>;
  findRoomsByCategory(categoryId: string): Promise<any[]>;
}