import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
    request: Request,
    { params }: { params: { roomId: string } }
) {
    const data = await request.json();
    const tenantId = 'dummy-tenant-id';

    const room = await prisma.room.findUnique({ where: { id: params.roomId } });
    if (!room || room.status !== 'AVAILABLE') {
        return NextResponse.json({ error: 'Phòng không khả dụng.' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx: any) => {
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
                endDate: data.endDate
                    ? new Date(data.endDate)
                    : new Date(new Date(data.moveInDate).setFullYear(new Date(data.moveInDate).getFullYear() + 1)),
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

    return NextResponse.json(result);
}
