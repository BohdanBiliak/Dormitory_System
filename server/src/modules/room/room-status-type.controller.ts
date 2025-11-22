import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { RoomStatusTypeService } from "./room-status-type.service";
import { CreateRoomStatusTypeDto } from "./dto/create-room-status-type.dto";
import { UpdateRoomStatusTypeDto } from "./dto/update-room-status-type.dto";
import { Authorization } from "@/libs/common/decorators/auth.decorator";
import { $Enums } from "../../../__generated__";
import { RoomStatusTypeDocs } from "./room-status-type.docs";

@RoomStatusTypeDocs.controller()
@Controller("room-status-types")
export class RoomStatusTypeController {
  constructor(
    private readonly roomStatusTypeService: RoomStatusTypeService,
  ) {}

  @Post()
  @Authorization($Enums.UserRole.SuperAdmin, $Enums.UserRole.Admin)
  @RoomStatusTypeDocs.create()
  async create(@Body() dto: CreateRoomStatusTypeDto) {
    return this.roomStatusTypeService.create(dto);
  }

  @Get()
  @Authorization()
  @RoomStatusTypeDocs.findAll()
  async findAll(@Query("includeInactive") includeInactive?: string) {
    return this.roomStatusTypeService.findAll(includeInactive === "true");
  }

  @Get(":id")
  @Authorization()
  @RoomStatusTypeDocs.findOne()
  async findOne(@Param("id") id: string) {
    return this.roomStatusTypeService.findOne(id);
  }

  @Patch(":id")
  @Authorization($Enums.UserRole.SuperAdmin, $Enums.UserRole.Admin)
  @RoomStatusTypeDocs.update()
  async update(@Param("id") id: string, @Body() dto: UpdateRoomStatusTypeDto) {
    return this.roomStatusTypeService.update(id, dto);
  }

  @Delete(":id")
  @Authorization($Enums.UserRole.SuperAdmin, $Enums.UserRole.Admin)
  @RoomStatusTypeDocs.delete()
  async delete(@Param("id") id: string) {
    return this.roomStatusTypeService.delete(id);
  }

  @Post(":id/activate")
  @Authorization($Enums.UserRole.SuperAdmin, $Enums.UserRole.Admin)
  @RoomStatusTypeDocs.activate()
  async activate(@Param("id") id: string) {
    return this.roomStatusTypeService.activate(id);
  }

  @Post(":id/deactivate")
  @Authorization($Enums.UserRole.SuperAdmin, $Enums.UserRole.Admin)
  @RoomStatusTypeDocs.deactivate()
  async deactivate(@Param("id") id: string) {
    return this.roomStatusTypeService.deactivate(id);
  }

  @Post("initialize-system-statuses")
  @Authorization($Enums.UserRole.SuperAdmin)
  @RoomStatusTypeDocs.initializeSystemStatuses()
  async initializeSystemStatuses() {
    await this.roomStatusTypeService.initializeSystemStatuses();
    return { message: "System statuses initialized successfully" };
  }
}
