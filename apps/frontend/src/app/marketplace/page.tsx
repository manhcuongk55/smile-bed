'use client';

import { ShoppingBag, Sparkles, Wrench, Bike, Sofa, Zap, Star, CheckCircle, TrendingUp, Crown, ArrowRight, Clock, Users, Gift, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

/* ── Mock User Context ─────────────────────────────── */
const USER_CONTEXT = {
    name: 'Cyrus',
    room: 'A302',
    area: '25m²',
    workStyle: 'remote',
    activeServices: ['internet-basic', 'repair-basic'],
};

/* ── Service Data ──────────────────────────────────── */
const SERVICES = [
    {
        id: 'cleaning',
        name: 'Dọn phòng định kỳ',
        description: 'Nhân viên vệ sinh chuyên nghiệp đến 2 lần / tuần.',
        price: 800000,
        frequency: 'MONTHLY',
        icon: Sparkles,
        color: 'bg-pink-50 text-pink-600',
        borderColor: 'border-pink-100',
        benefits: ['Tiết kiệm 6 giờ / tuần', 'Không cần tự dọn', 'Vệ sinh chuẩn khách sạn'],
        rating: 4.8,
        users: 124,
        status: 'available',
        tag: 'Phổ biến nhất',
    },
    {
        id: 'repair-basic',
        name: 'Sửa chữa điện nước',
        description: 'Thợ kỹ thuật phản hồi trong 2h, kiểm tra miễn phí.',
        price: 0,
        frequency: 'ONE_TIME',
        icon: Wrench,
        color: 'bg-amber-50 text-amber-600',
        borderColor: 'border-amber-100',
        benefits: ['Phản hồi trong 2 giờ', 'Kiểm tra miễn phí', 'Thợ lành nghề uy tín'],
        rating: 4.9,
        users: 208,
        status: 'active',
        tag: null,
    },
    {
        id: 'ebike',
        name: 'Xe máy điện VinFast',
        description: 'Thuê xe máy điện theo tháng, giao tận phòng.',
        price: 1500000,
        frequency: 'MONTHLY',
        icon: Bike,
        color: 'bg-green-50 text-green-600',
        borderColor: 'border-green-100',
        benefits: ['Không lo xăng dầu', 'Giao tận phòng', 'Bảo trì miễn phí'],
        rating: 4.6,
        users: 67,
        status: 'recommended',
        tag: 'Gợi ý cho bạn',
    },
    {
        id: 'furniture',
        name: 'Thuê nội thất cao cấp',
        description: 'Bàn ghế, kệ sách, đèn theo phong cách Bắc Âu.',
        price: 500000,
        frequency: 'MONTHLY',
        icon: Sofa,
        color: 'bg-indigo-50 text-indigo-600',
        borderColor: 'border-indigo-100',
        benefits: ['Setup trong 24h', 'Thay đổi theo mùa', 'Không mất phí vận chuyển'],
        rating: 4.7,
        users: 93,
        status: 'available',
        tag: null,
    },
    {
        id: 'internet-premium',
        name: 'Internet tốc độ cao 200Mbps',
        description: 'Nâng cấp riêng cho phòng bạn, ổn định cho work-from-home.',
        price: 250000,
        frequency: 'MONTHLY',
        icon: Zap,
        color: 'bg-violet-50 text-violet-600',
        borderColor: 'border-violet-100',
        benefits: ['Tốc độ gấp đôi', 'Ổn định cho video call', 'Ping thấp cho gaming'],
        rating: 4.5,
        users: 156,
        status: 'upgrade',
        tag: '🔥 Nâng cấp',
    },
];

/* ── Bundles ───────────────────────────────────────── */
const BUNDLES = [
    {
        id: 'premium-living',
        name: 'Gói Premium Living',
        description: 'Dọn phòng + Internet 200Mbps + Sửa chữa ưu tiên',
        originalPrice: 1150000,
        price: 950000,
        savings: 200000,
        savingsYearly: 2400000,
        services: ['cleaning', 'internet-premium', 'repair-basic'],
        color: 'from-indigo-600 to-violet-600',
        popular: true,
    },
    {
        id: 'work-from-room',
        name: 'Work-from-Room Setup',
        description: 'Nội thất cao cấp + Internet 200Mbps',
        originalPrice: 750000,
        price: 650000,
        savings: 100000,
        savingsYearly: 1200000,
        services: ['furniture', 'internet-premium'],
        color: 'from-emerald-600 to-teal-600',
        popular: false,
    },
];

/* ── Status helpers ────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
    const configs: Record<string, { bg: string; text: string; label: string }> = {
        active: { bg: 'bg-green-50', text: 'text-green-600', label: '🟢 Đang sử dụng' },
        upgrade: { bg: 'bg-amber-50', text: 'text-amber-600', label: '🟡 Có thể nâng cấp' },
        recommended: { bg: 'bg-blue-50', text: 'text-blue-600', label: '🔵 Đề xuất cho bạn' },
        available: { bg: 'bg-slate-50', text: 'text-slate-500', label: '⚪ Chưa đăng ký' },
    };
    const c = configs[status] || configs.available;
    return (
        <span className={`${c.bg} ${c.text} px-3 py-1 rounded-full text-xs font-bold`}>
            {c.label}
        </span>
    );
}

/* ── Main Page ─────────────────────────────────────── */
export default function MarketplacePage() {
    const [activeTab, setActiveTab] = useState<'all' | 'active' | 'bundles'>('all');

    const activeServices = SERVICES.filter((s) => USER_CONTEXT.activeServices.includes(s.id));
    const recommendedServices = SERVICES.filter((s) => s.status === 'recommended' || s.status === 'upgrade');

    return (
        <div className="min-h-screen bg-slate-50 pt-20 sm:pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* ── Header with personalisation ──────────── */}
                <div className="mb-10">
                    <p className="text-sm font-bold text-indigo-600 mb-1">Xin chào {USER_CONTEXT.name} 👋</p>
                    <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mb-2">Living OS</h1>
                    <p className="text-slate-500 font-medium">
                        Phòng {USER_CONTEXT.room} · {USER_CONTEXT.area} — Tất cả dịch vụ gộp chung hóa đơn hàng tháng.
                    </p>
                </div>

                {/* ── Active Services ──────────────────────── */}
                {activeServices.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" /> Dịch vụ đang sử dụng
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeServices.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <div key={s.id} className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-green-100 shadow-sm">
                                        <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center shrink-0`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-slate-900 truncate">{s.name}</p>
                                            <p className="text-xs text-slate-400 font-medium">{s.price > 0 ? `${s.price.toLocaleString('vi-VN')}đ / tháng` : 'Miễn phí'}</p>
                                        </div>
                                        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold shrink-0">Active</span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* ── Smart Recommendations ────────────────── */}
                {recommendedServices.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-500" /> Đề xuất thông minh
                        </h2>
                        <p className="text-sm text-slate-400 font-medium mb-4">
                            Vì bạn đang ở phòng {USER_CONTEXT.area}, làm việc {USER_CONTEXT.workStyle} → gợi ý tối ưu nhất cho bạn.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recommendedServices.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <div key={s.id} className={`bg-white rounded-2xl p-6 border ${s.borderColor} shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer`}>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <StatusBadge status={s.status} />
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 mb-1">{s.name}</h3>
                                        <p className="text-sm text-slate-500 font-medium mb-4">{s.description}</p>
                                        <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-4">
                                            <Star className="w-3.5 h-3.5 fill-amber-400" /> {s.rating} · <Users className="w-3.5 h-3.5" /> {s.users} cư dân đã dùng
                                        </div>
                                        <div className="flex items-end justify-between">
                                            <span className="text-xl font-black text-indigo-600">{s.price.toLocaleString('vi-VN')}đ<span className="text-xs text-slate-400 font-bold ml-1">/ tháng</span></span>
                                            <button className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100">
                                                {s.status === 'upgrade' ? 'Nâng cấp' : 'Đăng ký'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* ── Smart Bundles ─────────────────────────── */}
                <section className="mb-12">
                    <h2 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
                        <Crown className="w-5 h-5 text-amber-500" /> Gói tiết kiệm thông minh
                    </h2>
                    <p className="text-sm text-slate-400 font-medium mb-4">Kết hợp dịch vụ, tiết kiệm hơn mua lẻ.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {BUNDLES.map((b) => (
                            <div key={b.id} className="relative bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all">
                                {b.popular && (
                                    <div className={`bg-gradient-to-r ${b.color} text-white text-center py-2 text-xs font-black uppercase tracking-widest`}>
                                        ⭐ Được chọn nhiều nhất
                                    </div>
                                )}
                                <div className="p-8">
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">{b.name}</h3>
                                    <p className="text-sm text-slate-500 font-medium mb-6">{b.description}</p>

                                    <div className="flex items-baseline gap-3 mb-2">
                                        <span className="text-3xl font-black text-indigo-600">{b.price.toLocaleString('vi-VN')}đ</span>
                                        <span className="text-sm text-slate-400 line-through font-bold">{b.originalPrice.toLocaleString('vi-VN')}đ</span>
                                        <span className="text-xs text-slate-400 font-bold">/ tháng</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-6">
                                        <Gift className="w-4 h-4 text-green-500" />
                                        <span className="text-sm font-bold text-green-600">Tiết kiệm {b.savingsYearly.toLocaleString('vi-VN')}đ / năm</span>
                                    </div>

                                    <button className={`w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r ${b.color} hover:opacity-90 transition-all active:scale-[0.98] shadow-lg`}>
                                        Đăng ký gói này <ArrowRight className="w-4 h-4 inline ml-1" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Tabs ─────────────────────────────────── */}
                <div className="flex gap-2 mb-6">
                    {(['all', 'active', 'bundles'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
                        >
                            {tab === 'all' ? 'Tất cả dịch vụ' : tab === 'active' ? 'Đang sử dụng' : 'Gói combo'}
                        </button>
                    ))}
                </div>

                {/* ── Full Service Grid ─────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
                    {SERVICES.filter((s) => {
                        if (activeTab === 'active') return USER_CONTEXT.activeServices.includes(s.id);
                        if (activeTab === 'bundles') return false;
                        return true;
                    }).map((service) => {
                        const Icon = service.icon;
                        const isActive = USER_CONTEXT.activeServices.includes(service.id);
                        return (
                            <div
                                key={service.id}
                                className={`bg-white rounded-[2rem] p-7 shadow-lg border ${isActive ? 'border-green-200 ring-2 ring-green-100' : 'border-slate-100'} hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col`}
                            >
                                {/* Top Row */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <StatusBadge status={isActive ? 'active' : service.status} />
                                        {service.tag && !isActive && (
                                            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{service.tag}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-black text-slate-900 mb-1">{service.name}</h3>
                                <p className="text-sm text-slate-500 font-medium mb-4">{service.description}</p>

                                {/* Benefits */}
                                <ul className="space-y-2 mb-5 flex-1">
                                    {service.benefits.map((b, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {b}
                                        </li>
                                    ))}
                                </ul>

                                {/* Social Proof */}
                                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-5">
                                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {service.rating}/5
                                    <span className="text-slate-300 mx-1">·</span>
                                    <Users className="w-3.5 h-3.5 text-slate-400" />
                                    <span className="text-slate-400">{service.users} cư dân đã dùng</span>
                                </div>

                                {/* Price + CTA */}
                                <div className="flex items-end justify-between mt-auto pt-5 border-t border-slate-50">
                                    <div>
                                        {service.price > 0 ? (
                                            <>
                                                <span className="text-2xl font-black text-indigo-600">{service.price.toLocaleString('vi-VN')}đ</span>
                                                <span className="text-xs text-slate-400 font-bold ml-1">/ {service.frequency === 'MONTHLY' ? 'tháng' : 'lần'}</span>
                                            </>
                                        ) : (
                                            <span className="text-2xl font-black text-green-600">Miễn phí</span>
                                        )}
                                    </div>
                                    <button className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg ${isActive
                                        ? 'bg-slate-100 text-slate-500 shadow-none hover:bg-red-50 hover:text-red-500'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
                                        }`}>
                                        {isActive ? 'Quản lý' : service.status === 'upgrade' ? 'Nâng cấp' : 'Đăng ký'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {/* Show bundles in "bundles" tab */}
                    {activeTab === 'bundles' && BUNDLES.map((b) => (
                        <div key={b.id} className="bg-white rounded-[2rem] p-7 shadow-xl border border-slate-100 flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900">{b.name}</h3>
                                    <p className="text-slate-500 font-medium">{b.description}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <span className="text-2xl font-black text-indigo-600">{b.price.toLocaleString('vi-VN')}đ</span>
                                        <span className="text-xs text-slate-400 font-bold ml-1">/ tháng</span>
                                    </div>
                                    <button className={`px-8 py-3 rounded-xl font-black text-white bg-gradient-to-r ${b.color} hover:opacity-90 transition-all`}>
                                        Đăng ký
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Scarcity + Back ──────────────────────── */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-5 py-2.5 rounded-full text-sm font-bold">
                        <Clock className="w-4 h-4" /> Chỉ còn 5 suất Internet nâng cấp tháng này
                    </div>
                    <div>
                        <Link href="/" className="text-indigo-600 font-bold hover:underline">
                            ← Quay lại trang chủ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
