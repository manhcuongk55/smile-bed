import { NextResponse } from 'next/server';

// Mock data for mystery map
const MOCK_PUZZLE_PIECES = [
    { id: 'p1', name: 'Cầu Giấy 1', rarity: 'COMMON', mapRegion: 'A', userId: 'u1' },
    { id: 'p2', name: 'Xuân Thủy 2', rarity: 'UNCOMMON', mapRegion: 'A', userId: 'u1' },
    { id: 'p3', name: 'Đống Đa 6', rarity: 'UNCOMMON', mapRegion: 'B', userId: 'u1' },
    { id: 'p4', name: 'Thanh Xuân 10', rarity: 'COMMON', mapRegion: 'D', userId: 'u1' },
];

const MOCK_QUEST = {
    id: 'q1',
    title: 'Nhiệm vụ tháng 3: Tiếp Sức Xanh 🌿',
    description: 'Cả tòa nhà giao được 500 đơn tiếp sức → Mở Mega Blind Box!',
    targetActions: 500,
    currentActions: 387,
    isCompleted: false,
    daysLeft: 8,
    participants: 42,
};

const MOCK_EXCHANGES = [
    {
        id: 'ex1',
        offerer: { id: 'u2', name: 'Thanh', room: 'P.302' },
        offeredPiece: { name: 'Láng Hạ 5', rarity: 'COMMON' },
        wantedPieceName: 'Cầu Giấy 1',
        message: 'Mình dư mảnh này, ai đổi không? 😊',
        status: 'OPEN',
    },
];

export async function GET() {
    return NextResponse.json({
        success: true,
        data: {
            pieces: MOCK_PUZZLE_PIECES,
            quest: MOCK_QUEST,
            exchanges: MOCK_EXCHANGES,
        },
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const { action } = body;

    if (action === 'exchange') {
        return NextResponse.json({
            success: true,
            message: 'Yêu cầu đổi mảnh ghép đã được gửi!',
        }, { status: 201 });
    }

    if (action === 'relay') {
        // Award a puzzle piece for completing a relay task
        const newPiece = {
            id: `p-${Date.now()}`,
            name: 'Random Piece',
            rarity: Math.random() > 0.7 ? 'RARE' : Math.random() > 0.5 ? 'UNCOMMON' : 'COMMON',
            mapRegion: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
            earnedFrom: 'Relay task',
        };

        return NextResponse.json({
            success: true,
            data: newPiece,
            message: 'Bạn đã nhận được một mảnh ghép mới! 🎉',
        }, { status: 201 });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
}
