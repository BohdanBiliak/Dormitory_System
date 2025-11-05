import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import * as crypto from "crypto";
@Injectable()
export class SecurityService {
  constructor(private prismaService: PrismaService) {}

  // Check for suspicious login attempts
  async checkSuspiciousActivity(email: string): Promise<boolean> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    // Check for multiple failed attempts
    const recentAttempts = await this.prismaService.auditLog.count({
      where: {
        action: "LOGIN_FAILED",
        createdAt: { gte: oneHourAgo },
        meta: {
          path: ["email"],
          equals: email,
        },
      },
    });

    return recentAttempts >= 5; // 5 failed attempts in 1 hour
  }

  // Log security events

  async logSecurityEvent(
    action: string,
    userId: string,
    entity: string = "AUTH",
    entityId: string = "",
    meta?: any,
  ): Promise<void> {
    await this.prismaService.auditLog.create({
      data: {
        action,
        userId,
        entity,
        entityId,
        meta: meta || undefined,
        createdAt: new Date(),
      },
    });
  }

  //Generate secure random token

  generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString("hex");
  }

  ///Check if token is expired with buffer time

  isTokenExpired(expiresAt: Date, bufferMinutes: number = 5): boolean {
    const now = new Date();
    const expiryWithBuffer = new Date(
      expiresAt.getTime() - bufferMinutes * 60 * 1000,
    );
    return now >= expiryWithBuffer;
  }

  // Validate file upload security

  validateFileUpload(file: Express.Multer.File): {
    isValid: boolean;
    reason?: string;
  } {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return { isValid: false, reason: "Invalid file type" };
    }

    if (file.size > maxSize) {
      return { isValid: false, reason: "File too large" };
    }

    // Check for malicious file names
    if (file.originalname.includes("..") || file.originalname.includes("/")) {
      return { isValid: false, reason: "Invalid file name" };
    }

    return { isValid: true };
  }
}
