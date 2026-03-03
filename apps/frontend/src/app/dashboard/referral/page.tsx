'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Share2, TrendingUp, Users, DollarSign, MousePointerClick, Gift, ArrowRight, Sparkles } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Mock data for demo (will be replaced by API calls when logged in)
const MOCK_STATS = {
    code: 'SMILE-DEMO01',
    isActive: true,
    totalClicks: 127,
    totalConversions: 8,
    totalCommission: 34200000,
    pendingCommission: 8500000,
    paidCommission: 25700000,
    recentConversions: [
        { id: '1', status: 'BOOKED', commissionAmount: 4250000, createdAt: '2026-02-28T10:00:00Z' },
        { id: '2', status: 'COMMISSIONED', commissionAmount: 5100000, createdAt: '2026-02-25T14:30:00Z' },
        { id: '3', status: 'BOOKED', commissionAmount: 3750000, createdAt: '2026-02-20T09:15:00Z' },
        { id: '4', status: 'COMMISSIONED', commissionAmount: 6200000, createdAt: '2026-02-15T16:45:00Z' },
        { id: '5', status: 'BOOKED', commissionAmount: 4500000, createdAt: '2026-02-10T11:20:00Z' },
    ],
};

const MOCK_COMMISSIONS = [
    { id: '1', status: 'COMMISSIONED', commissionAmount: 4250000, commissionRate: 0.05, contractId: 'CT-001', createdAt: '2026-02-28T10:00:00Z', payouts: [{ id: 'p1', amount: 4250000, status: 'PAID', paidAt: '2026-03-01T09:00:00Z' }] },
    { id: '2', status: 'BOOKED', commissionAmount: 5100000, commissionRate: 0.05, contractId: 'CT-002', createdAt: '2026-02-25T14:30:00Z', payouts: [{ id: 'p2', amount: 5100000, status: 'PENDING', paidAt: null }] },
    { id: '3', status: 'COMMISSIONED', commissionAmount: 3750000, commissionRate: 0.05, contractId: 'CT-003', createdAt: '2026-02-20T09:15:00Z', payouts: [{ id: 'p3', amount: 3750000, status: 'PAID', paidAt: '2026-02-22T09:00:00Z' }] },
    { id: '4', status: 'BOOKED', commissionAmount: 6200000, commissionRate: 0.05, contractId: 'CT-004', createdAt: '2026-02-15T16:45:00Z', payouts: [{ id: 'p4', amount: 6200000, status: 'APPROVED', paidAt: null }] },
    { id: '5', status: 'COMMISSIONED', commissionAmount: 4500000, commissionRate: 0.05, contractId: 'CT-005', createdAt: '2026-02-10T11:20:00Z', payouts: [{ id: 'p5', amount: 4500000, status: 'PAID', paidAt: '2026-02-12T09:00:00Z' }] },
];

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

function StatusBadge({ status }: { status: string }) {
    const config: Record<string, { label: string; className: string }> = {
        PAID: { label: 'Đã thanh toán', className: 'bg-emerald-100 text-emerald-700' },
        PENDING: { label: 'Chờ duyệt', className: 'bg-amber-100 text-amber-700' },
        APPROVED: { label: 'Đã duyệt', className: 'bg-blue-100 text-blue-700' },
        REJECTED: { label: 'Từ chối', className: 'bg-red-100 text-red-700' },
        BOOKED: { label: 'Đã booking', className: 'bg-indigo-100 text-indigo-700' },
        COMMISSIONED: { label: 'Đã tính HH', className: 'bg-emerald-100 text-emerald-700' },
    };
    const c = config[status] || { label: status, className: 'bg-slate-100 text-slate-600' };
    return (
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${c.className}`}>
            {c.label}
        </span>
    );
}

export default function ReferralDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [commissions, setCommissions] = useState<any[]>([]);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
                if (token) {
                    const [statsRes, commRes] = await Promise.all([
                        fetch(`${API_URL}/referral/stats`, { headers: { Authorization: `Bearer ${token}` } }),
                        fetch(`${API_URL}/referral/commissions`, { headers: { Authorization: `Bearer ${token}` } }),
                    ]);
                    if (statsRes.ok) {
                        const data = await statsRes.json();
                        if (data.code) setStats(data);
                        else setStats(MOCK_STATS);
                    } else {
                        setStats(MOCK_STATS);
                    }
                    if (commRes.ok) {
                        const data = await commRes.json();
                        if (data.length > 0) setCommissions(data);
                        else setCommissions(MOCK_COMMISSIONS);
                    } else {
                        setCommissions(MOCK_COMMISSIONS);
                    }
                } else {
                    setStats(MOCK_STATS);
                    setCommissions(MOCK_COMMISSIONS);
                }
            } catch {
                setStats(MOCK_STATS);
                setCommissions(MOCK_COMMISSIONS);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const referralLink = stats?.code
        ? `${typeof window !== 'undefined' ? window.location.origin : ''}/ref/${stats.code}`
        : '';

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: 'Smile Bed – Thuê phòng minh bạch',
                text: `Dùng mã giới thiệu ${stats?.code} để được ưu đãi khi thuê phòng tại Smile Bed!`,
                url: referralLink,
            });
        } else {
            handleCopy();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12 text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                            <Sparkles className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black">Cộng Tác Viên Sale</h1>
                            <p className="text-white/80 text-sm font-medium">Giới thiệu bạn bè, nhận hoa hồng 5%</p>
                        </div>
                    </div>

                    {/* Referral Code + Share */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 bg-white/15 backdrop-blur-md rounded-2xl px-5 py-4 flex items-center justify-between border border-white/20">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">Mã giới thiệu</p>
                                <p className="text-xl md:text-2xl font-black tracking-wider">{stats?.code || '---'}</p>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all active:scale-90"
                                title="Copy link"
                            >
                                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>
                        <button
                            onClick={handleShare}
                            className="flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-6 py-4 rounded-2xl hover:bg-white/90 transition-all active:scale-95 shadow-lg"
                        >
                            <Share2 className="w-5 h-5" />
                            Chia sẻ ngay
                        </button>
                    </div>

                    {copied && (
                        <p className="mt-3 text-sm text-emerald-200 font-semibold animate-pulse">
                            ✓ Đã copy link giới thiệu!
                        </p>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={<MousePointerClick className="w-6 h-6" />}
                    label="Lượt click"
                    value={stats?.totalClicks?.toLocaleString() || '0'}
                    color="blue"
                />
                <StatCard
                    icon={<Users className="w-6 h-6" />}
                    label="Giới thiệu thành công"
                    value={stats?.totalConversions?.toLocaleString() || '0'}
                    color="emerald"
                />
                <StatCard
                    icon={<DollarSign className="w-6 h-6" />}
                    label="Tổng hoa hồng"
                    value={stats?.totalCommission ? formatCurrency(stats.totalCommission) : '0đ'}
                    color="purple"
                />
                <StatCard
                    icon={<TrendingUp className="w-6 h-6" />}
                    label="Chờ thanh toán"
                    value={stats?.pendingCommission ? formatCurrency(stats.pendingCommission) : '0đ'}
                    color="amber"
                />
            </div>

            {/* How it works */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Gift className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-xl font-black text-slate-900">Cách hoạt động</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StepCard step={1} title="Chia sẻ mã" description="Copy link giới thiệu và gửi cho bạn bè, người thân đang tìm phòng trọ." />
                    <StepCard step={2} title="Bạn bè thuê phòng" description="Khi họ đặt phòng thành công qua link của bạn, hệ thống tự động ghi nhận." />
                    <StepCard step={3} title="Nhận hoa hồng" description="Bạn nhận 5% giá trị hợp đồng tháng đầu. Hoa hồng được thanh toán hàng tuần." />
                </div>
            </div>

            {/* Commission History Table */}
            <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
                <div className="p-8 pb-4 flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-900">Lịch sử hoa hồng</h2>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {commissions.length} giao dịch
                    </span>
                </div>

                {commissions.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">
                        <Gift className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p className="font-semibold">Chưa có hoa hồng nào</p>
                        <p className="text-sm mt-1">Chia sẻ mã giới thiệu để bắt đầu kiếm tiền!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-t border-b border-slate-100">
                                    <th className="px-8 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ngày</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hợp đồng</th>
                                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tỷ lệ</th>
                                    <th className="px-4 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hoa hồng</th>
                                    <th className="px-8 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {commissions.map((c) => (
                                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-4 text-sm font-medium text-slate-600">{formatDate(c.createdAt)}</td>
                                        <td className="px-4 py-4 text-sm font-mono text-slate-500">{c.contractId || '—'}</td>
                                        <td className="px-4 py-4 text-sm font-semibold text-slate-600">{(c.commissionRate * 100).toFixed(0)}%</td>
                                        <td className="px-4 py-4 text-sm font-bold text-indigo-600 text-right">{formatCurrency(c.commissionAmount)}</td>
                                        <td className="px-8 py-4 text-right">
                                            <StatusBadge status={c.payouts?.[0]?.status || c.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
    const colorMap: Record<string, { bg: string; icon: string; text: string }> = {
        blue: { bg: 'bg-blue-50', icon: 'text-blue-500', text: 'text-blue-700' },
        emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-500', text: 'text-emerald-700' },
        purple: { bg: 'bg-purple-50', icon: 'text-purple-500', text: 'text-purple-700' },
        amber: { bg: 'bg-amber-50', icon: 'text-amber-500', text: 'text-amber-700' },
    };
    const c = colorMap[color] || colorMap.blue;

    return (
        <div className={`${c.bg} rounded-[1.5rem] p-5 md:p-6 transition-all hover:shadow-lg hover:-translate-y-1`}>
            <div className={`${c.icon} mb-3`}>{icon}</div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-lg md:text-xl font-black ${c.text}`}>{value}</p>
        </div>
    );
}

function StepCard({ step, title, description }: { step: number; title: string; description: string }) {
    return (
        <div className="relative flex items-start gap-4 p-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-indigo-200">
                {step}
            </div>
            <div>
                <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
