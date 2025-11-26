import { PriceCategory } from "@prisma/client";
import { CreatePriceCategoryDto, UpdatePriceCategoryDto, AssignRoomTypesToCategoryDto, AssignRoomsToCategory, PriceCategoryFilterDto } from "../dto";

export interface IPriceCategoryService {
  create(data: CreatePriceCategoryDto): Promise<PriceCategory>;
  findAll(filters?: PriceCategoryFilterDto): Promise<PriceCategory[]>;
  findById(id: string): Promise<PriceCategory>;
  update(id: string, data: UpdatePriceCategoryDto): Promise<PriceCategory>;
  delete(id: string): Promise<void>;
  assignToRoomTypes(categoryId: string, data: AssignRoomTypesToCategoryDto): Promise<void>;
  assignToRooms(categoryId: string, data: AssignRoomsToCategory): Promise<void>;
  unassignFromRoomTypes(roomTypeIds: string[]): Promise<void>;
  unassignFromRooms(roomIds: string[]): Promise<void>;
  getRoomTypesByCategory(categoryId: string): Promise<any[]>;
  getRoomsByCategory(categoryId: string): Promise<any[]>;
}