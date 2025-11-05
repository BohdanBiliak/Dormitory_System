import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './services/messaging.service';
import { MessagingGateway } from './gateways/messaging.gateway';
import { UserModule } from '../user/user.module';
import { RedisSessionService } from '../../libs/common/services/redis-session.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [MessagingController],
  providers: [MessagingService, MessagingGateway, RedisSessionService],
  exports: [MessagingService, MessagingGateway],
})
export class MessagingModule {}