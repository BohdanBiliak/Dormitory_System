import { ConfigService } from "@nestjs/config";
import { MailerOptions } from "@nestjs-modules/mailer";

export const getMailerConfig = async (
  configService: ConfigService,
): Promise<MailerOptions> => ({
  transport: {
    host: "smtp.resend.com",
    port: 587,
    secure: false,
    auth: {
      user: "resend",
      pass: configService.getOrThrow<string>("RESEND_API_KEY"),
    },
  },
  defaults: {
    from: '"Dormitory" <dormitory@incubatortest.com>',
  },
});
