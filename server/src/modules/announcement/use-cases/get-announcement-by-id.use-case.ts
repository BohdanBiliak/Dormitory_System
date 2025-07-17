// use-cases/get-announcement-by-id.use-case.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import {AnnouncementRepository} from "@modules/announcement/repositories/announcement.repository";

@Injectable()
export class GetAnnouncementByIdUseCase {
    constructor(private readonly repo: AnnouncementRepository) {}

    async execute(id: string) {
        const announcement = await this.repo.findById(id);
        if (!announcement) throw new NotFoundException('Announcement not found');
        return announcement;
    }
}
