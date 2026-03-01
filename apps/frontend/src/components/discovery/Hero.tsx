'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Calculator } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 -z-10 w-48 sm:w-96 h-48 sm:h-96 bg-indigo-200/50 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 -z-10 w-48 sm:w-96 h-48 sm:h-96 bg-sky-200/50 rounded-full blur-3xl animate-float" />

            <div className="max-w-7xl mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6"
                >
                    Tìm nơi ở <span className="gradient-text">Hoàn Hảo</span> <br />
                    phù hợp với phong cách sống của bạn
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-10 max-w-2xl mx-auto"
                >
                    Nền tảng quản lý thuê phòng hiện đại, minh bạch và tối ưu di chuyển cho người trẻ năng động.
                </motion.p>

                {/* Discovery Box */}
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
                            placeholder="Khu vực bạn muốn ở? (Quận 1, Thủ Đức...)"
                            className="bg-transparent border-none outline-none w-full text-slate-900 placeholder:text-slate-400 font-medium"
                        />
                    </div>

                    <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <Calculator className="text-sky-500 w-5 h-5" />
                        <select className="bg-transparent border-none outline-none w-full text-slate-900 font-medium appearance-none">
                            <option>Ngân sách tối đa</option>
                            <option>Dưới 3tr</option>
                            <option>3tr - 5tr</option>
                            <option>Dưới 10tr</option>
                        </select>
                    </div>

                    <button className="w-full md:w-auto btn-primary flex items-center justify-center gap-2 group">
                        <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Tìm ngay
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
