import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuditService {
    constructor(private readonly prisma: PrismaService) {}

    async log({
                  userId,
                  action,
                  entity,
                  entityId,
                  meta = null,
              }: {
        userId: string;
        action: string;
        entity: string;
        entityId: string;
        meta?: any;
    }) {
        return this.prisma.auditLog.create({
            data: {
                userId,
                action,
                entity,
                entityId,
                meta,
            },
        });
    }
}
