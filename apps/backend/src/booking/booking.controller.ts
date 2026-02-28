import { Controller, Post, Body, Param } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post('reserve/:roomId')
    async reserve(@Param('roomId') roomId: string, @Body() data: any) {
        const tenantId = 'dummy-tenant-id';
        return this.bookingService.createBooking(tenantId, roomId, data);
    }
}
