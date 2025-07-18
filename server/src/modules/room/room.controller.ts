import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import { RoomService } from "./room.service";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import { Authorized } from "@/libs/common/decorators/authtorized.decorator";
import {$Enums, User} from "../../../__generated__";
import {Authorization} from "@/libs/common/decorators/auth.decorator";
import {AvailableRoomsDto} from "@modules/room/dto/AvailableRooms.dto";
import {BookRoomDto} from "@modules/room/dto/book-room.dto";
import {RequestMoveOutDto} from "@modules/room/dto/request-moveout.dto";
import {RequestAccommmodationDto} from "@modules/room/dto/RequestAccommmodation.dto";
import {CreateRoomStatusDto} from "@modules/room/dto/create-room-status.dto";
import {AssignUserToRoomDto} from "@modules/room/dto/assign-user.dto";
import {SetPriceDto} from "@modules/room/dto/set-price.dto";
import UserRole = $Enums.UserRole;


@ApiTags("Rooms")
@ApiBearerAuth()
@Controller("rooms")
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  @Authorization()
  @ApiOperation({ summary: "List all rooms accessible for the user" })
  @ApiResponse({ status: 200, description: 'List of rooms returned successfully' })
  async getRooms(@Authorized() user: User) {
    return this.roomService.findAll(user);
  }

  @Get(":id")
  @Authorization()
  @ApiOperation({ summary: "Get room by ID if accessible" })
  @ApiParam({ name: 'id', type: String, description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'Room details returned successfully' })
  async getRoom(@Param("id") id: string) {
    return this.roomService.findOne(id);
  }


  @Get("avalible")
  @Authorization(UserRole.Admin, UserRole.SignedInUser)
  @ApiOperation({ summary: "Get available rooms in date range" })
  @ApiQuery({ name: 'from', required: true, type: String, example: '2025-08-01' })
  @ApiQuery({ name: 'to', required: true, type: String, example: '2025-08-10' })
  @ApiQuery({ name: 'dormitoryId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Filtered available rooms returned' })
  async getAvalibleRooms(@Query() query: AvailableRoomsDto) {
    return this.roomService.findAvailableRooms(query);
  }

  @Post("book")
  @Authorization(UserRole.SignedInUser)
  @ApiOperation({ summary: "Book a room for specific dates" })
  @ApiBody({ type: BookRoomDto })
  @ApiResponse({ status: 201, description: 'Room booked successfully' })
  async bookRoom(@Authorized() user: User, @Body() dto: BookRoomDto) {
    return this.roomService.bookRoom(dto, user.id);
  }

  @Post("request-accommodation")
  @Authorization(UserRole.SignedInUser)
  @ApiOperation({ summary: "Request to book a room (confirmation flow)" })
  @ApiBody({ type: RequestAccommmodationDto })
  @ApiResponse({ status: 201, description: 'Accommodation request created' })
  async requestAccommodation(
      @Authorized() user: User,
      @Body() dto: RequestAccommmodationDto,
  ) {
    return this.roomService.requestAccommodation(user, dto);
  }

  @Post("request-move-out")
  @Authorization(UserRole.SignedInUser)
  @ApiOperation({ summary: "Resident requests to move out" })
  @ApiBody({ type: RequestMoveOutDto })
  @ApiResponse({ status: 201, description: 'Move out request created' })
  async requestMoveOut(
      @Authorized() user: User,
      @Body() dto: RequestMoveOutDto,
  ) {
    return this.roomService.requestMoveOut(user, dto);
  }

  @Post(":id/statuses")
  @Authorization(UserRole.Admin)
  @ApiOperation({ summary: "Create a room status (Admin only)" })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: CreateRoomStatusDto })
  @ApiResponse({ status: 201, description: 'Room status created successfully' })
  async createRoomStatus(
      @Param("id") roomId: string,
      @Body() dto: CreateRoomStatusDto,
  ) {
    return this.roomService.createRoomStatus(roomId, dto);
  }

  @Delete(":id/statuses/:sid")
  @Authorization(UserRole.Admin)
  @ApiOperation({ summary: "Delete room status (Admin only)" })
  @ApiParam({ name: "id", type: String })
  @ApiParam({ name: "sid", type: String })
  @ApiResponse({ status: 200, description: 'Room status deleted successfully' })
  async deleteRoomStatus(
      @Param("id") roomId: string,
      @Param("sid") statusId: string,
  ) {
    return this.roomService.deleteRoomStatus(statusId);
  }

  @Patch(":id/assign-user")
  @Authorization(UserRole.Admin)
  @ApiOperation({ summary: "Assign user to a room (Admin only)" })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: AssignUserToRoomDto })
  @ApiResponse({ status: 200, description: 'User assigned to room' })
  async assignUser(
      @Param("id") roomId: string,
      @Body() dto: AssignUserToRoomDto,
  ) {
    return this.roomService.assignUserToRoom(roomId, dto.userId);
  }

  @Post("/prices")
  @Authorization(UserRole.Admin)
  @ApiOperation({ summary: "Set pricing for room capacity (Admin only)" })
  @ApiBody({ type: SetPriceDto })
  @ApiResponse({ status: 201, description: 'Price created' })
  async setPrice(@Body() dto: SetPriceDto) {
    return this.roomService.setRoomPrice(dto);
  }
}
