import { Module } from "@nestjs/common";
import { RoomTypesController } from "./room-types.controller";
import { CreateRoomTypeUseCase } from "./use-cases/create-room-type.use-case";
import { GetRoomTypesUseCase } from "./use-cases/get-room-types.use-case";
import { UpdateRoomTypeUseCase } from "./use-cases/update-room-type.use-case";
import { DeleteRoomTypeUseCase } from "./use-cases/delete-room-type.use-case";
import { AssignPriceCategoryToRoomTypeUseCase } from "./use-cases/assign-price-category.use-case";
import { PrismaService } from "@/prisma/prisma.service";
import { PrismaModule } from "@/prisma/prisma.module";
import { UserModule } from "@/modules/user/user.module";
import { S3Module } from "@/libs/common/s3/s3.module";

@Module({
  imports: [PrismaModule, UserModule, S3Module],
  controllers: [RoomTypesController],
  providers: [
    PrismaService,
    CreateRoomTypeUseCase,
    GetRoomTypesUseCase,
    UpdateRoomTypeUseCase,
    DeleteRoomTypeUseCase,
    AssignPriceCategoryToRoomTypeUseCase,
  ],
  exports: [
    CreateRoomTypeUseCase,
    GetRoomTypesUseCase,
    UpdateRoomTypeUseCase,
    DeleteRoomTypeUseCase,
    AssignPriceCategoryToRoomTypeUseCase,
  ],
})
export class RoomTypesModule {}
