import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';

@Controller('marketplace')
export class MarketplaceController {
    constructor(private readonly marketplaceService: MarketplaceService) { }

    // ── Assets ──────────────────────────────────────────
    @Get('assets')
    listAssets(@Query('propertyId') propertyId?: string) {
        return this.marketplaceService.listAssets(propertyId);
    }

    @Get('assets/:id')
    getAsset(@Param('id') id: string) {
        return this.marketplaceService.getAssetById(id);
    }

    @Post('assets')
    createAsset(
        @Body()
        body: {
            name: string;
            description?: string;
            type: string;
            price: number;
            propertyId?: string;
        },
    ) {
        return this.marketplaceService.createAsset(body);
    }

    // ── Services ────────────────────────────────────────
    @Get('services')
    listServices(@Query('propertyId') propertyId?: string) {
        return this.marketplaceService.listServices(propertyId);
    }

    @Get('services/:id')
    getService(@Param('id') id: string) {
        return this.marketplaceService.getServiceById(id);
    }

    @Post('services')
    createService(
        @Body()
        body: {
            name: string;
            description?: string;
            price: number;
            frequency: string;
            propertyId?: string;
        },
    ) {
        return this.marketplaceService.createService(body);
    }
}
