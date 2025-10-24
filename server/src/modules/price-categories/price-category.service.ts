import { Injectable, NotFoundException, BadRequestException, Inject } from "@nestjs/common";
import { PriceCategory } from "../../../__generated__";
import { IPriceCategoryService } from "./interfaces/price-category-service.interface";
import { IPriceCategoryRepository } from "./interfaces/price-category-repository.interface";
import { 
  CreatePriceCategoryDto, 
  UpdatePriceCategoryDto, 
  AssignRoomTypesToCategoryDto, 
  AssignRoomsToCategory, 
  PriceCategoryFilterDto 
} from "./dto";

@Injectable()
export class PriceCategoryService implements IPriceCategoryService {
  constructor(
    @Inject("IPriceCategoryRepository")
    private readonly priceCategoryRepository: IPriceCategoryRepository,
  ) {}

  async create(data: CreatePriceCategoryDto): Promise<PriceCategory> {
    // Check if name already exists
    const existingCategory = await this.priceCategoryRepository.findByName(data.name);
    if (existingCategory) {
      throw new BadRequestException(`Price category with name "${data.name}" already exists`);
    }

    return this.priceCategoryRepository.create(data);
  }

  async findAll(filters?: PriceCategoryFilterDto): Promise<PriceCategory[]> {
    return this.priceCategoryRepository.findAll(filters);
  }

  async findById(id: string): Promise<PriceCategory> {
    const category = await this.priceCategoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Price category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, data: UpdatePriceCategoryDto): Promise<PriceCategory> {
    const existingCategory = await this.priceCategoryRepository.findById(id);
    if (!existingCategory) {
      throw new NotFoundException(`Price category with ID ${id} not found`);
    }

    // Check if name already exists (if name is being updated)
    if (data.name && data.name !== existingCategory.name) {
      const categoryWithSameName = await this.priceCategoryRepository.findByName(data.name);
      if (categoryWithSameName) {
        throw new BadRequestException(`Price category with name "${data.name}" already exists`);
      }
    }

    return this.priceCategoryRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const existingCategory = await this.priceCategoryRepository.findById(id);
    if (!existingCategory) {
      throw new NotFoundException(`Price category with ID ${id} not found`);
    }

    await this.priceCategoryRepository.delete(id);
  }

  async assignToRoomTypes(categoryId: string, data: AssignRoomTypesToCategoryDto): Promise<void> {
    // Check if category exists
    const category = await this.priceCategoryRepository.findById(categoryId);
    if (!category) {
      throw new NotFoundException(`Price category with ID ${categoryId} not found`);
    }

    await this.priceCategoryRepository.assignToRoomTypes(categoryId, data.roomTypeIds);
  }

  async assignToRooms(categoryId: string, data: AssignRoomsToCategory): Promise<void> {
    // Check if category exists
    const category = await this.priceCategoryRepository.findById(categoryId);
    if (!category) {
      throw new NotFoundException(`Price category with ID ${categoryId} not found`);
    }

    await this.priceCategoryRepository.assignToRooms(categoryId, data.roomIds);
  }

  async unassignFromRoomTypes(roomTypeIds: string[]): Promise<void> {
    await this.priceCategoryRepository.unassignFromRoomTypes(roomTypeIds);
  }

  async unassignFromRooms(roomIds: string[]): Promise<void> {
    await this.priceCategoryRepository.unassignFromRooms(roomIds);
  }

  async getRoomTypesByCategory(categoryId: string): Promise<any[]> {
    // Check if category exists
    const category = await this.priceCategoryRepository.findById(categoryId);
    if (!category) {
      throw new NotFoundException(`Price category with ID ${categoryId} not found`);
    }

    return this.priceCategoryRepository.findRoomTypesByCategory(categoryId);
  }

  async getRoomsByCategory(categoryId: string): Promise<any[]> {
    // Check if category exists
    const category = await this.priceCategoryRepository.findById(categoryId);
    if (!category) {
      throw new NotFoundException(`Price category with ID ${categoryId} not found`);
    }

    return this.priceCategoryRepository.findRoomsByCategory(categoryId);
  }
}