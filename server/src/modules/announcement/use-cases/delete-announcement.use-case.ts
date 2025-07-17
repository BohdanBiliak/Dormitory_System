// use-cases/delete-announcement.use-case.ts
import { Injectable } from '@nestjs/common';
import {AnnouncementRepository} from "@modules/announcement/repositories/announcement.repository";


@Injectable()
export class DeleteAnnouncementUseCase {
    constructor(private readonly repo: AnnouncementRepository) {}

    async execute(id: string) {
        return this.repo.softDelete(id);
    }
}
