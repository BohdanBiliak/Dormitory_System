import { Injectable } from '@nestjs/common';
import {PrismaService} from "@/prisma/prisma.service";
import {$Enums, User} from '../../../__generated__';

@Injectable()
export class RoomService {
    constructor(private readonly prismaService: PrismaService) {
    }
    async findAll(user: User) {
        if (user.role === $Enums.UserRole.Admin) {
            return this.prismaService.room.findMany();
        }

        const assignments = await this.prismaService.dormitoryAdmin.findMany({
            where: { userId: user.id },
            select: { dormitoryId: true },
        });

        return this.prismaService.room.findMany({
            where: {
                dormitoryId: { in: assignments.map(a => a.dormitoryId) },
            },
        });
    }


    findOne(id:string){
        return this.prismaService.room.findUniqueOrThrow({where: {id}})
    }
}
