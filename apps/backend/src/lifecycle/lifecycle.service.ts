import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LifecycleService {
    constructor(private prisma: PrismaService) { }

    // ── Invoices ────────────────────────────────────────
    async getInvoicesByContract(contractId: string) {
        return this.prisma.invoice.findMany({
            where: { contractId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async createInvoice(data: {
        contractId: string;
        period: string;
        electricityCost: number;
        waterCost: number;
        baseRent: number;
    }) {
        const total = data.electricityCost + data.waterCost + data.baseRent;
        return this.prisma.invoice.create({
            data: { ...data, total },
        });
    }

    async markInvoicePaid(invoiceId: string) {
        return this.prisma.invoice.update({
            where: { id: invoiceId },
            data: { status: 'PAID' },
        });
    }

    // ── Maintenance ─────────────────────────────────────
    async getMaintenanceByRoom(roomId: string) {
        return this.prisma.maintenanceRequest.findMany({
            where: { roomId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async createMaintenanceRequest(data: {
        roomId: string;
        tenantId: string;
        description: string;
        imageUrl?: string;
    }) {
        return this.prisma.maintenanceRequest.create({ data });
    }

    async updateMaintenanceStatus(id: string, status: 'IN_PROGRESS' | 'DONE') {
        return this.prisma.maintenanceRequest.update({
            where: { id },
            data: { status },
        });
    }

    // ── Meter Readings ──────────────────────────────────
    async addReading(data: {
        roomId: string;
        electricityReading: number;
        waterReading: number;
    }) {
        return this.prisma.reading.create({ data });
    }

    async getReadingsByRoom(roomId: string) {
        return this.prisma.reading.findMany({
            where: { roomId },
            orderBy: { readingDate: 'desc' },
            take: 12,
        });
    }
}
