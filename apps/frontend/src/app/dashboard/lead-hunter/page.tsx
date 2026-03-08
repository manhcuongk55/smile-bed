'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Radar, Search, Zap, MessageCircle, Phone, Copy, CheckCircle2,
    RefreshCw, Filter, Star, MapPin, Clock, UserPlus, Eye, Send,
    X, Settings, Play, Pause, TrendingUp, Target, Bot, ChevronRight
} from 'lucide-react';

/* ── FOUND LEADS (simulated social media posts) ── */
const FOUND_LEADS = [
    {
        id: 'fl1', platform: 'facebook', group: 'Phòng trọ Hà Nội giá rẻ',
        author: 'Nguyễn Mai Linh', avatar: '👩', time: '3 phút trước',
        content: 'Mọi người ơi cho mình hỏi khu Cầu Giấy có phòng trọ nào dưới 3.5 triệu không ạ? Mình cần phòng có điều hoà, gần ĐH Quốc gia. Inbox mình nha 🙏',
        keywords: ['Cầu Giấy', 'dưới 3.5 triệu', 'điều hoà', 'ĐH Quốc gia'],
        matchScore: 96, status: 'new', interactions: 12,
    },
    {
        id: 'fl2', platform: 'facebook', group: 'Sinh viên tìm trọ TP.HCM',
        author: 'Trần Đức Mạnh', avatar: '🧑', time: '8 phút trước',
        content: 'Cần tìm gấp phòng ở ghép khu Bình Thạnh, gần ĐH Kinh tế. Budget 2 triệu/người. Có bạn nào share phòng không? Ưu tiên phòng sạch sẽ, có wifi.',
        keywords: ['ở ghép', 'Bình Thạnh', 'ĐH Kinh tế', '2 triệu'],
        matchScore: 94, status: 'new', interactions: 8,
    },
    {
        id: 'fl3', platform: 'zalo', group: 'Nhà trọ Cầu Giấy - Đống Đa',
        author: 'Phạm Thị Hương', avatar: '👧', time: '15 phút trước',
        content: 'Mình đang tìm studio có bếp riêng ở khu Đống Đa, budget 4-5 triệu. Ai biết chỗ nào sạch đẹp cho mình xin thông tin với.',
        keywords: ['studio', 'bếp riêng', 'Đống Đa', '4-5 triệu'],
        matchScore: 91, status: 'new', interactions: 5,
    },
    {
        id: 'fl4', platform: 'facebook', group: 'Tìm phòng trọ Q1-Q12 HCM',
        author: 'Lê Văn Hoàng', avatar: '👨', time: '22 phút trước',
        content: 'Các bạn ơi tìm phòng khu Thủ Đức ĐH Bách khoa, cần phòng giờ tự do, wifi mạnh, 2-3tr/tháng. Mình dân IT nên wifi quan trọng lắm 😅',
        keywords: ['Thủ Đức', 'Bách khoa', 'giờ tự do', 'wifi', '2-3tr'],
        matchScore: 89, status: 'replied', interactions: 15,
    },
    {
        id: 'fl5', platform: 'facebook', group: 'Phòng trọ Hà Nội giá rẻ',
        author: 'Đỗ Quỳnh Anh', avatar: '👩‍🎓', time: '35 phút trước',
        content: 'Phụ huynh tìm phòng cho con gái sắp nhập học ĐH Ngoại thương. Cần phòng an ninh, camera, gần trường. Budget 3-4tr. Ai giới thiệu inbox ạ.',
        keywords: ['phụ huynh', 'ĐH Ngoại thương', 'an ninh', 'camera', '3-4tr'],
        matchScore: 93, status: 'new', interactions: 23,
    },
    {
        id: 'fl6', platform: 'zalo', group: 'Phòng trọ SV Sài Gòn',
        author: 'Bùi Minh Tú', avatar: '🧔', time: '1 giờ trước',
        content: 'Bạn nào biết chỗ cho thuê phòng gần ĐH FPT Thủ Đức? Mình cần phòng có máy lạnh, tầm 2.5-3tr. Ưu tiên có chỗ để xe.',
        keywords: ['ĐH FPT', 'Thủ Đức', 'máy lạnh', '2.5-3tr'],
        matchScore: 87, status: 'contacted', interactions: 6,
    },
    {
        id: 'fl7', platform: 'facebook', group: 'Nhà trọ Cầu Giấy - Đống Đa',
        author: 'Hoàng Thu Hà', avatar: '👩‍💼', time: '2 giờ trước',
        content: 'NV văn phòng tìm phòng deluxe khu Cầu Giấy, cần smart lock + bếp riêng, budget 5-6tr. Ưu tiên tầng cao view đẹp.',
        keywords: ['deluxe', 'Cầu Giấy', 'smart lock', 'bếp riêng', '5-6tr'],
        matchScore: 85, status: 'new', interactions: 4,
    },
];

/* ── KEYWORDS ── */
const KEYWORDS = [
    { keyword: 'tìm phòng trọ', found: 156, active: true },
    { keyword: 'cần phòng', found: 98, active: true },
    { keyword: 'cho thuê phòng', found: 87, active: true },
    { keyword: 'ở ghép', found: 45, active: true },
    { keyword: 'tìm bạn ở ghép', found: 34, active: true },
    { keyword: 'phụ huynh tìm trọ', found: 23, active: true },
    { keyword: 'nhập học tìm phòng', found: 19, active: true },
    { keyword: 'phòng studio', found: 41, active: false },
];

/* ── MONITORED GROUPS ── */
const GROUPS = [
    { name: 'Phòng trọ Hà Nội giá rẻ', platform: 'facebook', members: '520k', lastScan: '2 phút trước', leadsFound: 34, active: true },
    { name: 'Sinh viên tìm trọ TP.HCM', platform: 'facebook', members: '310k', lastScan: '5 phút trước', leadsFound: 28, active: true },
    { name: 'Tìm phòng trọ Q1-Q12 HCM', platform: 'facebook', members: '180k', lastScan: '3 phút trước', leadsFound: 19, active: true },
    { name: 'Nhà trọ Cầu Giấy - Đống Đa', platform: 'zalo', members: '8.5k', lastScan: '1 phút trước', leadsFound: 15, active: true },
    { name: 'Phòng trọ SV Sài Gòn', platform: 'zalo', members: '12k', lastScan: '4 phút trước', leadsFound: 11, active: true },
    { name: 'SV tìm trọ Thủ Đức', platform: 'facebook', members: '95k', lastScan: '8 phút trước', leadsFound: 8, active: false },
];

function getReply(lead: typeof FOUND_LEADS[0]) {
    const area = lead.keywords.find(k => ['Cầu Giấy', 'Bình Thạnh', 'Thủ Đức', 'Đống Đa'].includes(k)) || 'khu vực bạn cần';
    const budget = lead.keywords.find(k => k.includes('tr')) || '';
    
    const replies = [
        `Chào ${lead.author.split(' ').pop()}, bên mình hiện có phòng ${area} phù hợp yêu cầu bạn ạ! ${budget ? `Giá ${budget}/tháng, ` : ''}bao điện nước. Phòng sạch đẹp, an ninh 24/7. Bạn inbox mình SĐT để tư vấn chi tiết nhé! 🏠`,
        `Hi ${lead.author.split(' ').pop()}! Mình có phòng gần ${lead.keywords[lead.keywords.length - 2] || area} luôn nè. Tiện ích đầy đủ: wifi, máy lạnh, giờ tự do. Xem phòng free, bạn gửi SĐT mình hẹn lịch nha 📞`,
        `${lead.author.split(' ').pop()} ơi, bên Smile Bed có nhiều phòng ${area} đúng budget bạn. Đã verify an toàn + thợ uy tín. Xem thêm tại smile.vn/tim-tro 🔗 Hoặc inbox SĐT mình gọi tư vấn ạ!`,
    ];
    return replies;
}

export default function LeadHunterPage() {
    const [tab, setTab] = useState<'leads' | 'groups' | 'keywords' | 'settings'>('leads');
    const [leads, setLeads] = useState(FOUND_LEADS);
    const [selectedLead, setSelectedLead] = useState<typeof FOUND_LEADS[0] | null>(null);
    const [copiedReply, setCopiedReply] = useState('');
    const [isScanning, setIsScanning] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [scanInterval, setScanInterval] = useState('5');

    const copyReply = (text: string, idx: string) => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(text);
            setCopiedReply(idx);
            setTimeout(() => setCopiedReply(''), 2000);
        }
    };

    const markAs = (id: string, status: string) => {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    };

    const filtered = leads.filter(l => statusFilter === 'all' || l.status === statusFilter);
    const newCount = leads.filter(l => l.status === 'new').length;

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
                            <Radar className="w-3 h-3" /> Social Lead Hunter
                        </div>
                        <h1 className="text-2xl font-black text-slate-900">
                            🎯 Tự Động <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">Tìm Khách</span>
                        </h1>
                        <p className="text-xs text-slate-400 font-semibold">Quét MXH → Phát hiện người tìm trọ → Gợi ý reply → Chốt lead</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 ${isScanning ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                            <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                            {isScanning ? 'Đang quét' : 'Đã dừng'}
                        </div>
                        <button onClick={() => setIsScanning(!isScanning)}
                            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all active:scale-95 ${
                                isScanning ? 'bg-amber-100 text-amber-700' : 'bg-emerald-500 text-white'
                            }`}>
                            {isScanning ? '⏸ Dừng' : '▶ Bật quét'}
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                        { emoji: '🎯', label: 'Leads phát hiện', value: leads.length, color: 'text-cyan-600' },
                        { emoji: '🆕', label: 'Chưa liên hệ', value: newCount, color: 'text-red-500' },
                        { emoji: '📡', label: 'Nhóm theo dõi', value: GROUPS.filter(g => g.active).length, color: 'text-blue-600' },
                        { emoji: '🔑', label: 'Từ khoá theo dõi', value: KEYWORDS.filter(k => k.active).length, color: 'text-purple-600' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-100 p-3 text-center">
                            <div className="text-lg">{s.emoji}</div>
                            <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                            <div className="text-[9px] font-bold text-slate-400">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1.5 border border-slate-100">
                    {[
                        { key: 'leads', label: `🎯 Leads (${newCount} mới)` },
                        { key: 'groups', label: '📡 Nhóm theo dõi' },
                        { key: 'keywords', label: '🔑 Từ khoá' },
                        { key: 'settings', label: '⚙️ Cài đặt' },
                    ].map(t => (
                        <button key={t.key} onClick={() => setTab(t.key as any)}
                            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                                tab === t.key ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                            }`}>{t.label}</button>
                    ))}
                </div>

                {/* ── LEADS TAB ── */}
                {tab === 'leads' && (
                    <div>
                        <div className="flex gap-2 mb-4 overflow-x-auto">
                            {[{ k: 'all', l: 'Tất cả' }, { k: 'new', l: '🆕 Mới' }, { k: 'replied', l: '💬 Đã reply' }, { k: 'contacted', l: '📞 Đã LH' }].map(f => (
                                <button key={f.k} onClick={() => setStatusFilter(f.k)}
                                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap ${
                                        statusFilter === f.k ? 'bg-cyan-600 text-white' : 'bg-white text-slate-500 border border-slate-200'
                                    }`}>{f.l}</button>
                            ))}
                        </div>

                        <div className="space-y-3">
                            {filtered.map((lead, i) => (
                                <motion.div key={lead.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                    className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
                                    <div className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center text-xl shrink-0">{lead.avatar}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm font-black text-slate-900">{lead.author}</span>
                                                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                                        lead.platform === 'facebook' ? 'bg-blue-100 text-blue-700' : 'bg-sky-100 text-sky-700'
                                                    }`}>{lead.platform === 'facebook' ? '📘 FB' : '💬 Zalo'}</span>
                                                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                                        lead.status === 'new' ? 'bg-red-100 text-red-600' : lead.status === 'replied' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                                                    }`}>
                                                        {lead.status === 'new' ? '🆕 Mới' : lead.status === 'replied' ? '💬 Đã reply' : '📞 Đã LH'}
                                                    </span>
                                                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                                        lead.matchScore >= 90 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                                                    }`}>🎯 {lead.matchScore}% match</span>
                                                </div>
                                                <p className="text-[10px] text-slate-400 font-semibold mb-2">📍 {lead.group} · ⏰ {lead.time} · 💬 {lead.interactions} tương tác</p>

                                                <div className="bg-slate-50 rounded-xl p-3 mb-3">
                                                    <p className="text-xs text-slate-700 leading-relaxed">"{lead.content}"</p>
                                                </div>

                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {lead.keywords.map(k => (
                                                        <span key={k} className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded-full text-[9px] font-bold">🏷️ {k}</span>
                                                    ))}
                                                </div>

                                                <div className="flex gap-2">
                                                    <button onClick={() => setSelectedLead(lead)}
                                                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl text-[10px] font-black active:scale-95 transition-all flex items-center gap-1">
                                                        <MessageCircle className="w-3 h-3" /> Xem gợi ý reply
                                                    </button>
                                                    {lead.status === 'new' && (
                                                        <button onClick={() => markAs(lead.id, 'replied')}
                                                            className="px-3 py-2 bg-amber-100 text-amber-700 rounded-xl text-[10px] font-bold active:scale-95">
                                                            ✓ Đánh dấu đã reply
                                                        </button>
                                                    )}
                                                    <button onClick={() => markAs(lead.id, 'contacted')}
                                                        className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-[10px] font-bold active:scale-95">
                                                        📞 Đã liên hệ
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── GROUPS TAB ── */}
                {tab === 'groups' && (
                    <div className="space-y-3">
                        {GROUPS.map((g, i) => (
                            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                                    g.platform === 'facebook' ? 'bg-blue-100' : 'bg-sky-100'
                                }`}>{g.platform === 'facebook' ? '📘' : '💬'}</div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-black text-slate-900">{g.name}</h4>
                                    <div className="flex gap-3 text-[10px] text-slate-400 font-semibold">
                                        <span>👥 {g.members}</span>
                                        <span>🎯 {g.leadsFound} leads</span>
                                        <span>🕐 {g.lastScan}</span>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${g.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {g.active ? '🟢 Đang quét' : '⏸ Dừng'}
                                </span>
                            </motion.div>
                        ))}
                        <button className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400 hover:border-cyan-300 hover:text-cyan-600 transition-all">
                            + Thêm nhóm theo dõi
                        </button>
                    </div>
                )}

                {/* ── KEYWORDS TAB ── */}
                {tab === 'keywords' && (
                    <div className="space-y-2">
                        <p className="text-xs text-slate-400 font-semibold mb-3">Hệ thống quét các từ khoá này trong bài đăng trên nhóm MXH</p>
                        {KEYWORDS.map((kw, i) => (
                            <div key={i} className="bg-white rounded-xl border border-slate-100 px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm">🔑</span>
                                    <span className="text-xs font-bold text-slate-900">"{kw.keyword}"</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-slate-400 font-semibold">{kw.found} kết quả</span>
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${kw.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {kw.active ? 'Bật' : 'Tắt'}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400 hover:border-cyan-300 hover:text-cyan-600 transition-all">
                            + Thêm từ khoá
                        </button>
                    </div>
                )}

                {/* ── SETTINGS TAB ── */}
                {tab === 'settings' && (
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
                        <h3 className="text-sm font-black text-slate-900">⚙️ Cài đặt quét</h3>
                        <div>
                            <label className="text-xs font-bold text-slate-700 mb-1 block">Tần suất quét (phút)</label>
                            <select value={scanInterval} onChange={(e) => setScanInterval(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none">
                                <option value="1">Mỗi 1 phút (Nhanh)</option>
                                <option value="5">Mỗi 5 phút (Khuyên dùng)</option>
                                <option value="15">Mỗi 15 phút</option>
                                <option value="30">Mỗi 30 phút</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-700 mb-1 block">Match score tối thiểu</label>
                            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none">
                                <option>70% trở lên</option>
                                <option>80% trở lên</option>
                                <option>90% trở lên</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-700 mb-1 block">Khu vực ưu tiên</label>
                            <div className="flex flex-wrap gap-2">
                                {['Cầu Giấy', 'Đống Đa', 'Bình Thạnh', 'Thủ Đức', 'Q.10', 'Q.5'].map(a => (
                                    <span key={a} className="px-3 py-1.5 bg-cyan-50 text-cyan-700 rounded-xl text-[10px] font-bold cursor-pointer hover:bg-cyan-100">{a}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-700 mb-1 block">Thông báo</label>
                            <div className="space-y-2">
                                {['🔔 Push notification khi có lead mới', '📧 Email tổng hợp mỗi ngày', '💬 Gửi Zalo khi match > 90%'].map(opt => (
                                    <label key={opt} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="rounded" /> {opt}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Reply Suggestion Drawer */}
            <AnimatePresence>
                {selectedLead && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={(e) => { if (e.target === e.currentTarget) setSelectedLead(null); }}>
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30 }}
                            className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl overflow-y-auto">
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-5 text-white sticky top-0 z-10">
                                <button onClick={() => setSelectedLead(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">{selectedLead.avatar}</div>
                                    <div>
                                        <h2 className="text-lg font-black">{selectedLead.author}</h2>
                                        <p className="text-cyan-100 text-xs font-semibold">{selectedLead.group} · {selectedLead.time}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 space-y-5">
                                {/* Original post */}
                                <div>
                                    <h3 className="text-xs font-black text-slate-900 mb-2">📝 Bài đăng gốc</h3>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-700 leading-relaxed">"{selectedLead.content}"</p>
                                    </div>
                                </div>

                                {/* Keywords */}
                                <div>
                                    <h3 className="text-xs font-black text-slate-900 mb-2">🏷️ Keywords phát hiện</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedLead.keywords.map(k => (
                                            <span key={k} className="px-2.5 py-1 bg-cyan-50 text-cyan-700 rounded-lg text-[10px] font-bold">{k}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Reply suggestions */}
                                <div>
                                    <h3 className="text-xs font-black text-slate-900 mb-3">💬 Gợi ý reply (chọn 1 để copy)</h3>
                                    <div className="space-y-3">
                                        {getReply(selectedLead).map((reply, idx) => (
                                            <div key={idx} className="border border-slate-200 rounded-xl p-4 hover:border-cyan-300 transition-all">
                                                <p className="text-xs text-slate-700 leading-relaxed mb-3">{reply}</p>
                                                <button onClick={() => copyReply(reply, `${selectedLead.id}-${idx}`)}
                                                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all active:scale-95 flex items-center gap-1 ${
                                                        copiedReply === `${selectedLead.id}-${idx}` ? 'bg-emerald-100 text-emerald-700' : 'bg-cyan-500 text-white'
                                                    }`}>
                                                    {copiedReply === `${selectedLead.id}-${idx}` ? <><CheckCircle2 className="w-3 h-3" /> Đã copy!</> : <><Copy className="w-3 h-3" /> Copy reply</>}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button onClick={() => { markAs(selectedLead.id, 'replied'); setSelectedLead(null); }}
                                        className="flex-1 py-3 bg-amber-100 text-amber-700 rounded-xl text-xs font-black active:scale-95 transition-all">
                                        💬 Đã reply
                                    </button>
                                    <button onClick={() => { markAs(selectedLead.id, 'contacted'); setSelectedLead(null); }}
                                        className="flex-1 py-3 bg-emerald-500 text-white rounded-xl text-xs font-black active:scale-95 transition-all">
                                        📞 Đã liên hệ
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
