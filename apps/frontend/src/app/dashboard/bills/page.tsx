'use client';

import { motion } from 'framer-motion';
import { Download, CreditCard, ChevronRight, Zap, Droplets, Home, Wrench, AlertTriangle, QrCode, Bell } from 'lucide-react';

export default function Bills() {
    const bills = [
        {
            id: '1', period: 'Tháng 03/2026', total: 5350000, status: 'Unpaid', dueDate: '05/03/2026',
            baseRent: 4200000, electricityCost: 385000, waterCost: 175000, serviceFee: 540000, penaltyFee: 50000,
        },
        {
            id: '2', period: 'Tháng 02/2026', total: 4820000, status: 'Paid', dueDate: '05/02/2026',
            baseRent: 4200000, electricityCost: 320000, waterCost: 150000, serviceFee: 150000, penaltyFee: 0,
        },
        {
            id: '3', period: 'Tháng 01/2026', total: 4580000, status: 'Paid', dueDate: '05/01/2026',
            baseRent: 4200000, electricityCost: 230000, waterCost: 150000, serviceFee: 0, penaltyFee: 0,
        },
    ];

    const unpaid = bills.find(b => b.status === 'Unpaid');

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Hóa đơn & Thanh toán</h1>
                <p className="text-slate-500 font-medium">Quản lý khoản thu hàng tháng: Tiền nhà + Điện + Nước + Dịch vụ + Phạt.</p>
            </header>

            {/* Reminder Banner */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-3">
                <Bell className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-sm text-amber-800 font-medium">
                    Nhắc nhở: Thanh toán trước ngày <strong>5 hàng tháng</strong> để tránh phí chậm trễ.
                </p>
            </div>

            {/* Unpaid Highlight with breakdown */}
            {unpaid && (
                <div className="bg-indigo-600 rounded-[2rem] p-8 md:p-10 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                            <div>
                                <p className="text-indigo-100 font-bold uppercase tracking-widest text-xs mb-2">Hóa đơn chưa thanh toán – {unpaid.period}</p>
                                <h2 className="text-4xl font-black mb-1">{unpaid.total.toLocaleString()} VNĐ</h2>
                                <p className="text-indigo-100 font-medium text-sm">Hạn chót: {unpaid.dueDate}</p>
                            </div>
                            <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                                Thanh toán ngay <CreditCard className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Fee Breakdown */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {[
                                { icon: <Home className="w-4 h-4" />, label: 'Tiền phòng', amount: unpaid.baseRent },
                                { icon: <Zap className="w-4 h-4" />, label: 'Điện', amount: unpaid.electricityCost },
                                { icon: <Droplets className="w-4 h-4" />, label: 'Nước', amount: unpaid.waterCost },
                                { icon: <Wrench className="w-4 h-4" />, label: 'Dịch vụ', amount: unpaid.serviceFee },
                                { icon: <AlertTriangle className="w-4 h-4" />, label: 'Phạt', amount: unpaid.penaltyFee, highlight: unpaid.penaltyFee > 0 },
                            ].map((item, i) => (
                                <div key={i} className={`bg-white/10 rounded-xl p-3 border ${item.highlight ? 'border-amber-300/50 bg-amber-500/10' : 'border-white/10'}`}>
                                    <div className="flex items-center gap-2 mb-1 text-white/70">
                                        {item.icon}
                                        <span className="text-[10px] font-bold uppercase">{item.label}</span>
                                    </div>
                                    <p className={`font-black text-sm ${item.highlight ? 'text-amber-300' : ''}`}>{item.amount.toLocaleString()}đ</p>
                                </div>
                            ))}
                        </div>

                        {/* QR Code */}
                        <div className="mt-6 bg-white/10 rounded-xl p-4 border border-white/10 flex items-center gap-4">
                            <div className="bg-white rounded-lg p-2">
                                <QrCode className="w-12 h-12 text-indigo-600" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Quét mã QR để thanh toán</p>
                                <p className="text-indigo-200 text-xs">Ngân hàng VietcomBank – STK: 1026 xxx xxx</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* History */}
            <section>
                <h3 className="text-xl font-bold mb-6">Lịch sử thanh toán</h3>
                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                    {bills.map((bill, index) => (
                        <div
                            key={bill.id}
                            className={`flex items-center justify-between p-6 hover:bg-slate-50 transition-colors ${index !== bills.length - 1 ? 'border-b border-slate-50' : ''}`}
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
                                <div className="text-right">
                                    <p className="font-black text-slate-900">{bill.total.toLocaleString()} ₫</p>
                                    {(bill.serviceFee > 0 || bill.penaltyFee > 0) && (
                                        <p className="text-[10px] text-slate-400 font-bold">
                                            {bill.serviceFee > 0 && `DV: ${bill.serviceFee.toLocaleString()}đ`}
                                            {bill.serviceFee > 0 && bill.penaltyFee > 0 && ' · '}
                                            {bill.penaltyFee > 0 && <span className="text-red-400">Phạt: {bill.penaltyFee.toLocaleString()}đ</span>}
                                        </p>
                                    )}
                                </div>
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
