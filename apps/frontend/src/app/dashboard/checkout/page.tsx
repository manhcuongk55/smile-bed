'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Calendar, DollarSign, AlertCircle, CheckCircle2, Clock, FileText, ArrowRight, Info } from 'lucide-react';

const MOCK_CHECKOUT = {
    hasRequest: true,
    request: {
        id: 'CK-001',
        requestDate: '2026-02-15',
        targetDate: '2026-03-20',
        status: 'RECONCILED',
        depositAmount: 4200000,
        deductions: {
            unpaidInvoices: 350000,
            unpaidViolations: 50000,
            damageDeduction: 200000,
            damagedItemCount: 1,
            totalDeductions: 600000,
        },
        refundAmount: 3600000,
    },
};

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

function StatusBadge({ status }: { status: string }) {
    const config: Record<string, { label: string; bg: string; text: string }> = {
        REQUESTED: { label: 'Đã gửi yêu cầu', bg: 'bg-blue-50', text: 'text-blue-600' },
        INSPECTING: { label: 'Đang kiểm tra', bg: 'bg-amber-50', text: 'text-amber-600' },
        RECONCILED: { label: 'Đã đối soát', bg: 'bg-purple-50', text: 'text-purple-600' },
        COMPLETED: { label: 'Hoàn tất', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    };
    const c = config[status] || config.REQUESTED;
    return (
        <span className={`${c.bg} ${c.text} px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider`}>
            {c.label}
        </span>
    );
}

export default function CheckoutPage() {
    const [showForm, setShowForm] = useState(false);
    const [targetDate, setTargetDate] = useState('');
    const [note, setNote] = useState('');
    const checkout = MOCK_CHECKOUT;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <header>
                <h1 className="text-3xl font-black text-slate-900 mb-2">Trả phòng & Thanh lý HĐ</h1>
                <p className="text-slate-500 font-medium italic">Quy trình trả phòng minh bạch, đối soát tiền cọc chi tiết.</p>
            </header>

            {/* Process Steps */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8">
                <h2 className="text-lg font-black text-slate-900 mb-6">Quy trình trả phòng</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { step: 1, title: 'Thông báo 30 ngày', desc: 'Gửi yêu cầu qua hệ thống', icon: <Calendar className="w-5 h-5" />, active: true },
                        { step: 2, title: 'Kiểm tra phòng', desc: 'Quản lý kiểm tra tài sản', icon: <FileText className="w-5 h-5" />, active: checkout.request.status !== 'REQUESTED' },
                        { step: 3, title: 'Đối soát cọc', desc: 'Tính toán khấu trừ & hoàn tiền', icon: <DollarSign className="w-5 h-5" />, active: checkout.request.status === 'RECONCILED' || checkout.request.status === 'COMPLETED' },
                        { step: 4, title: 'Hoàn tất', desc: 'Nhận tiền cọc & trả chìa khóa', icon: <CheckCircle2 className="w-5 h-5" />, active: checkout.request.status === 'COMPLETED' },
                    ].map((s) => (
                        <div key={s.step} className={`rounded-2xl p-5 border ${s.active ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100'} transition-all`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black mb-3 ${s.active ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                {s.step}
                            </div>
                            <div className={s.active ? 'text-indigo-600' : 'text-slate-400'}>{s.icon}</div>
                            <h3 className={`font-bold mt-2 ${s.active ? 'text-slate-900' : 'text-slate-500'}`}>{s.title}</h3>
                            <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Request or New Request */}
            {checkout.hasRequest ? (
                <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-slate-900 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Mã yêu cầu</p>
                                    <h2 className="text-2xl font-black">{checkout.request.id}</h2>
                                </div>
                                <StatusBadge status={checkout.request.status} />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Ngày yêu cầu</p>
                                    <p className="font-bold">{new Date(checkout.request.requestDate).toLocaleDateString('vi-VN')}</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Ngày dự kiến trả</p>
                                    <p className="font-bold">{new Date(checkout.request.targetDate).toLocaleDateString('vi-VN')}</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Tiền cọc</p>
                                    <p className="font-bold text-indigo-400">{formatCurrency(checkout.request.depositAmount)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Deposit Reconciliation */}
                    {checkout.request.deductions && (
                        <div className="bg-white rounded-[2rem] border border-slate-100 p-8">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-indigo-600" /> Bảng đối soát tiền cọc
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                    <span className="text-slate-600 font-medium">Tiền cọc ban đầu</span>
                                    <span className="font-black text-slate-900">{formatCurrency(checkout.request.depositAmount)}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                    <span className="text-slate-600">(-) Hóa đơn chưa thanh toán</span>
                                    <span className="font-bold text-red-500">-{formatCurrency(checkout.request.deductions.unpaidInvoices)}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                    <span className="text-slate-600">(-) Tiền phạt vi phạm</span>
                                    <span className="font-bold text-red-500">-{formatCurrency(checkout.request.deductions.unpaidViolations)}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                    <span className="text-slate-600">(-) Hỏng hóc tài sản ({checkout.request.deductions.damagedItemCount} món)</span>
                                    <span className="font-bold text-red-500">-{formatCurrency(checkout.request.deductions.damageDeduction)}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 bg-emerald-50 rounded-2xl px-5 mt-4">
                                    <span className="font-black text-emerald-800 text-lg">Tiền hoàn trả</span>
                                    <span className="font-black text-emerald-600 text-2xl">{formatCurrency(checkout.request.refundAmount)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-[2rem] border border-slate-100 p-8">
                    {!showForm ? (
                        <div className="text-center py-8">
                            <LogOut className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Bạn muốn trả phòng?</h3>
                            <p className="text-slate-500 text-sm mb-6">Lưu ý: Cần thông báo trước tối thiểu 30 ngày.</p>
                            <button onClick={() => setShowForm(true)} className="btn-primary">
                                Gửi yêu cầu trả phòng
                            </button>
                        </div>
                    ) : (
                        <div className="max-w-md mx-auto space-y-6">
                            <h3 className="font-black text-lg text-slate-900">Thông báo trả phòng</h3>
                            <div>
                                <label className="text-sm font-bold text-slate-600 block mb-2">Ngày dự kiến trả</label>
                                <input
                                    type="date"
                                    value={targetDate}
                                    onChange={(e) => setTargetDate(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-slate-600 block mb-2">Ghi chú</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    rows={3}
                                    placeholder="Lý do trả phòng..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none resize-none"
                                />
                            </div>
                            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                                <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-sm text-amber-800">
                                    Tiền cọc sẽ được đối soát sau khi quản lý kiểm tra phòng. Các khoản khấu trừ (nếu có): điện nước cuối cùng, tiền phạt vi phạm, hỏng hóc tài sản.
                                </p>
                            </div>
                            <button className="w-full btn-primary flex items-center justify-center gap-2">
                                Xác nhận gửi yêu cầu <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}
