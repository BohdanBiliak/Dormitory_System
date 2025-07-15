import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export function UseAvatarInterceptor() {
    return applyDecorators(
        UseInterceptors(FileInterceptor('file')),
    );
}