'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Search, Send, MessageCircle, CheckCircle, Clock, Filter } from 'lucide-react';
import { useState } from 'react';

const MY_PIECES = [
    { id: 1, name: 'Cầu Giấy 1', emoji: '🏠', rarity: 'common', count: 3 },
    { id: 2, name: 'Xuân Thủy 2', emoji: '🌳', rarity: 'uncommon', count: 1 },
    { id: 6, name: 'Đống Đa 6', emoji: '📚', rarity: 'uncommon', count: 2 },
    { id: 10, name: 'Thanh Xuân 10', emoji: '🎵', rarity: 'common', count: 1 },
    { id: 12, name: 'Long Biên 12', emoji: '🌉', rarity: 'rare', count: 1 },
];

const EXCHANGE_BOARD = [
    {
        id: 'ex1',
        user: '🧑‍💻 Thanh (P.302)',
        offer: { name: 'Láng Hạ 5', emoji: '☕', rarity: 'common' },
        want: 'Cầu Giấy 1',
        message: 'Mình dư mảnh này, ai đổi không? 😊',
        time: '10 phút trước',
        status: 'open',
    },
    {
        id: 'ex2',
        user: '👩‍🎨 Linh (P.518)',
        offer: { name: 'Hai Bà Trưng 9', emoji: '🌸', rarity: 'uncommon' },
        want: 'Đống Đa 6',
        message: 'Đổi mảnh Hai Bà Trưng lấy Đống Đa nha!',
        time: '30 phút trước',
        status: 'open',
    },
    {
        id: 'ex3',
        user: '🧑‍🎤 Minh (P.201)',
        offer: { name: 'Trần Duy Hưng 3', emoji: '🏙️', rarity: 'rare' },
        want: 'Long Biên 12',
        message: 'Hiếm đổi hiếm! Ai có Long Biên 12 inbox mình 🤝',
        time: '1 giờ trước',
        status: 'open',
    },
    {
        id: 'ex4',
        user: '👨‍🍳 Nam (P.405)',
        offer: { name: 'Hoàng Mai 11', emoji: '🍜', rarity: 'common' },
        want: 'Thanh Xuân 10',
        message: 'Ai cần mảnh Hoàng Mai đổi nha',
        time: '2 giờ trước',
        status: 'open',
    },
    {
        id: 'ex5',
        user: '👩‍🏫 Hà (P.612)',
        offer: { name: 'Ba Đình 7', emoji: '⭐', rarity: 'legendary' },
        want: 'Hoàn Kiếm 8 + Xuân Thủy 2',
        message: '🔥 Legendary mảnh Ba Đình! Đổi 2 lấy 1 nha',
        time: '3 giờ trước',
        status: 'open',
    },
];

const RECENT_TRADES = [
    { from: '🧑‍💼 Đức (P.301)', to: '👩‍🦰 Vy (P.507)', gave: '🏠 Cầu Giấy 1', got: '☕ Láng Hạ 5', time: '2h trước' },
    { from: '👨‍💻 Huy (P.203)', to: '👩‍💻 Mai (P.402)', gave: '📚 Đống Đa 6', got: '🍜 Hoàng Mai 11', time: '5h trước' },
    { from: '🧑‍🔬 Nam (P.108)', to: '👩‍🎓 An (P.315)', gave: '🌸 HBT 9', got: '🎵 Thanh Xuân 10', time: 'Hôm qua' },
];

function getRarityStyle(rarity: string) {
    switch (rarity) {
        case 'common': return 'bg-slate-100 text-slate-600 border-slate-200';
        case 'uncommon': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'rare': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        case 'legendary': return 'bg-amber-50 text-amber-700 border-amber-200';
        default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
}

export default function ExchangeBoardPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/mystery-map">
                    <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        <ArrowLeftRight className="w-6 h-6 text-indigo-600" />
                        Sàn Đổi Mảnh Ghép
                    </h1>
                    <p className="text-sm text-slate-400 font-medium">Trao đổi với cư dân cùng tòa</p>
                </div>
            </div>

            {/* My Pieces */}
            <div>
                <h2 className="text-base font-black text-slate-900 mb-3">Mảnh ghép của bạn</h2>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {MY_PIECES.map((piece, i) => (
                        <motion.div
                            key={piece.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={`shrink-0 px-4 py-3 rounded-2xl border-2 ${getRarityStyle(piece.rarity)} flex items-center gap-2`}
                        >
                            <span className="text-xl">{piece.emoji}</span>
                            <div>
                                <p className="text-xs font-bold">{piece.name}</p>
                                {piece.count > 1 && (
                                    <p className="text-[10px] font-bold opacity-60">x{piece.count} (dư {piece.count - 1})</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Exchange Board */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Search */}
                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm mảnh ghép cần đổi..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
                            />
                        </div>
                        <button className="px-4 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                            <Filter className="w-4 h-4 text-slate-500" />
                        </button>
                    </div>

                    {/* Listings */}
                    {EXCHANGE_BOARD.map((exchange, i) => (
                        <motion.div
                            key={exchange.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-all"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{exchange.user.split(' ')[0]}</span>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{exchange.user.split(' ').slice(1).join(' ')}</p>
                                        <p className="text-[10px] text-slate-400">{exchange.time}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Đang mở
                                </span>
                            </div>

                            <div className="flex items-center gap-3 mb-3">
                                <div className={`flex-1 p-3 rounded-xl border ${getRarityStyle(exchange.offer.rarity)} text-center`}>
                                    <span className="text-xl block">{exchange.offer.emoji}</span>
                                    <p className="text-xs font-bold mt-1">{exchange.offer.name}</p>
                                    <p className="text-[9px] opacity-60">Đang có</p>
                                </div>
                                <ArrowLeftRight className="w-5 h-5 text-slate-400 shrink-0" />
                                <div className="flex-1 p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center">
                                    <span className="text-xl block">🔍</span>
                                    <p className="text-xs font-bold text-slate-600 mt-1">{exchange.want}</p>
                                    <p className="text-[9px] text-slate-400">Đang cần</p>
                                </div>
                            </div>

                            <p className="text-xs text-slate-500 mb-3 flex items-start gap-1">
                                <MessageCircle className="w-3 h-3 shrink-0 mt-0.5" />
                                {exchange.message}
                            </p>

                            <button className="w-full py-2.5 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1">
                                <Send className="w-3 h-3" /> Đề xuất đổi
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Trades Sidebar */}
                <div>
                    <div className="bg-white rounded-3xl border border-slate-100 p-5 sticky top-28">
                        <h3 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            Giao dịch gần đây
                        </h3>
                        <div className="space-y-4">
                            {RECENT_TRADES.map((trade, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-3 bg-slate-50 rounded-xl"
                                >
                                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                                        <span>{trade.from}</span>
                                        <span>{trade.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="font-bold">{trade.gave}</span>
                                        <ArrowLeftRight className="w-3 h-3 text-slate-400" />
                                        <span className="font-bold">{trade.got}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1">→ {trade.to}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Create trade CTA */}
                        <button className="w-full mt-4 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                            <ArrowLeftRight className="w-4 h-4" />
                            Đăng đổi mảnh ghép
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
