import {Body, Controller, HttpCode, HttpStatus, Post, Req} from '@nestjs/common';
import { EmailConfirmationService } from '../services/email-confirmation.service';
import {Request} from "express";
import {ConfirmationDto} from "@/modules/auth/submodules/email-confirmation/dto/confirmation.dto";
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";


@ApiTags('Email Confirmation')
@Controller('auth/email-confirmation')
export class EmailConfirmationController {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm email with token' })
  @ApiBody({ type: ConfirmationDto })
  public async newVerification(@Req() req: Request, @Body() dto: ConfirmationDto) {
    return this.emailConfirmationService.newVerification(req, dto);
  }
}