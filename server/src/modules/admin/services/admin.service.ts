import { Injectable } from '@nestjs/common';
import {UpdateAdminProfileDto} from "@/modules/admin/dto/UpdateAdminProfile.dto";
import {PrismaService} from "@/prisma/prisma.service";

@Injectable()
export class AdminService {

constructor(private readonly prismaService: PrismaService) {}

    async getById(id: string) {
        return this.prismaService.user.findUnique({
            where: { id },
            select: {
                id: true,
                displayName: true,
                secondName: true,
                email: true,
                picture: true,
                role: true,
            },
        });
    }

    async updateById(id: string, data: UpdateAdminProfileDto) {
        return this.prismaService.user.update({
            where: { id },
            data,
            select: {
                id: true,
                displayName: true,
                secondName: true,
                email: true,
                picture: true,
                role: true,
            },
        });
    }
}
