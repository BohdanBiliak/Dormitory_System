import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { UserService } from "@/modules/user/services/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionUser = request.session?.user;
    console.log('AUTHGUARD USER:', request.user);
    console.log('Session at AuthGuard:', request.session);
    if (!sessionUser || !sessionUser.id) {
      throw new UnauthorizedException(
        "User is not authorized, please login to continue",
      );
    }

    const user = await this.userService.findById(request.session.user.id);

    request.user = user;

    return true;
  }
}
