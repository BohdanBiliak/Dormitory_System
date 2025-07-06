import {SetMetadata} from "@nestjs/common";
import {$Enums} from "../../../__generated__";
import UserRole = $Enums.UserRole;

export const ROLES_KEY= 'roles'

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles)