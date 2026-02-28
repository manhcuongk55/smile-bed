import { BookingService } from './booking.service';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    reserve(roomId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        type: string;
        startDate: Date;
        endDate: Date | null;
        rentAmount: number;
        depositAmount: number;
        isActive: boolean;
        roomId: string;
        tenantId: string;
    }>;
}
