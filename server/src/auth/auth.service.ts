import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "@/auth/dto/register.dto";
import { UserService } from "@/user/user.service";
import { $Enums, User } from "../../__generated__";
import AuthMethod = $Enums.AuthMethod;
import { Request, Response } from "express";
import { LoginDto } from "@/auth/dto/login.dto";
import { verify } from "argon2";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "@/prisma/prisma.service";
import { EmailConfirmationService } from "@/auth/email-confirmation/email-confirmation.service";
import { TwoFactorAuthService } from "@/auth/two-factor-auth/two-factor-auth.service";
import { S3Service } from "@/libs/common/s3/s3.service";

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly s3Service: S3Service,
  ) {}

  public async register(
    req: Request,
    dto: RegisterDto,
    files: {
      avatar: Express.Multer.File[];
      studentIdFront: Express.Multer.File[];
      studentIdBack: Express.Multer.File[];
    },
  ) {
    const isExists = await this.userService.findByEmail(dto.email);
    if (isExists) {
      throw new ConflictException(
        "Registration not successfully. User already exists",
      );
    }
    console.log("FILES:", {
      avatar: files.avatar?.[0]?.originalname,
      front: files.studentIdFront?.[0]?.originalname,
      back: files.studentIdBack?.[0]?.originalname,
    });
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
      dto.secondName ?? "",
      AuthMethod.CREDENTIALS,
      false,
      avatarUrls?.desktop ?? "",
      frontUrl,
      backUrl,
    );
    await this.prismaService.confirmation.create({
      data: {
        type: $Enums.ConfirmationType.IDENTITY_VERIFICATION,
        status: $Enums.ConfirmationStatus.PENDING,
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

  public async login(req: Request, dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !user.password) {
      throw new NotFoundException("Invalid email or password");
    }
    const isValidPassword = await verify(user.password, dto.password);
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

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException("Cannot delete session"),
          );
        }
        res.clearCookie(this.configService.getOrThrow<string>("SESSION_NAME"));
        resolve();
      });
    });
  }

  public async saveSession(req: Request, newUser: User) {
    return new Promise((resolve, reject) => {
      if (!req.session) {
        console.error("Session is undefined");
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
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return reject(
            new InternalServerErrorException(
              "An error occurred while saving session",
            ),
          );
        }
        resolve({
          newUser,
        });
      });
    });
  }
}
