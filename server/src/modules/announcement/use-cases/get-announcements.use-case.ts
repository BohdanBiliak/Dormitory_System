// use-cases/get-announcements.use-case.ts
import { Injectable } from '@nestjs/common';
import {AnnouncementRepository} from "@modules/announcement/repositories/announcement.repository";

@Injectable()
export class GetAnnouncementsUseCase {
    constructor(private readonly repo: AnnouncementRepository) {}

    async execute(options: { showHidden?: boolean; showExpired?: boolean } = {}) {
        const now = new Date();
        const filters = {
            ...(options.showHidden ? {} : { isHidden: false }),
            ...(options.showExpired ? {} : { expiresAt: { gte: now } })
        };
        return this.repo.findAll(filters);
    }
}
