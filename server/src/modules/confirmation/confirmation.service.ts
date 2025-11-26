import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { $Enums, Confirmation, ConfirmationType } from "@prisma/client";
import ConfirmationStatus = $Enums.ConfirmationStatus;
import UserRole = $Enums.UserRole;
import { MailService } from "@/libs/mail/mail.service";
import { NotificationsService } from "../notifications/notifications.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ApproveAccommodationDto } from "../admin/dto/ApproveAccommodation.dto";

@Injectable()
export class ConfirmationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async getAll(): Promise<Confirmation[]> {
    return this.prisma.confirmation.findMany({
      include: {
        requester: true,
        payment: {
          include: {
            user: {
              select: {
                displayName: true,
                secondName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateStatus(id: string, status: ConfirmationStatus) {
    const updated = await this.prisma.confirmation.update({
      where: { id },
      include: { 
        requester: true,
        payment: true,
      },
      data: {
        status,
        resolvedAt: new Date(),
      },
    });
    
    if (status === ConfirmationStatus.APPROVED) {
      // Handle identity verification
      if (updated.type === ConfirmationType.IDENTITY_VERIFICATION) {
        await this.prisma.user.update({
          where: { id: updated.userId },
          data: { role: UserRole.SignedInUser },
        });
      }
      
      // Handle payment proof confirmation
      if (updated.type === ConfirmationType.PAYMENT_PROOF && updated.paymentId) {
        await this.prisma.payment.update({
          where: { id: updated.paymentId },
          data: {
            status: 'PAID' as any,
            paidAt: new Date(),
          },
        });
      }
    }

    return updated;
  }

  async getAllFiltered({
    type,
    status,
    addressee,
    page = 1,
    limit = 10,
  }: {
    type?: $Enums.ConfirmationType;
    status?: $Enums.ConfirmationStatus;
    addressee?: string;
    page?: number;
    limit?: number;
  }) {
    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status;
    if (addressee)
      where.requester = { name: { contains: addressee, mode: "insensitive" } };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.confirmation.findMany({
        where,
        include: { 
          requester: true,
          payment: {
            include: {
              user: {
                select: {
                  displayName: true,
                  secondName: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.confirmation.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      pageCount: Math.ceil(total / limit),
    };
  }

  async reject(id: string, reason: string) {
    const confirmation = await this.prisma.confirmation.findUnique({ 
      where: { id },
      include: { payment: true },
    });

    if (!confirmation) {
      throw new Error("Confirmation not found");
    }

    const user = await this.prisma.user.findUnique({ where: { id: confirmation.userId } });

    if (!user) {
      throw new Error("User not found");
    }

    const updated = await this.prisma.confirmation.update({
      where: { id },
      data: {
        status: ConfirmationStatus.REJECTED,
        resolvedAt: new Date(),
        rejectionReason: reason,
      },
    });

    // If it's a payment proof rejection, update payment status
    if (confirmation.type === ConfirmationType.PAYMENT_PROOF && confirmation.paymentId) {
      await this.prisma.payment.update({
        where: { id: confirmation.paymentId },
        data: {
          status: 'REJECTED' as any,
          rejectionReason: reason,
        },
      });
    }

    // Send rejection email to the requester
    await this.sendRejectionEmail(
      user.email,
      user.displayName,
      reason,
      updated.type,
    );

    return updated;
  }

  private async sendRejectionEmail(
    email: string,
    name: string,
    reason: string,
    type: ConfirmationType,
  ) {
    const subject = `Your ${type.toLowerCase().replace("_", " ")} request has been rejected`;
    const template = "confirmation-rejection"; // Create this template

    await this.mailService.sendRejectionEmail(email, name, reason, type);
  }

  async approveAccommodation(id: string, dto: ApproveAccommodationDto) {
    // Get confirmation with all details
    const confirmation = await this.prisma.confirmation.findUnique({
      where: { id },
      include: {
        requester: true,
      },
    });

    if (!confirmation) {
      throw new NotFoundException("Confirmation not found");
    }

    if (confirmation.type !== ConfirmationType.ACCOMMODATION) {
      throw new BadRequestException("This confirmation is not an accommodation request");
    }

    if (confirmation.status !== ConfirmationStatus.PENDING) {
      throw new BadRequestException("This confirmation has already been processed");
    }

    // Get the metadata for dates and alternative rooms preference
    const metadata = confirmation.metadata as any;
    const originalSuggestedTime = metadata?.suggestedTime || "Not specified";
    const alternativeRoomsRequested = metadata?.alternativeRooms || false;

    // Admin can override the suggested time
    const finalSuggestedTime = dto.suggestedTime || originalSuggestedTime;
    const timeWasChanged = dto.suggestedTime && dto.suggestedTime !== originalSuggestedTime;

    // Determine which room to assign
    let finalRoomId = confirmation.roomId;
    
    // If alternative room is provided and user requested alternatives, use it
    if (dto.alternativeRoomId && alternativeRoomsRequested) {
      finalRoomId = dto.alternativeRoomId;
    }

    if (!finalRoomId) {
      throw new BadRequestException("Room ID is required for accommodation approval");
    }

    // Get room details
    const room = await this.prisma.room.findUnique({
      where: { id: finalRoomId },
      include: {
        dormitory: true,
        floor: true,
      },
    });

    if (!room) {
      throw new NotFoundException("Room not found");
    }

    // Check room capacity
    const currentResidents = await this.prisma.user.count({
      where: { roomId: finalRoomId },
    });

    if (currentResidents >= room.capacity) {
      throw new BadRequestException("Selected room is at full capacity");
    }

    // Update confirmation status
    const updatedConfirmation = await this.prisma.confirmation.update({
      where: { id },
      data: {
        status: ConfirmationStatus.APPROVED,
        resolvedAt: new Date(),
        metadata: {
          ...metadata,
          approvedRoomId: finalRoomId,
          wasAlternativeRoomAssigned: finalRoomId !== confirmation.roomId,
          originalSuggestedTime,
          finalSuggestedTime,
          timeWasChanged,
          adminReason: dto.reason,
        },
      },
    });

    // Assign user to room
    await this.prisma.user.update({
      where: { id: confirmation.userId },
      data: { roomId: finalRoomId },
    });

    // Create room status if dates are provided
    if (confirmation.from && confirmation.to) {
      // Get or find 'Occupied' status type
      const occupiedStatus = await this.prisma.roomStatusType.findFirst({
        where: { name: "Occupied" },
      });

      if (occupiedStatus) {
        await this.prisma.roomStatus.create({
          data: {
            roomId: finalRoomId,
            statusTypeId: occupiedStatus.id,
            description: `Accommodation approved for ${confirmation.requester.displayName}`,
            dateOfStart: confirmation.from,
            dateOfEnd: confirmation.to,
            createdById: confirmation.userId,
          },
        });
      }
    }

    // Format dates for notification
    const fromDate = confirmation.from 
      ? new Date(confirmation.from).toLocaleDateString() 
      : "Not specified";
    const toDate = confirmation.to 
      ? new Date(confirmation.to).toLocaleDateString() 
      : "Not specified";

    // Create notification for user
    await this.notificationsService.createNotification({
      toUserId: confirmation.userId,
      type: $Enums.NotificationType.ROOM_BOOKING_APPROVED,
      title: "Accommodation Request Approved",
      message: `Your accommodation request was approved. Time of accommodation: ${fromDate} at ${finalSuggestedTime}. You have been assigned to Room ${room.number} in ${room.dormitory.name}.${dto.reason ? ` Note: ${dto.reason}` : ''}`,
      priority: $Enums.NotificationPriority.HIGH,
      roomId: finalRoomId,
      metadata: {
        roomNumber: room.number,
        dormitoryName: room.dormitory.name,
        floorNumber: room.floor?.floorNumber,
        checkInDate: fromDate,
        checkOutDate: toDate,
        suggestedTime: finalSuggestedTime,
        wasAlternativeRoom: finalRoomId !== confirmation.roomId,
        timeWasChanged,
        adminReason: dto.reason,
      },
    });

    // Send email notification
    await this.mailService.sendAccommodationApprovalEmail(
      confirmation.requester.email,
      {
        userName: confirmation.requester.displayName,
        roomNumber: room.number,
        dormitoryName: room.dormitory.name,
        floorNumber: room.floor?.floorNumber || 0,
        checkInDate: fromDate,
        checkOutDate: toDate,
        suggestedTime: finalSuggestedTime,
        originalSuggestedTime: timeWasChanged ? originalSuggestedTime : undefined,
        wasAlternativeRoom: finalRoomId !== confirmation.roomId,
        originalRoomNumber: confirmation.roomId !== finalRoomId 
          ? (await this.prisma.room.findUnique({ 
              where: { id: confirmation.roomId || '' },
              select: { number: true }
            }))?.number 
          : undefined,
        adminReason: dto.reason,
      },
    );

    return {
      message: "Accommodation request approved successfully",
      confirmation: updatedConfirmation,
      assignedRoom: {
        id: room.id,
        number: room.number,
        dormitory: room.dormitory.name,
        floor: room.floor?.floorNumber,
      },
    };
  }
}
