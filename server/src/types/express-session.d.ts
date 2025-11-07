import "express-session";
import { UserRole } from "../../__generated__";
declare module "express-session" {
  interface SessionData {
    user?: {
      id: string;
      role: UserRole;
      email: string;
      displayName: string;
      roomId?: string | null;
      dormitoryId?: string | null;
      room?: {
        id: string;
        floorId: string;
      };
    };
  }
}

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      role: UserRole;
      email: string;
      displayName: string;
      roomId?: string | null;
      dormitoryId?: string | null;
      room?: {
        id: string;
        floorId: string;
      };
    };
  }
}
