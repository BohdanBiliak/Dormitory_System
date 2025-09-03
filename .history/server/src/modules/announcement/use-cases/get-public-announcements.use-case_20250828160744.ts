// use-cases/get-public-announcements.use-case.ts

import { Injectable } from '@nestjs/common';
import { AnnouncementRepository } from "@modules/announcement/repositories/announcement.repository";

@Injectable()
export class GetPublicAnnouncementsUseCase {
    constructor(private readonly repo: AnnouncementRepository) {}

    async execute(options: { showHidden?: boolean; showExpired?: boolean, page?: number, limit?: number } = {}) {
        const now = new Date();
         const filters = {
            ...(options.showHidden ? {} : { isHidden: false }),
            ...(options.showExpired ? {} : { expiresAt: { gte: now } }),
            recipients: {
                some: { forEveryone: true }
            }
        };
         const page = options.page && options.page > 0 ? options.page : 1;
        const limit = options.limit && options.limit > 0 ? options.limit : 20;
        const skip = (page - 1) * limit;
        const [data, total] = await this.repo.findAndCount(filters, { skip, take: limit });
        return this.repo.findAll({
            recipients: {
                some: { forEveryone: true }
            },
            isHidden: false,
            expiresAt: { gte: now }
        });

         return {
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
