import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');

    const assets = await prisma.asset.findMany({
        where: propertyId ? { propertyId } : {},
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(assets);
}

export async function POST(request: Request) {
    const data = await request.json();

    const asset = await prisma.asset.create({ data });

    return NextResponse.json(asset);
}
