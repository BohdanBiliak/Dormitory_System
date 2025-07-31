import { Injectable, NotFoundException } from '@nestjs/common';
import { ManagerRepository } from '../../repositories/managerRepository';
import { UpdateManagerDto } from '../../dto/UpdateManager.dto';

@Injectable()
export class UpdateManagerUseCase {
  constructor(private readonly managerRepository: ManagerRepository) {}

  async execute(id: string, dto: UpdateManagerDto) {
    const existingManager = await this.managerRepository.findById(id);
    if (!existingManager) {
      throw new NotFoundException('Manager not found');
    }

    return this.managerRepository.update(id, dto);
  }
}