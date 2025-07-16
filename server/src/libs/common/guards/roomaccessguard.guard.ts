import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {PrismaService} from "@/prisma/prisma.service";

@Injectable()
export class RoomAccessGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const user = req.user;

        if (!user) return false;

        // Якщо це глобальний адмін — дозвіл
        if (user.role === 'Admin') return true;

        // Отримуємо всі dormitoryId, де user — адмін
        const assignments = await this.prisma.dormitoryAdmin.findMany({
            where: { userId: user.id },
            select: { dormitoryId: true },
        });
        const allowedDormitoryIds = assignments.map(a => a.dormitoryId);

        // Перевіряємо доступ до кімнати
        const roomId = req.params.id || req.body.roomId;
        if (roomId) {
            const room = await this.prisma.room.findUnique({
                where: { id: roomId },
                select: { dormitoryId: true },
            });
            if (!room) return false;
            return allowedDormitoryIds.includes(room.dormitoryId);
        }

        // Якщо це список кімнат, передаємо список доступних dormitoryId
        req.allowedDormitoryIds = allowedDormitoryIds;
        return true;
    }
}
