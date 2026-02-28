'use client';

import { motion } from 'framer-motion';
import { Camera, ShieldCheck, Info, UploadCloud, CheckCircle2, AlertCircle, Eye, Download } from 'lucide-react';

export default function Handover() {
    const depositInfo = {
        amount: 4200000,
        preservedRate: 98, // % deposit likely to be returned
        lastCheck: '28/02/2024',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Bàn giao & Tiền cọc</h1>
                    <p className="text-slate-500 font-medium italic">Minh bạch hiện trạng, bảo vệ quyền lợi của bạn.</p>
                </div>
                <div className="bg-green-50 text-green-600 px-4 py-2 rounded-2xl border border-green-100 flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" /> Bảo đảm bởi Smile Home
                </div>
            </header>

            {/* Deposit Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Mức độ bảo toàn tiền cọc</p>
                        <div className="flex items-baseline gap-4 mb-8">
                            <h2 className="text-7xl font-black text-indigo-400">{depositInfo.preservedRate}%</h2>
                            <p className="text-slate-400 font-medium max-w-[150px]">Dựa trên hiện trạng bàn giao đợt {depositInfo.lastCheck}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-4 w-full bg-white/10 rounded-full mb-10 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${depositInfo.preservedRate}%` }}
                                className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                            />
                        </div>

                        <div className="flex flex-wrap gap-6">
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Tổng tiền cọc</p>
                                <p className="text-xl font-bold">{depositInfo.amount.toLocaleString()}đ</p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Dự kiến hoàn trả</p>
                                <p className="text-xl font-bold text-green-400">{((depositInfo.amount * depositInfo.preservedRate) / 100).toLocaleString()}đ</p>
                            </div>
                        </div>
                    </div>
                    <ShieldCheck className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col justify-center gap-6">
                    <h3 className="font-bold text-lg">Hợp đồng điện tử</h3>
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-all group">
                            <div className="flex items-center gap-3">
                                <Eye className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                                <span className="font-bold text-slate-600 group-hover:text-indigo-900">Xem hợp đồng</span>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-all group">
                            <div className="flex items-center gap-3">
                                <Download className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                                <span className="font-bold text-slate-600 group-hover:text-indigo-900">Biên bản bàn giao</span>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Handover Records */}
            <section>
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Biên bản bàn giao (Cloud Photos)</h3>
                    <button className="btn-primary flex items-center gap-2 !py-3 !text-sm">
                        <Camera className="w-4 h-4" /> Cập nhật hiện trạng
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Góc tường/Sơn', status: 'Tốt', icon: '🎨' },
                        { label: 'Sàn gỗ', status: 'Trầy nhẹ (đã Note)', icon: '🪵', warning: true },
                        { label: 'Thiết bị điện', status: 'Hoạt động tốt', icon: '⚡' },
                        { label: 'Phòng vệ sinh', status: 'Sạch sẽ', icon: '🚽' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-[2rem] p-6 border border-slate-100 hover:border-indigo-200 transition-all text-center group cursor-pointer">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <h4 className="font-bold text-slate-900 mb-1">{item.label}</h4>
                            <div className={`text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1 ${item.warning ? 'text-amber-600' : 'text-green-600'}`}>
                                {item.warning ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                                {item.status}
                            </div>

                            {/* Image upload placeholder */}
                            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-center">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    <UploadCloud className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <Info className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-sm text-indigo-800 font-medium leading-relaxed">
                    Mức độ bảo toàn tiền cọc được tính dựa trên các báo cáo sự cố và hiện trạng phòng lúc bàn giao. <strong>Chụp ảnh ngay khi vào ở</strong> để bảo vệ 100% tiền cọc của bạn.
                </p>
            </div>
        </motion.div>
    );
}
