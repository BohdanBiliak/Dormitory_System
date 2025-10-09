import { Module } from '@nestjs/common';
import { RoomTypesController } from './room-types.controller';
import { CreateRoomTypeUseCase } from './use-cases/create-room-type.use-case';
import { GetRoomTypesUseCase } from './use-cases/get-room-types.use-case';
import { UpdateRoomTypeUseCase } from './use-cases/update-room-type.use-case';
import { DeleteRoomTypeUseCase } from './use-cases/delete-room-type.use-case';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { UserModule } from '@/modules/user/user.module';
@Module({
  imports: [PrismaModule, UserModule],
  controllers: [RoomTypesController],
  providers: [
    PrismaService,
    CreateRoomTypeUseCase,
    GetRoomTypesUseCase,
    UpdateRoomTypeUseCase,
    DeleteRoomTypeUseCase,
    
  ],
  exports: [
    CreateRoomTypeUseCase,
    GetRoomTypesUseCase,
    UpdateRoomTypeUseCase,
    DeleteRoomTypeUseCase,
  ],
})
export class RoomTypesModule { }