'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calculator, Bed, Building2, Coffee, Palmtree, Laptop, BedDouble } from 'lucide-react';

const CATEGORIES = [
    { id: 'all', label: 'Tất cả', icon: <Search className="w-4 h-4" /> },
    { id: 'room', label: 'Phòng trọ', icon: <Bed className="w-4 h-4" /> },
    { id: 'sleepbox', label: 'Sleepbox', icon: <BedDouble className="w-4 h-4" /> },
    { id: 'bunkbed', label: 'Giường tầng', icon: <Building2 className="w-4 h-4" /> },
    { id: 'cowork', label: 'Chỗ làm việc', icon: <Laptop className="w-4 h-4" /> },
    { id: 'resort', label: 'Nghỉ dưỡng', icon: <Palmtree className="w-4 h-4" /> },
    { id: 'cafe', label: 'Cafe & Chill', icon: <Coffee className="w-4 h-4" /> },
];

export default function Hero() {
    const [activeCategory, setActiveCategory] = useState('all');

    return (
        <section className="relative pt-24 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 -z-10 w-48 sm:w-96 h-48 sm:h-96 bg-indigo-200/50 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 -z-10 w-48 sm:w-96 h-48 sm:h-96 bg-sky-200/50 rounded-full blur-3xl animate-float" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-64 h-64 bg-emerald-200/30 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider mb-6"
                >
                    <Bed className="w-3.5 h-3.5" /> Ở · Ngủ · Chơi · Làm việc · Nghỉ dưỡng
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6"
                >
                    Tìm chỗ <span className="gradient-text">Ngủ · Ở · Chơi</span> <br />
                    mọi lúc, mọi nơi
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto"
                >
                    Phòng trọ · Sleepbox · Giường tầng · Coworking · Nghỉ dưỡng — Một nền tảng cho mọi nhu cầu chỗ ở & làm việc.
                </motion.p>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-wrap justify-center gap-2 mb-8"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${activeCategory === cat.id
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                                    : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-slate-100'
                                }`}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Search Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass max-w-4xl mx-auto p-4 md:p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-4 items-center"
                >
                    <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <MapPin className="text-indigo-600 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Bạn muốn ở đâu? (Quận 1, Thủ Đức, Đà Lạt...)"
                            className="bg-transparent border-none outline-none w-full text-slate-900 placeholder:text-slate-400 font-medium"
                        />
                    </div>

                    <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <Calculator className="text-sky-500 w-5 h-5" />
                        <select className="bg-transparent border-none outline-none w-full text-slate-900 font-medium appearance-none">
                            <option>Ngân sách</option>
                            <option>Dưới 50K / đêm</option>
                            <option>50K - 200K / đêm</option>
                            <option>Dưới 3tr / tháng</option>
                            <option>3tr - 5tr / tháng</option>
                            <option>Dưới 10tr / tháng</option>
                        </select>
                    </div>

                    <button className="w-full md:w-auto btn-primary flex items-center justify-center gap-2 group">
                        <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Tìm ngay
                    </button>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-6 mt-8 text-sm"
                >
                    {[
                        { num: '1,200+', label: 'Chỗ ở' },
                        { num: '350+', label: 'Sleepbox' },
                        { num: '80+', label: 'Coworking' },
                        { num: '15+', label: 'Thành phố' },
                    ].map((s) => (
                        <div key={s.label} className="text-center">
                            <p className="text-lg font-black text-indigo-600">{s.num}</p>
                            <p className="text-slate-400 font-medium text-xs">{s.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
