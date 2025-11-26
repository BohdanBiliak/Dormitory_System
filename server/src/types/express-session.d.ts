import "express-session";
import { UserRole } from "@prisma/client";
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
