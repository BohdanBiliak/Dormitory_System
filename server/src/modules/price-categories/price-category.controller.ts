import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "@/libs/common/guards/auth.guard";
import { Roles } from "@/libs/common/decorators/roles.decorator";
import { RolesGuard } from "@/libs/common/guards/roles.guard";
import { PriceCategoryService } from "./price-category.service";
import { PriceCategoryDocs } from "./price-category.docs";
import { Authorization } from "@/libs/common/decorators/auth.decorator";
import {
  CreatePriceCategoryDto,
  UpdatePriceCategoryDto,
  AssignRoomTypesToCategoryDto,
  AssignRoomsToCategory,
  PriceCategoryFilterDto,
} from "./dto";

@PriceCategoryDocs.controller()
@Controller("price-categories")
export class PriceCategoryController {
  constructor(private readonly priceCategoryService: PriceCategoryService) {}

  @Post()
  @Authorization()
  @PriceCategoryDocs.create()
  async create(@Body() createPriceCategoryDto: CreatePriceCategoryDto) {
    return this.priceCategoryService.create(createPriceCategoryDto);
  }

  @Get()
  @Authorization()
  @PriceCategoryDocs.findAll()
  async findAll(@Query() filters?: PriceCategoryFilterDto) {
    return this.priceCategoryService.findAll(filters);
  }

  @Get(":id")
  @Authorization()
  @PriceCategoryDocs.findOne()
  async findOne(@Param("id") id: string) {
    return this.priceCategoryService.findById(id);
  }

  @Patch(":id")
  @Authorization()
  @PriceCategoryDocs.update()
  async update(
    @Param("id") id: string,
    @Body() updatePriceCategoryDto: UpdatePriceCategoryDto,
  ) {
    return this.priceCategoryService.update(id, updatePriceCategoryDto);
  }

  @Delete(":id")
  @Authorization()
  @HttpCode(HttpStatus.NO_CONTENT)
  @PriceCategoryDocs.delete()
  async remove(@Param("id") id: string) {
    await this.priceCategoryService.delete(id);
  }

  @Post(":id/assign-room-types")
  @Authorization()
  @PriceCategoryDocs.assignRoomTypes()
  async assignRoomTypes(
    @Param("id") id: string,
    @Body() assignRoomTypesDto: AssignRoomTypesToCategoryDto,
  ) {
    await this.priceCategoryService.assignToRoomTypes(id, assignRoomTypesDto);
    return { message: "Room types assigned successfully" };
  }

  @Post(":id/assign-rooms")
  @Authorization()
  @PriceCategoryDocs.assignRooms()
  async assignRooms(
    @Param("id") id: string,
    @Body() assignRoomsDto: AssignRoomsToCategory,
  ) {
    await this.priceCategoryService.assignToRooms(id, assignRoomsDto);
    return { message: "Rooms assigned successfully" };
  }

  @Get(":id/room-types")
  @Authorization()
  @PriceCategoryDocs.getRoomTypes()
  async getRoomTypes(@Param("id") id: string) {
    return this.priceCategoryService.getRoomTypesByCategory(id);
  }

  @Get(":id/rooms")
  @Authorization()
  @PriceCategoryDocs.getRooms()
  async getRooms(@Param("id") id: string) {
    return this.priceCategoryService.getRoomsByCategory(id);
  }
}