import {forwardRef, Module} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "@/user/user.service";
import { PrismaModule } from "@/prisma/prisma.module";
import { GoogleRecaptchaModule } from "@nestlab/google-recaptcha";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { recaptchaConfig } from "@/config/recaptcha.config";
import {EmailConfirmationModule} from "@/auth/email-confirmation/email-confirmation.module";
import {MailService} from "@/libs/mail/mail.service";
import {TwoFactorAuthService} from "@/auth/two-factor-auth/two-factor-auth.service";
import {S3Service} from "@/libs/s3/s3.service";

@Module({
  imports: [
    PrismaModule,
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: recaptchaConfig,
      inject: [ConfigService],
    }),
      forwardRef(() => EmailConfirmationModule),

  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, MailService, TwoFactorAuthService, S3Service],
  exports: [AuthService]
})
export class AuthModule {}
