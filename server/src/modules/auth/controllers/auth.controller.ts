import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { RegisterDto } from "@/modules/auth/dto/register.dto";
import { Request, Response } from "express";
import { LoginDto } from "@/modules/auth/dto/login.dto";
import { Recaptcha } from "@nestlab/google-recaptcha";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import {ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import * as Sentry from '@sentry/node';
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
  @ApiBody({
    description: "Form data with user details and three uploaded files",
    type: RegisterDto,
    schema: {
      type: "object",
      properties: {
        name: { type: "string", example: "Bohdan" },
        secondName: { type: "string", example: "Bilak" },
        email: { type: "string", example: "user@example.com" },
        password: { type: "string", example: "password123" },
        passwordRepeat: { type: "string", example: "password123" },
        avatar: { type: "string", format: "binary" },
        studentIdFront: { type: "string", format: "binary" },
        studentIdBack: { type: "string", format: "binary" },
      },
      required: ["name", "secondName", "email", "password", "passwordRepeat"],
    },
  })
  @ApiResponse({ status: 200, description: "User successfully registered" })
  @ApiResponse({ status: 409, description: "User already exists" })
  @ApiResponse({ status: 400, description: "Validation failed" })
  @Post("register")
  @ApiConsumes("multipart/form-data")
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
  @ApiOperation({ summary: 'Log in with email and password, optional 2FA' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Logged in / 2FA initiated' })
  @ApiResponse({ status: 404, description: 'Invalid email or password' })
  @ApiResponse({ status: 401, description: 'Email not verified or 2FA required' })
  @Post("login")
  @ApiConsumes("application/json")
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req: Request, @Body() dto: LoginDto) {
    const result = await this.authService.login(req, dto);

    Sentry.captureMessage('User logged in', {
      level: 'info',
      extra: {
        userId: req.user?.id,
        ip: req.ip,
        agent: req.headers['user-agent'],
      }
    });

    return result;
  }


  @ApiOperation({ summary: 'Log out and destroy session' })
  @ApiResponse({ status: 200, description: 'Session cleared' })
  @ApiResponse({ status: 500, description: 'Session destruction failed' })
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(req, res);
  }
}
