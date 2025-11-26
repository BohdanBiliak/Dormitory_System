import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { ManagerRepository } from "../../manager.repository";
import { CreateManagerDto } from "../../dto/CreateMeneger.dto";
import { DormitoryService } from "@/modules/dormitory/dormitory.service";
import * as argon2 from "argon2";
import { NotificationsService } from "@/modules/notifications/notifications.service";
import { $Enums } from "@prisma/client";

@Injectable()
export class CreateManagerUseCase {
  constructor(
    private readonly managerRepository: ManagerRepository,
    private readonly dormitoryService: DormitoryService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async execute(createManagerDto: CreateManagerDto, createdBy: string) {
    //validate password
    if (createManagerDto.password !== createManagerDto.repeatPassword) {
      throw new BadRequestException("Passwords do not match");
    }
    // Check if email already exists
    const existingUser = await this.managerRepository.findByEmail(
      createManagerDto.email,
    );
    if (existingUser) {
      throw new ConflictException("Email already exists");
    }
    // Validate dormitory exists
    const dormitory = await this.dormitoryService.findOne(
      createManagerDto.dormitoryId,
    );
    if (!dormitory) {
      throw new NotFoundException("Dormitory not found");
    }
    // Hash password with Argon2
    const hashedPassword = await argon2.hash(createManagerDto.password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, 
      timeCost: 3, 
      parallelism: 1,
    });
    // Create manager
    const manager = await this.managerRepository.create(
      createManagerDto,
      hashedPassword,
    );
    // Create notification for the new manager
    await this.notificationsService.createNotification({
      toUserId: manager.id,
      fromUserId: createdBy,
      type: $Enums.NotificationType.ACCOUNT_CREATED,
      title: "Welcome to Dormitory Management System",
      message: `Your manager account has been created for ${dormitory.name}. You can now log in with your credentials.`,
      priority: $Enums.NotificationPriority.HIGH,
    });
    return manager;
  }
}
