// use-cases/update-announcement.use-case.ts
import { Injectable } from '@nestjs/common';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';
import {AnnouncementRepository} from "@modules/announcement/repositories/announcement.repository";

@Injectable()
export class UpdateAnnouncementUseCase {
    constructor(private readonly repo: AnnouncementRepository) {}

    async execute(id: string, dto: UpdateAnnouncementDto) {
        return this.repo.update(id, {
            ...dto,
            expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined
        });
    }
}
