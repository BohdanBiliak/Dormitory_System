import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@/libs/common/decorators/roles.decorator';
import { $Enums } from "../../../../__generated__";
type UserRole = $Enums.UserRole;

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user || request.session?.user;

        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        console.log('ROLES GUARD:', { user, requiredRoles });

        if (!requiredRoles) return true;

        if (!user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException('Not enough permissions for this role');
        }

        return true;
    }
}