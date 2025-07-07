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
  providers: [AuthService, UserService, MailService],
  exports: [AuthService]
})
export class AuthModule {}
