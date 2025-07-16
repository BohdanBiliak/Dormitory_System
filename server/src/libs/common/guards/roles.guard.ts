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
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('ROLES GUARD:', { user, requiredRoles });
        const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        const request = context.switchToHttp().getRequest()
        console.log('AUTHGUARD USER:', request.user);
        if (!roles) return true

        if (!roles.includes(request.session.user?.role)) {
            throw new ForbiddenException('Not enough permissions for this role');
        }

        return true
    }
}
