import { NextResponse } from 'next/server';

// Mock data for challenge videos
const MOCK_VIDEOS = [
    {
        id: '1',
        title: 'Trước và sau khi có bạn share phòng 🏠',
        author: { id: 'u1', name: 'Minh Anh' },
        format: 'BEFORE_AFTER',
        thumbnailUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=500&fit=crop',
        likes: 2847,
        shares: 456,
        views: 15200,
        points: 850,
        hashtags: '#ShareVui,#BeforeAfter',
        isApproved: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Một ngày ở share house quận 7 ☀️',
        author: { id: 'u2', name: 'Thanh Tùng' },
        format: 'A_DAY_IN_LIFE',
        thumbnailUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=500&fit=crop',
        likes: 1923,
        shares: 312,
        views: 10800,
        points: 620,
        hashtags: '#ShareVui,#MotNgay',
        isApproved: true,
        createdAt: new Date().toISOString(),
    },
];

export async function GET() {
    return NextResponse.json({
        success: true,
        data: MOCK_VIDEOS,
        total: MOCK_VIDEOS.length,
    });
}

export async function POST(request: Request) {
    const body = await request.json();

    // Mock creating a new video submission
    const newVideo = {
        id: `v-${Date.now()}`,
        ...body,
        likes: 0,
        shares: 0,
        views: 0,
        points: 10, // Base points for uploading
        isApproved: false,
        createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
        success: true,
        data: newVideo,
        message: 'Video đã được gửi! Đội ngũ sẽ kiểm duyệt trong 24h.',
    }, { status: 201 });
}
