'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Phone, MessageCircle, Calendar, Eye, ChevronDown, Plus,
    CheckCircle2, Clock, Star, MapPin, X, Search, TrendingUp,
    UserPlus, Filter, ArrowRight
} from 'lucide-react';

/* ── LEAD DATA ── */
const INITIAL_LEADS = [
    { id: 'l1', name: 'Nguyễn Thị Hương', phone: '0912.345.678', zalo: '0912.345.678', source: 'Facebook', area: 'Cầu Giấy', budget: '3-4tr', note: 'Cần studio gần ĐH Quốc gia, có ban công', status: 'new', createdAt: '08/03 · 08:12', room: '', assignedTo: 'Linh' },
    { id: 'l2', name: 'Trần Văn Đức', phone: '0987.654.321', zalo: '0987.654.321', source: 'Zalo Group', area: 'Bình Thạnh', budget: '2-3tr', note: 'SV Kinh tế HCM, tìm ở ghép 2 người', status: 'contacted', createdAt: '08/03 · 07:45', room: 'P305 Share', assignedTo: 'Minh' },
    { id: 'l3', name: 'Lê Hoàng Nam', phone: '0909.111.222', zalo: '', source: 'Website', area: 'Thủ Đức', budget: '1.5-2tr', note: 'SV Bách khoa, budget thấp, cần gần metro', status: 'viewing', createdAt: '07/03 · 18:30', room: 'P102 Mini', assignedTo: 'Linh' },
    { id: 'l4', name: 'Phạm Thị Mai', phone: '0933.444.555', zalo: '0933.444.555', source: 'TikTok', area: 'Đống Đa', budget: '4-5tr', note: 'Nhân viên VP, cần phòng riêng có bếp', status: 'contacted', createdAt: '07/03 · 14:20', room: '', assignedTo: 'Minh' },
    { id: 'l5', name: 'Hoàng Minh Tuấn', phone: '0966.777.888', zalo: '0966.777.888', source: 'Giới thiệu', area: 'Cầu Giấy', budget: '5-7tr', note: 'Dev IT, cần smart lock, wifi mạnh, yên tĩnh', status: 'signed', createdAt: '06/03 · 10:00', room: 'P201 Studio', assignedTo: 'Linh' },
    { id: 'l6', name: 'Đỗ Thanh Hà', phone: '0944.222.333', zalo: '', source: 'Facebook', area: 'Bình Thạnh', budget: '3-4tr', note: 'Giáo viên mầm non, cần an ninh tốt', status: 'new', createdAt: '08/03 · 07:00', room: '', assignedTo: '' },
    { id: 'l7', name: 'Bùi Quang Huy', phone: '0977.888.999', zalo: '0977.888.999', source: 'Zalo Group', area: 'Thủ Đức', budget: '2-3tr', note: 'SV FPT năm 2, tìm ở ghép', status: 'lost', createdAt: '05/03 · 20:00', room: '', assignedTo: 'Minh' },
];

const STAGES = [
    { key: 'new', label: 'Mới', emoji: '🆕', color: 'bg-blue-100 text-blue-700', count: 0 },
    { key: 'contacted', label: 'Đã liên hệ', emoji: '📞', color: 'bg-amber-100 text-amber-700', count: 0 },
    { key: 'viewing', label: 'Xem phòng', emoji: '👀', color: 'bg-purple-100 text-purple-700', count: 0 },
    { key: 'signed', label: 'Ký HĐ', emoji: '✅', color: 'bg-emerald-100 text-emerald-700', count: 0 },
    { key: 'lost', label: 'Mất', emoji: '❌', color: 'bg-red-100 text-red-600', count: 0 },
];

const SOURCES = ['Tất cả', 'Facebook', 'Zalo Group', 'TikTok', 'Website', 'Giới thiệu'];

export default function LeadsPage() {
    const [leads, setLeads] = useState(INITIAL_LEADS);
    const [statusFilter, setStatusFilter] = useState('all');
    const [sourceFilter, setSourceFilter] = useState('Tất cả');
    const [search, setSearch] = useState('');
    const [selectedLead, setSelectedLead] = useState<typeof INITIAL_LEADS[0] | null>(null);
    const [showAdd, setShowAdd] = useState(false);
    const [newLead, setNewLead] = useState({ name: '', phone: '', source: 'Facebook', area: 'Cầu Giấy', budget: '', note: '' });

    const stageCounts = STAGES.map(s => ({ ...s, count: leads.filter(l => l.status === s.key).length }));

    const filtered = leads.filter(l => {
        if (statusFilter !== 'all' && l.status !== statusFilter) return false;
        if (sourceFilter !== 'Tất cả' && l.source !== sourceFilter) return false;
        if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.phone.includes(search)) return false;
        return true;
    });

    const updateStatus = (id: string, status: string) => {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
        if (selectedLead?.id === id) setSelectedLead(prev => prev ? { ...prev, status } : null);
    };

    const addLead = () => {
        if (!newLead.phone) return;
        const lead = { ...newLead, id: `l${Date.now()}`, zalo: '', status: 'new', createdAt: 'Vừa xong', room: '', assignedTo: '' };
        setLeads(prev => [lead, ...prev]);
        setShowAdd(false);
        setNewLead({ name: '', phone: '', source: 'Facebook', area: 'Cầu Giấy', budget: '', note: '' });
    };

    const conversionRate = leads.length > 0 ? ((leads.filter(l => l.status === 'signed').length / leads.length) * 100).toFixed(1) : '0';

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">📋 Quản lý Khách hàng</h1>
                        <p className="text-xs text-slate-400 font-semibold">Lead CRM — Theo dõi từ liên hệ đến ký hợp đồng</p>
                    </div>
                    <button onClick={() => setShowAdd(true)} className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-md active:scale-95 transition-all flex items-center gap-2">
                        <UserPlus className="w-3.5 h-3.5" /> Thêm khách
                    </button>
                </div>

                {/* Pipeline stats */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
                    {stageCounts.map(s => (
                        <button key={s.key} onClick={() => setStatusFilter(statusFilter === s.key ? 'all' : s.key)}
                            className={`p-3 rounded-2xl border transition-all text-center ${
                                statusFilter === s.key ? 'border-indigo-300 bg-indigo-50 ring-2 ring-indigo-100' : 'border-slate-100 bg-white hover:border-slate-200'
                            }`}>
                            <div className="text-lg">{s.emoji}</div>
                            <p className="text-xl font-black text-slate-900">{s.count}</p>
                            <p className="text-[9px] font-bold text-slate-400">{s.label}</p>
                        </button>
                    ))}
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
                        <p className="text-2xl font-black text-indigo-600">{leads.length}</p>
                        <p className="text-[9px] font-bold text-slate-400">Tổng leads</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
                        <p className="text-2xl font-black text-emerald-600">{conversionRate}%</p>
                        <p className="text-[9px] font-bold text-slate-400">Tỷ lệ ký HĐ</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
                        <p className="text-2xl font-black text-amber-600">{leads.filter(l => l.status === 'new').length}</p>
                        <p className="text-[9px] font-bold text-slate-400">Chờ liên hệ</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <div className="flex-1 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm theo tên hoặc SĐT..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium outline-none focus:border-indigo-400" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {SOURCES.map(s => (
                            <button key={s} onClick={() => setSourceFilter(s)}
                                className={`px-3 py-2 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all ${
                                    sourceFilter === s ? 'bg-indigo-600 text-white' : 'bg-white text-slate-500 border border-slate-200'
                                }`}>{s}</button>
                        ))}
                    </div>
                </div>

                {/* Lead list */}
                <div className="space-y-2">
                    {filtered.map((lead, i) => {
                        const stage = STAGES.find(s => s.key === lead.status) || STAGES[0];
                        return (
                            <motion.div key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                                onClick={() => setSelectedLead(lead)}
                                className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-sm font-black text-indigo-700">
                                        {lead.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black text-slate-900">{lead.name}</span>
                                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${stage.color}`}>{stage.emoji} {stage.label}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold">
                                            <span>📞 {lead.phone}</span>
                                            <span>📍 {lead.area}</span>
                                            <span>💰 {lead.budget}</span>
                                            <span>📢 {lead.source}</span>
                                        </div>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[10px] text-slate-400 font-semibold">{lead.createdAt}</p>
                                        {lead.assignedTo && <p className="text-[9px] text-indigo-500 font-bold">→ {lead.assignedTo}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Lead Detail Drawer */}
            <AnimatePresence>
                {selectedLead && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={(e) => { if (e.target === e.currentTarget) setSelectedLead(null); }}>
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30 }}
                            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto">
                            <div className="bg-indigo-600 px-6 py-5 text-white sticky top-0 z-10">
                                <button onClick={() => setSelectedLead(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-xl font-black">{selectedLead.name.charAt(0)}</div>
                                    <div>
                                        <h2 className="text-lg font-black">{selectedLead.name}</h2>
                                        <p className="text-indigo-200 text-xs font-semibold">{selectedLead.createdAt} · {selectedLead.source}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 space-y-5">
                                {/* Contact */}
                                <div>
                                    <h3 className="text-xs font-black text-slate-900 mb-2">📞 Liên hệ</h3>
                                    <div className="flex gap-2">
                                        <a href={`tel:${selectedLead.phone}`} className="flex-1 py-3 bg-emerald-500 text-white rounded-xl text-xs font-black text-center active:scale-95 transition-all">📞 Gọi {selectedLead.phone}</a>
                                        {selectedLead.zalo && (
                                            <a href={`https://zalo.me/${selectedLead.zalo.replace(/\./g, '')}`} className="px-4 py-3 bg-blue-500 text-white rounded-xl text-xs font-bold active:scale-95 transition-all">💬 Zalo</a>
                                        )}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="space-y-2">
                                    <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                                        <span className="text-[10px] font-bold text-slate-500">📍 Khu vực</span>
                                        <span className="text-xs font-black text-slate-900">{selectedLead.area}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                                        <span className="text-[10px] font-bold text-slate-500">💰 Budget</span>
                                        <span className="text-xs font-black text-slate-900">{selectedLead.budget}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                                        <span className="text-[10px] font-bold text-slate-500">🏠 Phòng đề xuất</span>
                                        <span className="text-xs font-black text-indigo-600">{selectedLead.room || 'Chưa chọn'}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                                        <span className="text-[10px] font-bold text-slate-500">👤 Sale phụ trách</span>
                                        <span className="text-xs font-black text-slate-900">{selectedLead.assignedTo || 'Chưa assign'}</span>
                                    </div>
                                </div>

                                {/* Note */}
                                <div className="bg-amber-50 rounded-xl p-3">
                                    <p className="text-[10px] font-bold text-amber-700 mb-1">📝 Ghi chú</p>
                                    <p className="text-xs text-slate-700 font-medium">{selectedLead.note}</p>
                                </div>

                                {/* Status update */}
                                <div>
                                    <h3 className="text-xs font-black text-slate-900 mb-2">📊 Cập nhật trạng thái</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {STAGES.filter(s => s.key !== 'lost').map(s => (
                                            <button key={s.key} onClick={() => updateStatus(selectedLead.id, s.key)}
                                                className={`py-2.5 rounded-xl text-[10px] font-bold transition-all active:scale-95 ${
                                                    selectedLead.status === s.key ? `${s.color} ring-2 ring-offset-1` : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                }`}>
                                                {s.emoji} {s.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add Lead Modal */}
            <AnimatePresence>
                {showAdd && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={(e) => { if (e.target === e.currentTarget) setShowAdd(false); }}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
                            <div className="bg-indigo-600 px-6 py-4 text-white flex items-center justify-between">
                                <h2 className="text-base font-black">➕ Thêm khách mới</h2>
                                <button onClick={() => setShowAdd(false)}><X className="w-4 h-4" /></button>
                            </div>
                            <div className="p-5 space-y-3">
                                <input type="text" value={newLead.name} onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                                    placeholder="Họ tên" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-400" />
                                <input type="tel" value={newLead.phone} onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                                    placeholder="Số điện thoại *" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-400" />
                                <div className="grid grid-cols-2 gap-2">
                                    <select value={newLead.source} onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                                        className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs outline-none">
                                        {['Facebook', 'Zalo Group', 'TikTok', 'Website', 'Giới thiệu'].map(s => <option key={s}>{s}</option>)}
                                    </select>
                                    <select value={newLead.area} onChange={(e) => setNewLead({...newLead, area: e.target.value})}
                                        className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs outline-none">
                                        {['Cầu Giấy', 'Bình Thạnh', 'Thủ Đức', 'Đống Đa'].map(a => <option key={a}>{a}</option>)}
                                    </select>
                                </div>
                                <input type="text" value={newLead.budget} onChange={(e) => setNewLead({...newLead, budget: e.target.value})}
                                    placeholder="Budget (VD: 3-4tr)" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-400" />
                                <textarea value={newLead.note} onChange={(e) => setNewLead({...newLead, note: e.target.value})}
                                    placeholder="Ghi chú yêu cầu..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-400 resize-none h-20" />
                                <button onClick={addLead} className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-black active:scale-95 transition-all">
                                    ➕ Lưu khách
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
