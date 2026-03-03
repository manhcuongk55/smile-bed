'use client';

import { motion } from 'framer-motion';
import { Flame, Video, FileText, Image, Phone, MapPin, ShieldAlert, ArrowDown, ExternalLink } from 'lucide-react';

const SAFETY_DOCS = [
    { id: '1', title: 'Video hướng dẫn thoát nạn khi cháy', type: 'VIDEO', url: '#', icon: <Video className="w-6 h-6" /> },
    { id: '2', title: 'Phương án PCCC (Mẫu PC17)', type: 'PDF', url: '#', icon: <FileText className="w-6 h-6" /> },
    { id: '3', title: 'Sơ đồ thoát hiểm các tầng', type: 'IMAGE', url: '#', icon: <Image className="w-6 h-6" /> },
    { id: '4', title: 'Hướng dẫn sử dụng bình cứu hỏa', type: 'VIDEO', url: '#', icon: <Video className="w-6 h-6" /> },
];

const EMERGENCY_CONTACTS = [
    { name: 'Cảnh sát PCCC', phone: '114', icon: '🚒' },
    { name: 'Cấp cứu', phone: '115', icon: '🚑' },
    { name: 'Quản lý tòa nhà', phone: '0909 123 456', icon: '🏢' },
    { name: 'Hotline Smile Home', phone: '1900 xxxx', icon: '📞' },
];

const EQUIPMENT_LOCATIONS = [
    { name: 'Bình cứu hỏa CO2', location: 'Hành lang mỗi tầng, góc cầu thang', count: '2/tầng' },
    { name: 'Thang dây thoát hiểm', location: 'Phòng trực ban, tầng 1', count: '4 bộ' },
    { name: 'Còi báo cháy', location: 'Mỗi phòng + hành lang', count: 'Toàn bộ' },
    { name: 'Đèn Exit thoát hiểm', location: 'Cửa cầu thang bộ', count: 'Mỗi tầng' },
];

export default function SafetyPage() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">An toàn PCCC</h1>
                    <p className="text-slate-500 font-medium italic">Phương án phòng cháy chữa cháy & Hướng dẫn thoát nạn</p>
                </div>
                <div className="bg-red-50 text-red-600 px-4 py-2 rounded-2xl border border-red-100 flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                    <Flame className="w-4 h-4" /> Quan trọng
                </div>
            </header>

            {/* Emergency Banner */}
            <div className="bg-gradient-to-br from-red-600 to-orange-500 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <div className="relative z-10">
                    <ShieldAlert className="w-10 h-10 mb-4" />
                    <h2 className="text-2xl font-black mb-2">Khi phát hiện cháy</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {[
                            { step: '1', title: 'Báo động', desc: 'Bấm nút báo cháy gần nhất + Gọi 114' },
                            { step: '2', title: 'Thoát hiểm', desc: 'Đi cầu thang bộ, KHÔNG dùng thang máy' },
                            { step: '3', title: 'Tập trung', desc: 'Ra sân trước tòa nhà, chờ kiểm đếm' },
                        ].map((s) => (
                            <div key={s.step} className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                                <div className="w-8 h-8 rounded-full bg-white text-red-600 font-black flex items-center justify-center text-sm mb-3">{s.step}</div>
                                <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                                <p className="text-sm text-white/80">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Emergency Contacts */}
            <section>
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-red-500" /> Liên hệ khẩn cấp
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {EMERGENCY_CONTACTS.map((c) => (
                        <a key={c.phone} href={`tel:${c.phone}`} className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-red-200 hover:shadow-lg hover:-translate-y-1 transition-all text-center group">
                            <div className="text-3xl mb-3">{c.icon}</div>
                            <p className="font-bold text-slate-900 text-sm mb-1">{c.name}</p>
                            <p className="text-lg font-black text-red-600 group-hover:text-red-700">{c.phone}</p>
                        </a>
                    ))}
                </div>
            </section>

            {/* Equipment Map */}
            <section>
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-600" /> Vị trí thiết bị PCCC
                </h2>
                <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
                    {EQUIPMENT_LOCATIONS.map((eq, i) => (
                        <div key={i} className={`p-5 flex items-center justify-between ${i !== EQUIPMENT_LOCATIONS.length - 1 ? 'border-b border-slate-50' : ''}`}>
                            <div>
                                <p className="font-bold text-slate-900">{eq.name}</p>
                                <p className="text-sm text-slate-500">{eq.location}</p>
                            </div>
                            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-black">{eq.count}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Safety Documents */}
            <section>
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <ArrowDown className="w-5 h-5 text-emerald-600" /> Tài liệu PCCC
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SAFETY_DOCS.map((doc) => (
                        <a key={doc.id} href={doc.url} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all flex items-center gap-4 group">
                            <div className="p-3 bg-slate-50 rounded-xl text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                                {doc.icon}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-slate-900">{doc.title}</p>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mt-1">{doc.type}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-indigo-400" />
                        </a>
                    ))}
                </div>
            </section>
        </motion.div>
    );
}
