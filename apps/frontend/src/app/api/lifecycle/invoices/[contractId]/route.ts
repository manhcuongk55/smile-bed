import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { contractId: string } }
) {
    const invoices = await prisma.invoice.findMany({
        where: { contractId: params.contractId },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(invoices);
}
