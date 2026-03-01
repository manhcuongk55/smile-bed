import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MarketplaceService {
    constructor(private prisma: PrismaService) { }

    // ── Assets ──────────────────────────────────────────
    async listAssets(propertyId?: string) {
        return this.prisma.asset.findMany({
            where: propertyId ? { propertyId } : {},
            orderBy: { createdAt: 'desc' },
        });
    }

    async getAssetById(id: string) {
        return this.prisma.asset.findUnique({ where: { id } });
    }

    async createAsset(data: {
        name: string;
        description?: string;
        type: string;
        price: number;
        propertyId?: string;
    }) {
        return this.prisma.asset.create({ data });
    }

    // ── Services ────────────────────────────────────────
    async listServices(propertyId?: string) {
        return this.prisma.service.findMany({
            where: propertyId ? { propertyId } : {},
            orderBy: { createdAt: 'desc' },
        });
    }

    async getServiceById(id: string) {
        return this.prisma.service.findUnique({ where: { id } });
    }

    async createService(data: {
        name: string;
        description?: string;
        price: number;
        frequency: string;
        propertyId?: string;
    }) {
        return this.prisma.service.create({ data });
    }
}
