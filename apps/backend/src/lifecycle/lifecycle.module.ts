import { Module } from '@nestjs/common';
import { LifecycleController } from './lifecycle.controller';
import { LifecycleService } from './lifecycle.service';
import { HandoverService } from './handover.service';
import { CheckoutService } from './checkout.service';
import { SafetyService } from './safety.service';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [LifecycleController],
    providers: [LifecycleService, HandoverService, CheckoutService, SafetyService, PrismaService],
    exports: [LifecycleService, HandoverService, CheckoutService, SafetyService],
})
export class LifecycleModule { }
