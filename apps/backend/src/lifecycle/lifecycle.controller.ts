import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { LifecycleService } from './lifecycle.service';

@Controller('lifecycle')
export class LifecycleController {
    constructor(private readonly lifecycleService: LifecycleService) { }

    // ── Invoices ────────────────────────────────────────
    @Get('invoices/:contractId')
    getInvoices(@Param('contractId') contractId: string) {
        return this.lifecycleService.getInvoicesByContract(contractId);
    }

    @Post('invoices')
    createInvoice(
        @Body()
        body: {
            contractId: string;
            period: string;
            electricityCost: number;
            waterCost: number;
            baseRent: number;
        },
    ) {
        return this.lifecycleService.createInvoice(body);
    }

    @Patch('invoices/:id/pay')
    payInvoice(@Param('id') id: string) {
        return this.lifecycleService.markInvoicePaid(id);
    }

    // ── Maintenance ─────────────────────────────────────
    @Get('maintenance/:roomId')
    getMaintenanceRequests(@Param('roomId') roomId: string) {
        return this.lifecycleService.getMaintenanceByRoom(roomId);
    }

    @Post('maintenance')
    createMaintenanceRequest(
        @Body()
        body: {
            roomId: string;
            tenantId: string;
            description: string;
            imageUrl?: string;
        },
    ) {
        return this.lifecycleService.createMaintenanceRequest(body);
    }

    @Patch('maintenance/:id/status')
    updateMaintenanceStatus(
        @Param('id') id: string,
        @Body('status') status: 'IN_PROGRESS' | 'DONE',
    ) {
        return this.lifecycleService.updateMaintenanceStatus(id, status);
    }

    // ── Readings ────────────────────────────────────────
    @Get('readings/:roomId')
    getReadings(@Param('roomId') roomId: string) {
        return this.lifecycleService.getReadingsByRoom(roomId);
    }

    @Post('readings')
    addReading(
        @Body()
        body: {
            roomId: string;
            electricityReading: number;
            waterReading: number;
        },
    ) {
        return this.lifecycleService.addReading(body);
    }
}
