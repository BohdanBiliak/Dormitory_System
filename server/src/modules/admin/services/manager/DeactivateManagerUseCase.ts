import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ManagerRepository } from '../../repositories/managerRepository';
import { NotificationsService } from '@/modules/notifications/notifications.service';
import { $Enums } from '../../../../../__generated__';

@Injectable()
export class DeactivateManagerUseCase {
  constructor(
    private readonly managerRepository: ManagerRepository,
    private readonly notificationService: NotificationsService,
  ) {}

  async execute(id: string, deactivatedBy: string) {
    const manager = await this.managerRepository.findById(id);
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    if (!manager.isActive) {
      throw new BadRequestException('Manager is already deactivated');
    }

    const deactivatedManager = await this.managerRepository.deactivate(id);

    // Notify the manager about deactivation
    await this.notificationService.createNotification({
      toUserId: manager.id,
      fromUserId: deactivatedBy,
      type: $Enums.NotificationType.ACCOUNT_SUSPENDED,
      title: 'Account Deactivated',
      message: 'Your manager account has been deactivated. Please contact the administrator for more information.',
      priority: $Enums.NotificationPriority.HIGH,
    });

    return deactivatedManager;
  }
}