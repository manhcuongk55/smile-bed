'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Puzzle, ArrowRight, Gift, Users, Flame, Star, Zap, Trophy, Package, Sparkles } from 'lucide-react';
import { useState } from 'react';

const PUZZLE_GRID = [
    { id: 1, name: 'Cầu Giấy 1', region: 'A', collected: true, rarity: 'common', emoji: '🏠' },
    { id: 2, name: 'Xuân Thủy 2', region: 'A', collected: true, rarity: 'uncommon', emoji: '🌳' },
    { id: 3, name: 'Trần Duy Hưng 3', region: 'A', collected: false, rarity: 'rare', emoji: '🏙️' },
    { id: 4, name: 'Nguyễn Trãi 4', region: 'B', collected: true, rarity: 'common', emoji: '🛒' },
    { id: 5, name: 'Láng Hạ 5', region: 'B', collected: false, rarity: 'common', emoji: '☕' },
    { id: 6, name: 'Đống Đa 6', region: 'B', collected: true, rarity: 'uncommon', emoji: '📚' },
    { id: 7, name: 'Ba Đình 7', region: 'C', collected: false, rarity: 'legendary', emoji: '⭐' },
    { id: 8, name: 'Hoàn Kiếm 8', region: 'C', collected: true, rarity: 'rare', emoji: '🏛️' },
    { id: 9, name: 'Hai Bà Trưng 9', region: 'C', collected: false, rarity: 'uncommon', emoji: '🌸' },
    { id: 10, name: 'Thanh Xuân 10', region: 'D', collected: true, rarity: 'common', emoji: '🎵' },
    { id: 11, name: 'Hoàng Mai 11', region: 'D', collected: false, rarity: 'common', emoji: '🍜' },
    { id: 12, name: 'Long Biên 12', region: 'D', collected: true, rarity: 'rare', emoji: '🌉' },
];

const BUILDING_QUEST = {
    title: 'Nhiệm vụ tháng 3: Tiếp Sức Xanh 🌿',
    description: 'Cả tòa nhà giao được 500 đơn tiếp sức → Mở Mega Blind Box!',
    targetActions: 500,
    currentActions: 387,
    daysLeft: 8,
    participants: 42,
};

const RECENT_ACTIVITIES = [
    { user: '🧑‍💻 Thanh', action: 'nhận hàng tại Hub cho ', target: 'Phòng 302', time: '5 phút trước', piece: '🏠 Cầu Giấy 1' },
    { user: '👩‍🎨 Linh', action: 'xách đồ giúp ', target: 'Phòng 518', time: '12 phút trước', piece: '📚 Đống Đa 6' },
    { user: '🧑‍🎤 Minh', action: 'giao hàng relay cho ', target: 'Phòng 201', time: '25 phút trước', piece: '🎵 Thanh Xuân 10' },
    { user: '👩‍🍳 Ngọc', action: 'nhận hàng tại Hub cho ', target: 'Phòng 410', time: '1 giờ trước', piece: '🌉 Long Biên 12' },
];

const BLIND_BOX_REWARDS = [
    { icon: '🥐', title: 'Bữa sáng 0 đồng', desc: 'Tại quán xôi đầu ngõ', type: 'voucher', rarity: 'common' },
    { icon: '⚡', title: 'Ưu tiên nhận đơn', desc: 'Phí tiếp sức cao hơn 2x', type: 'card', rarity: 'uncommon' },
    { icon: '💧', title: 'Miễn phí nước tháng tới', desc: 'Tiết kiệm thêm!', type: 'service', rarity: 'rare' },
    { icon: '🦸', title: 'Hiệp sĩ hành lang', desc: 'Danh hiệu trên profile', type: 'badge', rarity: 'legendary' },
];

function getRarityColor(rarity: string) {
    switch (rarity) {
        case 'common': return 'border-slate-300 bg-slate-50';
        case 'uncommon': return 'border-emerald-400 bg-emerald-50';
        case 'rare': return 'border-indigo-400 bg-indigo-50';
        case 'legendary': return 'border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-50';
        default: return 'border-slate-200 bg-white';
    }
}

function getRarityBadge(rarity: string) {
    switch (rarity) {
        case 'common': return { label: 'Phổ thông', color: 'bg-slate-100 text-slate-600' };
        case 'uncommon': return { label: 'Ít gặp', color: 'bg-emerald-100 text-emerald-700' };
        case 'rare': return { label: 'Hiếm', color: 'bg-indigo-100 text-indigo-700' };
        case 'legendary': return { label: 'Huyền thoại', color: 'bg-amber-100 text-amber-700' };
        default: return { label: '', color: '' };
    }
}

export default function MysteryMapPage() {
    const [showBlindBox, setShowBlindBox] = useState(false);
    const [revealedReward, setRevealedReward] = useState<number | null>(null);
    const collectedCount = PUZZLE_GRID.filter(p => p.collected).length;
    const progress = Math.round((BUILDING_QUEST.currentActions / BUILDING_QUEST.targetActions) * 100);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Map className="w-5 h-5 text-white" />
                    </div>
                    Bản Đồ Bí Mật <span className="gradient-text">Smile</span>
                </h1>
                <p className="text-sm text-slate-400 mt-1 font-medium">
                    Tiếp sức hàng xóm · Thu thập mảnh ghép · Nhận phần thưởng 🎁
                </p>
            </div>

            {/* Building Quest Progress */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">Nhiệm vụ chung</p>
                            <h2 className="text-xl font-black">{BUILDING_QUEST.title}</h2>
                            <p className="text-sm text-indigo-200 mt-1">{BUILDING_QUEST.description}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-black">{BUILDING_QUEST.daysLeft}</p>
                            <p className="text-xs text-indigo-200">ngày còn lại</p>
                        </div>
                    </div>
                    <div className="bg-white/20 rounded-full h-4 overflow-hidden mb-3">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full relative"
                        >
                            <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                        </motion.div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-bold">{BUILDING_QUEST.currentActions} / {BUILDING_QUEST.targetActions} đơn</span>
                        <span className="flex items-center gap-1 text-indigo-200">
                            <Users className="w-4 h-4" /> {BUILDING_QUEST.participants} cư dân tham gia
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Puzzle Board */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <Puzzle className="w-5 h-5 text-indigo-600" />
                        Bộ Sưu Tập Mảnh Ghép
                        <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                            {collectedCount}/{PUZZLE_GRID.length}
                        </span>
                    </h2>
                    <Link href="/dashboard/mystery-map/exchange">
                        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                            Đổi mảnh ghép <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                    {PUZZLE_GRID.map((piece, i) => {
                        const rarityBadge = getRarityBadge(piece.rarity);
                        return (
                            <motion.div
                                key={piece.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className={`puzzle-piece aspect-square flex-col gap-1 p-3 ${
                                    piece.collected ? 'collected' : ''
                                } ${piece.rarity === 'legendary' && piece.collected ? 'legendary' : ''}`}
                            >
                                {piece.collected ? (
                                    <>
                                        <span className="text-2xl">{piece.emoji}</span>
                                        <span className="text-[9px] font-bold text-slate-600 text-center leading-tight">{piece.name}</span>
                                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${rarityBadge.color}`}>
                                            {rarityBadge.label}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-2xl opacity-30">❓</span>
                                        <span className="text-[9px] font-bold text-slate-300 text-center">{piece.name}</span>
                                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${rarityBadge.color} opacity-50`}>
                                            {rarityBadge.label}
                                        </span>
                                    </>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Blind Box Section */}
            <div>
                <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-purple-600" />
                    Túi Mù (Blind Box)
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {BLIND_BOX_REWARDS.map((reward, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setRevealedReward(revealedReward === i ? null : i)}
                            className={`relative rounded-3xl p-5 cursor-pointer transition-all border-2 ${
                                revealedReward === i
                                    ? getRarityColor(reward.rarity)
                                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 border-transparent'
                            }`}
                        >
                            <AnimatePresence mode="wait">
                                {revealedReward === i ? (
                                    <motion.div
                                        key="revealed"
                                        initial={{ rotateY: 90, opacity: 0 }}
                                        animate={{ rotateY: 0, opacity: 1 }}
                                        exit={{ rotateY: -90, opacity: 0 }}
                                        className="text-center"
                                    >
                                        <span className="text-3xl block mb-2">{reward.icon}</span>
                                        <p className="text-xs font-black text-slate-900">{reward.title}</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">{reward.desc}</p>
                                        <span className={`inline-block text-[8px] font-bold px-2 py-0.5 rounded-full mt-2 ${getRarityBadge(reward.rarity).color}`}>
                                            {getRarityBadge(reward.rarity).label}
                                        </span>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="hidden"
                                        initial={{ rotateY: -90, opacity: 0 }}
                                        animate={{ rotateY: 0, opacity: 1 }}
                                        exit={{ rotateY: 90, opacity: 0 }}
                                        className="text-center text-white"
                                    >
                                        <span className="text-4xl block mb-2 opacity-50">❓</span>
                                        <p className="text-xs font-bold opacity-80">Tap để mở</p>
                                        <Sparkles className="w-4 h-4 mx-auto mt-1 opacity-50" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Recent Activities */}
            <div>
                <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    Hoạt động gần đây
                </h2>
                <div className="bg-white rounded-3xl border border-slate-100 divide-y divide-slate-50">
                    {RECENT_ACTIVITIES.map((activity, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-4"
                        >
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-lg shrink-0">
                                {activity.user.split(' ')[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-700">
                                    <span className="font-bold">{activity.user.split(' ')[1]}</span>
                                    {' '}{activity.action}
                                    <span className="font-bold">{activity.target}</span>
                                </p>
                                <p className="text-xs text-slate-400">{activity.time}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                                    +{activity.piece}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
