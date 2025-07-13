import 'express-session'
import { UserRole } from "../../__generated__";
declare module 'express-session' {
    interface SessionData {
        user?: {
            id: string;
            role: UserRole;
            email: string;
            displayName: string;
        };
    }
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: string;
            role: UserRole;
            email: string;
            displayName: string;
        };
    }
}