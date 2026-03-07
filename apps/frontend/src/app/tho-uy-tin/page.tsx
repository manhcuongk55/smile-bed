'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wrench, Star, Shield, Phone, Clock, MapPin, ChevronRight, Search,
    ThumbsUp, MessageCircle, Zap, Award, CheckCircle2, X, AlertTriangle,
    DollarSign, Calendar, Users, Heart, Share2, Filter, ArrowUpDown
} from 'lucide-react';

/* ── MOCK DATA: THỢ UY TÍN ── */
const CATEGORIES = [
    { key: 'all', label: 'Tất cả', emoji: '🔧' },
    { key: 'electric', label: 'Điện', emoji: '⚡' },
    { key: 'plumbing', label: 'Nước', emoji: '🚿' },
    { key: 'ac', label: 'Điều hoà', emoji: '❄️' },
    { key: 'locksmith', label: 'Khoá', emoji: '🔑' },
    { key: 'appliance', label: 'Đồ gia dụng', emoji: '🔌' },
    { key: 'painting', label: 'Sơn / Trát', emoji: '🎨' },
    { key: 'cleaning', label: 'Vệ sinh', emoji: '🧹' },
];

const WORKERS = [
    {
        id: 'w1',
        name: 'Anh Hùng',
        avatar: '👨‍🔧',
        category: 'electric',
        specialty: 'Thợ điện dân dụng',
        experience: '12 năm',
        rating: 4.9,
        reviews: 156,
        completedJobs: 380,
        priceRange: '200k – 800k',
        warranty: '6 tháng',
        responseTime: '30 phút',
        distance: '1.2km',
        area: 'Cầu Giấy, Hà Nội',
        verified: true,
        topRated: true,
        phone: '0912xxx456',
        bio: 'Cựu kỹ thuật viên Viettel. Chuyên sửa điện dân dụng, bảng mạch, ổ cắm. Giá rõ ràng, báo trước khi sửa.',
        tags: ['Báo giá trước', 'Đúng giờ', 'Bảo hành dài', 'Có tâm'],
        priceList: [
            { service: 'Sửa ổ cắm / công tắc', price: '100k – 200k' },
            { service: 'Sửa bảng mạch', price: '300k – 500k' },
            { service: 'Thay aptomat / CB', price: '150k – 300k' },
            { service: 'Đi dây điện mới', price: '500k – 1.5tr' },
            { service: 'Sửa chập điện', price: '200k – 600k' },
        ],
        recentReviews: [
            { user: 'Minh Anh', avatar: '👩', rating: 5, date: '3 ngày trước', text: 'Anh Hùng sửa ổ điện bị chập, báo giá 250k trước khi sửa. Xong nhanh, sạch sẽ, bảo hành 6 tháng. Quá uy tín!' },
            { user: 'Nam', avatar: '🧔', rating: 5, date: '1 tuần trước', text: 'Gọi lúc 9h tối vẫn nhận. Tới trong 20 phút. Sửa bảng mạch hỏng nguồn mất 450k. Giá rất hợp lý so với chỗ khác đòi 1 triệu.' },
            { user: 'Hà Linh', avatar: '👧', rating: 4, date: '2 tuần trước', text: 'Sửa tốt, anh hiền lành. Chỉ trừ 1 sao vì phải đợi 1 tiếng vì anh đang sửa chỗ khác.' },
        ],
    },
    {
        id: 'w2',
        name: 'Chú Thành',
        avatar: '👴',
        category: 'plumbing',
        specialty: 'Thợ sửa nước',
        experience: '18 năm',
        rating: 4.8,
        reviews: 98,
        completedJobs: 245,
        priceRange: '150k – 600k',
        warranty: '3 tháng',
        responseTime: '45 phút',
        distance: '2.1km',
        area: 'Cầu Giấy, Hà Nội',
        verified: true,
        topRated: true,
        phone: '0987xxx123',
        bio: 'Chuyên sửa vòi nước, toilet, ống thoát nước. 18 năm kinh nghiệm tại khu Cầu Giấy. Không tính phí khảo sát.',
        tags: ['Khảo sát miễn phí', 'Kinh nghiệm lâu năm', 'Giá sinh viên'],
        priceList: [
            { service: 'Sửa vòi nước rỉ', price: '100k – 200k' },
            { service: 'Thông tắc toilet', price: '200k – 400k' },
            { service: 'Thay bồn cầu', price: '300k – 800k (+ vật tư)' },
            { service: 'Sửa ống nước vỡ', price: '250k – 500k' },
            { service: 'Lắp vòi sen mới', price: '150k – 300k' },
        ],
        recentReviews: [
            { user: 'Lan', avatar: '👩', rating: 5, date: '5 ngày trước', text: 'Vòi bếp rỉ gioăng, chú Thành tới sửa 120k. Nhanh gọn, nói chuyện vui tính. Recommend cho mọi nhà trọ luôn!' },
            { user: 'Tú', avatar: '👦', rating: 5, date: '2 tuần trước', text: 'Toilet tắc khổ quá, gọi chú Thành. Đến 45 phút thông sạch. 300k hợp lý.' },
        ],
    },
    {
        id: 'w3',
        name: 'Anh Đức',
        avatar: '🧑‍🔧',
        category: 'ac',
        specialty: 'Thợ điều hoà',
        experience: '8 năm',
        rating: 4.7,
        reviews: 72,
        completedJobs: 190,
        priceRange: '200k – 1.5tr',
        warranty: '6 tháng',
        responseTime: '1 giờ',
        distance: '3.5km',
        area: 'Đống Đa, Hà Nội',
        verified: true,
        topRated: false,
        phone: '0965xxx789',
        bio: 'Chuyên vệ sinh, sửa chữa, bơm gas điều hoà các hãng. Có giấy phép hành nghề điện lạnh.',
        tags: ['Có giấy phép', 'Bơm gas chính hãng', 'Bảo hành dài'],
        priceList: [
            { service: 'Vệ sinh điều hoà', price: '200k – 350k' },
            { service: 'Bơm gas R22/R32', price: '300k – 600k' },
            { service: 'Sửa board mạch', price: '500k – 1.2tr' },
            { service: 'Thay dây đồng', price: '400k – 800k' },
            { service: 'Di dời máy', price: '500k – 1.5tr' },
        ],
        recentReviews: [
            { user: 'Phương', avatar: '👩‍💼', rating: 5, date: '1 tuần trước', text: 'Vệ sinh 2 cái điều hoà, anh Đức làm sạch bong, chạy mát hẳn. 550k/2 cái.' },
            { user: 'Trung', avatar: '🧑', rating: 4, date: '3 tuần trước', text: 'Bơm gas tốt, nhưng phải hẹn trước 1 ngày vì anh khá bận.' },
        ],
    },
    {
        id: 'w4',
        name: 'Anh Tuấn',
        avatar: '👨',
        category: 'locksmith',
        specialty: 'Thợ khoá',
        experience: '10 năm',
        rating: 4.6,
        reviews: 45,
        completedJobs: 320,
        priceRange: '100k – 500k',
        warranty: '3 tháng',
        responseTime: '20 phút',
        distance: '0.8km',
        area: 'Cầu Giấy, Hà Nội',
        verified: true,
        topRated: false,
        phone: '0934xxx567',
        bio: 'Mở khoá khẩn cấp 24/7. Làm chìa, thay ổ khoá các loại. Có mặt nhanh nhất khu Cầu Giấy.',
        tags: ['24/7', 'Tới nhanh', 'Giá rẻ'],
        priceList: [
            { service: 'Mở khoá cửa phòng', price: '100k – 200k' },
            { service: 'Làm chìa khoá', price: '50k – 150k' },
            { service: 'Thay ổ khoá mới', price: '200k – 500k (+ ổ khoá)' },
            { service: 'Sửa khoá xe máy', price: '100k – 300k' },
        ],
        recentReviews: [
            { user: 'Hùng', avatar: '🧔', rating: 5, date: '2 ngày trước', text: 'Quên chìa khoá trong phòng lúc 11 đêm. Anh Tuấn tới 15 phút. Mở xong 150k. Cứu mạng!' },
        ],
    },
    {
        id: 'w5',
        name: 'Bạn Hiếu',
        avatar: '👱',
        category: 'appliance',
        specialty: 'Sửa đồ gia dụng',
        experience: '5 năm',
        rating: 4.8,
        reviews: 67,
        completedJobs: 150,
        priceRange: '200k – 1tr',
        warranty: '6 tháng',
        responseTime: '1 giờ',
        distance: '1.5km',
        area: 'Cầu Giấy, Hà Nội',
        verified: true,
        topRated: true,
        phone: '0976xxx234',
        bio: 'Cùng quê Nghệ An, đang làm kỹ thuật. Sửa máy giặt, tủ lạnh, bình nóng lạnh, lò vi sóng. Báo giá trước, không sửa vẫn miễn phí khảo sát.',
        tags: ['Báo giá trước', 'Miễn phí khảo sát', 'Bảo hành 6 tháng', 'Cùng quê'],
        priceList: [
            { service: 'Sửa máy giặt', price: '300k – 800k' },
            { service: 'Sửa tủ lạnh', price: '300k – 1tr' },
            { service: 'Sửa bình nóng lạnh', price: '200k – 500k' },
            { service: 'Sửa lò vi sóng', price: '200k – 400k' },
            { service: 'Vệ sinh máy giặt', price: '250k – 350k' },
        ],
        recentReviews: [
            { user: 'Thuỳ', avatar: '👩', rating: 5, date: '4 ngày trước', text: 'Máy giặt hỏng bo, Hiếu sửa 500k bảo hành 6 tháng. Chỗ khác đòi 1 triệu bảo hành 1 tháng. Quá rẻ và uy tín!' },
            { user: 'Đạt', avatar: '🧑', rating: 5, date: '1 tuần trước', text: 'Bình nóng lạnh không nóng, Hiếu tới kiểm tra miễn phí rồi sửa 350k. Nhiệt tình.' },
        ],
    },
];

/* ── HELPERS ── */
function getRatingColor(r: number) {
    if (r >= 4.8) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (r >= 4.5) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
}

function getRatingStars(r: number) {
    return '★'.repeat(Math.floor(r)) + (r % 1 >= 0.5 ? '½' : '');
}

/* ── PAGE COMPONENT ── */
export default function ThoUyTinPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'rating' | 'price' | 'distance' | 'reviews'>('rating');
    const [expandedWorker, setExpandedWorker] = useState<string | null>(null);
    const [showRequest, setShowRequest] = useState(false);
    const [requestData, setRequestData] = useState({ issue: '', category: 'electric', urgency: 'normal', address: '' });
    const [requestSent, setRequestSent] = useState(false);

    const filteredWorkers = useMemo(() => {
        let result = [...WORKERS];
        if (selectedCategory !== 'all') result = result.filter(w => w.category === selectedCategory);
        if (search) result = result.filter(w =>
            w.name.toLowerCase().includes(search.toLowerCase()) ||
            w.specialty.toLowerCase().includes(search.toLowerCase()) ||
            w.bio.toLowerCase().includes(search.toLowerCase())
        );
        if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
        if (sortBy === 'distance') result.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        if (sortBy === 'reviews') result.sort((a, b) => b.reviews - a.reviews);
        return result;
    }, [selectedCategory, search, sortBy]);

    const handleSendRequest = () => {
        if (!requestData.issue.trim()) return;
        setRequestSent(true);
        setTimeout(() => { setShowRequest(false); setRequestSent(false); setRequestData({ issue: '', category: 'electric', urgency: 'normal', address: '' }); }, 3000);
    };

    const shareWorker = (w: typeof WORKERS[0]) => {
        const text = `🔧 Thợ uy tín trên Smile:\n👨‍🔧 ${w.name} – ${w.specialty}\n⭐ ${w.rating}/5 · ${w.reviews} đánh giá\n💰 ${w.priceRange} · Bảo hành ${w.warranty}\n\nTìm thợ uy tín tại smile.vn/tho-uy-tin 👉`;
        if (typeof navigator !== 'undefined' && navigator.share) {
            navigator.share({ title: `Smile – ${w.name}`, text, url: 'https://smile.vn/tho-uy-tin' });
        } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(text);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
                        <Shield className="w-3 h-3" /> Đã xác minh · Review từ cư dân thật
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
                        🔧 Thợ <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">Uy Tín</span>
                    </h1>
                    <p className="text-slate-500 text-sm max-w-lg mx-auto mb-6">
                        Giá minh bạch · Bảo hành rõ ràng · Review thật từ cư dân Smile<br/>
                        <span className="text-emerald-600 font-bold">Không sợ bị chém giá!</span>
                    </p>

                    {/* Request CTA */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowRequest(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-200 hover:shadow-xl transition-all"
                    >
                        <Zap className="w-4 h-4" /> Đăng yêu cầu sửa chữa — Thợ gần nhất liên hệ ngay
                    </motion.button>
                </motion.div>

                {/* Trust banner */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {[
                        { emoji: '🛡️', label: 'Xác minh danh tính', desc: '100% thợ được verify' },
                        { emoji: '💰', label: 'Giá công khai', desc: 'Xem bảng giá trước' },
                        { emoji: '📝', label: 'Bảo hành rõ ràng', desc: '3-6 tháng cam kết' },
                        { emoji: '⭐', label: 'Review thật', desc: 'Từ cư dân Smile' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="bg-white rounded-2xl border border-slate-100 p-4 text-center"
                        >
                            <div className="text-2xl mb-2">{item.emoji}</div>
                            <div className="text-xs font-black text-slate-900">{item.label}</div>
                            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{item.desc}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Filter row */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="flex-1 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm thợ: tên, loại sửa chữa..."
                            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-medium focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-4 py-3 rounded-2xl text-xs font-bold bg-white border border-slate-200 outline-none cursor-pointer"
                    >
                        <option value="rating">⭐ Đánh giá cao</option>
                        <option value="distance">📍 Gần nhất</option>
                        <option value="reviews">💬 Nhiều review</option>
                    </select>
                </div>

                {/* Category tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.key}
                            onClick={() => setSelectedCategory(cat.key)}
                            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                                selectedCategory === cat.key
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                            }`}
                        >
                            {cat.emoji} {cat.label}
                        </button>
                    ))}
                </div>

                {/* Worker cards */}
                <div className="space-y-5">
                    {filteredWorkers.map((w, i) => (
                        <motion.div
                            key={w.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all"
                        >
                            {/* Main card */}
                            <div className="p-5">
                                <div className="flex gap-4">
                                    {/* Avatar */}
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl relative">
                                            {w.avatar}
                                            {w.verified && (
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-base font-black text-slate-900">{w.name}</h3>
                                                    {w.topRated && (
                                                        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[9px] font-bold flex items-center gap-0.5">
                                                            <Award className="w-2.5 h-2.5" /> Top
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500 font-semibold">{w.specialty} · {w.experience}</p>
                                            </div>
                                            <div className={`px-2 py-1 rounded-lg border text-xs font-black ${getRatingColor(w.rating)}`}>
                                                ⭐ {w.rating}
                                            </div>
                                        </div>

                                        {/* Stats row */}
                                        <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-400 font-semibold flex-wrap">
                                            <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {w.reviews} đánh giá</span>
                                            <span className="flex items-center gap-1"><Wrench className="w-3 h-3" /> {w.completedJobs} lần sửa</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Tới trong {w.responseTime}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {w.distance}</span>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                            {w.tags.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold">
                                                    ✓ {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Price + Warranty */}
                                        <div className="flex items-center gap-4 mt-3 p-3 bg-slate-50 rounded-xl">
                                            <div>
                                                <p className="text-[9px] text-slate-400 font-bold">GIÁ DỊCH VỤ</p>
                                                <p className="text-sm font-black text-slate-900">{w.priceRange}</p>
                                            </div>
                                            <div className="w-px h-8 bg-slate-200" />
                                            <div>
                                                <p className="text-[9px] text-slate-400 font-bold">BẢO HÀNH</p>
                                                <p className="text-sm font-black text-emerald-600">{w.warranty}</p>
                                            </div>
                                            <div className="w-px h-8 bg-slate-200" />
                                            <div>
                                                <p className="text-[9px] text-slate-400 font-bold">KHU VỰC</p>
                                                <p className="text-xs font-bold text-slate-600">{w.area}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-2 mt-4">
                                    <a href={`tel:${w.phone}`} className="flex-1">
                                        <button className="w-full py-3 rounded-2xl text-xs font-black bg-emerald-600 text-white hover:bg-emerald-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                            <Phone className="w-3.5 h-3.5" /> Gọi ngay
                                        </button>
                                    </a>
                                    <button
                                        onClick={() => setExpandedWorker(expandedWorker === w.id ? null : w.id)}
                                        className="px-4 py-3 rounded-2xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-95 flex items-center gap-1"
                                    >
                                        Bảng giá <ChevronRight className={`w-3 h-3 transition-transform ${expandedWorker === w.id ? 'rotate-90' : ''}`} />
                                    </button>
                                    <button
                                        onClick={() => shareWorker(w)}
                                        className="px-3 py-3 rounded-2xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95"
                                    >
                                        <Share2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Expanded: Price list + Reviews */}
                            <AnimatePresence>
                                {expandedWorker === w.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 border-t border-slate-100">
                                            {/* About */}
                                            <div className="py-4">
                                                <p className="text-xs text-slate-500 font-semibold leading-relaxed">💬 {w.bio}</p>
                                            </div>

                                            {/* Price table */}
                                            <div className="mb-4">
                                                <h4 className="text-xs font-black text-slate-900 mb-2 flex items-center gap-1">
                                                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Bảng giá dịch vụ
                                                </h4>
                                                <div className="bg-slate-50 rounded-2xl overflow-hidden">
                                                    {w.priceList.map((item, j) => (
                                                        <div key={j} className={`flex items-center justify-between px-4 py-2.5 ${j !== w.priceList.length - 1 ? 'border-b border-slate-100' : ''}`}>
                                                            <span className="text-xs text-slate-700 font-semibold">{item.service}</span>
                                                            <span className="text-xs font-black text-emerald-600">{item.price}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p className="text-[10px] text-slate-400 font-semibold mt-2 text-center">
                                                    💡 Giá có thể thay đổi tuỳ tình trạng thực tế. Thợ sẽ báo giá chính xác trước khi sửa.
                                                </p>
                                            </div>

                                            {/* Reviews */}
                                            <div>
                                                <h4 className="text-xs font-black text-slate-900 mb-3 flex items-center gap-1">
                                                    <Star className="w-3.5 h-3.5 text-amber-500" /> Đánh giá từ cư dân ({w.reviews})
                                                </h4>
                                                <div className="space-y-3">
                                                    {w.recentReviews.map((rev, j) => (
                                                        <div key={j} className="bg-slate-50 rounded-2xl p-3">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm">{rev.avatar}</div>
                                                                <div className="flex-1">
                                                                    <span className="text-[11px] font-bold text-slate-700">{rev.user}</span>
                                                                    <span className="text-[10px] text-slate-400 ml-2">{rev.date}</span>
                                                                </div>
                                                                <div className="text-amber-400 text-[10px]">{getRatingStars(rev.rating)}</div>
                                                            </div>
                                                            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{rev.text}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {filteredWorkers.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        <Wrench className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p className="text-sm font-bold">Chưa có thợ nào trong danh mục này</p>
                        <p className="text-xs mt-1">Hãy thử tìm kiếm với từ khoá khác</p>
                    </div>
                )}
            </div>

            {/* ── REQUEST MODAL ── */}
            <AnimatePresence>
                {showRequest && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={(e) => { if (e.target === e.currentTarget) setShowRequest(false); }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
                        >
                            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 text-white relative">
                                <button onClick={() => setShowRequest(false)} className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <X className="w-4 h-4" />
                                </button>
                                <h2 className="text-lg font-black">🔧 Đăng yêu cầu sửa chữa</h2>
                                <p className="text-emerald-100 text-xs font-semibold">Mô tả sự cố → thợ gần nhất sẽ liên hệ bạn</p>
                            </div>

                            <div className="p-6 space-y-4">
                                {requestSent ? (
                                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-8">
                                        <div className="text-5xl mb-4">✅</div>
                                        <h3 className="text-lg font-black text-slate-900 mb-2">Đã gửi yêu cầu!</h3>
                                        <p className="text-xs text-slate-500 font-semibold">Thợ uy tín gần nhà sẽ liên hệ bạn trong vòng 30 phút</p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1 block">Loại sự cố</label>
                                            <select
                                                value={requestData.category}
                                                onChange={(e) => setRequestData({ ...requestData, category: e.target.value })}
                                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-400"
                                            >
                                                {CATEGORIES.filter(c => c.key !== 'all').map(c => (
                                                    <option key={c.key} value={c.key}>{c.emoji} {c.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1 block">Mức độ khẩn cấp</label>
                                            <div className="flex gap-2">
                                                {[
                                                    { value: 'normal', label: 'Bình thường', emoji: '🕐' },
                                                    { value: 'urgent', label: 'Gấp', emoji: '⚡' },
                                                    { value: 'emergency', label: 'Khẩn cấp', emoji: '🚨' },
                                                ].map(u => (
                                                    <button
                                                        key={u.value}
                                                        onClick={() => setRequestData({ ...requestData, urgency: u.value })}
                                                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                                                            requestData.urgency === u.value
                                                                ? 'bg-emerald-600 text-white border-emerald-600'
                                                                : 'bg-white text-slate-600 border-slate-200'
                                                        }`}
                                                    >
                                                        {u.emoji} {u.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1 block">Mô tả sự cố</label>
                                            <textarea
                                                value={requestData.issue}
                                                onChange={(e) => setRequestData({ ...requestData, issue: e.target.value })}
                                                placeholder="VD: Ổ cắm phòng khách bị chập, vòi nước bếp rỉ chỗ gioăng..."
                                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-400 resize-none h-24"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1 block">Địa chỉ</label>
                                            <input
                                                type="text"
                                                value={requestData.address}
                                                onChange={(e) => setRequestData({ ...requestData, address: e.target.value })}
                                                placeholder="Số nhà, ngõ, phường..."
                                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-400"
                                            />
                                        </div>

                                        <button
                                            onClick={handleSendRequest}
                                            className="w-full py-3.5 rounded-2xl text-sm font-black bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-200 active:scale-95 transition-all"
                                        >
                                            🚀 Gửi yêu cầu — Thợ gần nhất liên hệ
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
