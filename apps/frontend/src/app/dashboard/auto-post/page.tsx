'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot, Zap, Share2, Clock, BarChart3, MessageCircle, Facebook, Send,
    Plus, Settings, CheckCircle2, X, Copy, Eye, Heart, ThumbsUp,
    TrendingUp, Calendar, MapPin, DollarSign, Home, Image, RefreshCw,
    Users, Play, Pause, Trash2, Edit3, Sparkles, ChevronRight, Phone
} from 'lucide-react';

/* ── TEMPLATES ── */
const POST_TEMPLATES = [
    {
        id: 't1', name: '🏠 Cho thuê phòng', platform: 'facebook',
        template: `🏠 CHO THUÊ PHÒNG {{roomType}} {{area}}

💰 Giá: {{price}}/tháng (bao điện nước)
📐 Diện tích: {{size}}m²
📍 Địa chỉ: {{address}}

✅ {{amenity1}}
✅ {{amenity2}}
✅ {{amenity3}}
✅ {{amenity4}}

🎁 ƯU ĐÃI: Giảm {{discount}} tháng đầu!
📞 Liên hệ: {{phone}}
🔗 Xem chi tiết: {{link}}

#SmileBed #NhaTro{{city}} #ChoThuePhong #{{district}}`,
    },
    {
        id: 't2', name: '🔥 Phòng HOT sale', platform: 'facebook',
        template: `🔥🔥🔥 PHÒNG HOT SALE – CÒN {{remaining}} PHÒNG!

📍 {{address}}
💰 Chỉ {{price}}/tháng ← Giá cũ {{oldPrice}}

⚡ Đặc biệt:
🛏️ {{roomType}} – {{size}}m²
❄️ Máy lạnh + nóng lạnh
🔑 Giờ giấc tự do
📶 Wifi tốc độ cao
🅿️ Chỗ để xe miễn phí

☎️ Chat ngay: {{phone}}
🏠 Xem thêm phòng: {{link}}

#PhongTro #GiaRe #{{city}} #SmileBed`,
    },
    {
        id: 't3', name: '👫 Tìm người ở ghép', platform: 'facebook',
        template: `👫 TÌM BẠN Ở GHÉP – {{area}}

Mình đang ở {{roomType}} ở {{address}}, tìm thêm {{slots}} bạn ở ghép!

💰 Chia sẻ: {{price}}/người/tháng
🏠 Phòng {{size}}m² – {{amenity1}}
📍 Gần: {{nearby}}

🙋 Yêu cầu:
✅ Sạch sẽ, gọn gàng
✅ Không hút thuốc
✅ Hoà đồng, vui vẻ

📞 Inbox hoặc gọi: {{phone}}
🔗 Profile Smile: {{link}}

#OGhep #TimBanOGhep #{{city}} #SmileBed`,
    },
    {
        id: 't4', name: '📱 Zalo Group', platform: 'zalo',
        template: `🏠 Phòng mới {{area}} – {{price}}/th

📐 {{size}}m² · {{roomType}}
✅ {{amenity1}} · {{amenity2}}
📍 {{address}}

Liên hệ: {{phone}}
Chi tiết: {{link}}`,
    },
    {
        id: 't5', name: '🎵 TikTok caption', platform: 'tiktok',
        template: `Phòng trọ {{price}}/th gần {{nearby}} 🏠✨ {{amenity1}} · {{amenity2}} · Giờ tự do · Wifi tốc độ cao 📞 {{phone}} #nhatrosaigon #phongtro{{city}} #SmileBed #choicothe #giare`,
    },
];

/* ── ROOMS ── */
const ROOMS = [
    { id: 'r1', name: 'Phòng 201 – Studio', type: 'Studio', size: 25, price: '3.5tr', address: 'Ngõ 68 Cầu Giấy', area: 'Cầu Giấy', city: 'HN', status: 'available', amenities: ['Máy lạnh', 'Nóng lạnh', 'Ban công', 'Wifi 100Mbps'], image: '🏠' },
    { id: 'r2', name: 'Phòng 305 – Share', type: 'Ở ghép', size: 40, price: '2tr/người', address: '12 Nguyễn Trãi, Q.5', area: 'Q.5', city: 'HCM', status: 'available', amenities: ['Giường tầng', 'Tủ riêng', 'Bếp chung', 'Máy giặt'], image: '👫' },
    { id: 'r3', name: 'Phòng 102 – Deluxe', type: 'Deluxe', size: 35, price: '5tr', address: '88 Láng Hạ, Đống Đa', area: 'Đống Đa', city: 'HN', status: 'available', amenities: ['Bếp riêng', 'Ban công view', 'Máy lạnh', 'Smart lock'], image: '✨' },
];

/* ── BOT CONFIGS ── */
const INITIAL_BOTS = [
    { id: 'b1', name: 'Bot Facebook Cầu Giấy', platform: 'facebook', status: 'active', groups: ['Nhà trọ Cầu Giấy', 'Phòng trọ HN', 'Sinh viên tìm trọ HN'], schedule: '8:00, 12:00, 18:00', postsToday: 6, totalPosts: 142, leads: 28, lastPost: '12:00 hôm nay' },
    { id: 'b2', name: 'Bot Zalo Groups', platform: 'zalo', status: 'active', groups: ['Nhà trọ Q1-Q12', 'Phòng trọ SV HCM'], schedule: '9:00, 15:00, 20:00', postsToday: 4, totalPosts: 87, leads: 15, lastPost: '15:00 hôm nay' },
    { id: 'b3', name: 'Bot TikTok', platform: 'tiktok', status: 'paused', groups: ['Auto-post video'], schedule: '19:00, 21:00', postsToday: 0, totalPosts: 23, leads: 8, lastPost: '2 ngày trước' },
];

/* ── SCHEDULED POSTS ── */
const SCHEDULED = [
    { id: 's1', room: 'Phòng 201 – Studio', platform: 'facebook', group: 'Nhà trọ Cầu Giấy', time: '18:00 hôm nay', status: 'pending', preview: '🏠 CHO THUÊ PHÒNG Studio Cầu Giấy\n💰 Giá: 3.5tr/tháng...' },
    { id: 's2', room: 'Phòng 305 – Share', platform: 'zalo', group: 'Phòng trọ SV HCM', time: '20:00 hôm nay', status: 'pending', preview: '🏠 Phòng mới Q.5 – 2tr/người/th\n📐 40m²...' },
    { id: 's3', room: 'Phòng 102 – Deluxe', platform: 'facebook', group: 'Phòng trọ HN', time: '8:00 ngày mai', status: 'scheduled', preview: '🔥 PHÒNG HOT SALE – CÒN 1 PHÒNG!\n📍 88 Láng Hạ...' },
];

/* ── ENGAGEMENT ── */
const ENGAGEMENT = {
    totalPosts: 252, totalReach: 45200, totalLeads: 51, conversionRate: 3.2,
    daily: [
        { day: 'T2', posts: 8, reach: 1200, leads: 2 },
        { day: 'T3', posts: 12, reach: 2100, leads: 4 },
        { day: 'T4', posts: 10, reach: 1800, leads: 3 },
        { day: 'T5', posts: 14, reach: 3200, leads: 7 },
        { day: 'T6', posts: 11, reach: 2400, leads: 5 },
        { day: 'T7', posts: 15, reach: 4500, leads: 8 },
        { day: 'CN', posts: 9, reach: 3100, leads: 6 },
    ],
    topPosts: [
        { text: '🔥 PHÒNG HOT SALE Cầu Giấy...', platform: 'facebook', reach: 4200, leads: 12, likes: 89 },
        { text: '👫 TÌM BẠN Ở GHÉP Q.5...', platform: 'facebook', reach: 3100, leads: 8, likes: 56 },
        { text: 'Phòng trọ 3.5tr/th gần ĐH...', platform: 'tiktok', reach: 8500, leads: 5, likes: 234 },
    ],
};

function getPlatformStyle(p: string) {
    if (p === 'facebook') return { bg: 'bg-blue-500', light: 'bg-blue-50 text-blue-700', emoji: '📘' };
    if (p === 'zalo') return { bg: 'bg-blue-600', light: 'bg-sky-50 text-sky-700', emoji: '💬' };
    if (p === 'tiktok') return { bg: 'bg-slate-900', light: 'bg-slate-100 text-slate-700', emoji: '🎵' };
    return { bg: 'bg-slate-500', light: 'bg-slate-50 text-slate-600', emoji: '📱' };
}

export default function AutoPostPage() {
    const [tab, setTab] = useState<'bots' | 'create' | 'scheduled' | 'analytics'>('bots');
    const [bots, setBots] = useState(INITIAL_BOTS);
    const [selectedTemplate, setSelectedTemplate] = useState(POST_TEMPLATES[0]);
    const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
    const [generatedPost, setGeneratedPost] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [copied, setCopied] = useState(false);

    const generatePost = () => {
        const r = selectedRoom;
        let post = selectedTemplate.template
            .replace(/\{\{roomType\}\}/g, r.type)
            .replace(/\{\{area\}\}/g, r.area)
            .replace(/\{\{price\}\}/g, r.price)
            .replace(/\{\{size\}\}/g, String(r.size))
            .replace(/\{\{address\}\}/g, r.address)
            .replace(/\{\{city\}\}/g, r.city === 'HN' ? 'HaNoi' : 'HCM')
            .replace(/\{\{district\}\}/g, r.area.replace(/\./g, ''))
            .replace(/\{\{amenity1\}\}/g, r.amenities[0] || '')
            .replace(/\{\{amenity2\}\}/g, r.amenities[1] || '')
            .replace(/\{\{amenity3\}\}/g, r.amenities[2] || '')
            .replace(/\{\{amenity4\}\}/g, r.amenities[3] || '')
            .replace(/\{\{phone\}\}/g, '0912.xxx.456')
            .replace(/\{\{link\}\}/g, 'smile.vn/p/' + r.id)
            .replace(/\{\{discount\}\}/g, '500k')
            .replace(/\{\{oldPrice\}\}/g, '6tr')
            .replace(/\{\{remaining\}\}/g, '2')
            .replace(/\{\{slots\}\}/g, '1')
            .replace(/\{\{nearby\}\}/g, 'ĐH Quốc gia, trạm bus 200m');
        setGeneratedPost(post);
        setShowPreview(true);
    };

    const copyPost = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(generatedPost);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const toggleBot = (id: string) => {
        setBots(prev => prev.map(b => b.id === id ? { ...b, status: b.status === 'active' ? 'paused' : 'active' } : b));
    };

    const maxReach = Math.max(...ENGAGEMENT.daily.map(d => d.reach));

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
                                <Bot className="w-3 h-3" /> Auto-Post Bot System
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                                🤖 Bot <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">Đăng Bài</span> Tự Động
                            </h1>
                            <p className="text-xs text-slate-400 font-semibold mt-1">Tự động đăng bài tìm khách trên Facebook, Zalo, TikTok — như người thật</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="px-4 py-2 bg-white rounded-2xl border border-slate-100 text-center">
                                <p className="text-lg font-black text-violet-600">{ENGAGEMENT.totalPosts}</p>
                                <p className="text-[9px] font-bold text-slate-400">Bài đã đăng</p>
                            </div>
                            <div className="px-4 py-2 bg-white rounded-2xl border border-slate-100 text-center">
                                <p className="text-lg font-black text-emerald-600">{ENGAGEMENT.totalLeads}</p>
                                <p className="text-[9px] font-bold text-slate-400">Khách liên hệ</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1.5 border border-slate-100">
                    {[
                        { key: 'bots', label: '🤖 Bot đang chạy', icon: <Bot className="w-3.5 h-3.5" /> },
                        { key: 'create', label: '✍️ Tạo bài mới', icon: <Edit3 className="w-3.5 h-3.5" /> },
                        { key: 'scheduled', label: '📅 Lịch đăng', icon: <Calendar className="w-3.5 h-3.5" /> },
                        { key: 'analytics', label: '📊 Thống kê', icon: <BarChart3 className="w-3.5 h-3.5" /> },
                    ].map(t => (
                        <button key={t.key} onClick={() => setTab(t.key as any)}
                            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                tab === t.key ? 'bg-violet-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                            }`}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* ── BOTS TAB ── */}
                {tab === 'bots' && (
                    <div className="space-y-4">
                        {bots.map((bot, i) => {
                            const ps = getPlatformStyle(bot.platform);
                            return (
                                <motion.div key={bot.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                    className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex gap-3">
                                                <div className={`w-12 h-12 ${ps.bg} rounded-2xl flex items-center justify-center text-2xl text-white`}>{ps.emoji}</div>
                                                <div>
                                                    <h3 className="text-sm font-black text-slate-900">{bot.name}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                                            bot.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                                        }`}>
                                                            {bot.status === 'active' ? '🟢 Đang chạy' : '⏸️ Tạm dừng'}
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 font-semibold">⏰ {bot.schedule}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={() => toggleBot(bot.id)}
                                                className={`px-3 py-2 rounded-xl text-[10px] font-black transition-all active:scale-95 ${
                                                    bot.status === 'active' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                                }`}>
                                                {bot.status === 'active' ? '⏸ Dừng' : '▶ Bật'}
                                            </button>
                                        </div>

                                        {/* Groups */}
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {bot.groups.map(g => (
                                                <span key={g} className={`px-2 py-1 rounded-lg text-[9px] font-bold ${ps.light}`}>{g}</span>
                                            ))}
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-4 gap-3">
                                            {[
                                                { label: 'Hôm nay', value: bot.postsToday, unit: 'bài' },
                                                { label: 'Tổng', value: bot.totalPosts, unit: 'bài' },
                                                { label: 'Leads', value: bot.leads, unit: 'khách' },
                                                { label: 'Bài cuối', value: bot.lastPost, unit: '' },
                                            ].map((s, j) => (
                                                <div key={j} className="bg-slate-50 rounded-xl p-2.5 text-center">
                                                    <p className="text-sm font-black text-slate-900">{s.value}</p>
                                                    <p className="text-[9px] text-slate-400 font-semibold">{s.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        <button className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 text-sm font-bold text-slate-400 hover:border-violet-300 hover:text-violet-600 transition-all flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" /> Thêm bot mới
                        </button>
                    </div>
                )}

                {/* ── CREATE TAB ── */}
                {tab === 'create' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            {/* Room select */}
                            <div className="bg-white rounded-2xl border border-slate-100 p-4">
                                <h3 className="text-xs font-black text-slate-900 mb-3">🏠 Chọn phòng</h3>
                                <div className="space-y-2">
                                    {ROOMS.map(r => (
                                        <button key={r.id} onClick={() => setSelectedRoom(r)}
                                            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                                                selectedRoom.id === r.id ? 'bg-violet-50 border-2 border-violet-300' : 'bg-slate-50 border-2 border-transparent hover:border-slate-200'
                                            }`}>
                                            <span className="text-2xl">{r.image}</span>
                                            <div className="flex-1">
                                                <p className="text-xs font-black text-slate-900">{r.name}</p>
                                                <p className="text-[10px] text-slate-400 font-semibold">{r.price}/th · {r.size}m² · {r.address}</p>
                                            </div>
                                            {selectedRoom.id === r.id && <CheckCircle2 className="w-4 h-4 text-violet-600" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Template select */}
                            <div className="bg-white rounded-2xl border border-slate-100 p-4">
                                <h3 className="text-xs font-black text-slate-900 mb-3">📝 Chọn mẫu bài đăng</h3>
                                <div className="space-y-2">
                                    {POST_TEMPLATES.map(t => {
                                        const ps = getPlatformStyle(t.platform);
                                        return (
                                            <button key={t.id} onClick={() => setSelectedTemplate(t)}
                                                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                                                    selectedTemplate.id === t.id ? 'bg-violet-50 border-2 border-violet-300' : 'bg-slate-50 border-2 border-transparent hover:border-slate-200'
                                                }`}>
                                                <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${ps.light}`}>{ps.emoji} {t.platform}</span>
                                                <p className="text-xs font-bold text-slate-700 flex-1">{t.name}</p>
                                                {selectedTemplate.id === t.id && <CheckCircle2 className="w-4 h-4 text-violet-600" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Generate button */}
                            <motion.button whileTap={{ scale: 0.97 }} onClick={generatePost}
                                className="w-full py-4 rounded-2xl text-sm font-black bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-200 active:scale-95 transition-all flex items-center justify-center gap-2">
                                <Sparkles className="w-4 h-4" /> Tạo bài đăng tự động
                            </motion.button>
                        </div>

                        {/* Preview */}
                        <div>
                            <div className="bg-white rounded-2xl border border-slate-100 p-4 sticky top-6">
                                <h3 className="text-xs font-black text-slate-900 mb-3 flex items-center gap-2">
                                    <Eye className="w-3.5 h-3.5" /> Xem trước bài đăng
                                </h3>
                                {generatedPost ? (
                                    <>
                                        <div className="bg-slate-50 rounded-2xl p-4 mb-4 max-h-96 overflow-y-auto">
                                            <pre className="text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{generatedPost}</pre>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={copyPost}
                                                className={`flex-1 py-3 rounded-xl text-xs font-black transition-all active:scale-95 flex items-center justify-center gap-2 ${
                                                    copied ? 'bg-emerald-100 text-emerald-700' : 'bg-violet-600 text-white'
                                                }`}>
                                                {copied ? <><CheckCircle2 className="w-3.5 h-3.5" /> Đã copy!</> : <><Copy className="w-3.5 h-3.5" /> Copy bài</>}
                                            </button>
                                            <button className="px-4 py-3 rounded-xl text-xs font-bold bg-blue-100 text-blue-700 transition-all active:scale-95 flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" /> Hẹn giờ
                                            </button>
                                            <button className="px-4 py-3 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-700 transition-all active:scale-95 flex items-center gap-1">
                                                <Send className="w-3.5 h-3.5" /> Đăng
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-12 text-slate-300">
                                        <Bot className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                        <p className="text-xs font-bold text-slate-400">Chọn phòng + mẫu bài → Nhấn &ldquo;Tạo bài&rdquo;</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── SCHEDULED TAB ── */}
                {tab === 'scheduled' && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-black text-slate-900">📅 Bài đăng đã lên lịch</h3>
                            <span className="text-[10px] font-bold text-slate-400">{SCHEDULED.length} bài chờ đăng</span>
                        </div>
                        {SCHEDULED.map((post, i) => {
                            const ps = getPlatformStyle(post.platform);
                            return (
                                <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                                    className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-md transition-all">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 ${ps.bg} rounded-xl flex items-center justify-center text-lg text-white flex-shrink-0`}>{ps.emoji}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-black text-slate-900">{post.room}</span>
                                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${ps.light}`}>{post.platform}</span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 font-semibold mb-2">→ {post.group} · ⏰ {post.time}</p>
                                            <div className="bg-slate-50 rounded-xl p-2.5">
                                                <p className="text-[10px] text-slate-500 font-medium line-clamp-2">{post.preview}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                                                post.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                            }`}>{post.status === 'pending' ? '⏳ Chờ' : '📅 Đã hẹn'}</span>
                                            <button className="px-2 py-1 rounded-lg text-[9px] font-bold bg-red-50 text-red-500 hover:bg-red-100">✕ Huỷ</button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* ── ANALYTICS TAB ── */}
                {tab === 'analytics' && (
                    <div className="space-y-6">
                        {/* Overview */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { emoji: '📝', label: 'Bài đăng', value: ENGAGEMENT.totalPosts, color: 'text-violet-600' },
                                { emoji: '👁️', label: 'Lượt tiếp cận', value: ENGAGEMENT.totalReach.toLocaleString(), color: 'text-blue-600' },
                                { emoji: '📞', label: 'Khách liên hệ', value: ENGAGEMENT.totalLeads, color: 'text-emerald-600' },
                                { emoji: '📈', label: 'Tỷ lệ chuyển đổi', value: ENGAGEMENT.conversionRate + '%', color: 'text-amber-600' },
                            ].map((s, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                                    className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
                                    <div className="text-2xl mb-1">{s.emoji}</div>
                                    <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                                    <div className="text-[9px] font-bold text-slate-400">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Daily chart */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-5">
                            <h3 className="text-sm font-black text-slate-900 mb-4">📊 Hiệu quả 7 ngày qua</h3>
                            <div className="flex items-end gap-2 h-40">
                                {ENGAGEMENT.daily.map((d, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                        <span className="text-[9px] font-bold text-emerald-600">+{d.leads}</span>
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(d.reach / maxReach) * 100}%` }}
                                            transition={{ delay: i * 0.1, duration: 0.5 }}
                                            className="w-full bg-gradient-to-t from-violet-500 to-purple-400 rounded-t-lg min-h-[4px] relative group cursor-pointer"
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                {d.reach} reach · {d.posts} bài
                                            </div>
                                        </motion.div>
                                        <span className="text-[10px] font-bold text-slate-400">{d.day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top posts */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-5">
                            <h3 className="text-sm font-black text-slate-900 mb-3">🏆 Top bài đăng hiệu quả nhất</h3>
                            <div className="space-y-3">
                                {ENGAGEMENT.topPosts.map((p, i) => {
                                    const ps = getPlatformStyle(p.platform);
                                    return (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${
                                                i === 0 ? 'bg-amber-400 text-white' : 'bg-slate-200 text-slate-500'
                                            }`}>{i + 1}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[11px] text-slate-700 font-semibold truncate">{p.text}</p>
                                                <div className="flex items-center gap-3 mt-1 text-[9px] text-slate-400 font-semibold">
                                                    <span className={`px-1.5 py-0.5 rounded ${ps.light} text-[8px]`}>{ps.emoji} {p.platform}</span>
                                                    <span>👁️ {p.reach}</span>
                                                    <span>📞 {p.leads} leads</span>
                                                    <span>❤️ {p.likes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
