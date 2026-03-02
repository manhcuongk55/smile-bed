import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');

    const services = await prisma.service.findMany({
        where: propertyId ? { propertyId } : {},
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(services);
}

export async function POST(request: Request) {
    const data = await request.json();

    const service = await prisma.service.create({ data });

    return NextResponse.json(service);
}
