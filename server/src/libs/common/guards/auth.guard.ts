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

    if (typeof request.session.userId === "undefined") {
      throw new UnauthorizedException(
        "User is not authorized, please login to continue",
      );
    }

    const user = await this.userService.findById(request.session.userId);

    request.user = user;

    return true;
  }
}
