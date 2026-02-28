'use client';

import { motion } from 'framer-motion';
import { Camera, Send, History, CheckCircle, Clock, Zap, Droplet, Wind, Wifi, PlayCircle } from 'lucide-react';

export default function Maintenance() {
    const categories = [
        { id: 'elec', label: 'Điện', icon: Zap, color: 'text-amber-500 bg-amber-50' },
        { id: 'water', label: 'Nước', icon: Droplet, color: 'text-blue-500 bg-blue-50' },
        { id: 'ac', label: 'Điều hòa', icon: Wind, color: 'text-sky-500 bg-sky-50' },
        { id: 'net', label: 'Internet', icon: Wifi, color: 'text-indigo-500 bg-indigo-50' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <header>
                <h1 className="text-3xl font-black text-slate-900 mb-2">Hỗ trợ sửa chữa</h1>
                <p className="text-slate-500 font-medium italic">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form Container */}
                <div className="space-y-8">
                    {/* Category Picker */}
                    <section>
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Bạn gặp sự cố gì?</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className="flex flex-col items-center gap-3 p-6 bg-white border border-slate-100 rounded-3xl hover:border-indigo-600 hover:shadow-xl transition-all group focus:ring-4 ring-indigo-50"
                                >
                                    <div className={`p-4 rounded-2xl ${cat.color} group-hover:scale-110 transition-transform`}>
                                        <cat.icon className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold text-slate-600 text-sm">{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Details Form */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-tighter mb-3 ml-1">Mô tả chi tiết sự cố</label>
                                <textarea
                                    rows={4}
                                    placeholder="Vòi nước bồn tắm bị rò rỉ kể từ sáng nay..."
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl p-5 outline-none font-medium transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex flex-col items-center justify-center gap-2 p-5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all">
                                    <Camera className="w-6 h-6" />
                                    <span className="font-bold text-xs">Chụp ảnh</span>
                                </button>
                                <button className="flex flex-col items-center justify-center gap-2 p-5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all">
                                    <PlayCircle className="w-6 h-6" />
                                    <span className="font-bold text-xs">Quay Video</span>
                                </button>
                            </div>

                            <button className="w-full btn-primary !py-5 !text-lg !font-black !rounded-2xl shadow-indigo-200 flex items-center justify-center gap-3">
                                <Send className="w-5 h-5" /> Gửi yêu cầu
                            </button>
                        </div>
                    </div>
                </div>

                {/* Timeline & Feedback */}
                <div className="space-y-10">
                    <section>
                        <h3 className="text-xl font-black mb-8 flex items-center gap-2">
                            <History className="w-5 h-5 text-indigo-600" />
                            Dòng thời gian sửa chữa
                        </h3>

                        <div className="space-y-8 ml-3 border-l-2 border-slate-100 pl-8 relative">
                            {[
                                { title: 'Máy lạnh không lạnh', status: 'In Progress', date: 'Mới gửi', technician: 'Nguyễn Văn A', eta: '14:00 - Hôm nay', active: true },
                                { title: 'Vòi nước rò rỉ', status: 'Done', date: '15/02/2024', technician: 'Trần Văn B' },
                            ].map((item, idx) => (
                                <div key={idx} className="relative group">
                                    {/* Dynamic Icon/Dot */}
                                    <div className={`absolute -left-[45px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-lg ${item.active ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}>
                                        {item.active ? <Clock className="w-4 h-4 text-white" /> : <CheckCircle className="w-4 h-4 text-white" />}
                                    </div>

                                    <div className={`p-6 rounded-3xl border ${item.active ? 'bg-white border-indigo-100 shadow-xl' : 'bg-slate-50 border-transparent opacity-70'}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="font-black text-slate-900">{item.title}</h4>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</span>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-slate-400 font-bold">Kỹ thuật viên:</span>
                                                <span className="text-slate-900 font-extrabold">{item.technician}</span>
                                            </div>
                                            {item.eta && (
                                                <div className="flex items-center gap-2 text-sm p-2 bg-amber-50 text-amber-900 rounded-xl border border-amber-100">
                                                    <span className="font-bold">Dự kiến đến:</span>
                                                    <span className="font-black">{item.eta}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <footer className="bg-slate-900 rounded-3xl p-8 text-white">
                        <h4 className="text-lg font-black mb-2 flex items-center gap-2">
                            <span className="text-amber-400">⚡</span> Phản hồi trực tiếp
                        </h4>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                            Nếu kỹ thuật viên không đến đúng hẹn hoặc bạn không hài lòng với kết quả thực tế?
                        </p>
                        <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black transition-all border border-white/10">
                            Gửi góp ý cho Quản lý
                        </button>
                    </footer>
                </div>
            </div>
        </motion.div>
    );
}
