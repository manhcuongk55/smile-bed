'use client';

import { useEffect, useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, Eye, ChevronDown, MessageSquare, Loader2 } from 'lucide-react';
import Link from 'next/link';



interface Viewing {
    id: string;
    guestName: string;
    guestPhone: string;
    guestEmail: string | null;
    preferredDate: string;
    preferredTime: string;
    note: string | null;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    managerNote: string | null;
    createdAt: string;
    room: {
        roomNumber: string;
        property: { name: string; address: string };
    };
}

const STATUS_CONFIG = {
    PENDING: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: '⏳ Chờ xác nhận', icon: Clock },
    CONFIRMED: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: '✅ Đã xác nhận', icon: CheckCircle },
    CANCELLED: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: '❌ Đã hủy', icon: XCircle },
    COMPLETED: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: '🏁 Hoàn tất', icon: CheckCircle },
};

export default function ViewingManagementPage() {
    const [viewings, setViewings] = useState<Viewing[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('');
    const [actionId, setActionId] = useState<string | null>(null);

    const fetchViewings = async () => {
        try {
            const url = filter ? `/api/booking/viewings?status=${filter}` : `/api/booking/viewings`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setViewings(data);
            }
        } catch (e) {
            console.error('Fetch viewings failed:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchViewings();
    }, [filter]);

    const handleAction = async (id: string, action: 'confirm' | 'cancel' | 'complete') => {
        setActionId(id);
        try {
            const res = await fetch(`/api/booking/viewing/${id}/${action}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ managerNote: `Đã ${action === 'confirm' ? 'xác nhận' : action === 'cancel' ? 'hủy' : 'hoàn tất'} bởi quản lý.` }),
            });
            if (res.ok) {
                fetchViewings();
            }
        } catch (e) {
            console.error('Action failed:', e);
        } finally {
            setActionId(null);
        }
    };

    const filters = [
        { value: '', label: 'Tất cả' },
        { value: 'PENDING', label: '⏳ Chờ xác nhận' },
        { value: 'CONFIRMED', label: '✅ Đã xác nhận' },
        { value: 'COMPLETED', label: '🏁 Hoàn tất' },
        { value: 'CANCELLED', label: '❌ Đã hủy' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-20 sm:pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">Quản lý lịch xem phòng</h1>
                        <p className="text-slate-500 font-medium text-sm">Xem và duyệt các yêu cầu xem phòng từ khách hàng.</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold">
                        <span className="text-slate-400">Tổng:</span>
                        <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">{viewings.length} yêu cầu</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === f.value ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                    </div>
                )}

                {/* Empty */}
                {!loading && viewings.length === 0 && (
                    <div className="text-center py-20">
                        <Eye className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 font-bold">Chưa có yêu cầu xem phòng nào.</p>
                    </div>
                )}

                {/* Viewing Cards */}
                <div className="space-y-4">
                    {viewings.map((v) => {
                        const config = STATUS_CONFIG[v.status];
                        const StatusIcon = config.icon;
                        return (
                            <div key={v.id} className={`bg-white rounded-2xl p-5 sm:p-6 shadow-lg border ${config.border} hover:shadow-xl transition-all`}>
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    {/* Left */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-xs font-bold`}>
                                                {config.label}
                                            </span>
                                            <span className="text-xs text-slate-400 font-medium">
                                                {new Date(v.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black text-sm shrink-0">
                                                {v.guestName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{v.guestName}</p>
                                                <p className="text-xs text-slate-400 font-medium">
                                                    Phòng {v.room.roomNumber} · {v.room.property.name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                            <span className="flex items-center gap-1.5">
                                                <Phone className="w-4 h-4 text-slate-400" /> {v.guestPhone}
                                            </span>
                                            {v.guestEmail && (
                                                <span className="flex items-center gap-1.5">
                                                    <Mail className="w-4 h-4 text-slate-400" /> {v.guestEmail}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1.5 font-bold text-indigo-600">
                                                <Calendar className="w-4 h-4" /> {new Date(v.preferredDate).toLocaleDateString('vi-VN')} lúc {v.preferredTime}
                                            </span>
                                        </div>

                                        {v.note && (
                                            <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl text-sm text-slate-600">
                                                <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                                <span>{v.note}</span>
                                            </div>
                                        )}

                                        {v.managerNote && (
                                            <div className="flex items-start gap-2 bg-indigo-50 p-3 rounded-xl text-sm text-indigo-700">
                                                <MessageSquare className="w-4 h-4 shrink-0 mt-0.5" />
                                                <span><strong>Ghi chú quản lý:</strong> {v.managerNote}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    {v.status === 'PENDING' && (
                                        <div className="flex sm:flex-col gap-2 shrink-0">
                                            <button
                                                onClick={() => handleAction(v.id, 'confirm')}
                                                disabled={actionId === v.id}
                                                className="flex-1 sm:flex-auto px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                                            >
                                                ✅ Xác nhận
                                            </button>
                                            <button
                                                onClick={() => handleAction(v.id, 'cancel')}
                                                disabled={actionId === v.id}
                                                className="flex-1 sm:flex-auto px-4 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm border border-red-100 hover:bg-red-100 transition-all active:scale-95 disabled:opacity-50"
                                            >
                                                ❌ Từ chối
                                            </button>
                                        </div>
                                    )}
                                    {v.status === 'CONFIRMED' && (
                                        <button
                                            onClick={() => handleAction(v.id, 'complete')}
                                            disabled={actionId === v.id}
                                            className="px-4 py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-all active:scale-95 disabled:opacity-50 shrink-0"
                                        >
                                            🏁 Hoàn tất
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
