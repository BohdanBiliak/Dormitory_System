import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [PricingService],
  controllers: [PricingController],
  exports: [PricingService],
})
export class PricingModule {}