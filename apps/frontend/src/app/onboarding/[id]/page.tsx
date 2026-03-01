'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, FileText, UserCheck, CheckCircle, ChevronRight, Lock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function OnboardingFlow({ params }: { params: { id: string } }) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleConfirmBooking = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500); // Simulate API call to POST /booking/reserve/:id
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 mb-4">Đặt phòng thành công!</h1>
                <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
                    Hợp đồng điện tử đã được gửi tới email của bạn. Vui lòng ký số để hoàn tất quá trình thuê phòng.
                </p>
                <Link href="/dashboard" className="btn-primary !px-12">
                    Đi tới Bảng điều khiển (Dashboard)
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Thủ tục thuê phòng</h1>
                    <p className="text-slate-500 font-medium">Hoàn tất thủ tục online nhanh chóng, an toàn và minh bạch tuyệt đối.</p>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-12 relative z-10">

                        {/* Steps Navigator */}
                        <div className="md:w-1/3 space-y-8 border-r border-slate-100 pr-8 hidden md:block">
                            <div className={`flex gap-4 ${step >= 1 ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
                                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Xác thực danh tính</h4>
                                    <p className="text-xs font-medium text-slate-400">KYC bằng CCCD/CMND</p>
                                </div>
                            </div>
                            <div className={`flex gap-4 ${step >= 2 ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
                                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Chi tiết hợp đồng</h4>
                                    <p className="text-xs font-medium text-slate-400">Xem trước & Đồng ý điều khoản</p>
                                </div>
                            </div>
                            <div className={`flex gap-4 ${step >= 3 ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
                                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black shrink-0">3</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Thanh toán đặt cọc</h4>
                                    <p className="text-xs font-medium text-slate-400">Cổng thanh toán an toàn</p>
                                </div>
                            </div>
                        </div>

                        {/* Step Form Area */}
                        <div className="md:w-2/3">
                            {step === 1 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                    <div className="flex items-center gap-3 mb-8">
                                        <UserCheck className="w-8 h-8 text-indigo-600" />
                                        <h2 className="text-2xl font-black text-slate-900">Thông tin cá nhân</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Họ & Tên</label>
                                            <input type="text" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none transition-all" defaultValue="Nguyễn Văn A" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Số điện thoại</label>
                                                <input type="tel" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none transition-all" defaultValue="0987654321" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Số CCCD</label>
                                                <input type="text" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none transition-all" defaultValue="079090123456" />
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setStep(2)} className="btn-primary w-full mt-8 flex justify-center items-center gap-2">
                                        Tiếp tục <ChevronRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                    <div className="flex items-center gap-3 mb-8">
                                        <FileText className="w-8 h-8 text-indigo-600" />
                                        <h2 className="text-2xl font-black text-slate-900">Điều khoản hợp đồng</h2>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl h-64 overflow-y-auto text-sm text-slate-600 font-medium leading-relaxed border border-slate-200 space-y-4">
                                        <p><strong>BÊN CHO THUÊ:</strong> smile-bed Management</p>
                                        <p><strong>BÊN THUÊ:</strong> Nguyễn Văn A</p>
                                        <p><strong>GIÁ THUÊ:</strong> 8,500,000 VNĐ / tháng. Cố định trong suốt thời hạn HĐ.</p>
                                        <p><strong>TIỀN CỌC:</strong> 8,500,000 VNĐ. Hoàn trả 100% khi kết thúc HĐ và báo trước 30 ngày.</p>
                                        <p><strong>NỘI QUY:</strong> Không tụ tập làm ồn sau 10h tối. Không nuôi thú cưng kích thước lớn.</p>
                                        <p className="text-xs text-slate-400 italic mt-6">*Hợp đồng điện tử chính thức mã hóa SHA-256 sẽ được gửi qua email sau khi thanh toán.</p>
                                    </div>
                                    <div className="flex items-center gap-3 pt-4">
                                        <input type="checkbox" className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500" id="agree" />
                                        <label htmlFor="agree" className="font-bold text-slate-700">Tôi đã đọc và đồng ý với các điều khoản.</label>
                                    </div>
                                    <div className="flex gap-4 mt-8">
                                        <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all">Quay lại</button>
                                        <button onClick={() => setStep(3)} className="btn-primary flex-1 flex justify-center items-center gap-2">
                                            Ký điện tử & Trả cọc <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                    <div className="flex items-center gap-3 mb-8">
                                        <Lock className="w-8 h-8 text-green-600" />
                                        <h2 className="text-2xl font-black text-slate-900">Thanh toán an toàn</h2>
                                    </div>

                                    <div className="p-6 border border-indigo-100 bg-indigo-50/50 rounded-2xl mb-8">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-slate-500">Tiền cọc (1 tháng)</span>
                                            <span className="font-black text-slate-900 text-lg">8,500,000 đ</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-4 pb-4 border-b border-indigo-100/50">
                                            <span className="font-bold text-slate-500">Phí dịch vụ nền tảng</span>
                                            <span className="font-black text-green-600">Miễn phí</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="font-black text-indigo-600 text-xl">Tổng thanh toán</span>
                                            <span className="font-black text-indigo-600 text-2xl">8,500,000 đ</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleConfirmBooking}
                                        disabled={isSubmitting}
                                        className="btn-primary w-full py-5 text-lg shadow-xl shadow-indigo-100 relative"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Đang xử lý...
                                            </span>
                                        ) : 'Xác nhận & Thanh toán (Mock)'}
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
