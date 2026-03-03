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

            // Create deposit transaction (Giao_Dich)
            await tx.transaction.create({
                data: {
                    contractId: contract.id,
                    type: 'DEPOSIT',
                    amount: room.price,
                    description: 'Đặt cọc giữ chỗ online',
                    referralCodeId: data.referralCode || null,
                    status: 'PENDING',
                },
            });

            return contract;
        });
    }

    async cancelDeposit(contractId: string) {
        const contract = await this.prisma.contract.findUnique({
            where: { id: contractId },
            include: {
                transactions: { where: { type: 'DEPOSIT' } },
            },
        });
        if (!contract || contract.status !== 'PENDING') {
            throw new NotFoundException('Hợp đồng không tồn tại hoặc đã được kích hoạt.');
        }

        const depositTx = contract.transactions[0];
        const depositAmount = depositTx?.amount || contract.depositAmount;

        return this.prisma.$transaction(async (tx) => {
            // Terminate contract
            await tx.contract.update({
                where: { id: contractId },
                data: { status: 'TERMINATED', isActive: false, terminatedAt: new Date() },
            });

            // Release room
            await tx.room.update({
                where: { id: contract.roomId },
                data: { status: 'AVAILABLE' },
            });

            // Cancel deposit transaction
            if (depositTx) {
                await tx.transaction.update({
                    where: { id: depositTx.id },
                    data: { status: 'CANCELLED' },
                });
            }

            // If CTV referral exists, create 50% commission for CTV (Smile Home policy)
            if (depositTx?.referralCodeId) {
                const ctvCommission = depositAmount * 0.5;
                await tx.transaction.create({
                    data: {
                        contractId,
                        type: 'COMMISSION',
                        amount: ctvCommission,
                        description: 'Hoa hồng CTV - Khách huỷ cọc (50% theo chính sách Smile Home)',
                        referralCodeId: depositTx.referralCodeId,
                        status: 'COMPLETED',
                    },
                });
            }

            return { message: 'Đã huỷ cọc thành công.' };
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
