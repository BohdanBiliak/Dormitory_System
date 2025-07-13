
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SessionUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.session?.user) {
            req.user = req.session.user;
        }
        next();
    }
}
