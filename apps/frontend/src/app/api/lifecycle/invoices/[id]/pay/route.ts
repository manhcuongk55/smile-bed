import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const invoice = await prisma.invoice.update({
        where: { id: params.id },
        data: { status: 'PAID' },
    });

    return NextResponse.json(invoice);
}
