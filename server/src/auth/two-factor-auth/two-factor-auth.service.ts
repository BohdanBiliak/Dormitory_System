import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { $Enums } from "../../../__generated__";
import TokenType = $Enums.TokenType;
import { PrismaService } from "@/prisma/prisma.service";
import { MailService } from "@/libs/mail/mail.service";

@Injectable()
export class TwoFactorAuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) {}

  public async validateTwoFactorToken(email: string, code: string) {
    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.TWO_FACTOR,
      },
    });

    if (!existingToken) {
      throw new NotFoundException("Token not found. Please try again.");
    }

    if (existingToken.token !== code) {
      throw new BadRequestException("Wrong token. Please try again.");
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date();

    if (hasExpired) {
      throw new BadRequestException("Token is expired. Please try again.");
    }

    await this.prismaService.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.TWO_FACTOR,
      },
    });

    return true;
  }

  public async sendTwoFactorToken(email: string) {
    const twoFactorToken = await this.generateTwoFactorToken(email);

    await this.mailService.sendTwoFactorTokenEmail(
      twoFactorToken.email,
      twoFactorToken.token,
    );

    return true;
  }

  private async generateTwoFactorToken(email: string) {
    const token = Math.floor(
      Math.random() * (1000000 - 100000) + 100000,
    ).toString();
    const expiresIn = new Date(new Date().getTime() + 300000);

    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.TWO_FACTOR,
      },
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: {
          id: existingToken.id,
          type: TokenType.TWO_FACTOR,
        },
      });
    }

    const twoFactorToken = await this.prismaService.token.create({
      data: {
        email,
        token,
        expiresIn,
        type: TokenType.TWO_FACTOR,
      },
    });

    return twoFactorToken;
  }
}
