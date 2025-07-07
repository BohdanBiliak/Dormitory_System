import { Module,forwardRef } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation.controller';
import {MailModule} from "@/libs/mail/mail.module";
import {AuthModule} from "@/auth/auth.module";
import {PrismaModule} from "@/prisma/prisma.module";
import {UserModule} from "@/user/user.module";

@Module({
  imports: [MailModule, forwardRef(() =>  AuthModule), PrismaModule,UserModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
