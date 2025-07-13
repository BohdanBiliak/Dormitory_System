import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { ROLES_KEY } from '@/libs/common/decorators/roles.decorator'
import {$Enums} from "../../../../__generated__";
import UserRole = $Enums.UserRole;

@Injectable()
export class RolesGuard implements CanActivate {
    public constructor(private readonly reflector: Reflector) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        const request = context.switchToHttp().getRequest()

        if (!roles) return true

        if (!roles.includes(request.session.user?.role)) {
            throw new ForbiddenException('Not enough permissions for this role');
        }

        return true
    }
}
