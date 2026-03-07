'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Users, MapPin, Star, Trophy, Heart, Share2, ArrowLeft, Sparkles,
    CheckCircle2, Gift, Zap, Target, GraduationCap, MessageCircle, UserPlus
} from 'lucide-react';

/* ── MOCK FRIENDS ── */
const FRIENDS = [
    { id: 'f1', name: 'Minh Anh', avatar: '👩', school: 'ĐH Kinh tế TP.HCM', field: '📊 Kinh tế', area: 'Bình Thạnh', online: true, interests: ['Đọc sách', 'Cà phê', 'Gym'], matchScore: 92 },
    { id: 'f2', name: 'Đức', avatar: '🧑', school: 'ĐH Bách khoa TP.HCM', field: '💻 CNTT', area: 'Q.10', online: true, interests: ['Code', 'Game', 'Anime'], matchScore: 88 },
    { id: 'f3', name: 'Hà Linh', avatar: '👧', school: 'ĐH Quốc gia HN', field: '🌏 Ngoại ngữ', area: 'Cầu Giấy', online: false, interests: ['Du lịch', 'Nấu ăn'], matchScore: 75 },
    { id: 'f4', name: 'Nam', avatar: '🧔', school: 'ĐH Y Dược TP.HCM', field: '🏥 Y khoa', area: 'Q.5', online: true, interests: ['Thể thao', 'Thiện nguyện'], matchScore: 82 },
    { id: 'f5', name: 'Thuỳ', avatar: '👩‍🎓', school: 'ĐH Ngoại thương', field: '💼 Kinh doanh', area: 'Cầu Giấy', online: false, interests: ['Marketing', 'Cà phê', 'Yoga'], matchScore: 79 },
    { id: 'f6', name: 'Trung', avatar: '👨‍💻', school: 'ĐH FPT', field: '💻 CNTT', area: 'Thủ Đức', online: true, interests: ['Startup', 'AI', 'Đọc sách'], matchScore: 95 },
];

/* ── RELAY MISSIONS ── */
const MISSIONS = [
    { id: 'm1', emoji: '💪', title: 'Check-in Gym gần trường', desc: 'Tập gym ở California Fitness Cầu Giấy', points: 50, type: 'check-in', done: false },
    { id: 'm2', emoji: '🍜', title: 'Đặt chung bữa trưa', desc: 'Gộp đơn với 3 bạn Smile → ship 6k', points: 30, type: 'social', done: true },
    { id: 'm3', emoji: '👫', title: 'Mời 1 bạn mới vào Smile', desc: 'Mời bạn cùng trường → +50k quỹ nhà', points: 100, type: 'invite', done: false },
    { id: 'm4', emoji: '📸', title: 'Quay video "Life at Smile"', desc: 'TikTok 30s về cuộc sống ở ghép', points: 80, type: 'viral', done: false },
    { id: 'm5', emoji: '🧹', title: 'Hoàn thành việc nhà', desc: 'Quét nhà / rửa bát → confetti!', points: 40, type: 'chore', done: true },
    { id: 'm6', emoji: '🗺️', title: 'Thu thập mảnh ghép', desc: 'Hoàn thành relay → nhận 1 mảnh Mystery Map', points: 60, type: 'puzzle', done: false },
];

/* ── SCHOOL LEADERBOARD ── */
const SCHOOL_LB = [
    { rank: 1, school: 'ĐH Quốc gia TP.HCM', emoji: '🏛️', members: 156, points: 28400, trend: '↑' },
    { rank: 2, school: 'ĐH Bách khoa HN', emoji: '⚙️', members: 134, points: 25800, trend: '↑' },
    { rank: 3, school: 'ĐH Kinh tế Quốc dân', emoji: '📊', members: 98, points: 19200, trend: '→' },
    { rank: 4, school: 'ĐH FPT', emoji: '💻', members: 87, points: 17600, trend: '↑' },
    { rank: 5, school: 'ĐH Y Dược TP.HCM', emoji: '🏥', members: 62, points: 12400, trend: '↓' },
    { rank: 6, school: 'ĐH Ngoại thương', emoji: '🌏', members: 45, points: 9800, trend: '→' },
];

export default function FriendMapPage() {
    const [tab, setTab] = useState<'friends' | 'missions' | 'leaderboard'>('friends');
    const [friends, setFriends] = useState(FRIENDS);
    const [missions, setMissions] = useState(MISSIONS);
    const [connected, setConnected] = useState<Set<string>>(new Set());
    const [myPoints, setMyPoints] = useState(270);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleConnect = (id: string) => {
        if (connected.has(id)) return;
        setConnected(new Set([...connected, id]));
    };

    const handleMission = (id: string) => {
        const m = missions.find(x => x.id === id);
        if (!m || m.done) return;
        setMissions(prev => prev.map(x => x.id === id ? { ...x, done: true } : x));
        setMyPoints(prev => prev + (m?.points || 0));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
    };

    const totalPoints = missions.filter(m => m.done).reduce((s, m) => s + m.points, 0) + 200;
    const completedMissions = missions.filter(m => m.done).length;

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 relative">
            {/* Confetti */}
            {showConfetti && (
                <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1.5, opacity: 1 }}
                        transition={{ duration: 0.5 }} className="text-6xl">🎉</motion.div>
                    {[...'🌟⭐✨💫🎊'].map((e, i) => (
                        <motion.div key={i} initial={{ y: 0, opacity: 1, x: 0 }}
                            animate={{ y: -200 + Math.random() * 400, x: -200 + Math.random() * 400, opacity: 0 }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                            className="fixed text-2xl">{e}</motion.div>
                    ))}
                </div>
            )}

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

                {/* Back */}
                <Link href="/smile-future" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors mb-6">
                    <ArrowLeft className="w-3 h-3" /> Quay lại Smile Future
                </Link>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-black uppercase tracking-wider mb-3">
                        <Users className="w-3 h-3" /> Giai đoạn 3 · Sống Vui
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
                        👫 Friend <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">Map</span>
                    </h1>
                    <p className="text-sm text-slate-500 max-w-lg mx-auto">
                        Tìm bạn bè Smile gần trường · Relay nhiệm vụ cộng đồng · BXH toàn khu
                    </p>
                </motion.div>

                {/* My stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
                        <div className="text-2xl font-black text-amber-600">{myPoints}</div>
                        <div className="text-[10px] font-bold text-slate-400">Điểm của tôi</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
                        <div className="text-2xl font-black text-indigo-600">{connected.size}</div>
                        <div className="text-[10px] font-bold text-slate-400">Bạn đã kết nối</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
                        <div className="text-2xl font-black text-emerald-600">{completedMissions}/{missions.length}</div>
                        <div className="text-[10px] font-bold text-slate-400">Nhiệm vụ hoàn thành</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 bg-slate-100 rounded-2xl p-1">
                    {[
                        { key: 'friends', label: '👫 Bạn bè', icon: <Users className="w-3.5 h-3.5" /> },
                        { key: 'missions', label: '🎯 Nhiệm vụ', icon: <Target className="w-3.5 h-3.5" /> },
                        { key: 'leaderboard', label: '🏆 BXH Trường', icon: <Trophy className="w-3.5 h-3.5" /> },
                    ].map(t => (
                        <button key={t.key} onClick={() => setTab(t.key as any)}
                            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                tab === t.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                            }`}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* ── FRIENDS TAB ── */}
                {tab === 'friends' && (
                    <div className="space-y-3">
                        <p className="text-xs text-slate-400 font-semibold mb-2">Gợi ý bạn bè theo trường & sở thích (match score cao nhất)</p>
                        {friends.sort((a, b) => b.matchScore - a.matchScore).map((f, i) => (
                            <motion.div key={f.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                                className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4 hover:shadow-md transition-all">
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl">{f.avatar}</div>
                                    <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${f.online ? 'bg-emerald-400' : 'bg-slate-300'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-black text-slate-900">{f.name}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-black ${
                                            f.matchScore >= 90 ? 'bg-emerald-100 text-emerald-700' : f.matchScore >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                                        }`}>{f.matchScore}% match</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-semibold">{f.field} · {f.school}</p>
                                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                                        {f.interests.map(int => (
                                            <span key={int} className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[9px] font-bold">{int}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <button onClick={() => handleConnect(f.id)}
                                        className={`px-3 py-2 rounded-xl text-[10px] font-black transition-all active:scale-95 ${
                                            connected.has(f.id)
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-amber-500 text-white hover:bg-amber-600'
                                        }`}>
                                        {connected.has(f.id) ? '✓ Đã kết nối' : '+ Kết bạn'}
                                    </button>
                                    <span className="text-[9px] text-slate-400 font-semibold text-center">📍 {f.area}</span>
                                </div>
                            </motion.div>
                        ))}

                        <div className="text-center pt-4">
                            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl text-xs font-black shadow-md active:scale-95 transition-all flex items-center gap-2 mx-auto">
                                <UserPlus className="w-4 h-4" /> Mời bạn vào Smile → +50k quỹ nhà
                            </button>
                        </div>
                    </div>
                )}

                {/* ── MISSIONS TAB ── */}
                {tab === 'missions' && (
                    <div className="space-y-3">
                        <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-black text-slate-900">🎯 Tiến độ nhiệm vụ tuần này</span>
                                <span className="text-xs font-bold text-amber-600">{completedMissions}/{missions.length}</span>
                            </div>
                            <div className="w-full h-2.5 bg-amber-100 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${(completedMissions / missions.length) * 100}%` }}
                                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                            </div>
                            <p className="text-[10px] text-slate-400 font-semibold mt-2">Hoàn thành tất cả → 🎁 Vé xem phim nhóm!</p>
                        </div>

                        {missions.map((m, i) => (
                            <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                className={`bg-white rounded-2xl border p-4 flex items-center gap-4 transition-all ${
                                    m.done ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-100 hover:shadow-md'
                                }`}>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${m.done ? 'bg-emerald-100' : 'bg-amber-50'}`}>
                                    {m.done ? '✅' : m.emoji}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`text-sm font-black ${m.done ? 'text-emerald-700 line-through' : 'text-slate-900'}`}>{m.title}</h4>
                                    <p className="text-[10px] text-slate-400 font-semibold">{m.desc}</p>
                                </div>
                                <div className="text-right">
                                    <div className={`text-sm font-black ${m.done ? 'text-emerald-600' : 'text-amber-600'}`}>+{m.points}</div>
                                    <p className="text-[9px] text-slate-400">điểm</p>
                                    {!m.done && (
                                        <button onClick={() => handleMission(m.id)}
                                            className="mt-1 px-3 py-1.5 bg-amber-500 text-white rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                                            Làm →
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* ── LEADERBOARD TAB ── */}
                {tab === 'leaderboard' && (
                    <div>
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-black text-slate-900 mb-1">🏆 BXH Nhà Smile Gần Trường</h3>
                            <p className="text-[10px] text-slate-400 font-semibold">Trường nào có cộng đồng Smile sôi nổi nhất?</p>
                        </div>

                        {/* Top 3 podium */}
                        <div className="flex items-end justify-center gap-3 mb-6">
                            {[SCHOOL_LB[1], SCHOOL_LB[0], SCHOOL_LB[2]].map((s, i) => {
                                const heights = ['h-24', 'h-32', 'h-20'];
                                const colors = ['bg-slate-200', 'bg-amber-400', 'bg-amber-200'];
                                const medals = ['🥈', '🥇', '🥉'];
                                return (
                                    <motion.div key={s.rank} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                        transition={{ delay: 0.3 + i * 0.15 }} className="text-center w-28">
                                        <div className="text-2xl mb-1">{medals[i]}</div>
                                        <div className="text-sm mb-1">{s.emoji}</div>
                                        <p className="text-[10px] font-black text-slate-900 mb-1 leading-tight">{s.school}</p>
                                        <p className="text-[9px] font-bold text-slate-400 mb-2">{s.members} thành viên</p>
                                        <div className={`${heights[i]} ${colors[i]} rounded-t-2xl flex items-center justify-center`}>
                                            <span className="text-xs font-black text-white drop-shadow">{s.points.toLocaleString()}đ</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Full list */}
                        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                            {SCHOOL_LB.map((s, i) => (
                                <div key={s.rank} className={`flex items-center gap-3 px-4 py-3 ${i !== SCHOOL_LB.length - 1 ? 'border-b border-slate-50' : ''}`}>
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black ${
                                        s.rank <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                                    }`}>{s.rank}</div>
                                    <span className="text-lg">{s.emoji}</span>
                                    <div className="flex-1">
                                        <p className="text-xs font-black text-slate-900">{s.school}</p>
                                        <p className="text-[10px] text-slate-400 font-semibold">{s.members} thành viên Smile</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-amber-600">{s.points.toLocaleString()}</p>
                                        <span className={`text-[10px] font-bold ${s.trend === '↑' ? 'text-emerald-500' : s.trend === '↓' ? 'text-red-400' : 'text-slate-400'}`}>{s.trend}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Share CTA */}
                        <div className="text-center mt-6">
                            <button
                                onClick={() => {
                                    const text = `🏆 BXH Nhà Smile Gần Trường:\n🥇 ${SCHOOL_LB[0].school} · ${SCHOOL_LB[0].points.toLocaleString()} điểm\n🥈 ${SCHOOL_LB[1].school}\n🥉 ${SCHOOL_LB[2].school}\n\nTrường bạn hạng mấy? smile.vn/smile-future/friends\n#SmileFuture #NhaSinhVien`;
                                    if (typeof navigator !== 'undefined' && navigator.share) {
                                        navigator.share({ title: 'Smile Future – BXH Trường', text });
                                    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
                                        navigator.clipboard.writeText(text);
                                    }
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl text-xs font-black shadow-md active:scale-95 transition-all inline-flex items-center gap-2">
                                <Share2 className="w-4 h-4" /> Share BXH — Trường bạn hạng mấy?
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
