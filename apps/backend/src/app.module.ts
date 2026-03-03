import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { DiscoveryModule } from './discovery/discovery.module';
import { BookingModule } from './booking/booking.module';
import { LifecycleModule } from './lifecycle/lifecycle.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { ReferralModule } from './referral/referral.module';

@Module({
  imports: [AuthModule, DiscoveryModule, BookingModule, LifecycleModule, MarketplaceModule, ReferralModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
