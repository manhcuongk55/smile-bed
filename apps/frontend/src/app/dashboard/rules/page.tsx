'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, AlertTriangle, Shield, ChevronDown, ChevronUp, Ban, Volume2, Cigarette, Dog, Trash2, Wrench, UserX } from 'lucide-react';

const SOP_RULES = [
    { id: 'R01', rule: 'Quên tắt điện khu vực chung', penalty: 50000, icon: <Volume2 className="w-5 h-5" />, desc: 'Phải tắt đèn hành lang, cầu thang khi ra về (sau 23h)', level: 'light' },
    { id: 'R02', rule: 'Sử dụng sai bột giặt máy cửa trước', penalty: 100000, icon: <Ban className="w-5 h-5" />, desc: 'Chỉ sử dụng bột giặt chuyên dụng cho máy giặt cửa trước', level: 'medium' },
    { id: 'R03', rule: 'Gây ồn sau 22h', penalty: 100000, icon: <Volume2 className="w-5 h-5" />, desc: 'Không phát nhạc lớn, la hét, hoặc gây tiếng ồn sau 22h', level: 'medium' },
    { id: 'R04', rule: 'Hút thuốc trong phòng', penalty: 200000, icon: <Cigarette className="w-5 h-5" />, desc: 'Nghiêm cấm hút thuốc trong phòng và khu vực chung', level: 'heavy' },
    { id: 'R05', rule: 'Nuôi thú cưng không phép', penalty: 200000, icon: <Dog className="w-5 h-5" />, desc: 'Phải xin phép quản lý trước khi nuôi thú cưng', level: 'heavy' },
    { id: 'R06', rule: 'Vứt rác không đúng nơi', penalty: 50000, icon: <Trash2 className="w-5 h-5" />, desc: 'Phân loại rác và vứt đúng vị trí quy định', level: 'light' },
    { id: 'R07', rule: 'Tự ý sửa chữa, cải tạo', penalty: 500000, icon: <Wrench className="w-5 h-5" />, desc: 'Mọi sửa chữa phải thông qua quản lý tòa nhà', level: 'critical' },
    { id: 'R08', rule: 'Cho người lạ ở qua đêm', penalty: 200000, icon: <UserX className="w-5 h-5" />, desc: 'Phải đăng ký khách ở qua đêm với quản lý', level: 'heavy' },
];

const MOCK_VIOLATIONS = [
    { id: '1', rule: 'Quên tắt điện khu vực chung', penaltyAmount: 50000, occurrenceCount: 2, createdAt: '2026-02-20T10:00:00Z', invoiceId: 'inv-001' },
    { id: '2', rule: 'Gây ồn sau 22h', penaltyAmount: 100000, occurrenceCount: 1, createdAt: '2026-02-15T22:30:00Z', invoiceId: null },
];

function levelColor(level: string) {
    if (level === 'light') return { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' };
    if (level === 'medium') return { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' };
    if (level === 'heavy') return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' };
    return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
}

export default function RulesPage() {
    const [expandedRule, setExpandedRule] = useState<string | null>(null);

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Nội quy & Chế tài</h1>
                    <p className="text-slate-500 font-medium italic">SOP Ứng xử – Quy định chung cho cư dân Smile Home</p>
                </div>
                <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-2xl border border-indigo-100 flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                    <Shield className="w-4 h-4" /> Quy chế nội bộ
                </div>
            </header>

            {/* Penalty Scale */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-[2rem] p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6" />
                    <h2 className="text-xl font-black">Thang chế tài vi phạm</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {[
                        { label: 'Nhẹ', amount: '50.000đ', desc: 'Lần 1 nhắc nhở' },
                        { label: 'Trung bình', amount: '100.000đ', desc: 'Lần 2 cảnh cáo' },
                        { label: 'Nặng', amount: '200.000đ', desc: 'Lần 3 phạt nặng' },
                        { label: 'Nghiêm trọng', amount: '500.000đ', desc: 'Vi phạm nghiêm trọng' },
                    ].map((tier, i) => (
                        <div key={i} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">{tier.label}</p>
                            <p className="text-xl font-black">{tier.amount}</p>
                            <p className="text-xs text-white/70 mt-1">{tier.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rules List */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-xl font-black text-slate-900">Danh sách quy định ({SOP_RULES.length})</h2>
                </div>
                <div className="space-y-3">
                    {SOP_RULES.map((rule) => {
                        const c = levelColor(rule.level);
                        const isExpanded = expandedRule === rule.id;
                        return (
                            <div
                                key={rule.id}
                                className={`${c.bg} rounded-2xl border ${c.border} overflow-hidden transition-all`}
                            >
                                <button
                                    onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`${c.text} p-2 rounded-xl bg-white/80`}>{rule.icon}</div>
                                        <div>
                                            <p className="font-bold text-slate-900">{rule.rule}</p>
                                            <p className={`text-sm font-bold ${c.text}`}>{rule.penalty.toLocaleString()}đ / lần</p>
                                        </div>
                                    </div>
                                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                                </button>
                                {isExpanded && (
                                    <div className="px-5 pb-5 pt-0">
                                        <p className="text-sm text-slate-600 bg-white/60 rounded-xl p-4">{rule.desc}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Violation History */}
            <section>
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Lịch sử vi phạm cá nhân
                </h2>
                {MOCK_VIOLATIONS.length === 0 ? (
                    <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-100">
                        <Shield className="w-12 h-12 mx-auto mb-3 text-green-400" />
                        <p className="font-bold text-green-700">Bạn chưa có vi phạm nào. Tuyệt vời!</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
                        {MOCK_VIOLATIONS.map((v, i) => (
                            <div key={v.id} className={`p-5 flex items-center justify-between ${i !== MOCK_VIOLATIONS.length - 1 ? 'border-b border-slate-50' : ''}`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 font-black text-sm">
                                        x{v.occurrenceCount}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{v.rule}</p>
                                        <p className="text-xs text-slate-400">{new Date(v.createdAt).toLocaleDateString('vi-VN')}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-red-600">{v.penaltyAmount.toLocaleString()}đ</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                                        {v.invoiceId ? '✓ Đã tính vào HĐ' : '⏳ Chờ tính'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </motion.div>
    );
}
