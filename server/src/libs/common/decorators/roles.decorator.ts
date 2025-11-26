import { SetMetadata } from "@nestjs/common";
import { $Enums } from "@prisma/client";
import UserRole = $Enums.UserRole;

export const ROLES_KEY = "roles";

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
