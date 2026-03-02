import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    const data = await request.json();
    const total = data.electricityCost + data.waterCost + data.baseRent;

    const invoice = await prisma.invoice.create({
        data: { ...data, total },
    });

    return NextResponse.json(invoice);
}
