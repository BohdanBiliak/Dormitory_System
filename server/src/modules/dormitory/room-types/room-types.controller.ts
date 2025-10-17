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
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Authorization } from "@/libs/common/decorators/auth.decorator";
import { $Enums } from "../../../../__generated__";
import { CreateRoomTypeUseCase } from "./use-cases/create-room-type.use-case";
import { GetRoomTypesUseCase } from "./use-cases/get-room-types.use-case";
import { UpdateRoomTypeUseCase } from "./use-cases/update-room-type.use-case";
import { DeleteRoomTypeUseCase } from "./use-cases/delete-room-type.use-case";
import { CreateRoomTypeDto } from "./dto/create-room-type.dto";
import { UpdateRoomTypeDto } from "./dto/update-room-type.dto";
import { FilesInterceptor } from "@nestjs/platform-express/multer/interceptors/files.interceptor";
import { RoomTypesDocs } from "./room-types.docs";

@ApiTags("Room Types")
@ApiBearerAuth()
@Controller("room-types")
export class RoomTypesController {
  constructor(
    private readonly createRoomTypeUseCase: CreateRoomTypeUseCase,
    private readonly getRoomTypesUseCase: GetRoomTypesUseCase,
    private readonly updateRoomTypeUseCase: UpdateRoomTypeUseCase,
    private readonly deleteRoomTypeUseCase: DeleteRoomTypeUseCase,
  ) {}

  @Post()
  @Authorization($Enums.UserRole.Admin, $Enums.UserRole.SuperAdmin)
  @UseInterceptors(FilesInterceptor("photos", 10))
  @RoomTypesDocs.create()
  async create(
    @Body() dto: CreateRoomTypeDto,
    @UploadedFiles() photos?: Express.Multer.File[],
  ) {
    // Validate that at least one photo is provided (either uploaded or URLs)
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
}
