import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { UserService } from "@/modules/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionUser = request.session?.user;
    console.log('🔍 Auth check starting:', {
      hasSession: !!request.session,
      hasSessionUser: !!sessionUser,
      sessionUserId: sessionUser?.id,
      sessionUserRole: sessionUser?.role,
      endpoint: request.url,
      method: request.method
    });
    if (!sessionUser || !sessionUser.id) {
      console.log('❌ Auth check failed:', {
        hasSession: !!request.session,
        hasSessionUser: !!sessionUser,
        endpoint: request.url,
        method: request.method
      });
      throw new UnauthorizedException(
        "User is not authorized, please login to continue",
      );
    }

    const user = await this.userService.findById(request.session.user.id);

    // Set req.user with the structure matching the session, including room data
    request.user = {
      id: user.id,
      role: user.role,
      email: user.email,
      displayName: user.displayName,
      roomId: user.roomId || null,
      dormitoryId: user.dormitoryId || null,
      room: user.room ? {
        id: user.room.id,
        floorId: user.room.floorId,
      } : undefined,
    };

    console.log('✅ Auth check passed:', {
      userId: user.id,
      userRole: user.role,
      userDisplayName: user.displayName,
      endpoint: request.url,
      method: request.method
    });

    return true;
  }
}
