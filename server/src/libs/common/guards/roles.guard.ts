import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "@/libs/common/decorators/roles.decorator";
import { $Enums } from "@prisma/client";
type UserRole = $Enums.UserRole;

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user || request.session?.user;

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log('🔍 Role check starting:', {
      hasUser: !!user,
      hasRequestUser: !!request.user,
      hasSessionUser: !!request.session?.user,
      userRole: user?.role,
      userId: user?.id,
      userDisplayName: user?.displayName,
      requiredRoles,
      endpoint: request.url,
      method: request.method
    });

    if (!requiredRoles) {
      console.log('✅ No role requirements, access granted');
      return true;
    }

    if (!user || !requiredRoles.includes(user.role)) {
      console.log('❌ Role check failed:', {
        hasUser: !!user,
        userRole: user?.role,
        requiredRoles,
        roleMatch: user ? requiredRoles.includes(user.role) : false,
        endpoint: request.url,
        method: request.method
      });
      throw new ForbiddenException("Not enough permissions for this role");
    }

    console.log('✅ Role check passed');
    return true;
  }
}
