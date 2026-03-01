import { Module } from '@nestjs/common';
import { LifecycleService } from './lifecycle.service';
import { LifecycleController } from './lifecycle.controller';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [LifecycleController],
    providers: [LifecycleService, PrismaService],
})
export class LifecycleModule { }
