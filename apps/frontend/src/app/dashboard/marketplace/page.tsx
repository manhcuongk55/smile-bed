'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Star, Clock, Check, Sparkles, Refrigerator, Bike, ShieldCheck } from 'lucide-react';

const SERVICES = [
    {
        id: '1',
        title: 'Dọn dẹp phòng định kỳ',
        price: 150000,
        unit: 'lần',
        icon: Sparkles,
        color: 'bg-blue-50 text-blue-600',
        description: 'Vệ sinh sạch sẽ, thay ga giường và khử khuẩn.',
    },
    {
        id: '2',
        title: 'Thuê Tủ lạnh Mini',
        price: 200000,
        unit: 'tháng',
        icon: Refrigerator,
        color: 'bg-green-50 text-green-600',
        description: 'Tủ lạnh 90L, tiết kiệm điện, bảo hành 24/7.',
    },
    {
        id: '3',
        title: 'Gói giặt ủi thông minh',
        price: 300000,
        unit: 'tháng',
        icon: ShoppingBag,
        color: 'bg-purple-50 text-purple-600',
        description: 'Giặt sấy tận nơi 2 lần/tuần, giao nhận trong ngày.',
    },
    {
        id: '4',
        title: 'Thuê Xe máy điện',
        price: 500000,
        unit: 'tháng',
        icon: Bike,
        color: 'bg-amber-50 text-amber-600',
        description: 'Di chuyển xanh, trạm sạc miễn phí tại tòa nhà.',
    },
];

export default function Marketplace() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">smile-bed <span className="text-indigo-600">Marketplace</span></h1>
                    <p className="text-slate-500 font-medium max-w-lg">Nâng cấp không gian sống của bạn với các tiện ích và dịch vụ chất lượng cao chỉ có tại Smile Home.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <Star className="w-5 h-5 text-indigo-600 fill-indigo-600" />
                    <span className="text-indigo-900 font-bold">Thành viên thân thiết</span>
                </div>
            </header>

            {/* Featured Promo */}
            <div className="relative bg-slate-900 rounded-[2.5rem] p-8 md:p-12 overflow-hidden group">
                <div className="relative z-10 max-w-md">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white mb-6 uppercase tracking-widest border border-white/20">
                        Khuyến mãi đặc biệt
                    </div>
                    <h2 className="text-4xl font-black text-white mb-4 leading-tight">Gói "An Tâm" <br /> Cho Người Mới</h2>
                    <p className="text-slate-400 font-medium mb-8">Trọn gói Dọn dẹp + Internet tốc độ cao + Bảo hiểm tài sản chỉ với 199k/tháng.</p>
                    <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl">
                        Khám phá ngay
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/20 to-transparent -z-0" />
                <ShieldCheck className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
            </div>

            {/* Services Grid */}
            <section>
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Dịch vụ & Tiện ích</h3>
                    <div className="flex gap-2">
                        {['Tất cả', 'Thuê đồ', 'Dịch vụ'].map((tab) => (
                            <button key={tab} className="px-4 py-2 rounded-xl text-sm font-bold bg-white text-slate-600 hover:bg-slate-100 border border-slate-100 transition-all">
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SERVICES.map((service) => (
                        <div key={service.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-all group flex gap-6">
                            <div className={`w-20 h-20 shrink-0 rounded-[1.5rem] flex items-center justify-center ${service.color}`}>
                                <service.icon className="w-10 h-10" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">{service.title}</h4>
                                    <div className="text-right">
                                        <p className="text-indigo-600 font-black text-lg">{service.price.toLocaleString()}đ</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">/{service.unit}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 font-medium mb-4 line-clamp-2">{service.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-[11px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                        <Check className="w-3 h-3" /> Sẵn sàng
                                    </div>
                                    <button className="text-sm font-black text-indigo-600 hover:underline">Thuê ngay →</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Subscription Info */}
            <footer className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-sm text-indigo-800 font-medium leading-relaxed">
                    Mọi dịch vụ sẽ được cộng trực tiếp vào hóa đơn thuê phòng hàng tháng của bạn vào <strong>ngày 05 hàng tháng</strong>. Hủy dịch vụ bất cứ lúc nào trước ngày 01.
                </p>
            </footer>
        </motion.div>
    );
}
