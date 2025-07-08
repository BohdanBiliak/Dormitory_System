import { Module } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordRecoveryController } from './password-recovery.controller';
import {PrismaModule} from "@/prisma/prisma.module";
import {UserModule} from "@/user/user.module";
import {MailModule} from "@/libs/mail/mail.module";

@Module({
  imports: [PrismaModule, UserModule, MailModule],
  controllers: [PasswordRecoveryController],
  providers: [PasswordRecoveryService],
})
export class PasswordRecoveryModule {}
