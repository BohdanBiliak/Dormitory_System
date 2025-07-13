import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        if (!req.user?.id) {
            throw new UnauthorizedException('Not authenticated');
        }
        return true;
    }
}
