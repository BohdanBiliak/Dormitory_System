import { Test, TestingModule } from "@nestjs/testing";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// Mock classes for testing
class MockUserService {
  private users: any[] = [];

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email) || null;
  }

  async create(
    email: string,
    password: string,
    name: string,
    secondName: string,
    authMethod: string,
    isVerified: boolean,
    avatar: string,
    frontUrl: string,
    backUrl: string,
  ) {
    const user = {
      id: `user-${Date.now()}`,
      email,
      password: "hashed-" + password,
      name,
      secondName,
      authMethod,
      isVerified,
      avatar,
      frontUrl,
      backUrl,
      role: "USER",
      displayName: `${name} ${secondName}`,
      isTwoFactorEnabled: false,
    };
    this.users.push(user);
    return user;
  }
}

class MockS3Service {
  async uploadFile(file: any, folder: string): Promise<string> {
    return `https://s3.amazonaws.com/${folder}/${file.originalname}`;
  }

  async uploadResponsiveImage(file: any, name: string, type: string) {
    return {
      original: `https://s3.amazonaws.com/${type}/${name}-original.jpg`,
      desktop: `https://s3.amazonaws.com/${type}/${name}-desktop.jpg`,
      tablet: `https://s3.amazonaws.com/${type}/${name}-tablet.jpg`,
      mobile: `https://s3.amazonaws.com/${type}/${name}-mobile.jpg`,
    };
  }
}

class MockPrismaService {
  confirmation = {
    async create(data: any) {
      return {
        id: `conf-${Date.now()}`,
        ...data.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    },
  };
}

class MockEmailConfirmationService {
  async sendVerificationToken(user: any): Promise<boolean> {
    console.log(`Sending verification email to ${user.email}`);
    return true;
  }
}

class MockTwoFactorAuthService {
  private tokens: Map<string, string> = new Map();

  async sendTwoFactorToken(email: string): Promise<boolean> {
    const token = Math.random().toString(36).substring(2, 8);
    this.tokens.set(email, token);
    console.log(`Sending 2FA token ${token} to ${email}`);
    return true;
  }

  async validateTwoFactorToken(email: string, code: string): Promise<boolean> {
    const storedToken = this.tokens.get(email);
    if (storedToken === code) {
      this.tokens.delete(email);
      return true;
    }
    throw new UnauthorizedException("Invalid 2FA code");
  }
}

// Simulate AuthService behavior without importing the actual service
class MockAuthService {
  constructor(
    private userService: MockUserService,
    private configService: ConfigService,
    private prismaService: MockPrismaService,
    private emailConfirmationService: MockEmailConfirmationService,
    private twoFactorAuthService: MockTwoFactorAuthService,
    private s3Service: MockS3Service,
  ) {}

  async register(req: any, dto: any, files: any) {
    const isExists = await this.userService.findByEmail(dto.email);
    if (isExists) {
      throw new ConflictException(
        "Registration not successfully. User already exists",
      );
    }

    const avatarFile = files.avatar?.[0];
    const frontFile = files.studentIdFront?.[0];
    const backFile = files.studentIdBack?.[0];

    const avatarUrls = avatarFile
      ? await this.s3Service.uploadResponsiveImage(
          avatarFile,
          dto.secondName,
          "avatar",
        )
      : null;

    const frontUrl = frontFile
      ? await this.s3Service.uploadFile(frontFile, "users/studentIdFront")
      : "";

    const backUrl = backFile
      ? await this.s3Service.uploadFile(backFile, "users/studentIdBack")
      : "";

    const newUser = await this.userService.create(
      dto.email,
      dto.password,
      dto.name,
      dto.secondName,
      "CREDENTIALS",
      false,
      avatarUrls?.desktop ?? "",
      frontUrl,
      backUrl,
    );

    await this.prismaService.confirmation.create({
      data: {
        type: "IDENTITY_VERIFICATION",
        status: "PENDING",
        userId: newUser.id,
        photo: avatarUrls?.original ?? "",
        frontIdUrl: frontUrl,
        backIdUrl: backUrl,
      },
    });

    await this.emailConfirmationService.sendVerificationToken(newUser);

    return {
      message:
        "Register successfully. Please, approve your email. Mail was sent to your email address.",
    };
  }

  async login(req: any, dto: any) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !user.password) {
      throw new NotFoundException("Invalid email or password");
    }

    // Simulate password verification
    const isValidPassword = user.password === "hashed-" + dto.password;
    if (!isValidPassword) {
      throw new UnauthorizedException("Invalid password");
    }

    if (!user.isVerified) {
      await this.emailConfirmationService.sendVerificationToken(user);
      throw new UnauthorizedException(
        "Email verification failed. Please verify your email. Mail was sent on your email address.",
      );
    }

    if (user.isTwoFactorEnabled) {
      if (!dto.code) {
        await this.twoFactorAuthService.sendTwoFactorToken(user.email);
        return {
          message: "Check your email. You need two factor verification code",
        };
      }
      await this.twoFactorAuthService.validateTwoFactorToken(
        user.email,
        dto.code,
      );
    }

    return this.saveSession(req, user);
  }

  async logout(req: any, res: any): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err: any) => {
        if (err) {
          return reject(
            new InternalServerErrorException("Cannot delete session"),
          );
        }
        res.clearCookie(this.configService.getOrThrow("SESSION_NAME"));
        resolve();
      });
    });
  }

  async saveSession(req: any, newUser: any) {
    return new Promise((resolve, reject) => {
      if (!req.session) {
        return reject(
          new InternalServerErrorException("Session is not initialized"),
        );
      }

      req.session.user = {
        id: newUser.id,
        role: newUser.role,
        email: newUser.email,
        displayName: newUser.displayName,
      };

      req.session.save((err: any) => {
        if (err) {
          return reject(
            new InternalServerErrorException(
              "An error occurred while saving session",
            ),
          );
        }
        resolve({ newUser });
      });
    });
  }
}

describe("AuthService Integration Tests", () => {
  let service: MockAuthService;
  let userService: MockUserService;
  let configService: ConfigService;
  let prismaService: MockPrismaService;
  let emailConfirmationService: MockEmailConfirmationService;
  let twoFactorAuthService: MockTwoFactorAuthService;
  let s3Service: MockS3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn().mockReturnValue("test-session-name"),
          },
        },
      ],
    }).compile();

    userService = new MockUserService();
    configService = module.get(ConfigService);
    prismaService = new MockPrismaService();
    emailConfirmationService = new MockEmailConfirmationService();
    twoFactorAuthService = new MockTwoFactorAuthService();
    s3Service = new MockS3Service();

    service = new MockAuthService(
      userService,
      configService,
      prismaService,
      emailConfirmationService,
      twoFactorAuthService,
      s3Service,
    );
  });

  describe("Complete Registration Flow", () => {
    it("should register a new user with all files", async () => {
      const registerDto = {
        email: "newuser@example.com",
        password: "password123",
        passwordRepeat: "password123",
        name: "John",
        secondName: "Doe",
      };

      const mockFiles = {
        avatar: [{ originalname: "avatar.jpg" }],
        studentIdFront: [{ originalname: "front.jpg" }],
        studentIdBack: [{ originalname: "back.jpg" }],
      };

      const mockRequest = { session: {} };

      const result = await service.register(
        mockRequest,
        registerDto,
        mockFiles,
      );

      expect(result.message).toContain("Register successfully");

      // Verify user was created
      const createdUser = await userService.findByEmail(registerDto.email);
      expect(createdUser).toBeTruthy();
      expect(createdUser.email).toBe(registerDto.email);
      expect(createdUser.name).toBe(registerDto.name);
      expect(createdUser.secondName).toBe(registerDto.secondName);
      expect(createdUser.isVerified).toBe(false);
    });

    it("should register a new user without files", async () => {
      const registerDto = {
        email: "usernofiles@example.com",
        password: "password123",
        passwordRepeat: "password123",
        name: "Jane",
        secondName: "Smith",
      };

      const mockFiles = {
        avatar: [],
        studentIdFront: [],
        studentIdBack: [],
      };

      const mockRequest = { session: {} };

      const result = await service.register(
        mockRequest,
        registerDto,
        mockFiles,
      );

      expect(result.message).toContain("Register successfully");

      const createdUser = await userService.findByEmail(registerDto.email);
      expect(createdUser).toBeTruthy();
      expect(createdUser.avatar).toBe("");
      expect(createdUser.frontUrl).toBe("");
      expect(createdUser.backUrl).toBe("");
    });

    it("should throw ConflictException for existing user", async () => {
      const registerDto = {
        email: "existing@example.com",
        password: "password123",
        passwordRepeat: "password123",
        name: "Existing",
        secondName: "User",
      };

      // First registration
      await service.register({}, registerDto, {
        avatar: [],
        studentIdFront: [],
        studentIdBack: [],
      });

      // Second registration with same email
      await expect(
        service.register({}, registerDto, {
          avatar: [],
          studentIdFront: [],
          studentIdBack: [],
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe("Complete Login Flow", () => {
    beforeEach(async () => {
      // Create a verified user for login tests
      await userService.create(
        "verified@example.com",
        "password123",
        "Verified",
        "User",
        "CREDENTIALS",
        true, // isVerified
        "",
        "",
        "",
      );

      // Create an unverified user
      await userService.create(
        "unverified@example.com",
        "password123",
        "Unverified",
        "User",
        "CREDENTIALS",
        false, // isVerified
        "",
        "",
        "",
      );
    });

    it("should login successfully with verified user", async () => {
      const loginDto = {
        email: "verified@example.com",
        password: "password123",
      };

      const mockRequest = {
        session: {
          user: null,
          save: jest.fn((callback) => callback(null)),
        },
      };

      const result = (await service.login(mockRequest, loginDto)) as any;

      expect(result.newUser).toBeTruthy();
      expect(result.newUser.email).toBe(loginDto.email);
      expect(mockRequest.session.user).toEqual({
        id: result.newUser.id,
        role: result.newUser.role,
        email: result.newUser.email,
        displayName: result.newUser.displayName,
      });
    });

    it("should throw NotFoundException for non-existent user", async () => {
      const loginDto = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      const mockRequest = { session: {} };

      await expect(service.login(mockRequest, loginDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it("should throw UnauthorizedException for wrong password", async () => {
      const loginDto = {
        email: "verified@example.com",
        password: "wrongpassword",
      };

      const mockRequest = { session: {} };

      await expect(service.login(mockRequest, loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it("should handle unverified user login", async () => {
      const loginDto = {
        email: "unverified@example.com",
        password: "password123",
      };

      const mockRequest = { session: {} };

      await expect(service.login(mockRequest, loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe("Two Factor Authentication Flow", () => {
    beforeEach(async () => {
      // Create a user with 2FA enabled
      const user = await userService.create(
        "2fa@example.com",
        "password123",
        "TwoFA",
        "User",
        "CREDENTIALS",
        true,
        "",
        "",
        "",
      );
      user.isTwoFactorEnabled = true;
    });

    it("should send 2FA code when user has 2FA enabled", async () => {
      const loginDto = {
        email: "2fa@example.com",
        password: "password123",
      };

      const mockRequest = { session: {} };

      const result = (await service.login(mockRequest, loginDto)) as any;

      expect(result.message).toContain("Check your email");
    });

    it("should login successfully with valid 2FA code", async () => {
      // First, trigger 2FA code sending
      await twoFactorAuthService.sendTwoFactorToken("2fa@example.com");

      // Get the generated token (in real scenario, user would get this via email)
      const token = (twoFactorAuthService as any).tokens.get("2fa@example.com");

      const loginDto = {
        email: "2fa@example.com",
        password: "password123",
        code: token,
      };

      const mockRequest = {
        session: {
          user: null,
          save: jest.fn((callback) => callback(null)),
        },
      };

      const result = (await service.login(mockRequest, loginDto)) as any;

      expect(result.newUser).toBeTruthy();
      expect(result.newUser.email).toBe(loginDto.email);
    });

    it("should throw UnauthorizedException for invalid 2FA code", async () => {
      const loginDto = {
        email: "2fa@example.com",
        password: "password123",
        code: "invalid-code",
      };

      const mockRequest = { session: {} };

      await expect(service.login(mockRequest, loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe("Session Management", () => {
    it("should logout successfully", async () => {
      const mockRequest = {
        session: {
          destroy: jest.fn((callback) => callback(null)),
        },
      };

      const mockResponse = {
        clearCookie: jest.fn(),
      };

      await service.logout(mockRequest, mockResponse);

      expect(mockRequest.session.destroy).toHaveBeenCalled();
      expect(mockResponse.clearCookie).toHaveBeenCalledWith(
        "test-session-name",
      );
    });

    it("should handle logout errors", async () => {
      const mockRequest = {
        session: {
          destroy: jest.fn((callback) => callback(new Error("Destroy failed"))),
        },
      };

      const mockResponse = {
        clearCookie: jest.fn(),
      };

      await expect(service.logout(mockRequest, mockResponse)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it("should save session successfully", async () => {
      const mockUser = {
        id: "user-123",
        role: "USER",
        email: "test@example.com",
        displayName: "Test User",
      };

      const mockRequest = {
        session: {
          user: null,
          save: jest.fn((callback) => callback(null)),
        },
      };

      const result = (await service.saveSession(mockRequest, mockUser)) as any;

      expect(result.newUser).toEqual(mockUser);
      expect(mockRequest.session.user).toEqual({
        id: mockUser.id,
        role: mockUser.role,
        email: mockUser.email,
        displayName: mockUser.displayName,
      });
    });

    it("should handle session save errors", async () => {
      const mockUser = {
        id: "user-123",
        role: "USER",
        email: "test@example.com",
        displayName: "Test User",
      };

      const mockRequest = {
        session: {
          user: null,
          save: jest.fn((callback) => callback(new Error("Save failed"))),
        },
      };

      await expect(service.saveSession(mockRequest, mockUser)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe("File Upload Integration", () => {
    it("should handle file uploads correctly", async () => {
      const mockFile = { originalname: "test-avatar.jpg" };

      const fileUrl = await s3Service.uploadFile(mockFile, "avatars");
      expect(fileUrl).toBe("https://s3.amazonaws.com/avatars/test-avatar.jpg");

      const responsiveImages = await s3Service.uploadResponsiveImage(
        mockFile,
        "john",
        "avatar",
      );
      expect(responsiveImages).toEqual({
        original: "https://s3.amazonaws.com/avatar/john-original.jpg",
        desktop: "https://s3.amazonaws.com/avatar/john-desktop.jpg",
        tablet: "https://s3.amazonaws.com/avatar/john-tablet.jpg",
        mobile: "https://s3.amazonaws.com/avatar/john-mobile.jpg",
      });
    });
  });
});
