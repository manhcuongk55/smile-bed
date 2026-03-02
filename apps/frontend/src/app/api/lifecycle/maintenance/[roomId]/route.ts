import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { roomId: string } }
) {
    const requests = await prisma.maintenanceRequest.findMany({
        where: { roomId: params.roomId },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(requests);
}
