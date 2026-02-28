import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService) { }

    async createBooking(tenantId: string, roomId: string, data: any) {
        const room = await this.prisma.room.findUnique({ where: { id: roomId } });
        if (!room || room.status !== 'AVAILABLE') {
            throw new BadRequestException('Phòng không khả dụng.');
        }

        return this.prisma.$transaction(async (tx) => {
            // Find or create User with role TENANT if not exists
            const tenant = await tx.tenant.upsert({
                where: { userId: tenantId },
                update: {},
                create: {
                    userId: tenantId,
                    deposit: room.price,
                },
            });

            const contract = await tx.contract.create({
                data: {
                    tenantId: tenant.id,
                    roomId: room.id,
                    startDate: new Date(data.moveInDate),
                    endDate: data.endDate ? new Date(data.endDate) : new Date(new Date(data.moveInDate).setFullYear(new Date(data.moveInDate).getFullYear() + 1)),
                    rentAmount: room.price,
                    depositAmount: room.price,
                    status: 'PENDING',
                },
            });

            await tx.room.update({
                where: { id: room.id },
                data: { status: 'RESERVED' },
            });

            return contract;
        });
    }
}
