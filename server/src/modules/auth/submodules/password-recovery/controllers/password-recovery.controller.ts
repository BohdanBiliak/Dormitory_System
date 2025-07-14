import {Body, Controller, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import { PasswordRecoveryService } from '../services/password-recovery.service';
import {ResetPasswordDto} from "@/modules/auth/submodules/password-recovery/dto/reset-password.dto";
import {Recaptcha} from "@nestlab/google-recaptcha";
import {NewPasswordDto} from "@/modules/auth/submodules/password-recovery/dto/new-password.dto";
import {ApiBody, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";


@ApiTags('Password Recovery')
@Controller('auth/password-recovery')
export class PasswordRecoveryController {
  constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

  @Recaptcha()
  @Post('reset')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset' })
  @ApiBody({ type: ResetPasswordDto })
  public async reset(@Body() dto: ResetPasswordDto) {
    return this.passwordRecoveryService.resetPassword(dto);
  }

  @Recaptcha()
  @Post('/new-password/:token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Set new password with token' })
  @ApiBody({ type: NewPasswordDto })
  @ApiParam({ name: 'token', description: 'Password recovery token', example: 'abc123token' })
  public async newPassword(
      @Body() dto: NewPasswordDto,
      @Param('token') token: string,
  ) {
    return this.passwordRecoveryService.newPassword(dto, token);
  }
}