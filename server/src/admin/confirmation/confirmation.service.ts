import {Injectable} from "@nestjs/common";
import {PrismaService} from "@/prisma/prisma.service";
import {$Enums, Confirmation, ConfirmationType} from "../../../__generated__";
import ConfirmationStatus = $Enums.ConfirmationStatus;
import UserRole = $Enums.UserRole;

@Injectable()
export class ConfirmationService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(): Promise<Confirmation[]> {
        return this.prisma.confirmation.findMany({
            include: {
                requester: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateStatus(id: string, status: ConfirmationStatus) {
        const updated = await this.prisma.confirmation.update({
            where: { id },
            include: { requester: true },
            data: {
                status,
                resolvedAt: new Date(),
            },
        });
        if (
            status === ConfirmationStatus.APPROVED &&
            updated.type === ConfirmationType.IDENTITY_VERIFICATION
        ) {
            await this.prisma.user.update({
                where: { id: updated.userId },
                data: { role: UserRole.SignedInUser },
            });
        }

        return updated;
    }

}
