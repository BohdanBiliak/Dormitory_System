// use-cases/get-public-announcements.use-case.ts

import { Injectable } from '@nestjs/common';
import { AnnouncementRepository } from "@modules/announcement/repositories/announcement.repository";

@Injectable()
export class GetPublicAnnouncementsUseCase {
    constructor(private readonly repo: AnnouncementRepository) {}

    async execute() {
        const now = new Date();
        return this.repo.findAll({
            recipients: {
                some: { forEveryone: true }
            },
            isHidden: false,
            expiresAt: { gte: now }
        });
    }
}
