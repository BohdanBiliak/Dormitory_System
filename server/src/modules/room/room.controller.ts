import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { RoomService } from "./room.service";
import { RoomAccessGuard } from "@/libs/common/guards/roomaccessguard.guard";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Authorized } from "@/libs/common/decorators/authtorized.decorator";
import {$Enums, User} from "../../../__generated__";
import {Authorization} from "@/libs/common/decorators/auth.decorator";

@ApiTags('Rooms')
@ApiBearerAuth()
@UseGuards(RoomAccessGuard)
@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  @Authorization()
  @ApiOperation({ summary: "List all rooms accessible for the user" })
  async getRooms(@Authorized() user: User) {
    return this.roomService.findAll(user);
  }

  @Get(":id")
  @Authorization()
  @ApiOperation({ summary: "Get room by ID if accessible" })
  async getRoom(@Param("id") id: string) {
    return this.roomService.findOne(id);
  }
}
