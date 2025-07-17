import { Injectable } from '@nestjs/common';
import { S3Service } from '@libs/common/s3/s3.service';

@Injectable()
export class UploadAnnouncementAttachmentsUseCase {
    constructor(private readonly s3: S3Service) {}

    async execute(files: Express.Multer.File[], folder = 'announcements'): Promise<string[]> {
        return Promise.all(files.map(file => this.s3.uploadFile(file, folder)));
    }
}
