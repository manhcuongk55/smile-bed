import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HandoverService {
    constructor(private prisma: PrismaService) { }

    async createChecklist(contractId: string, items: { itemName: string; condition?: string; photoUrl?: string; note?: string }[]) {
        const contract = await this.prisma.contract.findUnique({ where: { id: contractId } });
        if (!contract) throw new NotFoundException('Hợp đồng không tồn tại.');

        return this.prisma.$transaction(
            items.map(item =>
                this.prisma.handoverChecklist.create({
                    data: {
                        contractId,
                        itemName: item.itemName,
                        condition: item.condition || 'GOOD',
                        photoUrl: item.photoUrl || null,
                        note: item.note || null,
                    },
                })
            )
        );
    }

    async getChecklist(contractId: string) {
        return this.prisma.handoverChecklist.findMany({
            where: { contractId },
            orderBy: { checkedAt: 'asc' },
        });
    }

    async updateChecklistItem(id: string, data: { condition?: string; photoUrl?: string; note?: string }) {
        const item = await this.prisma.handoverChecklist.findUnique({ where: { id } });
        if (!item) throw new NotFoundException('Không tìm thấy mục bàn giao.');

        return this.prisma.handoverChecklist.update({
            where: { id },
            data: {
                condition: data.condition || item.condition,
                photoUrl: data.photoUrl !== undefined ? data.photoUrl : item.photoUrl,
                note: data.note !== undefined ? data.note : item.note,
            },
        });
    }
}
