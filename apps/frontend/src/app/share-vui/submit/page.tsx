'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Upload, Video, Hash, ArrowLeft, Sparkles, Camera, Music, Type, Image } from 'lucide-react';
import { useState } from 'react';

const FORMAT_OPTIONS = [
    {
        id: 'before_after',
        title: 'Before / After',
        icon: '✨',
        desc: 'So sánh trước và sau khi share phòng',
        tip: 'Quay 2 clip: cảnh ở 1 mình vs. cảnh share vui vẻ',
        gradient: 'from-indigo-500 to-purple-600',
    },
    {
        id: 'day_in_life',
        title: 'Một ngày ở share',
        icon: '🌅',
        desc: 'Ghi lại một ngày đời thường',
        tip: 'Wake up → nấu ăn chung → làm việc → chill tối',
        gradient: 'from-amber-500 to-orange-600',
    },
    {
        id: 'house_rules',
        title: 'Rule nhà mình',
        icon: '📋',
        desc: 'Chia sẻ quy tắc hài hước',
        tip: '"Ai về sau 1h phải mang trà sữa cho cả nhà" 😂',
        gradient: 'from-emerald-500 to-teal-600',
    },
    {
        id: 'ideal_roommate',
        title: 'Bạn ở ghép lý tưởng',
        icon: '💛',
        desc: 'Match & duet với bạn cùng phòng',
        tip: 'Tag bạn cùng phòng, quay reaction video',
        gradient: 'from-pink-500 to-rose-600',
    },
    {
        id: 'savings',
        title: 'Challenge tiết kiệm',
        icon: '💰',
        desc: 'Tính tiền tiết kiệm nhờ share',
        tip: '"2tr/tháng = 1 chuyến du lịch/năm" ✈️',
        gradient: 'from-green-500 to-emerald-600',
    },
];

const SUGGESTED_HASHTAGS = [
    '#ShareVui', '#OGhepViral', '#NhaTroVuiVe', '#TietKiemCungBan',
    '#TrọAnToànChallenge', '#ShareHouseVN', '#BạnỞGhép',
];

export default function ShareVuiSubmitPage() {
    const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
    const [hashtags, setHashtags] = useState<string[]>(['#ShareVui']);
    const [title, setTitle] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    const toggleHashtag = (tag: string) => {
        if (hashtags.includes(tag)) {
            setHashtags(hashtags.filter(t => t !== tag));
        } else {
            setHashtags([...hashtags, tag]);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen pt-20 sm:pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/share-vui">
                        <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                            Tham gia <span className="gradient-text">Challenge</span>
                        </h1>
                        <p className="text-sm text-slate-400 font-medium">Quay video · Chọn format · Chia sẻ</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Upload Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl border border-slate-100 p-8"
                        >
                            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Video className="w-5 h-5 text-indigo-600" />
                                Upload Video
                            </h2>
                            <div
                                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                                onDragLeave={() => setIsDragOver(false)}
                                onDrop={() => setIsDragOver(false)}
                                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
                                    isDragOver
                                        ? 'border-indigo-400 bg-indigo-50'
                                        : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                                }`}
                            >
                                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Upload className="w-8 h-8 text-indigo-600" />
                                </div>
                                <p className="text-sm font-bold text-slate-700 mb-1">
                                    Kéo thả video hoặc click để upload
                                </p>
                                <p className="text-xs text-slate-400">
                                    MP4, MOV — Tối đa 60s — Dưới 100MB
                                </p>
                            </div>

                            {/* Built-in Edit Tools Toolbar */}
                            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
                                {[
                                    { icon: Camera, label: 'Quay mới' },
                                    { icon: Music, label: 'Nhạc hot' },
                                    { icon: Type, label: 'Text overlay' },
                                    { icon: Image, label: 'Sticker' },
                                    { icon: Sparkles, label: 'Filter cute' },
                                ].map((tool, i) => (
                                    <button
                                        key={i}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-colors whitespace-nowrap"
                                    >
                                        <tool.icon className="w-4 h-4" />
                                        {tool.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl border border-slate-100 p-6"
                        >
                            <label className="text-sm font-bold text-slate-700 mb-2 block">
                                Tiêu đề video
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ví dụ: Một ngày chill tại share house Q7 ☀️"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
                            />
                        </motion.div>

                        {/* Hashtags */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-3xl border border-slate-100 p-6"
                        >
                            <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <Hash className="w-4 h-4 text-indigo-600" />
                                Hashtags
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {SUGGESTED_HASHTAGS.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleHashtag(tag)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                                            hashtags.includes(tag)
                                                ? 'bg-indigo-600 text-white shadow-sm'
                                                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2">
                                Bắt buộc: #ShareVui — Thêm nhiều hashtag để tăng reach!
                            </p>
                        </motion.div>

                        {/* Submit */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-2xl font-black text-base bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        >
                            <Sparkles className="w-5 h-5" />
                            Đăng Video & Nhận Điểm
                        </motion.button>
                    </div>

                    {/* Format Selector Sidebar */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl border border-slate-100 p-6 sticky top-28">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-amber-500" />
                                Chọn Format
                            </h3>
                            <div className="space-y-3">
                                {FORMAT_OPTIONS.map((format, i) => (
                                    <motion.button
                                        key={format.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        onClick={() => setSelectedFormat(format.id)}
                                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                                            selectedFormat === format.id
                                                ? 'border-indigo-400 bg-indigo-50/50 shadow-sm'
                                                : 'border-slate-100 hover:border-slate-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-xl">{format.icon}</span>
                                            <span className="text-sm font-bold text-slate-900">{format.title}</span>
                                        </div>
                                        <p className="text-xs text-slate-400 ml-9">{format.desc}</p>
                                        {selectedFormat === format.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="mt-2 ml-9 p-2 bg-indigo-100/50 rounded-lg"
                                            >
                                                <p className="text-[11px] text-indigo-600 font-semibold">
                                                    💡 Tip: {format.tip}
                                                </p>
                                            </motion.div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Points info */}
                            <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                                <p className="text-xs font-bold text-amber-700 mb-1">🎯 Cách tính điểm</p>
                                <ul className="text-[11px] text-amber-600 space-y-0.5">
                                    <li>+10 điểm / video đăng</li>
                                    <li>+1 điểm / mỗi lượt like</li>
                                    <li>+3 điểm / mỗi lượt share</li>
                                    <li>+50 điểm / cross-post TikTok</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
