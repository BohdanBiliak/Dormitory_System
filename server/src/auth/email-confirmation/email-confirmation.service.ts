import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { v4 as uuidv4 } from "uuid";
import { $Enums, User } from "../../../__generated__";
import TokenType = $Enums.TokenType;
import { Request } from "express";
import { ConfirmationDto } from "@/auth/email-confirmation/dto/confirmation.dto";
import { MailService } from "@/libs/mail/mail.service";
import { UserService } from "@/user/user.service";
import { AuthService } from "@/auth/auth.service";

@Injectable()
export class EmailConfirmationService {
  public constructor(
    private prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  private async generateVerificationToken(email: string) {
    const token = uuidv4();
    const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.VERIFICATION,
      },
    });
    if (existingToken) {
      await this.prismaService.token.delete({
        where: {
          id: existingToken.id,
          type: TokenType.VERIFICATION,
        },
      });
    }
    const verificationToken = await this.prismaService.token.create({
      data: {
        email,
        token,
        expiresIn,
        type: TokenType.VERIFICATION,
      },
    });
    return verificationToken;
  }

  public async newVerification(req: Request, dto: ConfirmationDto) {
    const existingToken = await this.prismaService.token.findUnique({
      where: {
        token: dto.token,
        type: TokenType.VERIFICATION,
      },
    });
    if (!existingToken) {
      throw new NotFoundException(
        "Verication token not found. Please try again.",
      );
    }
    const hasExpired = new Date(existingToken.expiresIn) < new Date();
    if (hasExpired) {
      throw new BadRequestException(
        "Verification token expired. Please try again.",
      );
    }
    const existingUser = await this.userService.findByEmail(existingToken.email)
      if (!existingUser) {
          throw new NotFoundException(' user with email not found. Please try again.');
      }
      await this.prismaService.user.update({
          where: {
              id: existingUser.id
          },
          data: {
              isVerified: true,
          }
      })
      await this.prismaService.token.delete({
          where: {
              id:existingToken.id,
              type: TokenType.VERIFICATION,
          }
      })
      return this.authService.saveSession(req, existingUser)
  }

  public async sendVerificationToken(user: User) {
    const verificationToken = await this.generateVerificationToken(user.email)
    await this.mailService.sendConfirmationEmail(verificationToken.email, verificationToken.token)
    return true

  }
}
