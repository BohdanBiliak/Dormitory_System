import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UploadedFiles, UseInterceptors
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {RegisterDto} from "@/auth/dto/register.dto";
import { Request ,Response } from 'express';
import {LoginDto} from "@/auth/dto/login.dto";
import {Recaptcha} from "@nestlab/google-recaptcha";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(
      FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
        { name: 'studentIdFront', maxCount: 1 },
        { name: 'studentIdBack', maxCount: 1 },
      ])
  )
  @Recaptcha()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async register(@Req() req: Request, @Body() dto: RegisterDto,    @UploadedFiles()
  files: {
    avatar: Express.Multer.File[],
    studentIdFront: Express.Multer.File[],
    studentIdBack: Express.Multer.File[]
  }){
    return this.authService.register( req, dto, files)
  }
  @Recaptcha()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req: Request, @Body() dto: LoginDto){
    return this.authService.login(req, dto)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(@Req() req: Request, @Res({passthrough: true}) res: Response){
    return this.authService.logout(req, res)
  }
}
