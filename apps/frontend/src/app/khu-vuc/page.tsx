'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Search, SlidersHorizontal, Star, Coffee, Dumbbell, ShoppingCart, Banknote,
    Bus, GraduationCap, Utensils, Heart, TreePine, Wifi, Shield, Users,
    Share2, ChevronRight, Sparkles, ArrowRight, CheckCircle2, X, Zap
} from 'lucide-react';

/* ── AREA DATA ── */
const AREAS = [
    {
        id: 'cau-giay',
        name: 'Cầu Giấy',
        city: 'Hà Nội',
        tagline: 'Thiên đường sinh viên & startup',
        priceRange: '2.5tr – 6tr',
        avgPrice: 3800000,
        vibe: '🎓 Học thuật · 🍜 Ăn uống đêm · 💻 Startup hub',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
        rating: 4.6,
        reviews: 234,
        matchTags: ['student', 'foodie', 'budget', 'nightlife'],
        amenities: {
            food: { score: 95, label: '🍜 Ẩm thực', count: '200+ quán', desc: 'Phở, bún chả, cơm rang... đủ kiểu, giá sinh viên' },
            transport: { score: 88, label: '🚌 Di chuyển', count: '15 tuyến bus', desc: 'Gần ĐH Quốc Gia, 20 phút đến trung tâm' },
            gym: { score: 72, label: '💪 Gym & Thể thao', count: '12 phòng gym', desc: 'California, CitiGym, nhiều gym mini giá rẻ' },
            shopping: { score: 80, label: '🛒 Mua sắm', count: '5 siêu thị', desc: 'Big C, Vinmart, chợ Dịch Vọng' },
            education: { score: 98, label: '🎓 Giáo dục', count: '8 trường ĐH', desc: 'ĐHQG, Ngoại thương, Giao thông...' },
            safety: { score: 78, label: '🛡️ An ninh', count: '', desc: 'Khu dân cư đông, camera khu vực' },
            green: { score: 65, label: '🌳 Cây xanh', count: '3 công viên', desc: 'Công viên Cầu Giấy, hồ Nghĩa Đô' },
            nightlife: { score: 85, label: '🌙 Đêm', count: '30+ quán', desc: 'Quán cà phê muộn, trà đá vỉa hè' },
        },
        topSpots: [
            { name: 'Phở 10 Lý Quốc Sư', type: '🍜', distance: '500m' },
            { name: 'California Fitness', type: '💪', distance: '800m' },
            { name: 'Big C Thăng Long', type: '🛒', distance: '1.2km' },
            { name: 'ĐH Quốc Gia Hà Nội', type: '🎓', distance: '300m' },
        ],
        residents: 42,
        trending: true,
    },
    {
        id: 'binh-thanh',
        name: 'Bình Thạnh',
        city: 'TP.HCM',
        tagline: 'Năng động, kết nối mọi quận',
        priceRange: '3tr – 8tr',
        avgPrice: 5200000,
        vibe: '🏙️ Trung tâm · ☕ Cà phê đẹp · 🚄 Metro tiện',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&h=400&fit=crop',
        rating: 4.5,
        reviews: 189,
        matchTags: ['professional', 'coffee', 'central', 'metro'],
        amenities: {
            food: { score: 90, label: '🍜 Ẩm thực', count: '300+ quán', desc: 'Đa dạng từ street food đến nhà hàng' },
            transport: { score: 95, label: '🚌 Di chuyển', count: 'Metro Line 1', desc: 'Ga Bình Thái, 10 phút đến Q1' },
            gym: { score: 85, label: '💪 Gym & Thể thao', count: '20 phòng gym', desc: 'Jetts, Citigym, hồ bơi Landmark' },
            shopping: { score: 92, label: '🛒 Mua sắm', count: '10+ TTTM', desc: 'Landmark 81, Pearl Plaza, Vincom' },
            education: { score: 75, label: '🎓 Giáo dục', count: '5 trường ĐH', desc: 'Văn Lang, Hồng Bàng, Hutech' },
            safety: { score: 80, label: '🛡️ An ninh', count: '', desc: 'Nhiều chung cư an ninh tốt' },
            green: { score: 70, label: '🌳 Cây xanh', count: '4 công viên', desc: 'Công viên Văn Thánh, Landmark' },
            nightlife: { score: 88, label: '🌙 Đêm', count: '50+ quán', desc: 'Rooftop bars, quán chill, live music' },
        },
        topSpots: [
            { name: 'Landmark 81', type: '🛒', distance: '500m' },
            { name: 'The Coffee House', type: '☕', distance: '200m' },
            { name: 'Ga Metro Bình Thái', type: '🚄', distance: '800m' },
            { name: 'Hồ bơi Landmark', type: '💪', distance: '600m' },
        ],
        residents: 67,
        trending: true,
    },
    {
        id: 'thu-duc',
        name: 'Thủ Đức',
        city: 'TP.HCM',
        tagline: 'Khu đô thị mới, giá tốt',
        priceRange: '2tr – 5tr',
        avgPrice: 3200000,
        vibe: '🌿 Yên tĩnh · 🎓 ĐH lớn · 💰 Giá rẻ',
        image: 'https://images.unsplash.com/photo-1464938050520-ef2571c26cef?w=600&h=400&fit=crop',
        rating: 4.3,
        reviews: 156,
        matchTags: ['student', 'budget', 'quiet', 'nature'],
        amenities: {
            food: { score: 78, label: '🍜 Ẩm thực', count: '100+ quán', desc: 'Cơm sinh viên, quán nhậu bình dân' },
            transport: { score: 70, label: '🚌 Di chuyển', count: '10 tuyến bus', desc: 'Xa trung tâm nhưng có xe buýt' },
            gym: { score: 60, label: '💪 Gym & Thể thao', count: '8 phòng gym', desc: 'Gym mini, sân bóng đá' },
            shopping: { score: 72, label: '🛒 Mua sắm', count: '3 siêu thị', desc: 'Coopmart, Bách Hoá Xanh' },
            education: { score: 95, label: '🎓 Giáo dục', count: '6 trường ĐH', desc: 'ĐH Quốc Gia, Nông Lâm, SPKT' },
            safety: { score: 75, label: '🛡️ An ninh', count: '', desc: 'Khu làng ĐH an ninh ổn' },
            green: { score: 88, label: '🌳 Cây xanh', count: '6 công viên', desc: 'Nhiều cây xanh, thoáng mát' },
            nightlife: { score: 60, label: '🌙 Đêm', count: '15 quán', desc: 'Quán nhậu sinh viên, trà sữa' },
        },
        topSpots: [
            { name: 'ĐH Quốc Gia TP.HCM', type: '🎓', distance: '500m' },
            { name: 'Coopmart Thủ Đức', type: '🛒', distance: '700m' },
            { name: 'Sân bóng Làng ĐH', type: '⚽', distance: '300m' },
            { name: 'Suối Tiên', type: '🎡', distance: '2km' },
        ],
        residents: 53,
        trending: false,
    },
    {
        id: 'dong-da',
        name: 'Đống Đa',
        city: 'Hà Nội',
        tagline: 'Trung tâm văn hóa, đậm chất Hà Nội',
        priceRange: '3tr – 7tr',
        avgPrice: 4500000,
        vibe: '📚 Văn hóa · 🏛️ Lịch sử · ☕ Cà phê chill',
        image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=600&h=400&fit=crop',
        rating: 4.4,
        reviews: 178,
        matchTags: ['culture', 'coffee', 'central', 'professional'],
        amenities: {
            food: { score: 92, label: '🍜 Ẩm thực', count: '250+ quán', desc: 'Bún chả, phở cuốn, ẩm thực Hà Nội chuẩn' },
            transport: { score: 90, label: '🚌 Di chuyển', count: '20 tuyến bus', desc: 'Trung tâm, đi đâu cũng tiện' },
            gym: { score: 75, label: '💪 Gym & Thể thao', count: '15 phòng gym', desc: 'Gym, yoga, bể bơi các khách sạn' },
            shopping: { score: 85, label: '🛒 Mua sắm', count: '8 siêu thị', desc: 'Royal City, chợ Khâm Thiên' },
            education: { score: 90, label: '🎓 Giáo dục', count: '10 trường ĐH', desc: 'Bách khoa, Kinh tế, Xây dựng' },
            safety: { score: 82, label: '🛡️ An ninh', count: '', desc: 'Khu dân cư lâu đời, an ninh tốt' },
            green: { score: 72, label: '🌳 Cây xanh', count: '5 công viên', desc: 'Hồ Đống Đa, vườn hoa' },
            nightlife: { score: 80, label: '🌙 Đêm', count: '40+ quán', desc: 'Cà phê sách, pub nhỏ, trà đá phố' },
        },
        topSpots: [
            { name: 'Royal City', type: '🛒', distance: '600m' },
            { name: 'Chợ Khâm Thiên', type: '🍜', distance: '400m' },
            { name: 'ĐH Bách khoa', type: '🎓', distance: '500m' },
            { name: 'Hồ Đống Đa', type: '🌳', distance: '300m' },
        ],
        residents: 38,
        trending: false,
    },
];

/* ── QUIZ QUESTIONS ── */
const QUIZ_QUESTIONS = [
    { id: 'q1', emoji: '💰', question: 'Ngân sách hàng tháng?', options: [
        { label: 'Dưới 3 triệu', value: 'budget', emoji: '💸' },
        { label: '3 – 5 triệu', value: 'mid', emoji: '💵' },
        { label: 'Trên 5 triệu', value: 'premium', emoji: '💎' },
    ]},
    { id: 'q2', emoji: '🎯', question: 'Bạn là ai?', options: [
        { label: 'Sinh viên', value: 'student', emoji: '🎓' },
        { label: 'Đi làm', value: 'professional', emoji: '💼' },
        { label: 'Freelancer', value: 'freelancer', emoji: '💻' },
    ]},
    { id: 'q3', emoji: '❤️', question: 'Điều quan trọng nhất?', options: [
        { label: 'Ăn uống ngon', value: 'foodie', emoji: '🍜' },
        { label: 'Đi lại tiện', value: 'metro', emoji: '🚌' },
        { label: 'Yên tĩnh', value: 'quiet', emoji: '🌿' },
        { label: 'Vui chơi', value: 'nightlife', emoji: '🌙' },
    ]},
    { id: 'q4', emoji: '⚡', question: 'Phong cách sống?', options: [
        { label: 'Cà phê & sáng tạo', value: 'coffee', emoji: '☕' },
        { label: 'Gym & healthy', value: 'fitness', emoji: '💪' },
        { label: 'Thiên nhiên', value: 'nature', emoji: '🌳' },
        { label: 'Networking', value: 'central', emoji: '🤝' },
    ]},
];

/* ── AMENITY ICON MAP ── */
function getAmenityIcon(key: string) {
    const map: Record<string, any> = {
        food: Utensils, transport: Bus, gym: Dumbbell, shopping: ShoppingCart,
        education: GraduationCap, safety: Shield, green: TreePine, nightlife: Star,
    };
    return map[key] || MapPin;
}

function getScoreColor(score: number) {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-slate-500 bg-slate-50';
}

function getScoreBarColor(score: number) {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-slate-400';
}

export default function KhuVucPage() {
    const [search, setSearch] = useState('');
    const [selectedCity, setSelectedCity] = useState('all');
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizStep, setQuizStep] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
    const [quizResult, setQuizResult] = useState<typeof AREAS[0] | null>(null);
    const [expandedArea, setExpandedArea] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'rating' | 'price' | 'reviews'>('rating');

    const filteredAreas = useMemo(() => {
        let result = [...AREAS];
        if (selectedCity !== 'all') result = result.filter(a => a.city === selectedCity);
        if (search) result = result.filter(a =>
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.tagline.toLowerCase().includes(search.toLowerCase())
        );
        if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
        if (sortBy === 'price') result.sort((a, b) => a.avgPrice - b.avgPrice);
        if (sortBy === 'reviews') result.sort((a, b) => b.reviews - a.reviews);
        return result;
    }, [search, selectedCity, sortBy]);

    const handleQuizAnswer = (value: string) => {
        const newAnswers = [...quizAnswers, value];
        setQuizAnswers(newAnswers);
        if (quizStep < QUIZ_QUESTIONS.length - 1) {
            setQuizStep(quizStep + 1);
        } else {
            // Calculate best match
            let bestMatch = AREAS[0];
            let bestScore = 0;
            AREAS.forEach(area => {
                let score = 0;
                newAnswers.forEach(answer => {
                    if (area.matchTags.includes(answer)) score += 2;
                });
                if (answer_includes_budget(newAnswers, area.avgPrice)) score += 1;
                if (score > bestScore) { bestScore = score; bestMatch = area; }
            });
            setQuizResult(bestMatch);
        }
    };

    const resetQuiz = () => {
        setQuizStep(0);
        setQuizAnswers([]);
        setQuizResult(null);
        setShowQuiz(false);
    };

    const shareResult = (area: typeof AREAS[0]) => {
        const text = `🏠 Tôi tìm thấy khu vực phù hợp trên Smile!\n📍 ${area.name} – ${area.tagline}\n⭐ ${area.rating}/5 · ${area.priceRange}\n\nBạn hợp khu nào? Thử ngay 👉 smile.vn/khu-vuc`;
        if (typeof navigator !== 'undefined' && navigator.share) {
            navigator.share({ title: `Smile – ${area.name}`, text, url: 'https://smile.vn/khu-vuc' });
        } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(text);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
                            Khám phá <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Khu vực</span> phù hợp
                        </h1>
                        <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto mb-6">
                            So sánh tiện ích xung quanh · Tìm khu vực match lối sống · Xem review từ cư dân thật
                        </p>
                    </motion.div>

                    {/* Quiz CTA */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        onClick={() => setShowQuiz(true)}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl cursor-pointer hover:shadow-xl transition-all active:scale-95 shadow-lg shadow-indigo-200"
                    >
                        <Sparkles className="w-5 h-5" />
                        <span className="font-black text-sm">Khu nào hợp bạn? — Thử quiz 30 giây</span>
                        <ArrowRight className="w-4 h-4" />
                    </motion.div>
                </div>

                {/* Filter bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <div className="flex-1 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm khu vực: Cầu Giấy, Bình Thạnh, Thủ Đức..."
                            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-medium focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'Hà Nội', 'TP.HCM'].map(city => (
                            <button
                                key={city}
                                onClick={() => setSelectedCity(city)}
                                className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                                    selectedCity === city
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
                                }`}
                            >
                                {city === 'all' ? '🗺️ Tất cả' : city === 'Hà Nội' ? '🏛️ Hà Nội' : '🌆 TP.HCM'}
                            </button>
                        ))}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="px-3 py-3 rounded-2xl text-xs font-bold bg-white border border-slate-200 outline-none cursor-pointer"
                        >
                            <option value="rating">⭐ Đánh giá cao</option>
                            <option value="price">💰 Giá thấp trước</option>
                            <option value="reviews">💬 Nhiều review</option>
                        </select>
                    </div>
                </div>

                {/* Area Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredAreas.map((area, i) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all group"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img src={area.image} alt={area.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                {area.trending && (
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-amber-400 text-amber-900 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                                        <Zap className="w-3 h-3" /> Hot
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 rounded-full text-[10px] font-bold">
                                    {area.city}
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-xl font-black text-white mb-1">{area.name}</h3>
                                    <p className="text-white/80 text-xs font-semibold">{area.tagline}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                {/* Stats row */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                            <span className="text-sm font-black text-slate-900">{area.rating}</span>
                                            <span className="text-xs text-slate-400">({area.reviews})</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <Users className="w-3.5 h-3.5" />
                                            <span className="text-xs font-bold">{area.residents} cư dân Smile</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-indigo-600">{area.priceRange}</p>
                                        <p className="text-[10px] text-slate-400">/ tháng</p>
                                    </div>
                                </div>

                                {/* Vibe tags */}
                                <p className="text-xs text-slate-500 font-medium mb-4 bg-slate-50 px-3 py-2 rounded-xl">
                                    {area.vibe}
                                </p>

                                {/* Amenity scores (compact) */}
                                <div className="grid grid-cols-4 gap-2 mb-4">
                                    {Object.entries(area.amenities).slice(0, 4).map(([key, amenity]) => (
                                        <div key={key} className="text-center">
                                            <div className={`text-lg font-black ${amenity.score >= 85 ? 'text-emerald-600' : amenity.score >= 70 ? 'text-blue-600' : 'text-amber-600'}`}>
                                                {amenity.score}
                                            </div>
                                            <div className="text-[9px] font-bold text-slate-400">{amenity.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Expand button */}
                                <button
                                    onClick={() => setExpandedArea(expandedArea === area.id ? null : area.id)}
                                    className="w-full py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors flex items-center justify-center gap-1"
                                >
                                    {expandedArea === area.id ? 'Thu gọn' : 'Xem chi tiết tiện ích'} <ChevronRight className={`w-3 h-3 transition-transform ${expandedArea === area.id ? 'rotate-90' : ''}`} />
                                </button>

                                {/* Expanded details */}
                                <AnimatePresence>
                                    {expandedArea === area.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 border-t border-slate-100 mt-3 space-y-3">
                                                {Object.entries(area.amenities).map(([key, amenity]) => (
                                                    <div key={key} className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getScoreColor(amenity.score)}`}>
                                                            {(() => { const Icon = getAmenityIcon(key); return <Icon className="w-4 h-4" />; })()}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="text-xs font-bold text-slate-700">{amenity.label}</span>
                                                                <span className={`text-xs font-black ${amenity.score >= 85 ? 'text-emerald-600' : amenity.score >= 70 ? 'text-blue-600' : 'text-amber-600'}`}>
                                                                    {amenity.score}/100
                                                                </span>
                                                            </div>
                                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                                <div className={`h-full rounded-full ${getScoreBarColor(amenity.score)}`} style={{ width: `${amenity.score}%` }} />
                                                            </div>
                                                            <p className="text-[10px] text-slate-400 mt-0.5">
                                                                {amenity.count && <span className="font-bold">{amenity.count} · </span>}
                                                                {amenity.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Top spots */}
                                                <div className="pt-3">
                                                    <p className="text-xs font-bold text-slate-700 mb-2">📍 Địa điểm nổi bật</p>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {area.topSpots.map((spot, j) => (
                                                            <div key={j} className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
                                                                <span className="text-sm">{spot.type}</span>
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-slate-700">{spot.name}</p>
                                                                    <p className="text-[9px] text-slate-400">{spot.distance}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Action buttons */}
                                <div className="flex gap-2 mt-4">
                                    <Link href={`/rooms?area=${area.id}`} className="flex-1">
                                        <button className="w-full py-3 rounded-2xl text-xs font-black bg-indigo-600 text-white hover:bg-indigo-700 transition-all active:scale-95 shadow-sm">
                                            🏠 Xem phòng tại đây
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => shareResult(area)}
                                        className="px-4 py-3 rounded-2xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95"
                                    >
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── QUIZ MODAL ── */}
            <AnimatePresence>
                {showQuiz && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={(e) => { if (e.target === e.currentTarget) resetQuiz(); }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
                        >
                            {/* Quiz Header */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 text-white relative">
                                <button onClick={resetQuiz} className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <X className="w-4 h-4" />
                                </button>
                                <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-wider mb-1">
                                    {quizResult ? '✨ KẾT QUẢ' : `Câu ${quizStep + 1}/${QUIZ_QUESTIONS.length}`}
                                </p>
                                <h2 className="text-lg font-black">
                                    {quizResult ? 'Khu vực phù hợp với bạn!' : 'Khu nào hợp bạn?'}
                                </h2>
                                {!quizResult && (
                                    <div className="flex gap-1 mt-3">
                                        {QUIZ_QUESTIONS.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex-1 h-1.5 rounded-full ${idx <= quizStep ? 'bg-white' : 'bg-white/30'}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Quiz Body */}
                            <div className="p-6">
                                {!quizResult ? (
                                    <div>
                                        <div className="text-center mb-6">
                                            <span className="text-4xl block mb-3">{QUIZ_QUESTIONS[quizStep].emoji}</span>
                                            <h3 className="text-lg font-black text-slate-900">{QUIZ_QUESTIONS[quizStep].question}</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {QUIZ_QUESTIONS[quizStep].options.map(opt => (
                                                <motion.div
                                                    key={opt.value}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleQuizAnswer(opt.value)}
                                                    className="flex items-center gap-3 p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-all"
                                                >
                                                    <span className="text-2xl">{opt.emoji}</span>
                                                    <span className="text-sm font-bold text-slate-700">{opt.label}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                        <div className="relative rounded-2xl overflow-hidden h-40 mb-4">
                                            <img src={quizResult.image} alt={quizResult.name} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute bottom-3 left-4">
                                                <h3 className="text-xl font-black text-white">{quizResult.name}</h3>
                                                <p className="text-white/80 text-xs">{quizResult.tagline}</p>
                                            </div>
                                            <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-400 text-emerald-900 rounded-full text-[10px] font-black flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> Best match!
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                <span className="text-sm font-black">{quizResult.rating}</span>
                                            </div>
                                            <span className="text-sm font-black text-indigo-600">{quizResult.priceRange}</span>
                                        </div>

                                        <p className="text-xs text-slate-500 bg-slate-50 rounded-xl px-3 py-2 mb-4">{quizResult.vibe}</p>

                                        <div className="grid grid-cols-4 gap-2 mb-4">
                                            {Object.entries(quizResult.amenities).slice(0, 4).map(([key, a]) => (
                                                <div key={key} className="text-center p-2 bg-slate-50 rounded-xl">
                                                    <div className="text-sm font-black text-indigo-600">{a.score}</div>
                                                    <div className="text-[8px] font-bold text-slate-400">{a.label}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex gap-2">
                                            <Link href={`/rooms?area=${quizResult.id}`} className="flex-1">
                                                <button className="w-full py-3 rounded-2xl text-xs font-black bg-indigo-600 text-white active:scale-95 transition-all">
                                                    🏠 Xem phòng
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => shareResult(quizResult)}
                                                className="px-4 py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-white active:scale-95 transition-all flex items-center gap-1"
                                            >
                                                <Share2 className="w-3 h-3" /> Share kết quả
                                            </button>
                                        </div>
                                        <button onClick={resetQuiz} className="w-full mt-3 py-2 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                                            Làm lại quiz
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* helper */
function answer_includes_budget(answers: string[], avgPrice: number) {
    if (answers.includes('budget') && avgPrice <= 3500000) return true;
    if (answers.includes('mid') && avgPrice > 3500000 && avgPrice <= 5500000) return true;
    if (answers.includes('premium') && avgPrice > 5500000) return true;
    return false;
}
