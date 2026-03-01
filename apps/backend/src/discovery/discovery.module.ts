import { Module } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';
import { DiscoveryController } from './discovery.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [DiscoveryService, PrismaService],
  controllers: [DiscoveryController]
})
export class DiscoveryModule { }
