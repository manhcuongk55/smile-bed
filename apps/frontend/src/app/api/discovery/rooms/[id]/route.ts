import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const room = await prisma.room.findUnique({
        where: { id: params.id },
        include: {
            property: {
                include: {
                    nearbyPOIs: true,
                },
            },
        },
    });

    if (!room) {
        return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room);
}
