import { Controller, Get, Query, Param } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';

@Controller('discovery')
export class DiscoveryController {
    constructor(private readonly discoveryService: DiscoveryService) { }

    @Get('rooms')
    findAll(@Query() filters: any) {
        return this.discoveryService.findAll(filters);
    }

    @Get('rooms/:id')
    findOne(@Param('id') id: string) {
        return this.discoveryService.findOne(id);
    }
}
