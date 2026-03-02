import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const data = await request.json();

    const viewing = await prisma.roomViewing.findUnique({ where: { id: params.id } });
    if (!viewing) {
        return NextResponse.json({ error: 'Không tìm thấy yêu cầu xem phòng.' }, { status: 404 });
    }

    const updated = await prisma.roomViewing.update({
        where: { id: params.id },
        data: {
            status: 'COMPLETED',
            managerNote: data.managerNote || viewing.managerNote,
        },
        include: {
            room: { include: { property: true } },
        },
    });

    return NextResponse.json(updated);
}
