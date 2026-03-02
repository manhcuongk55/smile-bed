import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const location = searchParams.get('location');
    const verifiedOnly = searchParams.get('verifiedOnly');

    const rooms = await prisma.room.findMany({
        where: {
            price: {
                gte: minPrice ? parseFloat(minPrice) : undefined,
                lte: maxPrice ? parseFloat(maxPrice) : undefined,
            },
            status: 'AVAILABLE',
            property: {
                address: location ? { contains: location } : undefined,
                owner: verifiedOnly === 'true' ? { role: 'PROPERTY_OWNER' } : undefined,
            },
        },
        include: {
            property: {
                include: {
                    nearbyPOIs: true,
                },
            },
        },
    });

    return NextResponse.json(rooms);
}
