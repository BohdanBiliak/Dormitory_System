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
            ...(options.showExpired ? {} : { expiresAt: { gte: now } })
        };
        return this.repo.findAll({
            recipients: {
                some: { forEveryone: true }
            },
            isHidden: false,
            expiresAt: { gte: now }
        });
    }
}
