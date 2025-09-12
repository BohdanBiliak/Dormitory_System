import { Injectable } from '@nestjs/common';
import { AnnouncementRepository } from "@modules/announcement/repositories/announcement.repository";

@Injectable()
export class GetPublicAnnouncementsUseCase {
    constructor(private readonly repo: AnnouncementRepository) {}
    async execute(options: { showHidden?: boolean; showExpired?: boolean, page?: number, limit?: number } = {}) {
        console.log('GetPublicAnnouncementsUseCase started with options:', options);
        
        const filters: any = {
            OR: [
                { recipients: { some: { forEveryone: true } } },
                { recipients: { none: {} } }, 
            ],
            ...(options.showHidden ? {} : { isHidden: false }),
            ...(options.showExpired ? {} : { expiresAt: { gte: new Date() } }),
        };
        
        console.log('Executing GetPublicAnnouncementsUseCase with simplified filters:', JSON.stringify(filters, null, 2));
        
        const page = options.page && options.page > 0 ? options.page : 1;
        const limit = options.limit && options.limit > 0 ? options.limit : 20;
        const skip = (page - 1) * limit;
        
        console.log('Pagination parameters:', { page, limit, skip });
        
        try {
            console.log('Calling repository findAndCount...');
            const [data, total] = await this.repo.findAndCount(filters, { skip, take: limit });
            console.log('Repository query completed successfully');
            console.log('GetPublicAnnouncementsUseCase results:', { total, dataLength: data.length });
            
            const result = {
                data,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
            
            console.log('Final result pagination:', result.pagination);
            console.log('GetPublicAnnouncementsUseCase completed successfully');
            
            return result;
        } catch (error) {
            console.error('Error in GetPublicAnnouncementsUseCase:', error);
            console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace available');
            throw error;
        }
    }
}