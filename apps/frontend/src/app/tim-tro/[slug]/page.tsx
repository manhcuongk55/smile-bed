'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    MapPin, Star, Shield, Phone, ChevronRight, Search, Home,
    Wifi, Wind, Droplets, Lock, Car, Users, CheckCircle2, Send,
    Heart, Share2, DollarSign, Ruler, Zap, Eye
} from 'lucide-react';

/* ── AREA DATA ── */
const AREAS: Record<string, { name: string; city: string; description: string; amenities: string[]; nearby: string[]; avgPrice: string; rooms: typeof ROOMS_DATA }> = {
    'cau-giay': {
        name: 'Cầu Giấy', city: 'Hà Nội',
        description: 'Khu vực sầm uất với nhiều trường ĐH lớn (ĐH Quốc gia, Ngoại thương), nhiều công ty IT. Giao thông thuận tiện, ẩm thực phong phú.',
        amenities: ['🚇 Gần tuyến metro', '🏫 5+ trường ĐH', '🏢 Khu VP lớn', '🍜 Phố ẩm thực Dịch Vọng'],
        nearby: ['ĐH Quốc gia HN', 'ĐH Ngoại thương', 'Keangnam', 'Big C Thăng Long'],
        avgPrice: '2.5 – 5tr',
        rooms: [],
    },
    'binh-thanh': {
        name: 'Bình Thạnh', city: 'TP.HCM',
        description: 'Quận trung tâm kết nối Q.1 và Thủ Đức. Nhiều chung cư, tiện ích hiện đại, gần ĐH Kinh tế, ĐH Hutech.',
        amenities: ['🚇 Metro Bến Thành – Suối Tiên', '🛒 Vincom, Co.op', '🏥 BV Gia Định', '🌳 Công viên Văn Thánh'],
        nearby: ['ĐH Kinh tế HCM', 'ĐH Hutech', 'Landmark 81', 'Chợ Bà Chiểu'],
        avgPrice: '3 – 6tr',
        rooms: [],
    },
    'thu-duc': {
        name: 'Thủ Đức', city: 'TP.HCM',
        description: 'Thành phố mới phía Đông, khu ĐH Quốc gia HCM, nhiều khu công nghệ cao. Tiềm năng phát triển lớn.',
        amenities: ['🎓 Làng ĐH', '🏭 Khu CNC', '🚇 Metro tuyến 1', '🌿 Nhiều cây xanh'],
        nearby: ['ĐH Quốc gia HCM', 'ĐH Bách khoa HCM', 'ĐH Nông Lâm', 'Suối Tiên'],
        avgPrice: '1.8 – 4tr',
        rooms: [],
    },
    'dong-da': {
        name: 'Đống Đa', city: 'Hà Nội',
        description: 'Quận trung tâm với nhiều trường ĐH lớn (Bách khoa, Y Hà Nội), phố ẩm thực, giao thông thuận lợi.',
        amenities: ['🏫 ĐH Bách khoa, ĐH Y', '🍜 Phố Tây Sơn', '🏥 BV Đống Đa', '🚌 Nhiều tuyến bus'],
        nearby: ['ĐH Bách khoa HN', 'ĐH Y HN', 'ĐH KHXH&NV', 'Hồ Đống Đa'],
        avgPrice: '2 – 4.5tr',
        rooms: [],
    },
};

const ROOMS_DATA = [
    { id: 'r1', name: 'Studio máy lạnh ban công', type: 'Studio', size: 25, price: '3.5tr', deposit: '1 tháng', address: 'Ngõ 68', amenities: ['❄️ Máy lạnh', '🚿 Nóng lạnh', '🌅 Ban công', '📶 Wifi 100Mbps', '🅿️ Xe miễn phí', '🔑 Giờ tự do'], floor: 'Tầng 3', available: true, views: 234, saves: 18 },
    { id: 'r2', name: 'Phòng ở ghép 2 người', type: 'Ở ghép', size: 30, price: '2tr/ng', deposit: '1 tháng', address: 'Số 12', amenities: ['🛏️ Giường tầng', '🧊 Tủ riêng', '🍳 Bếp chung', '👕 Máy giặt', '📶 Wifi', '🔒 Khoá riêng'], floor: 'Tầng 2', available: true, views: 189, saves: 12 },
    { id: 'r3', name: 'Phòng deluxe bếp riêng', type: 'Deluxe', size: 35, price: '5tr', deposit: '2 tháng', address: 'Số 88', amenities: ['🍳 Bếp riêng', '🌅 View đẹp', '❄️ Máy lạnh', '🔐 Smart lock', '📶 Wifi 200Mbps', '🅿️ Ô tô'], floor: 'Tầng 5', available: true, views: 312, saves: 27 },
    { id: 'r4', name: 'Phòng mini tiết kiệm', type: 'Mini', size: 18, price: '1.8tr', deposit: '1 tháng', address: 'Ngõ 45', amenities: ['🚿 Nóng lạnh', '📶 Wifi', '🅿️ Xe miễn phí', '🔑 Giờ tự do'], floor: 'Tầng 4', available: true, views: 456, saves: 34 },
    { id: 'r5', name: 'Studio cao cấp full nội thất', type: 'Premium', size: 40, price: '6.5tr', deposit: '2 tháng', address: 'Số 120', amenities: ['❄️ Máy lạnh inverter', '🍳 Bếp + tủ lạnh', '👕 Máy giặt riêng', '📺 Smart TV', '🌅 Ban công rộng', '🔐 Vân tay'], floor: 'Tầng 8', available: false, views: 567, saves: 45 },
];

// Assign rooms to areas
Object.keys(AREAS).forEach(k => { AREAS[k].rooms = ROOMS_DATA; });

export default function TimTroPage({ params }: { params: { slug: string } }) {
    const slug = params.slug || 'cau-giay';
    const area = AREAS[slug] || AREAS['cau-giay'];
    const [search, setSearch] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [leadData, setLeadData] = useState({ name: '', phone: '', zalo: '', note: '' });
    const [leadSent, setLeadSent] = useState(false);
    const [savedRooms, setSavedRooms] = useState<Set<string>>(new Set());

    const filteredRooms = useMemo(() => {
        let result = [...area.rooms];
        if (search) result = result.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
        if (priceFilter === 'under3') result = result.filter(r => parseFloat(r.price) < 3);
        if (priceFilter === '3to5') result = result.filter(r => parseFloat(r.price) >= 3 && parseFloat(r.price) <= 5);
        if (priceFilter === 'over5') result = result.filter(r => parseFloat(r.price) > 5);
        return result;
    }, [search, priceFilter, area.rooms]);

    const handleLeadSubmit = () => {
        if (!leadData.phone) return;
        setLeadSent(true);
        setTimeout(() => { setShowLeadForm(false); setLeadSent(false); setLeadData({ name: '', phone: '', zalo: '', note: '' }); }, 3000);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* SEO Hero */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                    <nav className="text-xs text-white/60 font-semibold mb-4 flex items-center gap-1">
                        <Link href="/" className="hover:text-white">Trang chủ</Link> <ChevronRight className="w-3 h-3" />
                        <Link href="/khu-vuc" className="hover:text-white">Khu vực</Link> <ChevronRight className="w-3 h-3" />
                        <span className="text-white">{area.name}</span>
                    </nav>
                    <h1 className="text-3xl sm:text-4xl font-black mb-3">
                        Phòng trọ {area.name}, {area.city}
                    </h1>
                    <p className="text-white/80 text-sm max-w-xl mb-6">{area.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {area.amenities.map((a, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-xl text-xs font-bold">{a}</span>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 text-sm font-bold">
                        <span>💰 Giá: {area.avgPrice}/tháng</span>
                        <span>🏠 {area.rooms.filter(r => r.available).length} phòng trống</span>
                        <span>⭐ 4.8/5 đánh giá</span>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                {/* Filter bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="flex-1 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm theo tên, loại phòng..." className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-medium outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
                    </div>
                    <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}
                        className="px-4 py-3 rounded-2xl text-xs font-bold bg-white border border-slate-200 outline-none cursor-pointer">
                        <option value="all">💰 Tất cả giá</option>
                        <option value="under3">Dưới 3 triệu</option>
                        <option value="3to5">3 – 5 triệu</option>
                        <option value="over5">Trên 5 triệu</option>
                    </select>
                    <button onClick={() => setShowLeadForm(true)} className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl font-black text-xs shadow-md active:scale-95 transition-all flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5" /> Tư vấn miễn phí
                    </button>
                </div>

                {/* Room cards */}
                <div className="space-y-4 mb-8">
                    {filteredRooms.map((room, i) => (
                        <motion.div key={room.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                            className={`bg-white rounded-3xl border overflow-hidden hover:shadow-xl transition-all ${room.available ? 'border-slate-100' : 'border-slate-200 opacity-70'}`}>
                            <div className="p-5">
                                <div className="flex gap-4">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                                        {room.type === 'Ở ghép' ? '👫' : room.type === 'Deluxe' ? '✨' : room.type === 'Premium' ? '💎' : room.type === 'Mini' ? '📦' : '🏠'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-base font-black text-slate-900">{room.name}</h3>
                                                <p className="text-[10px] text-slate-400 font-semibold">{room.address}, {area.name} · {room.floor} · {room.size}m²</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-black text-indigo-600">{room.price}</p>
                                                <p className="text-[9px] text-slate-400 font-semibold">/tháng · Cọc {room.deposit}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                            {room.amenities.map(a => (
                                                <span key={a} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-[9px] font-bold">{a}</span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold">
                                                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {room.views} lượt xem</span>
                                                <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {room.saves} lưu</span>
                                                <span className={`px-2 py-0.5 rounded-full font-bold ${room.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                                                    {room.available ? '✅ Còn trống' : '❌ Đã thuê'}
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => setSavedRooms(prev => { const n = new Set(prev); n.has(room.id) ? n.delete(room.id) : n.add(room.id); return n; })}
                                                    className={`px-3 py-2 rounded-xl text-[10px] font-bold transition-all active:scale-95 ${
                                                        savedRooms.has(room.id) ? 'bg-pink-100 text-pink-600' : 'bg-slate-100 text-slate-500'
                                                    }`}>
                                                    <Heart className={`w-3 h-3 ${savedRooms.has(room.id) ? 'fill-pink-500' : ''}`} />
                                                </button>
                                                <a href="tel:0912000456">
                                                    <button className="px-4 py-2 rounded-xl text-[10px] font-black bg-indigo-600 text-white active:scale-95 transition-all flex items-center gap-1">
                                                        <Phone className="w-3 h-3" /> Gọi ngay
                                                    </button>
                                                </a>
                                                <button onClick={() => setShowLeadForm(true)} className="px-4 py-2 rounded-xl text-[10px] font-bold bg-emerald-100 text-emerald-700 active:scale-95 transition-all">
                                                    Đặt lịch xem
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* SEO: Nearby areas */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6">
                    <h2 className="text-sm font-black text-slate-900 mb-3">📍 Gần {area.name}</h2>
                    <div className="flex flex-wrap gap-2">
                        {area.nearby.map(n => (
                            <span key={n} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-bold">{n}</span>
                        ))}
                    </div>
                </div>

                {/* SEO: Other areas */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                    <h2 className="text-sm font-black text-slate-900 mb-3">🗺️ Tìm trọ khu vực khác</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {Object.entries(AREAS).filter(([k]) => k !== slug).map(([k, v]) => (
                            <Link key={k} href={`/tim-tro/${k}`}>
                                <div className="p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-all text-center cursor-pointer">
                                    <p className="text-xs font-black">{v.name}</p>
                                    <p className="text-[9px] text-slate-400 font-semibold">{v.city} · {v.avgPrice}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lead capture modal */}
            {showLeadForm && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={(e) => { if (e.target === e.currentTarget) setShowLeadForm(false); }}>
                    <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-5 text-white">
                            <h2 className="text-lg font-black">📞 Tư vấn miễn phí</h2>
                            <p className="text-emerald-100 text-xs font-semibold">Để lại SĐT → Sale liên hệ trong 15 phút</p>
                        </div>
                        <div className="p-6 space-y-4">
                            {leadSent ? (
                                <div className="text-center py-8">
                                    <div className="text-5xl mb-4">✅</div>
                                    <h3 className="text-lg font-black text-slate-900 mb-2">Đã gửi thành công!</h3>
                                    <p className="text-xs text-slate-500 font-semibold">Sale sẽ gọi bạn trong 15 phút. Cảm ơn bạn! 💛</p>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 mb-1 block">Họ tên</label>
                                        <input type="text" value={leadData.name} onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                                            placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-400" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 mb-1 block">Số điện thoại *</label>
                                        <input type="tel" value={leadData.phone} onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                                            placeholder="0912 xxx xxx" className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-400" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 mb-1 block">Zalo (nếu khác SĐT)</label>
                                        <input type="text" value={leadData.zalo} onChange={(e) => setLeadData({...leadData, zalo: e.target.value})}
                                            placeholder="Zalo liên hệ" className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-400" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 mb-1 block">Yêu cầu</label>
                                        <textarea value={leadData.note} onChange={(e) => setLeadData({...leadData, note: e.target.value})}
                                            placeholder="VD: Cần phòng studio dưới 4tr, gần ĐH Quốc gia..."
                                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-400 resize-none h-20" />
                                    </div>
                                    <button onClick={handleLeadSubmit} className="w-full py-3.5 rounded-2xl text-sm font-black bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-200 active:scale-95 transition-all">
                                        📞 Gọi tư vấn miễn phí
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
