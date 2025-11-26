import { CreateManagerDto } from "./dto/CreateMeneger.dto";
import { ManagerFiltersDto } from "./dto/ManagerFilters.dto";
import { UpdateManagerDto } from "./dto/UpdateManager.dto";
import { User } from "@prisma/client";

export interface IManagerRepository {
  //create
  create(data: CreateManagerDto, hashedPassword: string): Promise<User>;
  //find
  findAll(
    filters: ManagerFiltersDto,
  ): Promise<{ managers: User[]; total: number }>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findManagersByDormitory(dormitoryId: string): Promise<User[]>;
  //update
  update(id: string, data: UpdateManagerDto): Promise<User>;
  //deactivate and activate
  deactivate(id: string): Promise<User>;
  activate(id: string): Promise<User>;
  //assign and remove from dormitory
  assignToDormitory(managerId: string, dormitoryId: string): Promise<void>;
  removeFromDormitory(managerId: string, dormitoryId: string): Promise<void>;
}
