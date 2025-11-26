import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { ManagerRepository } from "../../manager.repository";
import { ResetManagerPasswordDto } from "../../dto/ResetManagerPassword.dto";
import * as argon2 from "argon2";
import { NotificationsService } from "@/modules/notifications/notifications.service";
import { $Enums } from "@prisma/client";

@Injectable()
export class ResetManagerPasswordUseCase {
  constructor(
    private readonly managerRepository: ManagerRepository,
    private readonly notificationService: NotificationsService,
  ) {}

  async execute(
    managerId: string,
    dto: ResetManagerPasswordDto,
    resetBy: string,
  ) {
    // Validate passwords match
    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    // Find the manager
    const manager = await this.managerRepository.findById(managerId);
    if (!manager) {
      throw new NotFoundException("Manager not found");
    }

    // Verify the manager has Admin role
    if (manager.role !== $Enums.UserRole.Admin) {
      throw new BadRequestException(
        "Password reset is only available for Admin users",
      );
    }

    // Hash the new password
    const hashedPassword = await argon2.hash(dto.newPassword, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });

    // Update the password
    await this.managerRepository.update(managerId, {
      password: hashedPassword,
    });

    // Send notification to the manager
    await this.notificationService.createNotification({
      toUserId: managerId,
      fromUserId: resetBy,
      type: $Enums.NotificationType.PASSWORD_CHANGED,
      title: "Password Reset",
      message:
        "Your password has been reset by a Super Administrator. Please use your new password to log in.",
      priority: $Enums.NotificationPriority.HIGH,
    });

    return {
      message: "Password reset successfully",
      managerId,
    };
  }
}
