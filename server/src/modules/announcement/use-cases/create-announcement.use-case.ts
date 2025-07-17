// use-cases/create-announcement.use-case.ts
import { Injectable } from '@nestjs/common';

import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import {AnnouncementRepository} from "@modules/announcement/repositories/announcement.repository";

@Injectable()
export class CreateAnnouncementUseCase {
    constructor(private readonly repo: AnnouncementRepository) {}

    async execute(dto: CreateAnnouncementDto, authorId: string) {
        const recipientsData = [
            ...(dto.forEveryone ? [{ forEveryone: true }] : []),
            ...(dto.userIds?.map(id => ({ userId: id })) || []),
            ...(dto.roomIds?.map(id => ({ roomId: id })) || []),
            ...(dto.floorNumbers?.map(num => ({ floor: num })) || [])
        ];

        return this.repo.create({
            title: dto.title,
            content: dto.content,
            expiresAt: new Date(dto.expiresAt),
            author: { connect: { id: authorId } },
            attachments: {
                create: dto.attachmentUrls?.map(url => {
                    const filename = url.split('/').pop() ?? 'unnamed.file';
                    return {
                        url,
                        filename
                    };
                }) || []
            },
            recipients: {
                create: recipientsData
            }
        });
    }
}
