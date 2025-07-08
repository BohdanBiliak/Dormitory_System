import {Body, Controller, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import {ResetPasswordDto} from "@/auth/password-recovery/dto/reset-password.dto";
import {Recaptcha} from "@nestlab/google-recaptcha";
import {newPasswordDto} from "@/auth/password-recovery/dto/new-password.dto";

@Controller('auth/password-recovery')
export class PasswordRecoveryController {
  constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

  @Recaptcha()
  @Post('reset')
  @HttpCode(HttpStatus.OK)
  public async reset(@Body() dto: ResetPasswordDto) {
    return this.passwordRecoveryService.resetPassword(dto);
  }

  @Recaptcha()
  @Post('/new-password/:token')
  @HttpCode(HttpStatus.OK)
  public async newPassword(@Body() dto: newPasswordDto, @Param('token') token: string) {
    return this.passwordRecoveryService.newPassword(dto,token );
  }
}
