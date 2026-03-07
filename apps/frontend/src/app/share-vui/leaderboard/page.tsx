'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, Star, Gift, Crown, Medal, ChevronRight, Flame, Video, Heart, TrendingUp } from 'lucide-react';

const LEADERBOARD = [
    { rank: 1, name: 'Đức Anh', avatar: '🧑‍💼', points: 4500, videos: 12, likes: 8200, property: 'Share House Q7', badge: '👑', tier: 'gold' },
    { rank: 2, name: 'Hà Linh', avatar: '👩‍🎨', points: 3800, videos: 9, likes: 6100, property: 'Share House Bình Thạnh', badge: '🥈', tier: 'silver' },
    { rank: 3, name: 'Minh Anh', avatar: '🧑‍🎤', points: 3200, videos: 8, likes: 5400, property: 'Share Room Phú Nhuận', badge: '🥉', tier: 'bronze' },
    { rank: 4, name: 'Thanh Tùng', avatar: '👨‍💻', points: 2900, videos: 7, likes: 4800, property: 'Share House Q3', badge: '', tier: '' },
    { rank: 5, name: 'Phương Vy', avatar: '👩‍🦰', points: 2400, videos: 6, likes: 3900, property: 'Share Room Thủ Đức', badge: '', tier: '' },
    { rank: 6, name: 'Hoàng Nam', avatar: '🧑‍🔬', points: 2100, videos: 5, likes: 3200, property: 'Share House Gò Vấp', badge: '', tier: '' },
    { rank: 7, name: 'Thu Hà', avatar: '👩‍🏫', points: 1800, videos: 5, likes: 2700, property: 'Share Room Q1', badge: '', tier: '' },
    { rank: 8, name: 'Quang Huy', avatar: '🧑‍🎓', points: 1500, videos: 4, likes: 2100, property: 'Share House Tân Bình', badge: '', tier: '' },
    { rank: 9, name: 'Ngọc Mai', avatar: '👩‍💻', points: 1200, videos: 3, likes: 1800, property: 'Share Room Q10', badge: '', tier: '' },
    { rank: 10, name: 'Văn Sơn', avatar: '🧑‍🚀', points: 1000, videos: 3, likes: 1500, property: 'Share House Q2', badge: '', tier: '' },
];

const REWARDS = [
    {
        tier: 'gold',
        title: 'Hạng Vàng',
        icon: '🏆',
        color: 'from-amber-400 to-yellow-500',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        minPoints: 4000,
        prizes: [
            'Miễn phí 100% tiền trọ 1 tháng',
            'Voucher ShopeeFood 1 triệu',
            'Loa JBL Bluetooth',
            'Badge "Viral King/Queen" vĩnh viễn trên profile',
        ],
    },
    {
        tier: 'silver',
        title: 'Hạng Bạc',
        icon: '🥈',
        color: 'from-slate-300 to-slate-500',
        bgColor: 'bg-slate-50',
        borderColor: 'border-slate-200',
        minPoints: 3000,
        prizes: [
            'Giảm 50% tiền trọ 1 tháng',
            'Voucher ShopeeFood 500k',
            'Tai nghe Bluetooth',
            'Badge "Content Creator" trên profile',
        ],
    },
    {
        tier: 'bronze',
        title: 'Hạng Đồng',
        icon: '🥉',
        color: 'from-orange-400 to-amber-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        minPoints: 2000,
        prizes: [
            'Giảm giá điện nước 1 tháng',
            'Voucher GrabFood 200k',
            'Bộ đồ dùng nhà bếp',
            'Badge "Rising Star" trên profile',
        ],
    },
];

function formatNumber(num: number) {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
}

export default function LeaderboardPage() {
    return (
        <div className="bg-slate-50 min-h-screen pt-20 sm:pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/share-vui">
                        <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                            Bảng Xếp Hạng <span className="gradient-text">Tháng 3</span>
                        </h1>
                        <p className="text-sm text-slate-400 font-medium">Top creators nhận phần thưởng cuối tháng!</p>
                    </div>
                </div>

                {/* Top 3 Podium */}
                <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
                    {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((creator, i) => {
                        const heights = ['h-32', 'h-40', 'h-28'];
                        const delays = [0.2, 0.1, 0.3];
                        const podiumColors = [
                            'from-slate-200 to-slate-400',
                            'from-amber-300 to-yellow-500',
                            'from-orange-300 to-amber-500',
                        ];
                        return (
                            <motion.div
                                key={creator.rank}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: delays[i] }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-4xl mb-2">{creator.avatar}</div>
                                <p className="text-sm font-black text-slate-900 mb-1">{creator.name}</p>
                                <p className="text-xs text-indigo-600 font-bold mb-2">{formatNumber(creator.points)} pts</p>
                                <div className={`w-full ${heights[i]} bg-gradient-to-t ${podiumColors[i]} rounded-t-2xl flex items-start justify-center pt-4`}>
                                    <span className="text-3xl">{creator.badge}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Full Leaderboard */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-100">
                                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                                    Bảng xếp hạng đầy đủ
                                </h2>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {LEADERBOARD.map((creator, i) => (
                                    <motion.div
                                        key={creator.rank}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className={`flex items-center gap-4 p-4 sm:p-5 hover:bg-slate-50/50 transition-colors ${
                                            creator.rank <= 3 ? 'bg-gradient-to-r from-amber-50/30 to-transparent' : ''
                                        }`}
                                    >
                                        <span className={`text-lg font-black w-8 text-center ${
                                            creator.rank === 1 ? 'text-amber-500' :
                                            creator.rank === 2 ? 'text-slate-400' :
                                            creator.rank === 3 ? 'text-orange-400' :
                                            'text-slate-300'
                                        }`}>
                                            {creator.badge || `#${creator.rank}`}
                                        </span>
                                        <span className="text-2xl sm:text-3xl">{creator.avatar}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                                {creator.name}
                                                {creator.rank <= 3 && <Flame className="w-3 h-3 text-orange-500" />}
                                            </p>
                                            <p className="text-xs text-slate-400 truncate">{creator.property}</p>
                                        </div>
                                        <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400">
                                            <span className="flex items-center gap-1"><Video className="w-3 h-3" /> {creator.videos}</span>
                                            <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {formatNumber(creator.likes)}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-indigo-600">{formatNumber(creator.points)}</p>
                                            <p className="text-[10px] text-slate-400">điểm</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Rewards Panel */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <Gift className="w-5 h-5 text-rose-500" />
                            Phần Thưởng Tháng
                        </h2>
                        {REWARDS.map((reward, i) => (
                            <motion.div
                                key={reward.tier}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className={`${reward.bgColor} rounded-3xl border ${reward.borderColor} p-5 relative overflow-hidden`}
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/40 to-transparent rounded-bl-full" />
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">{reward.icon}</span>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">{reward.title}</p>
                                        <p className="text-[10px] text-slate-500 font-semibold">Từ {formatNumber(reward.minPoints)} điểm</p>
                                    </div>
                                </div>
                                <ul className="space-y-1.5">
                                    {reward.prizes.map((prize, j) => (
                                        <li key={j} className="text-xs text-slate-600 flex items-start gap-2">
                                            <Star className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                                            {prize}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}

                        {/* CTA */}
                        <Link href="/share-vui/submit">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-2xl font-black text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                            >
                                <Video className="w-5 h-5" />
                                Tham gia ngay để nhận thưởng
                                <ChevronRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
