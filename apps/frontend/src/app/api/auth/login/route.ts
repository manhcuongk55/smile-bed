import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'smile-bed-secret-key';

export async function POST(request: Request) {
    const data = await request.json();

    const user = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    return NextResponse.json({
        access_token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
        },
    });
}
