import { Injectable, NotFoundException } from "@nestjs/common";
import { ManagerRepository } from "../../manager.repository";

@Injectable()
export class GetManagerByIdUseCase {
  constructor(private readonly managerRepository: ManagerRepository) {}

  async execute(id: string) {
    const manager = await this.managerRepository.findById(id);
    
    if (!manager) {
      throw new NotFoundException("Manager not found");
    }

    return manager;
  }
}
