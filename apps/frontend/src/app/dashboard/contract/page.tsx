'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, FileSignature, CheckCircle2, History, Download, Eye } from 'lucide-react';

export default function ContractPage() {
    const contract = {
        id: 'CTR-2024-001',
        status: 'Active',
        room: 'P.402 - user-smile Landmark',
        duration: '01/01/2024 - 31/12/2024',
        deposit: 4200000,
        rent: 4200000,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Hợp đồng điện tử</h1>
                    <p className="text-slate-500 font-medium italic">Tất cả thông tin pháp lý luôn nằm trong tầm tay bạn.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-widest border border-green-100">
                    <ShieldCheck className="w-4 h-4" /> Đã xác thực
                </div>
            </header>

            {/* Contract Snapshot */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Mã hợp đồng</p>
                            <h2 className="text-2xl font-black text-indigo-600">{contract.id}</h2>
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Đối tượng thuê</p>
                            <p className="font-extrabold text-slate-900 text-lg">{contract.room}</p>
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Thời hạn</p>
                            <p className="font-extrabold text-slate-900">{contract.duration}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-3xl space-y-4">
                        <div className="flex justify-between items-center text-sm font-bold pb-2 border-b border-slate-200">
                            <span className="text-slate-500">Tiền cọc</span>
                            <span className="text-slate-900">{contract.deposit.toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold pb-2 border-b border-slate-200">
                            <span className="text-slate-500">Tiền thuê hàng tháng</span>
                            <span className="text-slate-900 font-black">{contract.rent.toLocaleString()}đ</span>
                        </div>
                        <div className="pt-4 flex flex-col gap-3">
                            <button className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-sm">
                                <Download className="w-4 h-4" /> Tải PDF bản gốc
                            </button>
                            <button className="w-full bg-white border border-slate-200 text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                <Eye className="w-4 h-4" /> Xem điều khoản chi tiết
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline/History */}
            <section>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-600" />
                    Tiến trình hợp đồng
                </h3>
                <div className="space-y-6 ml-4 border-l-2 border-slate-100 pl-8 relative">
                    {[
                        { date: '01/01/2024', label: 'Bắt đầu thuê & nhận bàn giao phòng', current: true },
                        { date: '31/12/2023', label: 'Đã thanh toán tiền cọc 1 tháng' },
                        { date: '30/12/2023', label: 'Xác thực CCCD & Ký hợp đồng điện tử' },
                    ].map((step, i) => (
                        <div key={i} className="relative">
                            <div className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 border-white ${step.current ? 'bg-indigo-600 ring-4 ring-indigo-100' : 'bg-slate-300'}`} />
                            <div>
                                <p className={`text-xs font-black uppercase tracking-tighter ${step.current ? 'text-indigo-600' : 'text-slate-400'}`}>{step.date}</p>
                                <p className={`font-bold mt-1 ${step.current ? 'text-slate-900' : 'text-slate-500'}`}>{step.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Renew prompt */}
            <div className="p-8 bg-indigo-600 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h4 className="text-xl font-black mb-1">Gia hạn hợp đồng sớm?</h4>
                    <p className="text-indigo-100 text-sm font-medium">Gia hạn trước 3 tháng để nhận ưu đãi 5% giá thuê cho năm tiếp theo.</p>
                </div>
                <button className="whitespace-nowrap bg-white text-indigo-600 px-6 py-3 rounded-xl font-black hover:scale-105 transition-all">
                    Yêu cầu gia hạn
                </button>
            </div>
        </motion.div>
    );
}
