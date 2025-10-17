import { ConfigService } from "@nestjs/config";
import { GoogleRecaptchaModuleOptions } from "@nestlab/google-recaptcha";

export const recaptchaConfig = async (
  configService: ConfigService,
): Promise<GoogleRecaptchaModuleOptions> => ({
  secretKey: configService.getOrThrow<string>("GOOGLE_RECAPTCHA_SECRET_KEY"),
  response: (req) => req.headers.recaptcha,
  skipIf: true,
});
