import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = status ? { status: status as any } : {};
    const viewings = await prisma.roomViewing.findMany({
        where,
        include: {
            room: { include: { property: true } },
        },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(viewings);
}
