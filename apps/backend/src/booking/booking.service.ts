import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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

    // ── Room Viewing ──────────────────────────

    async requestViewing(roomId: string, data: any) {
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
            include: { property: true },
        });
        if (!room) {
            throw new NotFoundException('Không tìm thấy phòng.');
        }

        return this.prisma.roomViewing.create({
            data: {
                roomId,
                guestName: data.guestName,
                guestPhone: data.guestPhone,
                guestEmail: data.guestEmail || null,
                preferredDate: new Date(data.preferredDate),
                preferredTime: data.preferredTime,
                note: data.note || null,
            },
            include: {
                room: { include: { property: true } },
            },
        });
    }

    async listViewings(status?: string) {
        const where = status ? { status: status as any } : {};
        return this.prisma.roomViewing.findMany({
            where,
            include: {
                room: { include: { property: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateViewingStatus(id: string, status: string, managerNote?: string) {
        const viewing = await this.prisma.roomViewing.findUnique({ where: { id } });
        if (!viewing) {
            throw new NotFoundException('Không tìm thấy yêu cầu xem phòng.');
        }

        return this.prisma.roomViewing.update({
            where: { id },
            data: {
                status: status as any,
                managerNote: managerNote || viewing.managerNote,
                confirmedDate: status === 'CONFIRMED' ? new Date() : viewing.confirmedDate,
            },
            include: {
                room: { include: { property: true } },
            },
        });
    }
}
