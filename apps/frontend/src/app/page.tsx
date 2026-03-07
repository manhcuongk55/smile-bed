import Hero from '@/components/discovery/Hero';
import { ShieldCheck, Info, Bed, Laptop, Coffee, Palmtree, Building2, Play, Sparkles, Map, Puzzle, Gift, ArrowRight, Trophy, Video } from 'lucide-react';
import Link from 'next/link';

const MOCK_LISTINGS = [
    {
        id: '1',
        title: 'Phòng Studio Landmark 81 View',
        type: 'Phòng trọ',
        typeIcon: '🏠',
        price: 8500000,
        priceUnit: '/ tháng',
        estimatedUtilities: 600000,
        location: 'Bình Thạnh, TP.HCM',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: true,
        fireSafetyScore: 9.5,
    },
    {
        id: '2',
        title: 'Sleepbox Premium — Trung tâm Q1',
        type: 'Sleepbox',
        typeIcon: '💤',
        price: 120000,
        priceUnit: '/ đêm',
        estimatedUtilities: 0,
        location: 'Quận 1, TP.HCM',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: true,
        fireSafetyScore: 9.0,
    },
    {
        id: '3',
        title: 'Giường tầng Capsule — Gần Bến Thành',
        type: 'Giường tầng',
        typeIcon: '🛏️',
        price: 2200000,
        priceUnit: '/ tháng',
        estimatedUtilities: 200000,
        location: 'Quận 1, TP.HCM',
        image: 'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: true,
        fireSafetyScore: 8.8,
    },
    {
        id: '4',
        title: 'Coworking Slot — The Coffee Hub',
        type: 'Chỗ làm việc',
        typeIcon: '💻',
        price: 89000,
        priceUnit: '/ ngày',
        estimatedUtilities: 0,
        location: 'Phú Nhuận, TP.HCM',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: true,
        fireSafetyScore: 8.5,
    },
    {
        id: '5',
        title: 'Villa Nghỉ Dưỡng — Hồ Tuyền Lâm',
        type: 'Nghỉ dưỡng',
        typeIcon: '🏖️',
        price: 1500000,
        priceUnit: '/ đêm',
        estimatedUtilities: 0,
        location: 'Đà Lạt, Lâm Đồng',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: false,
        fireSafetyScore: 8.0,
    },
    {
        id: '6',
        title: 'Căn hộ Mini — Gần ĐHQG',
        type: 'Phòng trọ',
        typeIcon: '🏠',
        price: 4200000,
        priceUnit: '/ tháng',
        estimatedUtilities: 400000,
        location: 'Thủ Đức, TP.HCM',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: true,
        fireSafetyScore: 8.8,
    },
];

export default async function Home() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Hero />

            {/* Listings */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 sm:mb-12">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Chỗ ở & Làm việc đã xác thực</h2>
                        <p className="text-slate-500 font-medium italic text-sm sm:text-base">Phòng trọ · Sleepbox · Giường tầng · Coworking · Nghỉ dưỡng</p>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-600 font-bold px-4 py-2 bg-indigo-50 rounded-xl text-sm shrink-0 self-start sm:self-auto">
                        <ShieldCheck className="w-5 h-5" /> Smile Verified
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {MOCK_LISTINGS.map((listing) => (
                        <div key={listing.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300 relative">
                            <div className="relative h-64 overflow-hidden">
                                {listing.verified && (
                                    <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                        <ShieldCheck className="w-3 h-3" /> Đã xác thực
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md border border-slate-100">
                                    {listing.typeIcon} {listing.type}
                                </div>
                                <img
                                    src={listing.image}
                                    alt={listing.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-5 sm:p-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{listing.title}</h3>
                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                                    <MapPin className="w-4 h-4" /> {listing.location}
                                </div>

                                <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                                            {listing.estimatedUtilities > 0 ? 'Tổng chi phí dự kiến' : 'Giá'}
                                        </span>
                                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                                            ⭐ {listing.fireSafetyScore}/10
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black text-indigo-600">
                                            {(listing.price + listing.estimatedUtilities).toLocaleString()}
                                        </span>
                                        <span className="text-slate-400 text-xs font-bold">đ {listing.priceUnit}</span>
                                    </div>
                                    {listing.estimatedUtilities > 0 && (
                                        <p className="text-[10px] text-slate-400 mt-1">
                                            Gồm {listing.price.toLocaleString()}đ thuê + {listing.estimatedUtilities.toLocaleString()}đ phụ phí
                                        </p>
                                    )}
                                </div>

                                <Link href={`/rooms/${listing.id}`} className="block">
                                    <button className="w-full py-4 rounded-2xl font-black bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl transition-all active:scale-95 shadow-lg shadow-indigo-100">
                                        Xem chi tiết
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== SHARE VUI CHALLENGE CTA ===== */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 sm:p-12">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
                    <div className="absolute top-10 left-1/4 text-6xl opacity-10 rotate-12">🎬</div>
                    <div className="absolute bottom-8 right-1/4 text-5xl opacity-10 -rotate-12">🏆</div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-white mb-4">
                                <Sparkles className="w-3 h-3" /> HOT CHALLENGE 🔥
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                                Share <span className="text-yellow-300">Vui</span> Challenge
                            </h2>
                            <p className="text-indigo-100 text-sm sm:text-base mb-6 max-w-md">
                                Quay video cuộc sống ở ghép · Nhận điểm + phần thưởng · Miễn phí tiền trọ cho top creators!
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link href="/share-vui">
                                    <button className="px-6 py-3 rounded-2xl font-black text-sm bg-white text-indigo-600 hover:bg-indigo-50 transition-all active:scale-95 shadow-lg flex items-center gap-2">
                                        <Video className="w-4 h-4" />
                                        Tham gia ngay
                                    </button>
                                </Link>
                                <Link href="/share-vui/leaderboard">
                                    <button className="px-6 py-3 rounded-2xl font-bold text-sm bg-white/20 text-white hover:bg-white/30 transition-all active:scale-95 flex items-center gap-2">
                                        <Trophy className="w-4 h-4" />
                                        Xem BXH
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:grid grid-cols-3 gap-3">
                            {[
                                { thumb: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=280&fit=crop', label: '✨ Before/After' },
                                { thumb: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=280&fit=crop', label: '🌅 Một ngày share' },
                                { thumb: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=200&h=280&fit=crop', label: '📋 Rule nhà mình' },
                            ].map((item, i) => (
                                <div key={i} className="relative rounded-2xl overflow-hidden aspect-[3/4] group">
                                    <img src={item.thumb} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <p className="text-[10px] font-bold text-white">{item.label}</p>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                                            <Play className="w-4 h-4 text-indigo-600 ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== MYSTERY MAP TEASER ===== */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 sm:p-12">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full text-xs font-bold text-amber-700 mb-4">
                                <Map className="w-3 h-3" /> GAMIFICATION MỚI 🗺️
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight">
                                Bản Đồ <span className="gradient-text">Bí Mật</span> Smile
                            </h2>
                            <p className="text-slate-500 text-sm sm:text-base mb-6 max-w-md">
                                Tiếp sức hàng xóm → Nhận mảnh ghép → Đổi & hoàn thành bản đồ → Mở Mega Blind Box cho cả tòa nhà! 🎁
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {['🥐 Bữa sáng 0đ', '⚡ Ưu tiên đơn', '💧 Miễn phí nước', '🦸 Danh hiệu VIP'].map((reward) => (
                                    <span key={reward} className="px-3 py-1.5 bg-slate-50 rounded-full text-xs font-bold text-slate-600 border border-slate-100">
                                        {reward}
                                    </span>
                                ))}
                            </div>
                            <Link href="/dashboard/mystery-map">
                                <button className="px-6 py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg transition-all active:scale-95 shadow-md flex items-center gap-2">
                                    <Puzzle className="w-4 h-4" />
                                    Khám phá ngay
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                        <div className="hidden lg:block">
                            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                                {[
                                    { emoji: '🏠', collected: true, rarity: 'common' },
                                    { emoji: '🌳', collected: true, rarity: 'uncommon' },
                                    { emoji: '❓', collected: false, rarity: 'rare' },
                                    { emoji: '🛒', collected: true, rarity: 'common' },
                                    { emoji: '❓', collected: false, rarity: 'common' },
                                    { emoji: '📚', collected: true, rarity: 'uncommon' },
                                    { emoji: '⭐', collected: false, rarity: 'legendary' },
                                    { emoji: '🏛️', collected: true, rarity: 'rare' },
                                    { emoji: '❓', collected: false, rarity: 'uncommon' },
                                    { emoji: '🎵', collected: true, rarity: 'common' },
                                    { emoji: '❓', collected: false, rarity: 'common' },
                                    { emoji: '🌉', collected: true, rarity: 'rare' },
                                ].map((piece, i) => (
                                    <div
                                        key={i}
                                        className={`aspect-square rounded-xl flex items-center justify-center text-2xl border-2 transition-all ${
                                            piece.collected
                                                ? piece.rarity === 'legendary'
                                                    ? 'border-amber-300 bg-amber-50 shadow-sm shadow-amber-200'
                                                    : piece.rarity === 'rare'
                                                    ? 'border-indigo-300 bg-indigo-50'
                                                    : piece.rarity === 'uncommon'
                                                    ? 'border-emerald-300 bg-emerald-50'
                                                    : 'border-slate-200 bg-slate-50'
                                                : 'border-dashed border-slate-200 bg-slate-50/50 opacity-40'
                                        }`}
                                    >
                                        {piece.emoji}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function MapPin(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}
