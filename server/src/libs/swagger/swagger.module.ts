import { Module } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({})
export class SwaggerSetup {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Dormitory API')
        .setDescription('Documentation for dormitory system')
        .setVersion('1.0')
        .addTag('auth')
        .addTag('users')
        .addCookieAuth('connect.sid')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
