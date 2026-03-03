import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SafetyService {
    constructor(private prisma: PrismaService) { }

    async getDocuments(propertyId: string) {
        return this.prisma.safetyDocument.findMany({
            where: { propertyId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async createDocument(data: { propertyId: string; title: string; type: string; url: string }) {
        return this.prisma.safetyDocument.create({ data });
    }

    async getDocumentsForContract(contractId: string) {
        const contract = await this.prisma.contract.findUnique({
            where: { id: contractId },
            include: { room: { include: { property: true } } },
        });
        if (!contract) return [];

        return this.prisma.safetyDocument.findMany({
            where: { propertyId: contract.room.property.id },
            orderBy: { createdAt: 'desc' },
        });
    }
}
