import { Test, TestingModule } from "@nestjs/testing";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../../src/modules/auth/auth.service";
import { UserService } from "../../src/modules/user/user.service";
import { PrismaService } from "../../src/prisma/prisma.service";
import { EmailConfirmationService } from "../../src/modules/auth/submodules/email-confirmation/services/email-confirmation.service";
import { TwoFactorAuthService } from "../../src/modules/auth/submodules/two-factor-auth/services/two-factor-auth.service";
import { S3Service } from "../../src/libs/common/s3/s3.service";
import { RegisterDto } from "../../src/modules/auth/dto/register.dto";
import { LoginDto } from "../../src/modules/auth/dto/login.dto";

jest.mock("argon2", () => ({
  verify: jest.fn(),
}));

describe("AuthService", () => {
  let service: AuthService;
  let userService: any;
  let configService: any;
  let prismaService: any;
  let emailConfirmationService: any;
  let twoFactorAuthService: any;
  let s3Service: any;

  const mockUser = {
    id: "user-id",
    email: "test@example.com",
    password: "hashed-password",
    isVerified: true,
    isTwoFactorEnabled: false,
    role: "REGULAR",
    displayName: "Test User",
    name: "Test",
    secondName: "User",
  };

  const mockRequest = {
    session: {
      destroy: jest.fn(),
      save: jest.fn(),
      user: null,
    },
  } as any;

  const mockResponse = {
    clearCookie: jest.fn(),
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            confirmation: {
              create: jest.fn(),
            },
          },
        },
        {
          provide: EmailConfirmationService,
          useValue: {
            sendVerificationToken: jest.fn(),
          },
        },
        {
          provide: TwoFactorAuthService,
          useValue: {
            sendTwoFactorToken: jest.fn(),
            validateTwoFactorToken: jest.fn(),
          },
        },
        {
          provide: S3Service,
          useValue: {
            uploadResponsiveImage: jest.fn(),
            uploadFile: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    configService = module.get(ConfigService);
    prismaService = module.get(PrismaService);
    emailConfirmationService = module.get(EmailConfirmationService);
    twoFactorAuthService = module.get(TwoFactorAuthService);
    s3Service = module.get(S3Service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    const registerDto: RegisterDto = {
      email: "test@example.com",
      password: "password123",
      passwordRepeat: "password123",
      name: "Test",
      secondName: "User",
    };

    const mockFiles = {
      avatar: [{ originalname: "avatar.jpg" } as any],
      studentIdFront: [{ originalname: "front.jpg" } as any],
      studentIdBack: [{ originalname: "back.jpg" } as any],
    };

    it("should register a new user successfully", async () => {
      userService.findByEmail.mockResolvedValue(null);
      s3Service.uploadResponsiveImage.mockResolvedValue({
        desktop: "avatar-desktop.jpg",
        original: "avatar-original.jpg",
        mobile: "avatar-mobile.jpg",
        tablet: "avatar-tablet.jpg",
      });
      s3Service.uploadFile.mockResolvedValue("file-url.jpg");
      userService.create.mockResolvedValue(mockUser);
      prismaService.confirmation.create.mockResolvedValue({});
      emailConfirmationService.sendVerificationToken.mockResolvedValue(true);

      const result = await service.register(
        mockRequest,
        registerDto,
        mockFiles,
      );

      expect(result.message).toContain("Register successfully");
      expect(userService.findByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(userService.create).toHaveBeenCalled();
      expect(prismaService.confirmation.create).toHaveBeenCalled();
      expect(
        emailConfirmationService.sendVerificationToken,
      ).toHaveBeenCalledWith(mockUser);
    });

    it("should throw ConflictException if user already exists", async () => {
      userService.findByEmail.mockResolvedValue(mockUser);

      await expect(
        service.register(mockRequest, registerDto, mockFiles),
      ).rejects.toThrow(ConflictException);

      expect(userService.findByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(userService.create).not.toHaveBeenCalled();
    });

    it("should handle registration without files", async () => {
      userService.findByEmail.mockResolvedValue(null);
      userService.create.mockResolvedValue(mockUser);
      prismaService.confirmation.create.mockResolvedValue({});
      emailConfirmationService.sendVerificationToken.mockResolvedValue(true);

      const emptyFiles = {
        avatar: [],
        studentIdFront: [],
        studentIdBack: [],
      };

      const result = await service.register(
        mockRequest,
        registerDto,
        emptyFiles,
      );

      expect(result.message).toContain("Register successfully");
      expect(s3Service.uploadResponsiveImage).not.toHaveBeenCalled();
      expect(s3Service.uploadFile).not.toHaveBeenCalled();
    });
  });

  describe("login", () => {
    const loginDto: LoginDto = {
      email: "test@example.com",
      password: "password123",
    };

    it("should login successfully with valid credentials", async () => {
      const { verify } = require("argon2");

      userService.findByEmail.mockResolvedValue(mockUser);
      verify.mockResolvedValue(true);
      jest
        .spyOn(service, "saveSession")
        .mockResolvedValue({ newUser: mockUser });

      const result = await service.login(mockRequest, loginDto);

      expect(result).toEqual({ newUser: mockUser });
      expect(userService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(verify).toHaveBeenCalledWith(mockUser.password, loginDto.password);
    });

    it("should throw NotFoundException for invalid email", async () => {
      userService.findByEmail.mockResolvedValue(null);

      await expect(service.login(mockRequest, loginDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it("should throw UnauthorizedException for invalid password", async () => {
      const { verify } = require("argon2");

      userService.findByEmail.mockResolvedValue(mockUser);
      verify.mockResolvedValue(false);

      await expect(service.login(mockRequest, loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it("should handle unverified user", async () => {
      const { verify } = require("argon2");
      const unverifiedUser = { ...mockUser, isVerified: false };

      userService.findByEmail.mockResolvedValue(unverifiedUser);
      verify.mockResolvedValue(true);
      emailConfirmationService.sendVerificationToken.mockResolvedValue(true);

      await expect(service.login(mockRequest, loginDto)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(
        emailConfirmationService.sendVerificationToken,
      ).toHaveBeenCalledWith(unverifiedUser);
    });

    it("should handle 2FA enabled user without code", async () => {
      const { verify } = require("argon2");
      const twoFAUser = { ...mockUser, isTwoFactorEnabled: true };

      userService.findByEmail.mockResolvedValue(twoFAUser);
      verify.mockResolvedValue(true);
      twoFactorAuthService.sendTwoFactorToken.mockResolvedValue(true);

      const result = await service.login(mockRequest, loginDto);

      expect((result as any).message).toContain("Check your email");
      expect(twoFactorAuthService.sendTwoFactorToken).toHaveBeenCalledWith(
        twoFAUser.email,
      );
    });

    it("should handle 2FA enabled user with valid code", async () => {
      const { verify } = require("argon2");
      const twoFAUser = { ...mockUser, isTwoFactorEnabled: true };
      const loginDtoWithCode = { ...loginDto, code: "123456" };

      userService.findByEmail.mockResolvedValue(twoFAUser);
      verify.mockResolvedValue(true);
      twoFactorAuthService.validateTwoFactorToken.mockResolvedValue(true);
      jest
        .spyOn(service, "saveSession")
        .mockResolvedValue({ newUser: twoFAUser });

      const result = await service.login(mockRequest, loginDtoWithCode);

      expect(result).toEqual({ newUser: twoFAUser });
      expect(twoFactorAuthService.validateTwoFactorToken).toHaveBeenCalledWith(
        twoFAUser.email,
        "123456",
      );
    });
  });

  describe("logout", () => {
    it("should logout successfully", async () => {
      const destroyCallback = jest.fn((callback) => callback(null));
      mockRequest.session.destroy = destroyCallback;
      configService.getOrThrow.mockReturnValue("session-name");

      await service.logout(mockRequest, mockResponse);

      expect(destroyCallback).toHaveBeenCalled();
      expect(mockResponse.clearCookie).toHaveBeenCalledWith("session-name");
    });

    it("should throw InternalServerErrorException on session destroy error", async () => {
      const destroyCallback = jest.fn((callback) =>
        callback(new Error("Destroy failed")),
      );
      mockRequest.session.destroy = destroyCallback;

      await expect(service.logout(mockRequest, mockResponse)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe("saveSession", () => {
    it("should save session successfully", async () => {
      const saveCallback = jest.fn((callback) => callback(null));
      mockRequest.session.save = saveCallback;

      const result = await service.saveSession(mockRequest, mockUser as any);

      expect(mockRequest.session.user).toEqual({
        id: mockUser.id,
        role: mockUser.role,
        email: mockUser.email,
        displayName: mockUser.displayName,
      });
      expect(result).toEqual({ newUser: mockUser });
    });

    it("should throw InternalServerErrorException if session is undefined", async () => {
      const requestWithoutSession = { session: null } as any;

      await expect(
        service.saveSession(requestWithoutSession, mockUser as any),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it("should throw InternalServerErrorException on session save error", async () => {
      const saveCallback = jest.fn((callback) =>
        callback(new Error("Save failed")),
      );
      mockRequest.session.save = saveCallback;

      await expect(
        service.saveSession(mockRequest, mockUser as any),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
