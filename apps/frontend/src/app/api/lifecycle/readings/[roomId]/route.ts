import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { roomId: string } }
) {
    const readings = await prisma.reading.findMany({
        where: { roomId: params.roomId },
        orderBy: { readingDate: 'desc' },
        take: 12,
    });

    return NextResponse.json(readings);
}
