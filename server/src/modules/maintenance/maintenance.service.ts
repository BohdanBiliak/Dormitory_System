import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { MaintenanceStatus } from '../../../__generated__';
import { CreateMaintenanceReportDto } from './dto/create-maintenance-report.dto';
import { UpdateMaintenanceStatusDto } from './dto/update-maintenance-status.dto';
import { GetMaintenanceReportsDto } from './dto/get-maintenance-reports.dto';

@Injectable()
export class MaintenanceService {
  constructor(private readonly prisma: PrismaService) {}

  async createReport(userId: string, dto: CreateMaintenanceReportDto) {
    // Verify user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { 
        id: true, 
        displayName: true, 
        email: true,
        roomId: true,
        dormitoryId: true
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // If roomId not provided, use user's assigned room
    const roomId = dto.roomId || user.roomId;

    // Create the maintenance report
    const report = await this.prisma.maintenanceReport.create({
      data: {
        userId,
        roomId,
        category: dto.category,
        priority: dto.priority,
        title: dto.title,
        description: dto.description,
        location: dto.location,
        attachments: dto.attachments || [],
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            email: true,
            picture: true,
          },
        },
        room: {
          select: {
            id: true,
            number: true,
          },
        },
      },
    });

    return report;
  }

  async getMyReports(userId: string, dto: GetMaintenanceReportsDto) {
    const { page = 1, limit = 10, status, category, priority } = dto;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    
    if (status) where.status = status;
    if (category) where.category = category;
    if (priority) where.priority = priority;

    const [reports, total] = await Promise.all([
      this.prisma.maintenanceReport.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              displayName: true,
              email: true,
              picture: true,
            },
          },
          room: {
            select: {
              id: true,
              number: true,
            },
          },
          conversation: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.maintenanceReport.count({ where }),
    ]);

    return {
      data: reports,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAllReports(dto: GetMaintenanceReportsDto) {
    const { page = 1, limit = 10, status, category, priority } = dto;
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (status) where.status = status;
    if (category) where.category = category;
    if (priority) where.priority = priority;

    const [reports, total] = await Promise.all([
      this.prisma.maintenanceReport.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              displayName: true,
              email: true,
              picture: true,
            },
          },
          room: {
            select: {
              id: true,
              number: true,
            },
          },
          conversation: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      this.prisma.maintenanceReport.count({ where }),
    ]);

    return {
      data: reports,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getReportById(reportId: string, userId?: string) {
    const report = await this.prisma.maintenanceReport.findUnique({
      where: { id: reportId },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            email: true,
            picture: true,
          },
        },
        room: {
          select: {
            id: true,
            number: true,
          },
        },
        conversation: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!report) {
      throw new NotFoundException('Maintenance report not found');
    }

    // If userId is provided, verify access (user can only see their own reports unless admin)
    if (userId && report.userId !== userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (user?.role !== 'Admin' && user?.role !== 'SuperAdmin') {
        throw new ForbiddenException('You do not have access to this report');
      }
    }

    return report;
  }

  async updateReportStatus(reportId: string, adminId: string, dto: UpdateMaintenanceStatusDto) {
    // Verify admin permissions
    const admin = await this.prisma.user.findUnique({
      where: { id: adminId },
      select: { role: true },
    });

    if (admin?.role !== 'Admin' && admin?.role !== 'SuperAdmin') {
      throw new ForbiddenException('Only admins can update maintenance report status');
    }

    // Get the report
    const report = await this.prisma.maintenanceReport.findUnique({
      where: { id: reportId },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            email: true,
          },
        },
      },
    });

    if (!report) {
      throw new NotFoundException('Maintenance report not found');
    }

    // Update the status
    const resolvedAt = dto.status === MaintenanceStatus.RESOLVED ? new Date() : report.resolvedAt;

    const updatedReport = await this.prisma.maintenanceReport.update({
      where: { id: reportId },
      data: {
        status: dto.status,
        resolvedAt,
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            email: true,
            picture: true,
          },
        },
        room: {
          select: {
            id: true,
            number: true,
          },
        },
        conversation: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // TODO: Send notification to user about status change
    // This will be implemented in the notification integration step

    return updatedReport;
  }

  async createConversationFromReport(reportId: string, adminId: string, initialMessage?: string) {
    // Verify admin permissions
    const admin = await this.prisma.user.findUnique({
      where: { id: adminId },
      select: { 
        role: true,
        displayName: true,
      },
    });

    if (admin?.role !== 'Admin' && admin?.role !== 'SuperAdmin') {
      throw new ForbiddenException('Only admins can create conversations from maintenance reports');
    }

    // Get the report
    const report = await this.prisma.maintenanceReport.findUnique({
      where: { id: reportId },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
          },
        },
        conversation: true,
      },
    });

    if (!report) {
      throw new NotFoundException('Maintenance report not found');
    }

    if (report.conversationId) {
      throw new BadRequestException('A conversation already exists for this report');
    }

    // Create conversation
    const conversation = await this.prisma.conversation.create({
      data: {
        title: `Maintenance: ${report.title}`,
        isGroup: false,
        createdById: adminId,
        participants: {
          createMany: {
            data: [
              { userId: adminId, isAdmin: true },
              { userId: report.userId, isAdmin: false },
            ],
          },
        },
        ...(initialMessage && {
          messages: {
            create: {
              senderId: adminId,
              content: initialMessage,
              messageType: 'text',
            },
          },
        }),
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                picture: true,
                email: true,
              },
            },
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                displayName: true,
                picture: true,
              },
            },
          },
        },
      },
    });

    // Link conversation to maintenance report
    await this.prisma.maintenanceReport.update({
      where: { id: reportId },
      data: { conversationId: conversation.id },
    });

    return conversation;
  }

  async uploadAttachments(files: Express.Multer.File[]): Promise<string[]> {
    // TODO: Implement S3 upload logic
    // For now, return empty array
    // This should use the S3 service similar to other modules
    return [];
  }

  async getReportStats() {
    const [
      totalReports,
      pendingCount,
      inProgressCount,
      resolvedCount,
      urgentCount,
    ] = await Promise.all([
      this.prisma.maintenanceReport.count(),
      this.prisma.maintenanceReport.count({ where: { status: MaintenanceStatus.PENDING } }),
      this.prisma.maintenanceReport.count({ where: { status: MaintenanceStatus.IN_PROGRESS } }),
      this.prisma.maintenanceReport.count({ where: { status: MaintenanceStatus.RESOLVED } }),
      this.prisma.maintenanceReport.count({ 
        where: { 
          priority: 'URGENT',
          status: { not: MaintenanceStatus.RESOLVED }
        } 
      }),
    ]);

    return {
      total: totalReports,
      pending: pendingCount,
      inProgress: inProgressCount,
      resolved: resolvedCount,
      urgent: urgentCount,
    };
  }
}
