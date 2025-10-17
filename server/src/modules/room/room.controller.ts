import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { RoomService } from "./room.service";
import { Authorized } from "@/libs/common/decorators/authtorized.decorator";
import { $Enums, User } from "../../../__generated__";
import { Authorization } from "@/libs/common/decorators/auth.decorator";
import { AvailableRoomsDto } from "./dto/availableRooms.dto";
import { BookRoomDto } from "@modules/room/dto/book-room.dto";
import { RequestMoveOutDto } from "@modules/room/dto/request-moveout.dto";
import { RequestAccommmodationDto } from "./dto/requestAccommmodation.dto";
import { CreateRoomStatusDto } from "@modules/room/dto/create-room-status.dto";
import { AssignUserToRoomDto } from "@/modules/room/dto/assign-user.dto";
import { SetPriceDto } from "@modules/room/dto/set-price.dto";
import { UpdateRoomDto } from "@modules/room/dto/update-room.dto";
import UserRole = $Enums.UserRole;
import { EvictUserFromRoomDto } from "./dto/evict-user.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { RoomDocs } from "./room.docs";

@RoomDocs.controller()
@Controller("rooms")
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  @Authorization(
    UserRole.Admin,
    UserRole.SignedInUser,
    UserRole.SuperAdmin,
    UserRole.Resident,
    UserRole.Regular,
  )
  @RoomDocs.getRooms()
  async getRooms(@Authorized() user: User) {
    return this.roomService.findAll(user);
  }

  @Get("available")
  @Authorization(UserRole.Admin, UserRole.SignedInUser)
  @RoomDocs.getAvailableRooms()
  async getAvailableRooms(@Query() query: AvailableRoomsDto) {
    return this.roomService.findAvailableRooms(query);
  }

  @Get(":id")
  @Authorization()
  @RoomDocs.getRoom()
  async getRoom(@Param("id") id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(":id")
  @Authorization(UserRole.Admin)
  @RoomDocs.updateRoom()
  async updateRoom(
    @Param("id") id: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @Authorized() user: User,
  ) {
    return this.roomService.updateRoom(id, updateRoomDto, user.id);
  }

  @Post("book")
  @Authorization(UserRole.SignedInUser, UserRole.Admin)
  @RoomDocs.bookRoom()
  async bookRoom(@Authorized() user: User, @Body() dto: BookRoomDto) {
    return this.roomService.bookRoom(dto, user.id);
  }

  @Post("request-accommodation")
  @Authorization(UserRole.SignedInUser)
  @RoomDocs.requestAccommodation()
  async requestAccommodation(
    @Authorized() user: User,
    @Body() dto: RequestAccommmodationDto,
  ) {
    return this.roomService.requestAccommodation(user, dto);
  }

  @Post("request-move-out")
  @Authorization(UserRole.SignedInUser)
  @RoomDocs.requestMoveOut()
  async requestMoveOut(
    @Authorized() user: User,
    @Body() dto: RequestMoveOutDto,
  ) {
    return this.roomService.requestMoveOut(user, dto);
  }

  @Post(":id/statuses")
  @Authorization(UserRole.Admin)
  @RoomDocs.createRoomStatus()
  async createRoomStatus(
    @Param("id") roomId: string,
    @Body() dto: CreateRoomStatusDto,
  ) {
    return this.roomService.createRoomStatus(roomId, dto);
  }

  @Delete(":roomId/statuses/:statusId")
  @Authorization(UserRole.Admin)
  @RoomDocs.deleteRoomStatus()
  async deleteRoomStatus(
    @Param("roomId") roomId: string,
    @Param("statusId") statusId: string,
  ) {
    return this.roomService.deleteRoomStatus(roomId, statusId);
  }

  @Patch(":id/assign-user")
  @Authorization(UserRole.Admin)
  @RoomDocs.assignUser()
  async assignUser(
    @Param("id") roomId: string,
    @Body() dto: AssignUserToRoomDto,
  ) {
    return this.roomService.assignUserToRoom(
      roomId,
      dto.userId,
      dto.startDate,
      dto.endDate,
    );
  }

  @Patch(":id/evict-user")
  @Authorization(UserRole.Admin)
  @RoomDocs.evictUser()
  async evictUser(
    @Param("id") roomId: string,
    @Body() dto: EvictUserFromRoomDto,
  ) {
    return this.roomService.evictUserFromRoom(roomId, dto);
  }

  @Post("/prices")
  @Authorization(UserRole.Admin)
  @RoomDocs.setPrice()
  async setPrice(@Body() dto: SetPriceDto) {
    return this.roomService.setRoomPrice(dto);
  }

  @Post("upload")
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @RoomDocs.upload()
  @UseInterceptors(FilesInterceptor("files"))
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = await this.roomService.uploadFiles(files, "rooms");

    return { urls };
  }
}
