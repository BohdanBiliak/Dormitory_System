import { applyDecorators, UseGuards } from '@nestjs/common'

import { Roles } from './roles.decorator'
import {$Enums} from "../../../../__generated__";
import UserRole = $Enums.UserRole;
import {AuthGuard} from "@/libs/common/guards/auth.guard";
import {RolesGuard} from "@/libs/common/guards/roles.guard";

export function Authorization(...roles: UserRole[])
{
    if (roles.length > 0) {
        return applyDecorators(
            Roles(...roles),
            UseGuards(AuthGuard, RolesGuard)
        )
    }

    return applyDecorators(UseGuards(AuthGuard))
}
