import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { ManagerRepository } from "../../manager.repository";
import { NotificationsService } from "@/modules/notifications/notifications.service";
import { $Enums } from "@prisma/client";

@Injectable()
export class ActivateManagerUseCase {
  constructor(
    private readonly managerRepository: ManagerRepository,
    private readonly notificationService: NotificationsService,
  ) {}

  async execute(id: string, activatedBy: string) {
    const manager = await this.managerRepository.findById(id);
    
    if (!manager) {
      throw new NotFoundException("Manager not found");
    }

    if (manager.isActive) {
      throw new BadRequestException("Manager is already active");
    }

    const activatedManager = await this.managerRepository.activate(id);

    // Notify the manager about activation
    await this.notificationService.createNotification({
      toUserId: manager.id,
      fromUserId: activatedBy,
      type: $Enums.NotificationType.ACCOUNT_VERIFIED,
      title: "Account Activated",
      message:
        "Your manager account has been reactivated. You can now access the system again.",
      priority: $Enums.NotificationPriority.HIGH,
    });

    return activatedManager;
  }
}
