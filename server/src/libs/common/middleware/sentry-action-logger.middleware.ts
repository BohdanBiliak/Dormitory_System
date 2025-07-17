import { Injectable, NestMiddleware } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SentryUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.user) {
            Sentry.setUser({
                id: req.user.id,
                email: req.user.email,
            });
        }
        next();
    }
}
