import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
    request: Request,
    { params }: { params: { roomId: string } }
) {
    const data = await request.json();

    const room = await prisma.room.findUnique({
        where: { id: params.roomId },
        include: { property: true },
    });
    if (!room) {
        return NextResponse.json({ error: 'Không tìm thấy phòng.' }, { status: 404 });
    }

    const viewing = await prisma.roomViewing.create({
        data: {
            roomId: params.roomId,
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

    return NextResponse.json(viewing);
}
