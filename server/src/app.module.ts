console.log("__dirname (app.module):", __dirname);
import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {IS_DEV_ENV} from "@/libs/utils/is-dev.util";
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { MailModule } from '@/libs/mail/mail.module';
import { EmailConfirmationModule } from '@/modules/auth/submodules/email-confirmation/email-confirmation.module';
import {PasswordRecoveryModule} from "@/modules/auth/submodules/password-recovery/password-recovery.module";
import {TwoFactorAuthModule} from "@/modules/auth/submodules/two-factor-auth/two-factor-auth.module";
import { AdminModule } from '@/modules/admin/admin.module';
import { RoomModule } from '@/modules/room/room.module';
import {DormitoryModule} from "@/modules/dormitory/dormitory.module";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    ignoreEnvFile: !IS_DEV_ENV,
  }), PrismaModule, AuthModule, UserModule, MailModule, EmailConfirmationModule, MailModule, EmailConfirmationModule, PasswordRecoveryModule, TwoFactorAuthModule, AdminModule, RoomModule, DormitoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
