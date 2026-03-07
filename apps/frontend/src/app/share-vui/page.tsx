'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Heart, Share2, Eye, TrendingUp, Sparkles, Trophy, Video, ChevronRight, Star, Flame, Users } from 'lucide-react';
import { useState } from 'react';

const CHALLENGE_FORMATS = [
    { id: 'all', label: 'Tất cả', icon: '🔥', color: 'from-orange-400 to-rose-500' },
    { id: 'before_after', label: 'Before/After', icon: '✨', color: 'from-indigo-400 to-purple-500' },
    { id: 'day_in_life', label: 'Một ngày ở share', icon: '🌅', color: 'from-amber-400 to-orange-500' },
    { id: 'house_rules', label: 'Rule nhà mình', icon: '📋', color: 'from-emerald-400 to-teal-500' },
    { id: 'ideal_roommate', label: 'Bạn ở ghép lý tưởng', icon: '💛', color: 'from-pink-400 to-rose-500' },
    { id: 'savings', label: 'Tiết kiệm cùng bạn', icon: '💰', color: 'from-green-400 to-emerald-500' },
];

const TRENDING_HASHTAGS = [
    '#ShareVui', '#OGhepViral', '#NhaTroVuiVe', '#TietKiemCungBan',
    '#TrọAnToànChallenge', '#ShareHouseVN', '#BạnỞGhép', '#CuộcSốngShare',
];

const MOCK_VIDEOS = [
    {
        id: '1',
        title: 'Trước và sau khi có bạn share phòng 🏠',
        author: 'Minh Anh',
        avatar: '🧑‍🎤',
        format: 'before_after',
        thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=500&fit=crop',
        likes: 2847,
        shares: 456,
        views: 15200,
        points: 850,
        hashtags: ['#ShareVui', '#BeforeAfter'],
        isHot: true,
    },
    {
        id: '2',
        title: 'Một ngày ở share house quận 7 ☀️',
        author: 'Thanh Tùng',
        avatar: '👨‍💻',
        format: 'day_in_life',
        thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=500&fit=crop',
        likes: 1923,
        shares: 312,
        views: 10800,
        points: 620,
        hashtags: ['#ShareVui', '#MotNgay'],
        isHot: true,
    },
    {
        id: '3',
        title: 'Rule kỳ lạ nhất nhà mình 😂',
        author: 'Hà Linh',
        avatar: '👩‍🎨',
        format: 'house_rules',
        thumbnail: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=500&fit=crop',
        likes: 3421,
        shares: 891,
        views: 22300,
        points: 1200,
        hashtags: ['#ShareVui', '#RuleNhaMiih'],
        isHot: false,
    },
    {
        id: '4',
        title: 'Match bạn ở ghép như dating 💕',
        author: 'Phương Vy',
        avatar: '👩‍🦰',
        format: 'ideal_roommate',
        thumbnail: 'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=400&h=500&fit=crop',
        likes: 1567,
        shares: 234,
        views: 8900,
        points: 480,
        hashtags: ['#ShareVui', '#BanOGhep'],
        isHot: false,
    },
    {
        id: '5',
        title: 'Tiết kiệm 3tr/tháng nhờ share 💸',
        author: 'Đức Anh',
        avatar: '🧑‍💼',
        format: 'savings',
        thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=500&fit=crop',
        likes: 4102,
        shares: 1023,
        views: 31000,
        points: 1500,
        hashtags: ['#ShareVui', '#TietKiem'],
        isHot: true,
    },
    {
        id: '6',
        title: 'Nấu ăn chung cuối tuần 🍳',
        author: 'Khánh Ngọc',
        avatar: '👩‍🍳',
        format: 'day_in_life',
        thumbnail: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=500&fit=crop',
        likes: 2156,
        shares: 445,
        views: 12700,
        points: 700,
        hashtags: ['#ShareVui', '#NauAnChung'],
        isHot: false,
    },
];

const TOP_CREATORS = [
    { rank: 1, name: 'Đức Anh', points: 4500, videos: 12, avatar: '🧑‍💼', badge: '🏆' },
    { rank: 2, name: 'Hà Linh', points: 3800, videos: 9, avatar: '👩‍🎨', badge: '🥈' },
    { rank: 3, name: 'Minh Anh', points: 3200, videos: 8, avatar: '🧑‍🎤', badge: '🥉' },
    { rank: 4, name: 'Thanh Tùng', points: 2900, videos: 7, avatar: '👨‍💻', badge: '' },
    { rank: 5, name: 'Phương Vy', points: 2400, videos: 6, avatar: '👩‍🦰', badge: '' },
];

function formatNumber(num: number) {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
}

export default function ShareVuiPage() {
    const [activeFormat, setActiveFormat] = useState('all');

    const filteredVideos = activeFormat === 'all'
        ? MOCK_VIDEOS
        : MOCK_VIDEOS.filter(v => v.format === activeFormat);

    return (
        <div className="bg-slate-50 min-h-screen pt-20 sm:pt-24">
            {/* Hero Banner */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 gradient-viral opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-indigo-600 mb-6 shadow-sm border border-indigo-100">
                            <Sparkles className="w-4 h-4" />
                            Challenge tháng 3/2026
                            <Flame className="w-4 h-4 text-orange-500" />
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-4 leading-tight">
                            Share <span className="gradient-text">Vui</span> Challenge
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-8 font-medium">
                            Biến cuộc sống ở ghép thành trải nghiệm viral! 🎬
                            <br />
                            <span className="text-sm text-slate-400">Quay video · Chia sẻ · Nhận thưởng</span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/share-vui/submit">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-primary !px-8 !py-4 !text-base flex items-center gap-2 mx-auto"
                                >
                                    <Video className="w-5 h-5" />
                                    Tham gia Challenge
                                </motion.button>
                            </Link>
                            <Link href="/share-vui/leaderboard">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-2xl font-semibold text-base bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 transition-all flex items-center gap-2 mx-auto shadow-sm"
                                >
                                    <Trophy className="w-5 h-5 text-amber-500" />
                                    Bảng xếp hạng
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4 mb-8">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {[
                        { icon: Video, label: 'Videos', value: '1,247', color: 'text-indigo-600 bg-indigo-50' },
                        { icon: Users, label: 'Người tham gia', value: '3,891', color: 'text-emerald-600 bg-emerald-50' },
                        { icon: Heart, label: 'Lượt thích', value: '89.2k', color: 'text-rose-600 bg-rose-50' },
                        { icon: TrendingUp, label: 'Lượt xem', value: '456k', color: 'text-amber-600 bg-amber-50' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Hashtags */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
                <div className="flex flex-wrap gap-2">
                    {TRENDING_HASHTAGS.map((tag, i) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-full text-xs font-bold border border-indigo-100 hover:shadow-md transition-all cursor-pointer"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </section>

            {/* Format Filter */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {CHALLENGE_FORMATS.map((format) => (
                        <button
                            key={format.id}
                            onClick={() => setActiveFormat(format.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                                activeFormat === format.id
                                    ? `bg-gradient-to-r ${format.color} text-white shadow-lg`
                                    : 'bg-white text-slate-600 border border-slate-100 hover:border-slate-200'
                            }`}
                        >
                            <span>{format.icon}</span>
                            {format.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Video Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-indigo-600" />
                                Trending Videos
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVideos.map((video, i) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="card-glow bg-white border border-slate-100"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-t-3xl">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Play overlay */}
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                                                <Play className="w-6 h-6 text-indigo-600 ml-1" />
                                            </div>
                                        </div>
                                        {/* Hot badge */}
                                        {video.isHot && (
                                            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                                                <Flame className="w-3 h-3" /> HOT
                                            </div>
                                        )}
                                        {/* Views */}
                                        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                                            <Eye className="w-3 h-3" /> {formatNumber(video.views)}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-lg">{video.avatar}</span>
                                            <span className="text-xs font-bold text-slate-500">{video.author}</span>
                                            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold">
                                                ⭐ {video.points} pts
                                            </span>
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-900 mb-3 line-clamp-2">
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <button className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors">
                                                    <Heart className="w-4 h-4" />
                                                    <span className="text-xs font-bold">{formatNumber(video.likes)}</span>
                                                </button>
                                                <button className="flex items-center gap-1 text-slate-400 hover:text-indigo-500 transition-colors">
                                                    <Share2 className="w-4 h-4" />
                                                    <span className="text-xs font-bold">{formatNumber(video.shares)}</span>
                                                </button>
                                            </div>
                                            <div className="flex gap-1">
                                                {video.hashtags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="text-[10px] text-indigo-500 font-semibold">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar - Top Creators */}
                    <div className="lg:w-80 shrink-0">
                        <div className="bg-white rounded-3xl border border-slate-100 p-6 sticky top-28">
                            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-amber-500" />
                                Top Creators
                            </h3>
                            <div className="space-y-4">
                                {TOP_CREATORS.map((creator, i) => (
                                    <motion.div
                                        key={creator.rank}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                                    >
                                        <span className={`text-lg font-black w-6 text-center ${
                                            creator.rank <= 3 ? 'text-amber-500' : 'text-slate-300'
                                        }`}>
                                            {creator.badge || `#${creator.rank}`}
                                        </span>
                                        <span className="text-2xl">{creator.avatar}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-slate-900 truncate">{creator.name}</p>
                                            <p className="text-xs text-slate-400">{creator.videos} videos</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-indigo-600">{formatNumber(creator.points)}</p>
                                            <p className="text-[10px] text-slate-400">điểm</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <Link href="/share-vui/leaderboard">
                                <button className="w-full mt-4 py-3 rounded-2xl text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1">
                                    Xem tất cả <ChevronRight className="w-4 h-4" />
                                </button>
                            </Link>

                            {/* Rewards Preview */}
                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <h4 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-amber-500" />
                                    Phần thưởng tháng
                                </h4>
                                <div className="space-y-2">
                                    {[
                                        { tier: '🥇', prize: 'Miễn phí tiền trọ 1 tháng', color: 'bg-amber-50 text-amber-700' },
                                        { tier: '🥈', prize: 'Voucher ShopeeFood 500k', color: 'bg-slate-50 text-slate-700' },
                                        { tier: '🥉', prize: 'Tai nghe Bluetooth', color: 'bg-orange-50 text-orange-700' },
                                    ].map(reward => (
                                        <div key={reward.tier} className={`flex items-center gap-2 p-2 rounded-xl ${reward.color} text-xs font-bold`}>
                                            <span>{reward.tier}</span>
                                            {reward.prize}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
