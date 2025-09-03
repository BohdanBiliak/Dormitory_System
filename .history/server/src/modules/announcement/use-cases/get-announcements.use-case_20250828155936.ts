// use-cases/get-announcements.use-case.ts
import { Injectable } from '@nestjs/common';
import {AnnouncementRepository} from "@modules/announcement/repositories/announcement.repository";

@Injectable()
export class GetAnnouncementsUseCase {
    constructor(private readonly repo: AnnouncementRepository) {}

    async execute(options: { showHidden?: boolean; showExpired?: boolean, page?:number, limit?: number } = {}) {
        const now = new Date();
        const filters = {
            ...(options.showHidden ? {} : { isHidden: false }),
            ...(options.showExpired ? {} : { expiresAt: { gte: now } })
        };
        const page = options.page && options.page > 0 ? options.page : 1;
    const limit = options.limit && options.limit > 0 ? options.limit : 20;
    const skip = (page - 1) * limit;
        return this.repo.findAll(filters);
    }
}
