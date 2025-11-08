import { Injectable } from "@nestjs/common";
import { AnnouncementRepository } from "@modules/announcement/announcement.repository";

@Injectable()
export class GetUserAnnouncementsUseCase {
  constructor(private readonly repo: AnnouncementRepository) {}
  
  async execute(
    userId: string,
    roomId?: string,
    floorId?: string,
    dormitoryId?: string,
    options: {
      showHidden?: boolean;
      showExpired?: boolean;
      page?: number;
      limit?: number;
    } = {},
  ) {
    console.log("GetUserAnnouncementsUseCase started with:", { userId, roomId, floorId, dormitoryId, options });

    // Build the recipient filters
    const recipientFilters: any[] = [
      { forEveryone: true },
      { userId },
    ];

    if (roomId) {
      recipientFilters.push({ roomId });
    }

    if (floorId) {
      recipientFilters.push({ floorId });
    }

    if (dormitoryId) {
      recipientFilters.push({ dormitoryId });
    }

    const filters: any = {
      recipients: {
        some: {
          OR: recipientFilters,
        },
      },
      ...(options.showHidden ? {} : { isHidden: false }),
      ...(options.showExpired ? {} : { expiresAt: { gte: new Date() } }),
    };

    console.log(
      "Executing GetUserAnnouncementsUseCase with filters:",
      JSON.stringify(filters, null, 2),
    );

    const page = options.page && options.page > 0 ? options.page : 1;
    const limit = options.limit && options.limit > 0 ? options.limit : 20;
    const skip = (page - 1) * limit;

    console.log("Pagination parameters:", { page, limit, skip });

    try {
      console.log("Calling repository findAndCount...");
      const [data, total] = await this.repo.findAndCount(filters, {
        skip,
        take: limit,
      });
      console.log("Repository query completed successfully");
      console.log("GetUserAnnouncementsUseCase results:", {
        total,
        dataLength: data.length,
      });

      const result = {
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };

      console.log("Final result pagination:", result.pagination);
      console.log("GetUserAnnouncementsUseCase completed successfully");

      return result;
    } catch (error) {
      console.error("Error in GetUserAnnouncementsUseCase:", error);
      console.error(
        "Error stack:",
        error instanceof Error ? error.stack : "No stack trace available",
      );
      throw error;
    }
  }
}
