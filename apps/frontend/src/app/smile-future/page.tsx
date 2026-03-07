'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GraduationCap, Heart, MapPin, Star, Users, Share2, ArrowRight, ChevronRight,
    Sparkles, Target, BookOpen, Briefcase, X, CheckCircle2, Building2, Zap,
    Trophy, Gift, HandHeart, UserPlus
} from 'lucide-react';

/* ── UNIVERSITY DATA 2026 ── */
const UNIVERSITIES = [
    { id: 'dh-qg-hn', name: 'ĐH Quốc gia Hà Nội', city: 'HN', area: 'Cầu Giấy', fields: ['technology', 'science', 'economics', 'law'], ranking: 1, tuition: '15-30tr/năm', students: 42000, smileNearby: 12, image: '🏛️' },
    { id: 'dh-bk-hn', name: 'ĐH Bách khoa Hà Nội', city: 'HN', area: 'Hai Bà Trưng', fields: ['technology', 'engineering'], ranking: 2, tuition: '20-35tr/năm', students: 35000, smileNearby: 8, image: '⚙️' },
    { id: 'dh-ktqd', name: 'ĐH Kinh tế Quốc dân', city: 'HN', area: 'Hai Bà Trưng', fields: ['economics', 'business', 'finance'], ranking: 3, tuition: '18-28tr/năm', students: 28000, smileNearby: 6, image: '📊' },
    { id: 'dh-ngoai-thuong', name: 'ĐH Ngoại thương', city: 'HN', area: 'Cầu Giấy', fields: ['economics', 'business', 'language'], ranking: 4, tuition: '20-32tr/năm', students: 15000, smileNearby: 10, image: '🌏' },
    { id: 'dh-y-hn', name: 'ĐH Y Hà Nội', city: 'HN', area: 'Đống Đa', fields: ['medicine', 'health'], ranking: 5, tuition: '25-45tr/năm', students: 8000, smileNearby: 5, image: '🏥' },
    { id: 'dh-qg-hcm', name: 'ĐH Quốc gia TP.HCM', city: 'HCM', area: 'Thủ Đức', fields: ['technology', 'science', 'economics', 'law'], ranking: 1, tuition: '15-30tr/năm', students: 55000, smileNearby: 18, image: '🏛️' },
    { id: 'dh-bk-hcm', name: 'ĐH Bách khoa TP.HCM', city: 'HCM', area: 'Q.10', fields: ['technology', 'engineering'], ranking: 2, tuition: '20-35tr/năm', students: 30000, smileNearby: 9, image: '⚙️' },
    { id: 'dh-kt-hcm', name: 'ĐH Kinh tế TP.HCM', city: 'HCM', area: 'Q.3', fields: ['economics', 'business', 'finance'], ranking: 3, tuition: '22-38tr/năm', students: 25000, smileNearby: 7, image: '📊' },
    { id: 'dh-y-hcm', name: 'ĐH Y Dược TP.HCM', city: 'HCM', area: 'Q.5', fields: ['medicine', 'health'], ranking: 4, tuition: '28-50tr/năm', students: 10000, smileNearby: 4, image: '🏥' },
    { id: 'dh-su-pham-hcm', name: 'ĐH Sư phạm TP.HCM', city: 'HCM', area: 'Q.5', fields: ['education', 'science', 'language'], ranking: 5, tuition: '12-20tr/năm', students: 20000, smileNearby: 5, image: '📚' },
    { id: 'dh-ton-duc-thang', name: 'ĐH Tôn Đức Thắng', city: 'HCM', area: 'Q.7', fields: ['technology', 'business', 'engineering'], ranking: 6, tuition: '22-40tr/năm', students: 22000, smileNearby: 6, image: '🎓' },
    { id: 'dh-fpt', name: 'ĐH FPT', city: 'both', area: 'Nhiều cơ sở', fields: ['technology', 'business', 'design'], ranking: 7, tuition: '30-50tr/năm', students: 30000, smileNearby: 15, image: '💻' },
];

const CAREERS = [
    { field: 'technology', label: '💻 Công nghệ thông tin', jobs: 'Lập trình viên, AI/ML, Data Science' },
    { field: 'engineering', label: '⚙️ Kỹ thuật / Cơ khí', jobs: 'Kỹ sư xây dựng, điện, cơ khí' },
    { field: 'economics', label: '📊 Kinh tế / Tài chính', jobs: 'Kế toán, ngân hàng, chứng khoán' },
    { field: 'business', label: '💼 Kinh doanh / Marketing', jobs: 'Quản lý, marketing, khởi nghiệp' },
    { field: 'medicine', label: '🏥 Y học / Dược', jobs: 'Bác sĩ, dược sĩ, y tá' },
    { field: 'education', label: '📚 Sư phạm / Giáo dục', jobs: 'Giáo viên, giảng viên' },
    { field: 'law', label: '⚖️ Luật', jobs: 'Luật sư, công chứng, tư vấn pháp lý' },
    { field: 'language', label: '🌏 Ngôn ngữ / Quốc tế', jobs: 'Biên phiên dịch, ngoại giao' },
    { field: 'design', label: '🎨 Thiết kế / Sáng tạo', jobs: 'UI/UX, đồ họa, kiến trúc' },
    { field: 'health', label: '💊 Sức khoẻ / Điều dưỡng', jobs: 'Điều dưỡng, vật lý trị liệu' },
    { field: 'science', label: '🔬 Khoa học tự nhiên', jobs: 'Nghiên cứu, phòng thí nghiệm' },
    { field: 'finance', label: '🏦 Ngân hàng / Bảo hiểm', jobs: 'Tín dụng, đầu tư, bảo hiểm' },
];

/* ── QUIZ QUESTIONS ── */
const QUIZ = [
    { id: 'q1', emoji: '🎓', question: 'Bạn đang ở đâu?', options: [
        { label: 'Hà Nội hoặc gần HN', value: 'HN', emoji: '🏛️' },
        { label: 'TP.HCM hoặc gần HCM', value: 'HCM', emoji: '🌆' },
        { label: 'Tỉnh khác (chưa quyết)', value: 'both', emoji: '🗺️' },
    ]},
    { id: 'q2', emoji: '❤️', question: 'Bạn thích lĩnh vực nào nhất?', options: [
        { label: 'Công nghệ / IT', value: 'technology', emoji: '💻' },
        { label: 'Kinh tế / Kinh doanh', value: 'economics', emoji: '📊' },
        { label: 'Kỹ thuật / Cơ khí', value: 'engineering', emoji: '⚙️' },
        { label: 'Y khoa / Sức khoẻ', value: 'medicine', emoji: '🏥' },
        { label: 'Sư phạm / Ngôn ngữ', value: 'education', emoji: '📚' },
        { label: 'Thiết kế / Sáng tạo', value: 'design', emoji: '🎨' },
    ]},
    { id: 'q3', emoji: '💰', question: 'Ngân sách thuê trọ / tháng?', options: [
        { label: 'Dưới 2 triệu (cần hỗ trợ)', value: 'need-help', emoji: '🆘' },
        { label: '2 – 4 triệu', value: 'budget', emoji: '💸' },
        { label: 'Trên 4 triệu', value: 'comfortable', emoji: '💎' },
    ]},
    { id: 'q4', emoji: '🏠', question: 'Ưu tiên khi chọn trọ?', options: [
        { label: 'Gần trường nhất', value: 'near-school', emoji: '🎯' },
        { label: 'Giá rẻ & tiết kiệm', value: 'cheap', emoji: '💰' },
        { label: 'An ninh & tiện ích', value: 'safe', emoji: '🛡️' },
        { label: 'Có bạn bè / cộng đồng', value: 'community', emoji: '👫' },
    ]},
    { id: 'q5', emoji: '💪', question: 'Hoàn cảnh của bạn?', options: [
        { label: 'Bình thường', value: 'normal', emoji: '😊' },
        { label: 'Khó khăn, cần hỗ trợ', value: 'difficult', emoji: '🤝' },
        { label: 'Phụ huynh tìm cho con', value: 'parent', emoji: '👨‍👩‍👧' },
    ]},
];

export default function SmileFuturePage() {
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizStep, setQuizStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [results, setResults] = useState<typeof UNIVERSITIES | null>(null);
    const [needsHelp, setNeedsHelp] = useState(false);

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);
        if (quizStep < QUIZ.length - 1) {
            setQuizStep(quizStep + 1);
        } else {
            calculateResults(newAnswers);
        }
    };

    const calculateResults = (ans: string[]) => {
        const [city, field, budget, priority, circumstance] = ans;
        setNeedsHelp(circumstance === 'difficult' || budget === 'need-help');
        let matches = UNIVERSITIES.filter(u => {
            if (city !== 'both' && u.city !== city && u.city !== 'both') return false;
            return u.fields.includes(field);
        });
        if (matches.length === 0) matches = UNIVERSITIES.filter(u => city === 'both' || u.city === city || u.city === 'both');
        matches.sort((a, b) => a.ranking - b.ranking);
        setResults(matches.slice(0, 5));
    };

    const resetQuiz = () => { setQuizStep(0); setAnswers([]); setResults(null); setNeedsHelp(false); };

    const shareResult = () => {
        const top = results?.[0];
        if (!top) return;
        const text = `🎓 Smile Future gợi ý trường phù hợp với tôi!\n🏛️ Top 1: ${top.name}\n📍 Khu vực: ${top.area}\n🏠 ${top.smileNearby} nhà Smile gần trường\n\nBạn hợp trường nào? Thử ngay 👉 smile.vn/smile-future\n#SmileFuture #ChonTruongHopBan`;
        if (typeof navigator !== 'undefined' && navigator.share) {
            navigator.share({ title: 'Smile Future – Trường phù hợp', text, url: 'https://smile.vn/smile-future' });
        } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(text);
        }
    };

    const career = CAREERS.find(c => c.field === answers[1]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-amber-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

                {/* ── HERO ── */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-black uppercase tracking-wider mb-4">
                        <Sparkles className="w-3 h-3" /> Chiến dịch mùa nhập học 2026
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                        Smile <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">Future</span>
                    </h1>
                    <p className="text-xl font-bold text-slate-600 mb-2">Nhà Trọ Tương Lai</p>
                    <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8">
                        Chọn trường phù hợp · Tìm trọ gần bạn bè · Hỗ trợ sinh viên khó khăn<br/>
                        <span className="text-pink-600 font-bold">100 phòng miễn phí cho sinh viên cần hỗ trợ 🎁</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowQuiz(true)}
                            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-200 hover:shadow-2xl transition-all flex items-center gap-2 justify-center"
                        >
                            <GraduationCap className="w-5 h-5" /> Trường nào hợp bạn? — Quiz 5 phút
                        </motion.button>
                        <Link href="/smile-future/help">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-pink-200 hover:shadow-2xl transition-all flex items-center gap-2 justify-center"
                            >
                                <Heart className="w-5 h-5" /> Đăng ký hỗ trợ phòng miễn phí
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                {/* ── CAMPAIGN STATS ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                    {[
                        { emoji: '🎁', num: '100', label: 'Phòng miễn phí', sub: '3-6 tháng' },
                        { emoji: '🎓', num: '12+', label: 'Trường ĐH', sub: 'HN & HCM' },
                        { emoji: '👫', num: '10k+', label: 'Bạn bè kết nối', sub: 'Qua Smile' },
                        { emoji: '💰', num: '0đ', label: 'CAC', sub: 'Viral tự nhiên' },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-3xl border border-slate-100 p-5 text-center shadow-sm"
                        >
                            <div className="text-3xl mb-2">{s.emoji}</div>
                            <div className="text-2xl font-black text-slate-900">{s.num}</div>
                            <div className="text-xs font-bold text-slate-500">{s.label}</div>
                            <div className="text-[10px] text-slate-400 font-semibold">{s.sub}</div>
                        </motion.div>
                    ))}
                </div>

                {/* ── 3 PHASES ── */}
                <div className="mb-12">
                    <h2 className="text-2xl font-black text-slate-900 text-center mb-8">3 Giai Đoạn Chiến Dịch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                phase: '1', title: 'Tìm Đúng Nơi', subtitle: 'School Match Quiz',
                                desc: 'Quiz 5 phút → gợi ý trường phù hợp + khu Smile gần trường. Phụ huynh + sinh viên share result Facebook/Zalo.',
                                color: 'from-indigo-500 to-blue-500', lightColor: 'bg-indigo-50',
                                features: ['Quiz cá nhân hoá', 'Map tiện ích quanh trường', 'Share kết quả viral'],
                                cta: 'Làm quiz ngay', action: () => setShowQuiz(true),
                                icon: <Target className="w-6 h-6" />,
                            },
                            {
                                phase: '2', title: 'Hỗ Trợ', subtitle: 'Help Profile',
                                desc: 'Sinh viên khó khăn tạo profile → cộng đồng vote → Top 100 được tặng phòng 3-6 tháng.',
                                color: 'from-pink-500 to-rose-500', lightColor: 'bg-pink-50',
                                features: ['Upload hoàn cảnh', 'Cộng đồng vote', '100 phòng miễn phí'],
                                cta: 'Đăng ký hỗ trợ', href: '/smile-future/help',
                                icon: <HandHeart className="w-6 h-6" />,
                            },
                            {
                                phase: '3', title: 'Sống Vui', subtitle: 'Friend Map',
                                desc: 'Tìm bạn bè Smile gần trường. Relay nhiệm vụ cộng đồng → thưởng nhóm. BXH toàn khu.',
                                color: 'from-amber-500 to-orange-500', lightColor: 'bg-amber-50',
                                features: ['Friend Map', 'Community Relay', 'BXH trường'],
                                cta: 'Khám phá', href: '/smile-future/friends',
                                icon: <Users className="w-6 h-6" />,
                            },
                        ].map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.15 }}
                                className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all group"
                            >
                                <div className={`bg-gradient-to-r ${p.color} px-6 py-5 text-white`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">{p.icon}</div>
                                        <div>
                                            <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Giai đoạn {p.phase}</p>
                                            <h3 className="text-lg font-black">{p.title}</h3>
                                        </div>
                                    </div>
                                    <p className="text-white/80 text-[11px] font-semibold">{p.subtitle}</p>
                                </div>
                                <div className="p-5">
                                    <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-4">{p.desc}</p>
                                    <div className="space-y-2 mb-4">
                                        {p.features.map((f, j) => (
                                            <div key={j} className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                    {p.action ? (
                                        <button onClick={p.action} className={`w-full py-3 rounded-2xl text-xs font-black text-white bg-gradient-to-r ${p.color} active:scale-95 transition-all shadow-sm`}>
                                            {p.cta} →
                                        </button>
                                    ) : (
                                        <Link href={p.href || '#'}>
                                            <button className={`w-full py-3 rounded-2xl text-xs font-black text-white bg-gradient-to-r ${p.color} active:scale-95 transition-all shadow-sm`}>
                                                {p.cta} →
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── IMPACT STORIES ── */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 mb-12">
                    <h2 className="text-xl font-black text-slate-900 text-center mb-6">💛 Câu Chuyện Truyền Cảm Hứng</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { avatar: '👨‍🏫', name: 'Thầy Nguyễn Văn A', story: 'Cho sinh viên mượn 15 triệu đóng học phí. "Khi mình giúp được ai, đó là hạnh phúc."', tag: 'Lòng tốt lan toả', likes: 15200 },
                            { avatar: '👩‍🎓', name: 'Linh – SV năm 2', story: 'Nhờ Smile Future được tặng phòng 3 tháng. Giờ mình có nơi yên tâm học, đỡ gánh nặng gia đình.', tag: 'Được hỗ trợ', likes: 8700 },
                            { avatar: '👨‍👩‍👧', name: 'Phụ huynh Minh', story: 'Tìm trọ cho con qua Smile – thấy quiz, biết khu nào an ninh, gần trường. Rất yên tâm!', tag: 'Phụ huynh tin tưởng', likes: 5400 },
                        ].map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }} className="bg-slate-50 rounded-2xl p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">{s.avatar}</div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">{s.name}</p>
                                        <span className="px-2 py-0.5 bg-pink-100 text-pink-700 rounded-full text-[9px] font-bold">{s.tag}</span>
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-600 font-medium leading-relaxed mb-3">"{s.story}"</p>
                                <div className="flex items-center gap-1 text-[10px] text-pink-500 font-bold">
                                    <Heart className="w-3 h-3 fill-pink-500" /> {s.likes.toLocaleString()} lượt yêu thích
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── PARTNER SCHOOLS ── */}
                <div className="text-center mb-12">
                    <h2 className="text-xl font-black text-slate-900 mb-4">🏛️ Trường Đại Học Đối Tác</h2>
                    <p className="text-xs text-slate-400 font-semibold mb-6">Dữ liệu trường phổ biến 2026 – Hà Nội & TP.HCM</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {UNIVERSITIES.slice(0, 8).map(u => (
                            <div key={u.id} className="px-4 py-2 bg-white rounded-2xl border border-slate-100 text-xs font-bold text-slate-600 shadow-sm">
                                {u.image} {u.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── QUIZ MODAL ── */}
            <AnimatePresence>
                {showQuiz && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={(e) => { if (e.target === e.currentTarget) { resetQuiz(); setShowQuiz(false); } }}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">

                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 text-white relative sticky top-0 z-10">
                                <button onClick={() => { resetQuiz(); setShowQuiz(false); }} className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <X className="w-4 h-4" />
                                </button>
                                <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-wider mb-1">
                                    {results ? '✨ KẾT QUẢ' : `Câu ${quizStep + 1}/${QUIZ.length}`}
                                </p>
                                <h2 className="text-lg font-black">{results ? 'Trường phù hợp với bạn!' : '🎓 School Match Quiz'}</h2>
                                {!results && (
                                    <div className="flex gap-1 mt-3">
                                        {QUIZ.map((_, idx) => (
                                            <div key={idx} className={`flex-1 h-1.5 rounded-full ${idx <= quizStep ? 'bg-white' : 'bg-white/30'}`} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                {!results ? (
                                    <div>
                                        <div className="text-center mb-6">
                                            <span className="text-4xl block mb-3">{QUIZ[quizStep].emoji}</span>
                                            <h3 className="text-lg font-black text-slate-900">{QUIZ[quizStep].question}</h3>
                                        </div>
                                        <div className="space-y-2.5">
                                            {QUIZ[quizStep].options.map(opt => (
                                                <motion.div key={opt.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleAnswer(opt.value)}
                                                    className="flex items-center gap-3 p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-all">
                                                    <span className="text-2xl">{opt.emoji}</span>
                                                    <span className="text-sm font-bold text-slate-700">{opt.label}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        {needsHelp && (
                                            <div className="mb-4 p-4 bg-pink-50 border border-pink-200 rounded-2xl">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Heart className="w-4 h-4 text-pink-600 fill-pink-600" />
                                                    <span className="text-sm font-black text-pink-700">Smile muốn hỗ trợ bạn! 💛</span>
                                                </div>
                                                <p className="text-xs text-pink-600 font-semibold mb-3">
                                                    Bạn có thể đăng ký nhận phòng miễn phí 3-6 tháng qua chương trình Smile Future.
                                                </p>
                                                <Link href="/smile-future/help">
                                                    <button className="w-full py-2.5 rounded-xl text-xs font-black bg-pink-600 text-white active:scale-95 transition-all">
                                                        🎁 Đăng ký hỗ trợ phòng miễn phí →
                                                    </button>
                                                </Link>
                                            </div>
                                        )}

                                        {career && (
                                            <div className="mb-4 p-3 bg-indigo-50 rounded-2xl">
                                                <p className="text-xs font-black text-indigo-700 mb-1">{career.label}</p>
                                                <p className="text-[10px] text-indigo-500 font-semibold">Nghề nghiệp phổ biến: {career.jobs}</p>
                                            </div>
                                        )}

                                        <h4 className="text-sm font-black text-slate-900 mb-3">🏛️ Top trường phù hợp:</h4>
                                        <div className="space-y-3 mb-4">
                                            {results.map((u, i) => (
                                                <div key={u.id} className={`flex items-center gap-3 p-3 rounded-2xl ${i === 0 ? 'bg-amber-50 border-2 border-amber-200' : 'bg-slate-50'}`}>
                                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black ${
                                                        i === 0 ? 'bg-amber-400 text-white' : 'bg-white text-slate-500 border border-slate-200'
                                                    }`}>
                                                        {i + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-black text-slate-900">{u.image} {u.name}</span>
                                                            {i === 0 && <span className="px-1.5 py-0.5 bg-amber-400 text-amber-900 rounded text-[8px] font-black">BEST</span>}
                                                        </div>
                                                        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold mt-1">
                                                            <span>📍 {u.area}</span>
                                                            <span>🏠 {u.smileNearby} nhà Smile</span>
                                                            <span>💰 {u.tuition}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex gap-2">
                                            <Link href={`/khu-vuc`} className="flex-1">
                                                <button className="w-full py-3 rounded-2xl text-xs font-black bg-indigo-600 text-white active:scale-95 transition-all">
                                                    📍 Xem khu vực gần trường
                                                </button>
                                            </Link>
                                            <button onClick={shareResult} className="px-4 py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-white active:scale-95 transition-all flex items-center gap-1">
                                                <Share2 className="w-3 h-3" /> Share
                                            </button>
                                        </div>
                                        <button onClick={() => { resetQuiz(); }} className="w-full mt-3 py-2 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                                            Làm lại quiz
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
