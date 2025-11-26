import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { Authorization } from "@/libs/common/decorators/auth.decorator";
import { $Enums } from "@prisma/client";
import { CreateRoomTypeUseCase } from "./use-cases/create-room-type.use-case";
import { GetRoomTypesUseCase } from "./use-cases/get-room-types.use-case";
import { UpdateRoomTypeUseCase } from "./use-cases/update-room-type.use-case";
import { DeleteRoomTypeUseCase } from "./use-cases/delete-room-type.use-case";
import { CreateRoomTypeDto } from "./dto/create-room-type.dto";
import { UpdateRoomTypeDto } from "./dto/update-room-type.dto";
import { FilesInterceptor } from "@nestjs/platform-express/multer/interceptors/files.interceptor";
import { RoomTypesDocs } from "./room-types.docs";
import { AssignPriceCategoryToRoomTypeUseCase } from "./use-cases/assign-price-category.use-case";
import { AssignPriceCategoryDto } from "./dto/assign-price-category.dto";

@ApiTags("Room Types")
@ApiBearerAuth()
@Controller("room-types")
export class RoomTypesController {
  constructor(
    private readonly createRoomTypeUseCase: CreateRoomTypeUseCase,
    private readonly getRoomTypesUseCase: GetRoomTypesUseCase,
    private readonly updateRoomTypeUseCase: UpdateRoomTypeUseCase,
    private readonly deleteRoomTypeUseCase: DeleteRoomTypeUseCase,
    private readonly assignPriceCategoryUseCase: AssignPriceCategoryToRoomTypeUseCase,
  ) { }

  @Post()
  @Authorization($Enums.UserRole.Admin, $Enums.UserRole.SuperAdmin)
  @UseInterceptors(FilesInterceptor("photos", 10))
  @RoomTypesDocs.create()
  async create(
    @Body() dto: CreateRoomTypeDto,
    @UploadedFiles() photos?: Express.Multer.File[],
  ) {
    if (
      (!photos || photos.length === 0) &&
      (!dto.photos || dto.photos.length === 0)
    ) {
      throw new BadRequestException(
        "At least one photo is required for room type creation",
      );
    }

    return this.createRoomTypeUseCase.execute(dto, photos);
  }

  @Get()
  @Authorization($Enums.UserRole.Admin, $Enums.UserRole.SuperAdmin)
  @RoomTypesDocs.findAll()
  async findAll() {
    return this.getRoomTypesUseCase.execute();
  }

  @Get(":id")
  @Authorization($Enums.UserRole.Admin, $Enums.UserRole.SuperAdmin)
  @RoomTypesDocs.findOne()
  async findOne(@Param("id") id: string) {
    return this.getRoomTypesUseCase.execute(id);
  }

  @Patch(":id")
  @Authorization($Enums.UserRole.Admin, $Enums.UserRole.SuperAdmin)
  @UseInterceptors(FilesInterceptor("photos", 10))
  @RoomTypesDocs.update()
  async update(
    @Param("id") id: string,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto,
    @UploadedFiles() photos?: Express.Multer.File[],
  ) {
    return this.updateRoomTypeUseCase.execute(id, updateRoomTypeDto, photos);
  }

  @Delete(":id")
  @Authorization($Enums.UserRole.Admin, $Enums.UserRole.SuperAdmin)
  @RoomTypesDocs.delete()
  async remove(@Param("id") id: string) {
    return this.deleteRoomTypeUseCase.execute(id);
  }

  @Patch(":id/assign-price-category")
  @Authorization($Enums.UserRole.Admin, $Enums.UserRole.SuperAdmin)
  @ApiOperation({
    summary: "Assign price category to room type",
    description: "Assigns a price category to a room type. All existing rooms of this type will automatically inherit the category's pricing."
  })
  @ApiParam({ name: "id", description: "Room type ID" })
  @ApiResponse({ status: 200, description: "Price category assigned successfully" })
  @ApiResponse({ status: 404, description: "Room type or price category not found" })
  async assignPriceCategory(
    @Param("id") roomTypeId: string,
    @Body() dto: AssignPriceCategoryDto,
  ) {
    return this.assignPriceCategoryUseCase.execute(roomTypeId, dto.priceCategoryId);
  }

  @Delete(":id/unassign-price-category")
  @Authorization($Enums.UserRole.Admin, $Enums.UserRole.SuperAdmin)
  @ApiOperation({
    summary: "Remove price category from room type",
    description: "Removes the price category assignment from a room type. Rooms will fall back to legacy pricing."
  })
  @ApiParam({ name: "id", description: "Room type ID" })
  @ApiResponse({ status: 200, description: "Price category unassigned successfully" })
  @ApiResponse({ status: 404, description: "Room type not found" })
  async unassignPriceCategory(@Param("id") roomTypeId: string) {
    return this.assignPriceCategoryUseCase.execute(roomTypeId, null);
  }
}
