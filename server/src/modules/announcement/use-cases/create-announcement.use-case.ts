// use-cases/create-announcement.use-case.ts
import { Injectable } from "@nestjs/common";

import { CreateAnnouncementDto } from "../dto/create-announcement.dto";
import { AnnouncementRepository } from "@modules/announcement/announcement.repository";

@Injectable()
export class CreateAnnouncementUseCase {
  constructor(private readonly repo: AnnouncementRepository) {}

  async execute(dto: CreateAnnouncementDto, authorId: string) {
    const recipientsData = [
      ...(dto.forEveryone ? [{ forEveryone: true }] : []),
      ...(dto.userIds?.map((id) => ({ userId: id })) || []),
      ...(dto.roomIds?.map((id) => ({ roomId: id })) || []),
      ...(dto.floorIds?.map((id) => ({ floorId: id })) || []),
      ...(dto.dormitoryIds?.map((id) => ({ dormitoryId: id })) || []),
    ];

    // If no recipients are specified, default to everyone
    if (recipientsData.length === 0) {
      recipientsData.push({ forEveryone: true });
    }

    return this.repo.create({
      title: dto.title,
      content: dto.content,
      expiresAt: new Date(dto.expiresAt),
      author: { connect: { id: authorId } },
      attachments: {
        create:
          dto.attachmentUrls?.map((url) => {
            const filename = url.split("/").pop() ?? "unnamed.file";
            return {
              url,
              filename,
            };
          }) || [],
      },
      recipients: {
        create: recipientsData,
      },
    });
  }
}
