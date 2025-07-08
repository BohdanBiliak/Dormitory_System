import { Module } from '@nestjs/common';
import { TwoFactorAuthService } from './two-factor-auth.service';
import {MailService} from "@/libs/mail/mail.service";
import {PrismaService} from "@/prisma/prisma.service";

@Module({
  controllers: [],
  providers: [TwoFactorAuthService, MailService, PrismaService],
})
export class TwoFactorAuthModule {}
