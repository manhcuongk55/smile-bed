import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CheckoutService {
    constructor(private prisma: PrismaService) { }

    async requestCheckout(contractId: string, targetDate: string, note?: string) {
        const contract = await this.prisma.contract.findUnique({
            where: { id: contractId },
            include: { invoices: { where: { status: 'UNPAID' } } },
        });
        if (!contract || contract.status === 'TERMINATED') {
            throw new NotFoundException('Hợp đồng không tồn tại hoặc đã thanh lý.');
        }

        const target = new Date(targetDate);
        const now = new Date();
        const daysDiff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff < 30) {
            throw new BadRequestException('Cần thông báo trước ít nhất 30 ngày.');
        }

        return this.prisma.checkoutRequest.create({
            data: {
                contractId,
                targetDate: target,
                depositAmount: contract.depositAmount,
                note: note || null,
            },
        });
    }

    async reconcileDeposit(checkoutId: string) {
        const checkout = await this.prisma.checkoutRequest.findUnique({
            where: { id: checkoutId },
            include: {
                contract: {
                    include: {
                        invoices: { where: { status: 'UNPAID' } },
                        violations: { where: { invoiceId: null } },
                        handoverChecklist: true,
                    },
                },
            },
        });

        if (!checkout) throw new NotFoundException('Yêu cầu trả phòng không tồn tại.');

        const contract = checkout.contract;
        const unpaidInvoices = contract.invoices.reduce((sum, inv) => sum + inv.total, 0);
        const unpaidViolations = contract.violations.reduce((sum, v) => sum + v.penaltyAmount, 0);
        const damagedItems = contract.handoverChecklist.filter(item => item.condition === 'DAMAGED');
        const damageDeduction = damagedItems.length * 200000; // 200k per damaged item

        const totalDeductions = unpaidInvoices + unpaidViolations + damageDeduction;
        const refundAmount = Math.max(0, checkout.depositAmount - totalDeductions);

        const deductions = JSON.stringify({
            unpaidInvoices,
            unpaidViolations,
            damageDeduction,
            damagedItemCount: damagedItems.length,
            totalDeductions,
        });

        return this.prisma.checkoutRequest.update({
            where: { id: checkoutId },
            data: {
                deductions,
                refundAmount,
                status: 'RECONCILED',
            },
        });
    }

    async completeCheckout(checkoutId: string) {
        const checkout = await this.prisma.checkoutRequest.findUnique({
            where: { id: checkoutId },
            include: { contract: { include: { room: true } } },
        });

        if (!checkout) throw new NotFoundException('Yêu cầu trả phòng không tồn tại.');

        return this.prisma.$transaction([
            // Set contract as terminated
            this.prisma.contract.update({
                where: { id: checkout.contractId },
                data: {
                    status: 'TERMINATED',
                    isActive: false,
                    terminatedAt: new Date(),
                },
            }),
            // Set room back to available
            this.prisma.room.update({
                where: { id: checkout.contract.roomId },
                data: { status: 'AVAILABLE' },
            }),
            // Create refund transaction
            this.prisma.transaction.create({
                data: {
                    contractId: checkout.contractId,
                    type: 'REFUND',
                    amount: checkout.refundAmount || 0,
                    description: 'Hoàn trả tiền cọc sau khi đối soát',
                    status: 'COMPLETED',
                },
            }),
            // Mark checkout complete
            this.prisma.checkoutRequest.update({
                where: { id: checkoutId },
                data: { status: 'COMPLETED' },
            }),
        ]);
    }

    async getCheckoutByContract(contractId: string) {
        return this.prisma.checkoutRequest.findMany({
            where: { contractId },
            orderBy: { createdAt: 'desc' },
        });
    }
}
