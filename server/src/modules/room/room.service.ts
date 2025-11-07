import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { $Enums, PrismaClient, User } from "../../../__generated__";
import {
  RoomRepository,
  RoomWithRelations,
  UpdateRoomData,
} from "./room.repository";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { AvailableRoomsDto } from "./dto/availableRooms.dto";
import { BookRoomDto } from "@modules/room/dto/book-room.dto";
import { RequestAccommmodationDto } from "./dto/requestAccommmodation.dto";
import { RequestMoveOutDto } from "@modules/room/dto/request-moveout.dto";
import { CreateRoomStatusDto } from "@modules/room/dto/create-room-status.dto";
import { AuditService } from "@modules/audit/audit.service";
import { NotificationsService } from "@modules/notifications/notifications.service";
import { MailService } from "@libs/mail/mail.service";
import { EvictUserFromRoomDto } from "./dto/evict-user.dto";
import { AssignPriceCategoryDto } from "./dto/assign-price-category.dto";
import { S3Service } from "@libs/common/s3/s3.service";
import { PricingService } from "@/modules/pricing/pricing.service";
@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly auditService: AuditService,
    private readonly notificationService: NotificationsService,
    private readonly emailService: MailService,
    private readonly s3: S3Service,
    private readonly pricingService: PricingService,
  ) {}

  async updateRoom(
    id: string,
    updateRoomDto: UpdateRoomDto,
    userId: string,
  ): Promise<RoomWithRelations> {
    // Validate room exists
    await this.validateRoomExists(id);

    // Validate business rules
    await this.validateUpdateRules(id, updateRoomDto);

    // Prepare update data
    const updateData: UpdateRoomData = this.prepareUpdateData(updateRoomDto);

    try {
      const updatedRoom = await this.roomRepository.update(id, updateData);

      // Log the update action
      await this.auditService.log({
        userId,
        action: "UPDATE_ROOM",
        entity: "Room",
        entityId: id,
        meta: {
          updatedFields: Object.keys(updateData),
          changes: updateData,
        },
      });
      return await this.roomRepository.findByIdOrThrow(id);
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "P2002"
      ) {
        throw new ConflictException("Room number already exists");
      }
      throw error;
    }
  }

  async findAll(user: User) {
    let rooms: RoomWithRelations[];

    if (user.role === $Enums.UserRole.Admin) {
      rooms = await this.roomRepository.findAll();
    } else {
      const assignments = await this.roomRepository.findDormitoryAdmins(
        user.id,
      );
      const dormitoryIds = assignments.map((a) => a.dormitoryId);
      rooms = await this.roomRepository.findAll(dormitoryIds);
    }

    // Add price information to each room
    return await Promise.all(
      rooms.map(async (room) => {
        // Prioritize priceCategory over legacy pricing
        if (room.priceCategory) {
          return {
            ...room,
            price: {
              pricePerDay: room.priceCategory.pricePerDay,
              pricePerMonth: room.priceCategory.pricePerMonth,
            },
          };
        }
        
        try {
          const pricing = await this.pricingService.getRoomPricing(room.id);
          return {
            ...room,
            price: {
              pricePerDay: pricing.pricePerDay,
              pricePerMonth: pricing.pricePerMonth,
            },
          };
        } catch (error) {
          console.error(`Error getting pricing for room ${room.id}:`, error);
          return {
            ...room,
            price: {
              pricePerDay: 0,
              pricePerMonth: 0,
            },
          };
        }
      }),
    );
  }

  async findOne(id: string) {
    const room = await this.roomRepository.findByIdOrThrow(id);
    
    // Prioritize priceCategory over legacy pricing
    if (room.priceCategory) {
      return {
        ...room,
        price: {
          pricePerDay: room.priceCategory.pricePerDay,
          pricePerMonth: room.priceCategory.pricePerMonth,
        },
      };
    }
    
    try {
      const pricing = await this.pricingService.getRoomPricing(id);
      return {
        ...room,
        price: {
          pricePerDay: pricing.pricePerDay,
          pricePerMonth: pricing.pricePerMonth,
        },
      };
    } catch (error) {
      console.error(`Error getting pricing for room ${id}:`, error);
      return {
        ...room,
        price: {
          pricePerDay: 0,
          pricePerMonth: 0,
        },
      };
    }
  }

  async getRoomWithOccupancy(id: string) {
    const room = await this.roomRepository.findById(id);
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }

    const statistics = await this.roomRepository.getRoomStatistics(id);
    
    // Prioritize priceCategory over legacy pricing
    if (room.priceCategory) {
      return {
        ...room,
        ...statistics,
        price: {
          pricePerDay: room.priceCategory.pricePerDay,
          pricePerMonth: room.priceCategory.pricePerMonth,
        },
      };
    }
    
    try {
      const pricing = await this.pricingService.getRoomPricing(id);
      return {
        ...room,
        ...statistics,
        price: {
          pricePerDay: pricing.pricePerDay,
          pricePerMonth: pricing.pricePerMonth,
        },
      };
    } catch (error) {
      console.error(`Error getting pricing for room ${id}:`, error);
      return {
        ...room,
        ...statistics,
        price: {
          pricePerDay: 0,
          pricePerMonth: 0,
        },
      };
    }
  }

  async findAvailableRooms(dto: AvailableRoomsDto) {
    const from = new Date(dto.from);
    const to = new Date(dto.to);

    const rooms = await this.roomRepository.findAvailableRooms(dto);

    return Promise.all(
      rooms.map(async (room) => {
        const isAvailable =
          !room.statuses.some(
            (status) =>
              !(
                new Date(status.dateOfEnd ?? new Date(9999, 1, 1)) <= from ||
                new Date(status.dateOfStart) >= to
              ),
          ) && room.residents.length < room.capacity;

        // Get price for this room using centralized pricing service
        let pricing;
        try {
          pricing = await this.pricingService.getRoomPricing(room.id);
        } catch (error) {
          console.error(`Error getting pricing for room ${room.id}:`, error);
          pricing = {
            pricePerDay: 0,
            pricePerMonth: 0,
            source: 'no_pricing',
          };
        }

        return {
          ...room,
          isAvailable,
          pricing,
        };
      }),
    );
  }

  async getRoomPriceByCapacity(capacity: number) {
    const price = await this.roomRepository.findPriceByCapacity(capacity);

    if (!price) {
      return {
        pricePerDay: 0,
        pricePerMonth: 0,
        note: "No price configured for this room capacity",
      };
    }

    return {
      pricePerDay: price.pricePerDay,
      pricePerMonth: price.pricePerMonth,
    };
  }

  /**
   * Get room pricing from centralized pricing service
   */
  async getRoomPricing(roomId: string) {
    return this.pricingService.getRoomPricing(roomId);
  }

  /**
   * Get detailed room pricing information
   */
  async getRoomPricingDetails(roomId: string) {
    return this.pricingService.getRoomPricingDetails(roomId);
  }

  async bookRoom(dto: BookRoomDto, userId: string) {
    const room = await this.roomRepository.findById(dto.roomId);
    if (!room) throw new NotFoundException("Room not found");

    // Check if room has capacity
    if (room.residents.length >= room.capacity) {
      throw new ConflictException("Room is already at full capacity");
    }

    const from = new Date(dto.from);
    const to = new Date(dto.to);

    const msInDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor((to.getTime() - from.getTime()) / msInDay);

    if (diffDays < 1) {
      throw new BadRequestException("Booking must be at least 1 night long");
    }

    const isTaken = room.statuses.some(
      (status) =>
        !(
          new Date(status.dateOfEnd ?? new Date(9999, 1, 1)) <= from ||
          new Date(status.dateOfStart) >= to
        ),
    );

    if (isTaken)
      throw new ConflictException("Room already booked or unavailable");

    // Get price for this room
    const pricingDetails = await this.pricingService.calculatePaymentAmount(
      room.id, 
      from, 
      to
    );
    const totalAmount = pricingDetails.amount;

    const booking = await this.roomRepository.createBooking({
      userId,
      roomId: room.id,
      status: "PENDING",
      checkInDate: from,
      checkOutDate: to,
      totalAmount,
      notes: `Direct booking by user`,
    });

    const roomStatus = await this.roomRepository.createRoomStatus(room.id, {
      dateOfStart: from,
      dateOfEnd: to,
      description: `Booking by user ${userId}`,
    });

    await this.roomRepository.updateUserRoom(userId, room.id);

    try {
      await this.sendBookingNotifications(
        booking,
        room,
        from,
        to,
        userId,
        totalAmount,
      );
    } catch (notificationError) {
      console.error("❌ Error sending notifications:", notificationError);
      // Don't throw - booking was successful, notifications are optional
    }

    await this.auditService.log({
      userId,
      action: "BOOK_ROOM",
      entity: "Booking",
      entityId: booking.id,
      meta: {
        roomId: room.id,
        from: from.toISOString(),
        to: to.toISOString(),
        totalAmount,
      },
    });

    return {
      message: "Room booked successfully",
      booking,
      roomStatus,
    };
  }

  async requestAccommodation(user: User, dto: RequestAccommmodationDto) {
    const { from, to, roomId, roommateIds, numberOfPeople } = dto;

    const room = await this.roomRepository.findById(roomId);
    if (!room) throw new NotFoundException("Room not found");
    if (room.residents.length >= room.capacity)
      throw new ConflictException("Room already full");

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const overlapping = await this.roomRepository.findRoomStatus(
      roomId,
      fromDate,
      toDate,
    );

    if (overlapping) {
      throw new ConflictException("Room not available on selected dates");
    }

    return this.roomRepository.createConfirmation({
      userId: user.id,
      type: "ACCOMMODATION",
      status: "PENDING",
      roomId: roomId,
      from: fromDate,
      to: toDate,
      roommateIds: roommateIds || [],
      numberOfPeople: numberOfPeople || 1,
    });
  }

  async requestMoveOut(user: User, dto: RequestMoveOutDto) {
    if (!user.roomId) {
      throw new BadRequestException("You are not assigned to any room");
    }

    const date = new Date(dto.moveOutDate);

    return this.roomRepository.createConfirmation({
      userId: user.id,
      type: "ROOM_VACATION",
      status: "PENDING",
      metadata: {
        moveOutDate: date.toISOString(),
        currentRoomId: user.roomId,
      },
    });
  }

  async createRoomStatus(roomId: string, dto: CreateRoomStatusDto) {
    return this.roomRepository.createRoomStatus(roomId, {
      description: dto.description,
      dateOfStart: new Date(dto.dateOfStart),
      dateOfEnd: dto.dateOfEnd ? new Date(dto.dateOfEnd) : null,
    });
  }

  async deleteRoomStatus(roomId: string, statusId: string) {
    return this.roomRepository.deleteRoomStatus(roomId, statusId);
  }

  async assignUserToRoom(
    roomId: string,
    userId: string,
    startDate?: string,
    endDate?: string,
  ) {
    const room = await this.roomRepository.findById(roomId);
    if (!room) throw new NotFoundException("Room not found");

    if (room.residents.length >= room.capacity) {
      throw new ConflictException("Room is already at full capacity");
    }

    const user = await this.roomRepository.findUserById(userId);
    if (!user) throw new NotFoundException("User not found");

    const updatedUser = await this.roomRepository.updateUserRoom(
      userId,
      roomId,
      {
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : undefined,
      },
    );

    this.createRoomStatus(roomId, {
      description: `Assigned user ${userId} to room`,
      dateOfStart: startDate
        ? new Date(startDate).toISOString()
        : new Date().toISOString(),
      dateOfEnd: endDate ? new Date(endDate).toISOString() : undefined,
    }).catch((err) => {
      console.error("❌ Error creating room status for user assignment:", err);
    });

    await this.auditService.log({
      userId,
      action: "ASSIGN_USER_TO_ROOM",
      entity: "User",
      entityId: userId,
      meta: {
        roomId,
        previousRoomId: user.roomId,
        startDate: (startDate ? new Date(startDate) : new Date()).toISOString(),
        endDate: endDate ? new Date(endDate).toISOString() : null,
      },
    });

    return updatedUser;
  }

  async evictUserFromRoom(roomId: string, dto: EvictUserFromRoomDto) {
    const room = await this.roomRepository.findById(roomId);
    if (!room) throw new NotFoundException("Room not found");

    const user = await this.roomRepository.findUserById(dto.userId);
    if (!user) throw new NotFoundException("User not found");

    // Check if user is actually in the specified room
    if (user.roomId !== roomId) {
      throw new BadRequestException("User is not assigned to this room");
    }

    // Set endDate for the user
    const updatedUser = await this.roomRepository.updateUserRoom(
      dto.userId,
      null,
      {
        endDate: new Date(), // Set the end date
      },
    );

    // End any active room statuses for this user
    await this.roomRepository.endUserRoomStatuses(dto.userId, roomId);

    // Find and delete all statuses associated with this user in this room
    try {
      const userStatuses = await this.roomRepository.findStatusesByUserAndRoom(
        dto.userId,
        roomId,
      );

      for (const status of userStatuses) {
        await this.deleteRoomStatus(roomId, status.id);
      }
    } catch (statusError) {
      console.error("❌ Error deleting user statuses:", statusError);
      // Don't throw - eviction was successful, status deletion is cleanup
    }

    // Send notification to the evicted user
    try {
      await this.notificationService.createNotification({
        toUserId: dto.userId,
        type: $Enums.NotificationType.ACCOMMODATION_CHANGE_REJECTED,
        title: "Room Assignment Changed",
        message: `You have been removed from room ${room.number}`,
        roomId: roomId,
      });
    } catch (notificationError) {
      console.error(
        "❌ Error sending eviction notification:",
        notificationError,
      );
      // Don't throw - eviction was successful, notifications are optional
    }

    await this.auditService.log({
      userId: dto.userId,
      action: "EVICT_USER_FROM_ROOM",
      entity: "User",
      entityId: dto.userId,
      meta: {
        roomId,
        previousRoomId: user.roomId,
        roomNumber: room.number,
        dormitoryId: room.dormitoryId,
        endDate: new Date().toISOString(),
      },
    });

    if (dto.description) {
      this.emailService.sendEvictionEmail(
        user.email,
        `You have been evicted from room ${room.number} in ${room.dormitory?.name || "the dormitory"} because ${dto.description}. Please contact administration for more details.`,
      );
    } else {
      this.emailService.sendEvictionEmail(
        user.email,
        `You have been evicted from room ${room.number} in ${room.dormitory?.name || "the dormitory"}. Please contact administration for more details.`,
      );
    }

    return updatedUser;
  }

  async assignPriceCategory(roomId: string, priceCategoryId: string) {
    // Validate room exists
    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    // Update room with price category
    const updatedRoom = await this.roomRepository.update(roomId, {
      priceCategoryId,
    });

    return {
      message: "Price category assigned successfully",
      room: updatedRoom,
    };
  }

  async unassignPriceCategory(roomId: string) {
    // Validate room exists
    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    // Remove price category from room
    const updatedRoom = await this.roomRepository.update(roomId, {
      priceCategoryId: null,
    });

    return {
      message: "Price category unassigned successfully",
      room: updatedRoom,
    };
  }

  // Private helper methods
  private async validateRoomExists(id: string): Promise<void> {
    const exists = await this.roomRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
  }

  private async validateUpdateRules(
    id: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<void> {
    // Check room number uniqueness
    if (updateRoomDto.number) {
      const isUnique = await this.roomRepository.isRoomNumberUnique(
        updateRoomDto.number,
        id,
      );
      if (!isUnique) {
        throw new ConflictException(
          `Room number ${updateRoomDto.number} already exists`,
        );
      }
    }

    // Validate capacity doesn't exceed current occupancy
    if (updateRoomDto.capacity !== undefined) {
      await this.validateCapacityNotBelowOccupancy(id, updateRoomDto.capacity);
    }

    // Validate floor and capacity combination
    if (
      updateRoomDto.floor !== undefined &&
      updateRoomDto.capacity !== undefined
    ) {
      this.validateFloorCapacityLogic(
        updateRoomDto.floor,
        updateRoomDto.capacity,
      );
    }
  }

  private async validateCapacityNotBelowOccupancy(
    roomId: string,
    newCapacity: string,
  ): Promise<void> {
    const currentOccupancy = await this.roomRepository.countOccupants(roomId);
    if (Number(newCapacity) < currentOccupancy) {
      throw new BadRequestException(
        `Cannot reduce capacity to ${newCapacity}. Room currently has ${currentOccupancy} occupants`,
      );
    }
  }

  private validateFloorCapacityLogic(floor: string, capacity: string): void {
    // Business logic: Higher floors might have capacity restrictions
    if (Number(floor) > 10 && Number(capacity) > 6) {
      throw new BadRequestException(
        "Rooms above floor 10 cannot have more than 6 people for safety reasons",
      );
    }

    // Ground floor might have different restrictions
    if (Number(floor) === 1 && Number(capacity) > 8) {
      throw new BadRequestException(
        "Ground floor rooms cannot exceed 8 people capacity",
      );
    }

    // Emergency exit requirements for high capacity rooms
    if (Number(capacity) > 4 && Number(floor) > 5) {
      throw new BadRequestException(
        "Rooms with more than 4 people cannot be above floor 5 for emergency evacuation",
      );
    }
  }

  private prepareUpdateData(updateRoomDto: UpdateRoomDto): UpdateRoomData {
    const updateData: UpdateRoomData = {};

    if (updateRoomDto.number !== undefined) {
      updateData.number = this.sanitizeRoomNumber(updateRoomDto.number);
    }

    if (updateRoomDto.floor !== undefined) {
      updateData.floorId = String(updateRoomDto.floor);
    }

    if (updateRoomDto.capacity !== undefined) {
      updateData.capacity = Number(updateRoomDto.capacity);
    }

    if (updateRoomDto.roomEquipment) {
      updateData.roomEquipment = this.sanitizeEquipment(
        updateRoomDto.roomEquipment,
      );
    }

    if (updateRoomDto.photos) {
      updateData.photos = this.sanitizePhotoUrls(updateRoomDto.photos);
    }

    return updateData;
  }

  private sanitizeRoomNumber(roomNumber: string): string {
    return roomNumber.trim().toUpperCase();
  }

  private sanitizeEquipment(equipment: string[]): string[] {
    return equipment
      .filter((item) => item && item.trim().length > 0)
      .map((item) => item.trim())
      .slice(0, 20);
  }

  private sanitizePhotoUrls(photos: string[]): string[] {
    const maxPhotos = 10;
    const allowedDomains = [
      "imgur.com",
      "cloudinary.com",
      "amazonaws.com",
      "s3.amazonaws.com",
      "storage.googleapis.com",
    ];

    return photos
      .filter((url) => {
        try {
          const urlObj = new URL(url);
          return (
            urlObj.protocol === "https:" &&
            allowedDomains.some((domain) => urlObj.hostname.includes(domain)) &&
            /\.(jpg|jpeg|png|webp)$/i.test(urlObj.pathname)
          );
        } catch {
          return false;
        }
      })
      .slice(0, maxPhotos);
  }

  private async sendBookingNotifications(
    booking: any,
    room: any,
    from: Date,
    to: Date,
    userId: string,
    totalAmount: number,
  ) {
    await this.notificationService.createNotification({
      toUserId: String(userId),
      type: $Enums.NotificationType.ROOM_BOOKING_APPROVED,
      title: "Room Booking Confirmed",
      message: `Your booking for room ${room.number} in ${room.dormitory?.name || "Unknown Dormitory"} has been confirmed for ${from.toDateString()} to ${to.toDateString()}`,
      bookingId: String(booking.id),
      roomId: String(room.id),
    });

    // Notify dormitory admins
    const dormitoryAdmins = await this.roomRepository.findDormitoryAdmins(
      room.dormitoryId,
    );

    for (const admin of dormitoryAdmins) {
      await this.notificationService.createNotification({
        toUserId: admin.userId,
        fromUserId: userId,
        type: $Enums.NotificationType.ROOM_BOOKING_REQUEST,
        title: "New Room Booking",
        message: `Room ${room.number} has been booked by a student for ${from.toDateString()} to ${to.toDateString()}`,
        bookingId: booking.id,
        roomId: room.id,
      });
    }

    // Send email notification
    await this.notificationService.sendEmailNotification({
      to: userId,
      subject: "Room Booking Confirmation",
      template: "room-booking-confirmation",
      data: {
        roomNumber: room.number,
        dormitoryName: room.dormitory?.name || "Unknown Dormitory",
        checkIn: from.toDateString(),
        checkOut: to.toDateString(),
        bookingId: booking.id,
        totalAmount,
      },
    });
  }

  async uploadFiles(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    return Promise.all(files.map((file) => this.s3.uploadFile(file, folder)));
  }
}
