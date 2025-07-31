import { Injectable } from '@nestjs/common';
import { ManagerRepository } from '../../repositories/managerRepository';
import { ManagerFiltersDto } from '../../dto/ManagerFilters.dto';
import { ManagerResponseDto } from '../../dto/ManagerResponse.dto';

@Injectable()
export class GetManagersUseCase {
  constructor(private readonly managerRepository: ManagerRepository) {}

  async execute(filters: ManagerFiltersDto) {
    const { managers, total } = await this.managerRepository.findAll(filters);

    const managersResponse: ManagerResponseDto[] = managers.map(manager => ({
      id: manager.id,
      displayName: manager.displayName || '',
      secondName: manager.secondName || '',
      email: manager.email,
      picture: manager.picture,
      isActive: manager.isActive,
      roomId: manager.roomId ?? undefined,
      paymentsStatus: this.getPaymentStatus(manager),
      dormitoryId: manager.dormitoryId ?? null,
      createdAt: manager.createdAt,
      dormitory: manager.dormitory ?? { id: '', name: '' }, 
    }));

    const pageCount = Math.ceil(total / (filters.limit || 10));

    return {
      data: managersResponse,
      total,
      page: filters.page || 1,
      pageCount,
    };
  }

  private getPaymentStatus(manager: any): string {
    // This is a placeholder - implement actual payment status logic
    return 'current';
  }
}