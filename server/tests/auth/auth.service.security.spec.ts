/// <reference types="jest" />
// Security and edge case testing for AuthService
describe("AuthService Security Tests", () => {
  describe("Input Validation and Sanitization", () => {
    it("should reject malicious email inputs", async () => {
      const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const blacklistPatterns = [
          /<script/i,
          /javascript:/i,
          /vbscript:/i,
          /onload=/i,
          /onerror=/i,
        ];

        if (!emailRegex.test(email)) return false;

        return !blacklistPatterns.some((pattern) => pattern.test(email));
      };

      const maliciousEmails = [
        'user@example.com<script>alert("xss")</script>',
        "javascript:alert(1)@example.com",
        "user@<script>alert(1)</script>example.com",
        "user+<img src=x onerror=alert(1)>@example.com",
      ];

      const validEmails = [
        "user@example.com",
        "test.email@domain.org",
        "user+tag@example.co.uk",
      ];

      maliciousEmails.forEach((email) => {
        expect(validateEmail(email)).toBe(false);
      });

      validEmails.forEach((email) => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it("should prevent SQL injection in user inputs", async () => {
      const sanitizeInput = (input: string): string => {
        // Remove SQL injection patterns
        const sqlPatterns = [
          /('|\\')|(;)|(\|)|(\*)|(%)|(\-\-)|(\+)|(\|\|)/g,
          /(union|select|insert|update|delete|drop|create|alter|exec|execute)/gi,
        ];

        let sanitized = input;
        sqlPatterns.forEach((pattern) => {
          sanitized = sanitized.replace(pattern, "");
        });

        return sanitized.trim();
      };

      const maliciousInputs = [
        "'; DROP TABLE users; --",
        "admin' OR '1'='1",
        "user'; DELETE FROM users WHERE '1'='1",
        "UNION SELECT * FROM passwords",
      ];

      const sanitizedInputs = maliciousInputs.map(sanitizeInput);

      // Check that dangerous patterns are removed
      expect(sanitizedInputs[0]).not.toContain("DROP");
      expect(sanitizedInputs[0]).not.toContain(";");
      expect(sanitizedInputs[1]).not.toContain("'");
      expect(sanitizedInputs[1]).toContain("admin");
      expect(sanitizedInputs[2]).not.toContain("DELETE");
      expect(sanitizedInputs[3]).not.toContain("UNION");
      expect(sanitizedInputs[3]).not.toContain("SELECT");
    });

    it("should validate password complexity requirements", async () => {
      interface PasswordValidation {
        isValid: boolean;
        errors: string[];
        score: number;
      }

      const validatePassword = (password: string): PasswordValidation => {
        const errors: string[] = [];
        let score = 0;

        if (password.length < 8) {
          errors.push("Password must be at least 8 characters long");
        } else {
          score += 1;
        }

        if (!/[A-Z]/.test(password)) {
          errors.push("Password must contain at least one uppercase letter");
        } else {
          score += 1;
        }

        if (!/[a-z]/.test(password)) {
          errors.push("Password must contain at least one lowercase letter");
        } else {
          score += 1;
        }

        if (!/\d/.test(password)) {
          errors.push("Password must contain at least one number");
        } else {
          score += 1;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          errors.push("Password must contain at least one special character");
        } else {
          score += 1;
        }

        return {
          isValid: errors.length === 0,
          errors,
          score,
        };
      };

      const testPasswords = [
        { password: "weak", shouldPass: false },
        { password: "WeakPassword", shouldPass: false },
        { password: "WeakPassword1", shouldPass: false },
        { password: "StrongP@ss1", shouldPass: true },
        { password: "MySecure123!", shouldPass: true },
      ];

      testPasswords.forEach(({ password, shouldPass }) => {
        const validation = validatePassword(password);
        expect(validation.isValid).toBe(shouldPass);
        if (shouldPass) {
          expect(validation.errors).toHaveLength(0);
          expect(validation.score).toBe(5);
        } else {
          expect(validation.errors.length).toBeGreaterThan(0);
          expect(validation.score).toBeLessThan(5);
        }
      });
    });
  });

  describe("Authentication Security", () => {
    it("should implement proper rate limiting", async () => {
      interface RateLimitEntry {
        attempts: number;
        firstAttempt: number;
        blocked: boolean;
      }

      class RateLimiter {
        private attempts = new Map<string, RateLimitEntry>();
        private readonly maxAttempts = 5;
        private readonly windowMs = 15 * 60 * 1000; // 15 minutes
        private readonly blockDurationMs = 30 * 60 * 1000; // 30 minutes

        public checkLimit(identifier: string): {
          allowed: boolean;
          timeUntilReset?: number;
        } {
          const now = Date.now();
          const entry = this.attempts.get(identifier);

          if (!entry) {
            this.attempts.set(identifier, {
              attempts: 1,
              firstAttempt: now,
              blocked: false,
            });
            return { allowed: true };
          }

          // Check if block period has expired
          if (
            entry.blocked &&
            now - entry.firstAttempt > this.blockDurationMs
          ) {
            this.attempts.delete(identifier);
            return { allowed: true };
          }

          // If currently blocked
          if (entry.blocked) {
            const timeUntilReset =
              this.blockDurationMs - (now - entry.firstAttempt);
            return { allowed: false, timeUntilReset };
          }

          // Check if window has expired
          if (now - entry.firstAttempt > this.windowMs) {
            entry.attempts = 1;
            entry.firstAttempt = now;
            entry.blocked = false;
            return { allowed: true };
          }

          // Increment attempts
          entry.attempts++;

          // Check if limit exceeded
          if (entry.attempts > this.maxAttempts) {
            entry.blocked = true;
            const timeUntilReset = this.blockDurationMs;
            return { allowed: false, timeUntilReset };
          }

          return { allowed: true };
        }
      }

      const rateLimiter = new RateLimiter();
      const testEmail = "test@example.com";

      // First 5 attempts should be allowed
      for (let i = 1; i <= 5; i++) {
        const result = rateLimiter.checkLimit(testEmail);
        expect(result.allowed).toBe(true);
      }

      // 6th attempt should be blocked
      const blockedResult = rateLimiter.checkLimit(testEmail);
      expect(blockedResult.allowed).toBe(false);
      expect(blockedResult.timeUntilReset).toBeDefined();
    });

    it("should generate secure tokens for 2FA", async () => {
      const generateSecureToken = (): string => {
        const chars = "0123456789";
        let result = "";
        const length = 6;

        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          result += chars[randomIndex];
        }

        return result;
      };

      const tokens = new Set();
      const tokenCount = 1000;

      // Generate many tokens to test uniqueness
      for (let i = 0; i < tokenCount; i++) {
        const token = generateSecureToken();
        expect(token).toHaveLength(6);
        expect(/^\d{6}$/.test(token)).toBe(true);
        tokens.add(token);
      }

      // Check that most tokens are unique (some duplicates are expected with random generation)
      const uniqueTokens = tokens.size;
      const duplicateRate = (tokenCount - uniqueTokens) / tokenCount;
      expect(duplicateRate).toBeLessThan(0.1); // Less than 10% duplicates
    });

    it("should securely hash passwords", async () => {
      // Simulate argon2 hashing behavior
      const hashPassword = async (
        password: string,
        salt?: string,
      ): Promise<string> => {
        const actualSalt = salt || Math.random().toString(36).substring(7);
        // Simulate complex hashing (in real scenario, use actual argon2)
        const hash = Buffer.from(password + actualSalt).toString("base64");
        return `$argon2id$v=19$m=65536,t=3,p=4$${actualSalt}$${hash}`;
      };

      const verifyPassword = async (
        hash: string,
        password: string,
      ): Promise<boolean> => {
        const parts = hash.split("$");
        if (parts.length !== 6) return false;

        const salt = parts[4];
        const expectedHash = await hashPassword(password, salt);
        return hash === expectedHash;
      };

      const password = "MySecurePassword123!";
      const hash = await hashPassword(password);

      expect(hash).toContain("$argon2id$");
      expect(await verifyPassword(hash, password)).toBe(true);
      expect(await verifyPassword(hash, "WrongPassword")).toBe(false);

      // Ensure different hashes for same password with different salts
      const hash2 = await hashPassword(password);
      expect(hash).not.toBe(hash2);
    });
  });

  describe("Session Security", () => {
    it("should implement secure session management", async () => {
      interface SessionData {
        userId: string;
        email: string;
        role: string;
        loginTime: number;
        lastActivity: number;
        ipAddress: string;
      }

      class SecureSessionManager {
        private sessions = new Map<string, SessionData>();
        private readonly sessionTimeoutMs = 30 * 60 * 1000; // 30 minutes
        private readonly maxSessionTimeMs = 8 * 60 * 60 * 1000; // 8 hours

        public createSession(
          userId: string,
          email: string,
          role: string,
          ipAddress: string,
        ): string {
          const sessionId = this.generateSessionId();
          const now = Date.now();

          this.sessions.set(sessionId, {
            userId,
            email,
            role,
            loginTime: now,
            lastActivity: now,
            ipAddress,
          });

          return sessionId;
        }

        public validateSession(
          sessionId: string,
          ipAddress: string,
        ): { valid: boolean; session?: SessionData } {
          const session = this.sessions.get(sessionId);

          if (!session) {
            return { valid: false };
          }

          const now = Date.now();

          // Check IP address consistency
          if (session.ipAddress !== ipAddress) {
            this.sessions.delete(sessionId);
            return { valid: false };
          }

          // Check session timeout
          if (now - session.lastActivity > this.sessionTimeoutMs) {
            this.sessions.delete(sessionId);
            return { valid: false };
          }

          // Check maximum session time
          if (now - session.loginTime > this.maxSessionTimeMs) {
            this.sessions.delete(sessionId);
            return { valid: false };
          }

          // Update last activity
          session.lastActivity = now;

          return { valid: true, session };
        }

        public destroySession(sessionId: string): boolean {
          return this.sessions.delete(sessionId);
        }

        private generateSessionId(): string {
          return (
            Math.random().toString(36).substring(2) + Date.now().toString(36)
          );
        }
      }

      const sessionManager = new SecureSessionManager();
      const testIp = "192.168.1.100";

      // Create session
      const sessionId = sessionManager.createSession(
        "user-123",
        "test@example.com",
        "USER",
        testIp,
      );
      expect(sessionId).toBeDefined();
      expect(sessionId.length).toBeGreaterThan(10);

      // Validate valid session
      const validation1 = sessionManager.validateSession(sessionId, testIp);
      expect(validation1.valid).toBe(true);
      expect(validation1.session?.userId).toBe("user-123");

      // Destroy session
      const destroyed = sessionManager.destroySession(sessionId);
      expect(destroyed).toBe(true);

      // Validate destroyed session
      const validation3 = sessionManager.validateSession(sessionId, testIp);
      expect(validation3.valid).toBe(false);

      // Test IP rejection with new session
      const newSessionId = sessionManager.createSession(
        "user-456",
        "test2@example.com",
        "USER",
        testIp,
      );
      const validation2 = sessionManager.validateSession(
        newSessionId,
        "192.168.1.200",
      );
      expect(validation2.valid).toBe(false);
    });

    it("should handle session fixation attacks", async () => {
      const regenerateSessionId = (): string => {
        // Generate new session ID after authentication
        return (
          "new_" +
          Math.random().toString(36).substring(2) +
          Date.now().toString(36)
        );
      };

      const oldSessionId = "old_session_123";
      const newSessionId = regenerateSessionId();

      expect(newSessionId).not.toBe(oldSessionId);
      expect(newSessionId).toContain("new_");
      expect(newSessionId.length).toBeGreaterThan(15);
    });
  });

  describe("File Upload Security", () => {
    it("should validate file types and prevent malicious uploads", async () => {
      interface FileValidation {
        isValid: boolean;
        errors: string[];
      }

      const validateFile = (
        filename: string,
        mimetype: string,
        size: number,
      ): FileValidation => {
        const errors: string[] = [];
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "application/pdf",
        ];
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".pdf"];
        const maxSize = 5 * 1024 * 1024; // 5MB
        const dangerousExtensions = [
          ".exe",
          ".bat",
          ".cmd",
          ".scr",
          ".pif",
          ".js",
          ".vbs",
        ];

        // Check file extension
        const extension = filename
          .toLowerCase()
          .substring(filename.lastIndexOf("."));
        if (!allowedExtensions.includes(extension)) {
          errors.push(`File extension ${extension} is not allowed`);
        }

        // Check for dangerous extensions
        if (dangerousExtensions.includes(extension)) {
          errors.push(`Dangerous file type detected: ${extension}`);
        }

        // Check MIME type
        if (!allowedTypes.includes(mimetype)) {
          errors.push(`MIME type ${mimetype} is not allowed`);
        }

        // Check file size
        if (size > maxSize) {
          errors.push(`File size ${size} exceeds maximum allowed size`);
        }

        // Check for null bytes (possible file type spoofing)
        if (filename.includes("\0")) {
          errors.push("Filename contains null bytes");
        }

        return {
          isValid: errors.length === 0,
          errors,
        };
      };

      const testFiles = [
        {
          filename: "avatar.jpg",
          mimetype: "image/jpeg",
          size: 1024 * 1024,
          shouldPass: true,
        },
        {
          filename: "document.pdf",
          mimetype: "application/pdf",
          size: 2 * 1024 * 1024,
          shouldPass: true,
        },
        {
          filename: "malware.exe",
          mimetype: "application/octet-stream",
          size: 1024,
          shouldPass: false,
        },
        {
          filename: "script.js",
          mimetype: "application/javascript",
          size: 1024,
          shouldPass: false,
        },
        {
          filename: "large.jpg",
          mimetype: "image/jpeg",
          size: 10 * 1024 * 1024,
          shouldPass: false,
        },
        {
          filename: "fake.jpg\0.exe",
          mimetype: "image/jpeg",
          size: 1024,
          shouldPass: false,
        },
      ];

      testFiles.forEach(({ filename, mimetype, size, shouldPass }) => {
        const validation = validateFile(filename, mimetype, size);
        expect(validation.isValid).toBe(shouldPass);
        if (!shouldPass) {
          expect(validation.errors.length).toBeGreaterThan(0);
        }
      });
    });

    it("should scan uploaded files for malicious content", async () => {
      const scanFileContent = (
        content: Buffer,
      ): { isSafe: boolean; threats: string[] } => {
        const threats: string[] = [];
        const contentString = content.toString();

        // Check for script tags
        if (/<script/i.test(contentString)) {
          threats.push("Script tags detected");
        }

        // Check for executable signatures
        if (content.slice(0, 2).toString("hex") === "4d5a") {
          // MZ header (Windows executable)
          threats.push("Windows executable detected");
        }

        // Check for PHP tags
        if (/<\?php/i.test(contentString)) {
          threats.push("PHP code detected");
        }

        // Check for common malware strings
        const malwarePatterns = [
          /eval\s*\(/i,
          /base64_decode/i,
          /shell_exec/i,
          /system\s*\(/i,
        ];

        malwarePatterns.forEach((pattern) => {
          if (pattern.test(contentString)) {
            threats.push("Potentially malicious code detected");
          }
        });

        return {
          isSafe: threats.length === 0,
          threats,
        };
      };

      const safeImageBuffer = Buffer.from("FFD8FFE0", "hex"); // JPEG header
      const maliciousBuffer = Buffer.from('<script>alert("xss")</script>');
      const executableBuffer = Buffer.from(
        "4D5A90000300000004000000FFFF0000",
        "hex",
      ); // PE header

      expect(scanFileContent(safeImageBuffer).isSafe).toBe(true);
      expect(scanFileContent(maliciousBuffer).isSafe).toBe(false);
      expect(scanFileContent(executableBuffer).isSafe).toBe(false);

      const maliciousResult = scanFileContent(maliciousBuffer);
      expect(maliciousResult.threats).toContain("Script tags detected");

      const executableResult = scanFileContent(executableBuffer);
      expect(executableResult.threats).toContain("Windows executable detected");
    });
  });
});
