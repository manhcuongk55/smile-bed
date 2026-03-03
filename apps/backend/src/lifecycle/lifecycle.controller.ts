import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { LifecycleService } from './lifecycle.service';
import { HandoverService } from './handover.service';
import { CheckoutService } from './checkout.service';
import { SafetyService } from './safety.service';

@Controller('lifecycle')
export class LifecycleController {
    constructor(
        private readonly lifecycleService: LifecycleService,
        private readonly handoverService: HandoverService,
        private readonly checkoutService: CheckoutService,
        private readonly safetyService: SafetyService,
    ) { }

    // ── Invoices ────────────────────────────────────────
    @Get('invoices/:contractId')
    getInvoices(@Param('contractId') contractId: string) {
        return this.lifecycleService.getInvoicesByContract(contractId);
    }

    @Post('invoices')
    createInvoice(@Body() body: any) {
        return this.lifecycleService.createInvoice(body);
    }

    @Post('invoices/generate')
    generateMonthlyInvoice(@Body() body: { contractId: string; period: string }) {
        return this.lifecycleService.generateMonthlyInvoice(body.contractId, body.period);
    }

    @Patch('invoices/:id/pay')
    payInvoice(@Param('id') id: string) {
        return this.lifecycleService.markInvoicePaid(id);
    }

    // ── Contract Activation ─────────────────────────────
    @Post('contracts/:id/activate')
    activateContract(@Param('id') id: string, @Body() body: any) {
        return this.lifecycleService.activateContract(id, body);
    }

    // ── Violations & Rules ──────────────────────────────
    @Get('rules')
    getSOPRules() {
        return this.lifecycleService.getSOPRules();
    }

    @Get('violations/:contractId')
    getViolations(@Param('contractId') contractId: string) {
        return this.lifecycleService.getViolations(contractId);
    }

    @Post('violations')
    addViolation(@Body() body: any) {
        return this.lifecycleService.addViolation(body);
    }

    // ── Maintenance ─────────────────────────────────────
    @Get('maintenance/:roomId')
    getMaintenanceRequests(@Param('roomId') roomId: string) {
        return this.lifecycleService.getMaintenanceByRoom(roomId);
    }

    @Post('maintenance')
    createMaintenanceRequest(@Body() body: any) {
        return this.lifecycleService.createMaintenanceRequest(body);
    }

    @Patch('maintenance/:id/status')
    updateMaintenanceStatus(@Param('id') id: string, @Body('status') status: 'IN_PROGRESS' | 'DONE') {
        return this.lifecycleService.updateMaintenanceStatus(id, status);
    }

    // ── Readings ────────────────────────────────────────
    @Get('readings/:roomId')
    getReadings(@Param('roomId') roomId: string) {
        return this.lifecycleService.getReadingsByRoom(roomId);
    }

    @Post('readings')
    addReading(@Body() body: any) {
        return this.lifecycleService.addReading(body);
    }

    // ── Handover Checklist ──────────────────────────────
    @Get('handover/:contractId')
    getChecklist(@Param('contractId') contractId: string) {
        return this.handoverService.getChecklist(contractId);
    }

    @Post('handover/:contractId')
    createChecklist(@Param('contractId') contractId: string, @Body() body: { items: any[] }) {
        return this.handoverService.createChecklist(contractId, body.items);
    }

    @Patch('handover/item/:id')
    updateChecklistItem(@Param('id') id: string, @Body() body: any) {
        return this.handoverService.updateChecklistItem(id, body);
    }

    // ── Checkout ────────────────────────────────────────
    @Post('checkout')
    requestCheckout(@Body() body: { contractId: string; targetDate: string; note?: string }) {
        return this.checkoutService.requestCheckout(body.contractId, body.targetDate, body.note);
    }

    @Post('checkout/:id/reconcile')
    reconcileDeposit(@Param('id') id: string) {
        return this.checkoutService.reconcileDeposit(id);
    }

    @Post('checkout/:id/complete')
    completeCheckout(@Param('id') id: string) {
        return this.checkoutService.completeCheckout(id);
    }

    @Get('checkout/:contractId')
    getCheckoutRequests(@Param('contractId') contractId: string) {
        return this.checkoutService.getCheckoutByContract(contractId);
    }

    // ── Safety / PCCC ───────────────────────────────────
    @Get('safety/:propertyId')
    getSafetyDocs(@Param('propertyId') propertyId: string) {
        return this.safetyService.getDocuments(propertyId);
    }

    @Get('safety/contract/:contractId')
    getSafetyDocsForContract(@Param('contractId') contractId: string) {
        return this.safetyService.getDocumentsForContract(contractId);
    }

    @Post('safety')
    createSafetyDoc(@Body() body: any) {
        return this.safetyService.createDocument(body);
    }
}
