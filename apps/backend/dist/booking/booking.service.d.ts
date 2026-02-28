import { PrismaService } from '../prisma.service';
export declare class BookingService {
    private prisma;
    constructor(prisma: PrismaService);
    createBooking(tenantId: string, roomId: string, data: any): Promise<{
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
