'use client';

import { motion } from 'framer-motion';
import { Download, CreditCard, ChevronRight } from 'lucide-react';

export default function Bills() {
    const bills = [
        { id: '1', period: 'Tháng 03/2024', total: 4750000, status: 'Unpaid', dueDate: '05/03/2024' },
        { id: '2', period: 'Tháng 02/2024', total: 4620000, status: 'Paid', dueDate: '05/02/2024' },
        { id: '3', period: 'Tháng 01/2024', total: 4580000, status: 'Paid', dueDate: '05/01/2024' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <header>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Hóa đơn & Thanh toán</h1>
                <p className="text-slate-500 font-medium">Quản lý các khoản chi phí thuê phòng của bạn.</p>
            </header>

            {/* Unpaid Highlight */}
            <div className="bg-indigo-600 rounded-[2rem] p-8 md:p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-indigo-200">
                <div>
                    <p className="text-indigo-100 font-bold uppercase tracking-widest text-xs mb-2">Hóa đơn chưa thanh toán</p>
                    <h2 className="text-4xl font-black mb-1">{bills[0].total.toLocaleString()} VNĐ</h2>
                    <p className="text-indigo-100 font-medium text-sm">Hạn chót: {bills[0].dueDate}</p>
                </div>
                <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                    Thanh toán ngay <CreditCard className="w-5 h-5" />
                </button>
            </div>

            {/* History */}
            <section>
                <h3 className="text-xl font-bold mb-6">Lịch sử thanh toán</h3>
                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                    {bills.map((bill, index) => (
                        <div
                            key={bill.id}
                            className={`flex items-center justify-between p-6 hover:bg-slate-50 transition-colors ${index !== bills.length - 1 ? 'border-bottom border-slate-50' : ''}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${bill.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {bill.status === 'Paid' ? '✓' : '!'}
                                </div>
                                <div>
                                    <p className="font-extrabold text-slate-900">{bill.period}</p>
                                    <p className="text-sm text-slate-500 font-medium">{bill.status === 'Paid' ? 'Đã quyết toán' : 'Đang chờ'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <p className="font-black text-slate-900">{bill.total.toLocaleString()} ₫</p>
                                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
                                    <Download className="w-5 h-5" />
                                </button>
                                <ChevronRight className="text-slate-200 w-5 h-5" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </motion.div>
    );
}
