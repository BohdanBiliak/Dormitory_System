import {forwardRef, Module} from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { UserService } from "@/modules/user/services/user.service";
import { PrismaModule } from "@/prisma/prisma.module";
import { GoogleRecaptchaModule } from "@nestlab/google-recaptcha";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { recaptchaConfig } from "@/config/recaptcha.config";
import {EmailConfirmationModule} from "@/modules/auth/submodules/email-confirmation/email-confirmation.module";
import {MailService} from "@/libs/mail/mail.service";
import {TwoFactorAuthService} from "@/modules/auth/submodules/two-factor-auth/services/two-factor-auth.service";
import {S3Service} from "@/libs/common/s3/s3.service";

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
