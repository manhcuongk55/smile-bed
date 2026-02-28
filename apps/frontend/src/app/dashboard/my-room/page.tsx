'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Zap, Droplet, Wifi, AlertTriangle } from 'lucide-react';

export default function MyRoom() {
    const roomInfo = {
        name: 'Căn hộ Mini Hiện Đại - Gần ĐHQG',
        roomNumber: 'P.402',
        address: 'TP. Thủ Đức, TP.HCM',
        startDate: '01/01/2024',
        nextBillDate: '01/04/2024',
        deposit: 4200000,
        status: 'Occupied',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">Chào mừng bạn trở lại! 👋</h1>
                    <p className="text-slate-500 font-medium">Bạn đang ở phòng {roomInfo.roomNumber}</p>
                </div>
                <div className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100">
                    HĐ Đang Hiệu Lực
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Card */}
                <div className="md:col-span-2 glass p-8 rounded-3xl relative overflow-hidden group">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-4">{roomInfo.name}</h2>
                        <div className="flex items-center gap-2 text-slate-500 mb-6 font-medium">
                            <MapPin className="w-4 h-4 text-indigo-600" />
                            {roomInfo.address}
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Ngày bắt đầu</p>
                                <p className="font-bold text-slate-900">{roomInfo.startDate}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Hóa đơn tiếp theo</p>
                                <p className="font-bold text-slate-900">{roomInfo.nextBillDate}</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-0" />
                </div>

                {/* Quick Actions */}
                <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col justify-center gap-4">
                    <h3 className="font-bold text-lg mb-2">Hỗ trợ nhanh</h3>
                    <button className="flex items-center gap-3 w-full bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all">
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                        <span className="font-medium">Báo hỏng đồ</span>
                    </button>
                    <button className="flex items-center gap-3 w-full bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all text-left">
                        <span className="w-5 h-5 flex items-center justify-center bg-indigo-500 rounded-lg text-xs">?</span>
                        <span className="font-medium text-sm">Gia hạn hợp đồng</span>
                    </button>
                </div>
            </div>

            {/* Meter Readings */}
            <section>
                <h3 className="text-xl font-bold mb-6">Chỉ số sử dụng tháng này</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Điện năng</p>
                            <p className="text-2xl font-black text-slate-900">452 <span className="text-sm font-medium">kWh</span></p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                            <Droplet className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Nước sạch</p>
                            <p className="text-2xl font-black text-slate-900">12 <span className="text-sm font-medium">m³</span></p>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
