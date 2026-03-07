'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Heart, Upload, GraduationCap, Home, Users, Star, ThumbsUp, Share2,
    CheckCircle2, X, ArrowLeft, Gift, Building2, Award, HandHeart, Sparkles
} from 'lucide-react';

/* ── MOCK PROFILES ── */
const PROFILES = [
    {
        id: 'p1', name: 'Nguyễn Thị Linh', age: 19, school: 'ĐH Kinh tế Quốc dân',
        avatar: '👩‍🎓', story: 'Bố mất sớm, mẹ bán rau ngoài chợ nuôi 3 chị em. Em được ĐH KTQD nhận nhưng chưa biết tìm trọ ở đâu vì không có tiền cọc. Mong Smile hỗ trợ để em yên tâm học.',
        field: 'Kinh tế', city: 'Hà Nội', need: 'Phòng miễn phí 3 tháng',
        votes: 1247, verified: true, status: 'reviewing',
        createdAt: '2 ngày trước',
    },
    {
        id: 'p2', name: 'Trần Văn Hùng', age: 18, school: 'ĐH Bách khoa TP.HCM',
        avatar: '👨‍🎓', story: 'Gia đình ở Quảng Trị, vùng lũ. Bố mẹ làm nông, thu nhập không ổn định. Em đậu Bách khoa với 28 điểm, muốn theo ngành IT nhưng lo nhất là tiền nhà.',
        field: 'Công nghệ', city: 'TP.HCM', need: 'Phòng miễn phí + ở ghép',
        votes: 2156, verified: true, status: 'approved',
        createdAt: '5 ngày trước',
    },
    {
        id: 'p3', name: 'Lê Thị Hồng Nhung', age: 20, school: 'ĐH Y Dược TP.HCM',
        avatar: '👩‍⚕️', story: 'Mồ côi từ nhỏ, lớn lên ở trung tâm bảo trợ. Năm nay em vào Y Dược, học phí cao nhưng em có học bổng 50%. Chỉ thiếu chỗ ở.',
        field: 'Y khoa', city: 'TP.HCM', need: 'Phòng miễn phí 6 tháng',
        votes: 3420, verified: true, status: 'approved',
        createdAt: '1 tuần trước',
    },
    {
        id: 'p4', name: 'Phạm Đức Anh', age: 19, school: 'ĐH Quốc gia Hà Nội',
        avatar: '🧑‍🎓', story: 'Nhà ở Lai Châu, dân tộc Thái. Bố mẹ trồng lúa. Em được xét tuyển ĐH Quốc gia HN ngành CNTT. Lần đầu xuống Hà Nội, chưa biết gì.',
        field: 'Công nghệ', city: 'Hà Nội', need: 'Phòng ưu đãi + kết bạn',
        votes: 987, verified: false, status: 'reviewing',
        createdAt: '1 ngày trước',
    },
];

function getStatusBadge(status: string) {
    if (status === 'approved') return { label: '✅ Đã duyệt', color: 'bg-emerald-100 text-emerald-700' };
    if (status === 'reviewing') return { label: '⏳ Đang xét', color: 'bg-amber-100 text-amber-700' };
    return { label: '📝 Chờ xác minh', color: 'bg-slate-100 text-slate-600' };
}

export default function HelpProfilePage() {
    const [profiles, setProfiles] = useState(PROFILES);
    const [showApply, setShowApply] = useState(false);
    const [applySent, setApplySent] = useState(false);
    const [formData, setFormData] = useState({ name: '', age: '', school: '', story: '', need: 'room-free', city: 'HN' });
    const [voted, setVoted] = useState<Set<string>>(new Set());
    const [sortBy, setSortBy] = useState<'votes' | 'recent'>('votes');

    const handleVote = (id: string) => {
        if (voted.has(id)) return;
        setVoted(new Set([...voted, id]));
        setProfiles(prev => prev.map(p => p.id === id ? { ...p, votes: p.votes + 1 } : p));
    };

    const handleApply = () => {
        if (!formData.name || !formData.story) return;
        setApplySent(true);
        setTimeout(() => { setShowApply(false); setApplySent(false); }, 4000);
    };

    const shareProfile = (p: typeof PROFILES[0]) => {
        const text = `💛 Hãy vote giúp ${p.name} nhận phòng miễn phí!\n🎓 ${p.school}\n📖 "${p.story.slice(0, 100)}..."\n❤️ ${p.votes} lượt vote\n\nVote tại smile.vn/smile-future/help\n#SmileFuture #HoTroSinhVien`;
        if (typeof navigator !== 'undefined' && navigator.share) {
            navigator.share({ title: `Smile Future – ${p.name}`, text, url: 'https://smile.vn/smile-future/help' });
        } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(text);
        }
    };

    const sorted = [...profiles].sort((a, b) => sortBy === 'votes' ? b.votes - a.votes : 0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

                {/* Back */}
                <Link href="/smile-future" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors mb-6">
                    <ArrowLeft className="w-3 h-3" /> Quay lại Smile Future
                </Link>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-100 text-pink-700 rounded-full text-[10px] font-black uppercase tracking-wider mb-3">
                        <Heart className="w-3 h-3 fill-pink-600" /> Giai đoạn 2 · Hỗ trợ sinh viên
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
                        🎁 Help <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">Profile</span>
                    </h1>
                    <p className="text-sm text-slate-500 max-w-lg mx-auto mb-6">
                        Vote cho sinh viên khó khăn · Top 100 nhận phòng miễn phí 3-6 tháng<br/>
                        <span className="text-pink-600 font-bold">Mỗi vote = 1 bước gần hơn đến mái ấm 💛</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowApply(true)}
                            className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-pink-200 flex items-center gap-2 justify-center">
                            <HandHeart className="w-4 h-4" /> Đăng ký nhận hỗ trợ
                        </motion.button>
                    </div>
                </motion.div>

                {/* Progress bar */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black text-slate-900">🎁 Tiến độ tặng phòng</span>
                        <span className="text-xs font-bold text-pink-600">{PROFILES.filter(p => p.status === 'approved').length}/100 phòng đã duyệt</span>
                    </div>
                    <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(PROFILES.filter(p => p.status === 'approved').length / 100) * 100}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400 font-semibold">
                        <span>{profiles.length} hồ sơ đăng ký</span>
                        <span>Mục tiêu: 100 phòng miễn phí</span>
                    </div>
                </div>

                {/* Sort */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-black text-slate-900">📋 Hồ sơ sinh viên ({profiles.length})</h2>
                    <div className="flex gap-2">
                        {[{ k: 'votes', l: '❤️ Nhiều vote' }, { k: 'recent', l: '🕐 Mới nhất' }].map(s => (
                            <button key={s.k} onClick={() => setSortBy(s.k as any)}
                                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all ${sortBy === s.k ? 'bg-pink-600 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>
                                {s.l}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Profile cards */}
                <div className="space-y-4">
                    {sorted.map((p, i) => {
                        const badge = getStatusBadge(p.status);
                        return (
                            <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
                                <div className="p-5">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 text-center">
                                            <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center text-3xl mb-1">{p.avatar}</div>
                                            <span className="text-[9px] font-bold text-slate-400">#{i + 1}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-1">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-base font-black text-slate-900">{p.name}</h3>
                                                        {p.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                                                    </div>
                                                    <p className="text-[10px] text-slate-400 font-semibold">{p.age} tuổi · {p.school} · {p.field}</p>
                                                </div>
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${badge.color}`}>{badge.label}</span>
                                            </div>

                                            <p className="text-xs text-slate-600 font-medium leading-relaxed my-3 bg-slate-50 rounded-xl p-3">
                                                📖 "{p.story}"
                                            </p>

                                            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold mb-3">
                                                <span>📍 {p.city}</span>
                                                <span>🎁 {p.need}</span>
                                                <span>🕐 {p.createdAt}</span>
                                            </div>

                                            <div className="flex gap-2">
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleVote(p.id)}
                                                    className={`flex-1 py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                                                        voted.has(p.id)
                                                            ? 'bg-pink-100 text-pink-600 border-2 border-pink-200'
                                                            : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm active:scale-95'
                                                    }`}>
                                                    <Heart className={`w-4 h-4 ${voted.has(p.id) ? 'fill-pink-500' : ''}`} />
                                                    {voted.has(p.id) ? `Đã vote · ${p.votes}` : `Vote · ${p.votes}`}
                                                </motion.button>
                                                <button onClick={() => shareProfile(p)}
                                                    className="px-4 py-3 rounded-2xl text-xs font-bold bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95">
                                                    <Share2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Partners */}
                <div className="mt-12 bg-white rounded-3xl border border-slate-100 p-6 text-center">
                    <h3 className="text-sm font-black text-slate-900 mb-3">🤝 Đối tác hỗ trợ chiến dịch</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {['🏛️ ĐH Quốc gia HN', '🏛️ ĐH Quốc gia HCM', '🏥 ĐH Y Dược HCM', '💛 Ngày Việt', '☀️ Tony Buổi Sáng', '🏠 Chủ trọ Smile'].map(p => (
                            <span key={p} className="px-3 py-1.5 bg-pink-50 text-pink-700 rounded-xl text-[10px] font-bold">{p}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── APPLY MODAL ── */}
            <AnimatePresence>
                {showApply && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={(e) => { if (e.target === e.currentTarget) setShowApply(false); }}>
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-5 text-white relative sticky top-0 z-10">
                                <button onClick={() => setShowApply(false)} className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <X className="w-4 h-4" />
                                </button>
                                <h2 className="text-lg font-black">🎁 Đăng ký nhận hỗ trợ</h2>
                                <p className="text-pink-100 text-xs font-semibold">Mô tả hoàn cảnh → cộng đồng vote → nhận phòng</p>
                            </div>
                            <div className="p-6 space-y-4">
                                {applySent ? (
                                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-8">
                                        <div className="text-5xl mb-4">💛</div>
                                        <h3 className="text-lg font-black text-slate-900 mb-2">Đã gửi hồ sơ!</h3>
                                        <p className="text-xs text-slate-500 font-semibold">Smile sẽ xác minh và đăng profile trong 24h. Cộng đồng sẽ vote giúp bạn!</p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1 block">Họ tên</label>
                                            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:border-pink-400" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-bold text-slate-700 mb-1 block">Tuổi</label>
                                                <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})}
                                                    placeholder="18" className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:border-pink-400" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-700 mb-1 block">Thành phố</label>
                                                <select value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}
                                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:border-pink-400">
                                                    <option value="HN">Hà Nội</option>
                                                    <option value="HCM">TP.HCM</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1 block">Trường / Ngành</label>
                                            <input type="text" value={formData.school} onChange={(e) => setFormData({...formData, school: e.target.value})}
                                                placeholder="ĐH Bách khoa TP.HCM – CNTT" className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:border-pink-400" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1 block">Hoàn cảnh của bạn</label>
                                            <textarea value={formData.story} onChange={(e) => setFormData({...formData, story: e.target.value})}
                                                placeholder="Mô tả ngắn hoàn cảnh gia đình, khó khăn bạn đang gặp..."
                                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:border-pink-400 resize-none h-28" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1 block">Nhu cầu hỗ trợ</label>
                                            <select value={formData.need} onChange={(e) => setFormData({...formData, need: e.target.value})}
                                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:border-pink-400">
                                                <option value="room-free">🎁 Phòng miễn phí 3 tháng</option>
                                                <option value="room-discount">💰 Phòng giảm 50%</option>
                                                <option value="room-share">👫 Ở ghép + ưu đãi</option>
                                            </select>
                                        </div>
                                        <button onClick={handleApply}
                                            className="w-full py-3.5 rounded-2xl text-sm font-black bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-200 active:scale-95 transition-all">
                                            💛 Gửi hồ sơ
                                        </button>
                                        <p className="text-[10px] text-slate-400 font-semibold text-center">
                                            Smile sẽ xác minh qua trường/NPO đối tác. Ẩn danh khi cộng đồng vote.
                                        </p>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
