'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, X, Send } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ViewingRequestPage({ params }: { params: { id: string } }) {
    const [form, setForm] = useState({
        guestName: '',
        guestPhone: '',
        guestEmail: '',
        preferredDate: '',
        preferredTime: '10:00',
        note: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch(`${API_URL}/booking/viewing/${params.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Có lỗi xảy ra');
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Không thể gửi yêu cầu. Vui lòng thử lại.');
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-50 pt-20 sm:pt-24 pb-20 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Đã gửi yêu cầu thành công!</h1>
                    <p className="text-slate-500 font-medium mb-8">
                        Quản lý sẽ xác nhận lịch xem phòng qua số điện thoại <strong>{form.guestPhone}</strong> trong 24h. Cảm ơn bạn!
                    </p>
                    <div className="space-y-3">
                        <Link href={`/rooms/${params.id}`} className="block btn-primary !rounded-2xl !py-4 text-center">
                            ← Quay lại phòng
                        </Link>
                        <Link href="/" className="block text-indigo-600 font-bold hover:underline">
                            Xem phòng khác
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-20 sm:pt-24 pb-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="mb-8">
                    <Link href={`/rooms/${params.id}`} className="text-sm text-indigo-600 font-bold hover:underline mb-4 inline-block">
                        ← Quay lại chi tiết phòng
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Đăng ký xem phòng thực tế</h1>
                    <p className="text-slate-500 font-medium">Điền thông tin để đặt lịch xem phòng. Quản lý sẽ xác nhận trong 24h.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
                    {/* Guest Info */}
                    <div>
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Thông tin liên hệ</h3>
                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Họ và tên *"
                                    required
                                    value={form.guestName}
                                    onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-100 font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                                />
                            </div>
                            <div className="relative">
                                <Phone className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                <input
                                    type="tel"
                                    placeholder="Số điện thoại *"
                                    required
                                    value={form.guestPhone}
                                    onChange={(e) => setForm({ ...form, guestPhone: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-100 font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    placeholder="Email (không bắt buộc)"
                                    value={form.guestEmail}
                                    onChange={(e) => setForm({ ...form, guestEmail: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-100 font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div>
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Thời gian mong muốn</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                                <Calendar className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                <input
                                    type="date"
                                    required
                                    value={form.preferredDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-100 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                                />
                            </div>
                            <div className="relative">
                                <Clock className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                <select
                                    value={form.preferredTime}
                                    onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-100 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all appearance-none"
                                >
                                    {timeSlots.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div>
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Ghi chú</h3>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                            <textarea
                                placeholder="Điều bạn muốn hỏi khi xem phòng..."
                                rows={3}
                                value={form.note}
                                onChange={(e) => setForm({ ...form, note: e.target.value })}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-100 font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all resize-none"
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
                            <X className="w-4 h-4 shrink-0" /> {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full btn-primary !py-4 !rounded-2xl !text-lg !font-black flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            'Đang gửi...'
                        ) : (
                            <>
                                <Send className="w-5 h-5" /> Gửi yêu cầu xem phòng
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
