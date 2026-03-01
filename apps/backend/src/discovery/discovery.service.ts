import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DiscoveryService {
    constructor(private prisma: PrismaService) { }

    async findAll(filters: any) {
        const { minPrice, maxPrice, location, verifiedOnly } = filters;

        return this.prisma.room.findMany({
            where: {
                price: {
                    gte: minPrice ? parseFloat(minPrice) : undefined,
                    lte: maxPrice ? parseFloat(maxPrice) : undefined,
                },
                status: 'AVAILABLE',
                property: {
                    address: location ? { contains: location } : undefined,
                    owner: verifiedOnly === 'true' ? { role: 'PROPERTY_OWNER' } : undefined,
                },
            },
            include: {
                property: {
                    include: {
                        nearbyPOIs: true,
                    },
                },
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.room.findUnique({
            where: { id },
            include: {
                property: {
                    include: {
                        nearbyPOIs: true,
                    },
                },
            },
        });
    }
}
