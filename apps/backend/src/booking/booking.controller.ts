import { Controller, Post, Get, Patch, Body, Param, Query } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post('reserve/:roomId')
    async reserve(@Param('roomId') roomId: string, @Body() data: any) {
        const tenantId = 'dummy-tenant-id';
        return this.bookingService.createBooking(tenantId, roomId, data);
    }

    @Post('cancel-deposit/:contractId')
    async cancelDeposit(@Param('contractId') contractId: string) {
        return this.bookingService.cancelDeposit(contractId);
    }

    // ── Room Viewing Endpoints ──────────────

    @Post('viewing/:roomId')
    async requestViewing(@Param('roomId') roomId: string, @Body() data: any) {
        return this.bookingService.requestViewing(roomId, data);
    }

    @Get('viewings')
    async listViewings(@Query('status') status?: string) {
        return this.bookingService.listViewings(status);
    }

    @Patch('viewing/:id/confirm')
    async confirmViewing(@Param('id') id: string, @Body() data: any) {
        return this.bookingService.updateViewingStatus(id, 'CONFIRMED', data.managerNote);
    }

    @Patch('viewing/:id/cancel')
    async cancelViewing(@Param('id') id: string, @Body() data: any) {
        return this.bookingService.updateViewingStatus(id, 'CANCELLED', data.managerNote);
    }

    @Patch('viewing/:id/complete')
    async completeViewing(@Param('id') id: string, @Body() data: any) {
        return this.bookingService.updateViewingStatus(id, 'COMPLETED', data.managerNote);
    }
}
