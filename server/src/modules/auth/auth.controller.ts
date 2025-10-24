import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "@/modules/auth/dto/register.dto";
import { Request, Response } from "express";
import { LoginDto } from "@/modules/auth/dto/login.dto";
import { Recaptcha } from "@nestlab/google-recaptcha";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import * as Sentry from "@sentry/node";
import { RegisterDocs, LoginDocs, LogoutDocs } from "./docs.swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "avatar", maxCount: 1 },
      { name: "studentIdFront", maxCount: 1 },
      { name: "studentIdBack", maxCount: 1 },
    ]),
  )
  @Recaptcha()
  @RegisterDocs()
  @Post("register")
  @HttpCode(HttpStatus.OK)
  public async register(
    @Req() req: Request,
    @Body() dto: RegisterDto,
    @UploadedFiles()
    files: {
      avatar: Express.Multer.File[];
      studentIdFront: Express.Multer.File[];
      studentIdBack: Express.Multer.File[];
    },
  ) {
    return this.authService.register(req, dto, files);
  }

  @Recaptcha()
  @LoginDocs()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req: Request, @Body() dto: LoginDto) {
    const result = await this.authService.login(req, dto);

    Sentry.captureMessage("User logged in", {
      level: "info",
      extra: {
        userId: req.user?.id,
        ip: req.ip,
        agent: req.headers["user-agent"],
      },
    });

    return result;
  }

  @LogoutDocs()
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(req, res);
  }
}
