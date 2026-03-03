'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Sparkles, ArrowRight, Home, Star, Users } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ReferralLandingPage() {
    const params = useParams();
    const router = useRouter();
    const code = params.code as string;
    const [tracked, setTracked] = useState(false);

    useEffect(() => {
        if (!code) return;

        // Save referral code to localStorage
        localStorage.setItem('smile_referral_code', code);

        // Track the click
        fetch(`${API_URL}/referral/track/${code}`, { method: 'POST' })
            .then(res => res.json())
            .then(() => setTracked(true))
            .catch(() => setTracked(true)); // Don't block UX on tracking failure
    }, [code]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-10 left-10 w-56 h-56 bg-white/10 rounded-full blur-2xl animate-float"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-32 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white/90 px-4 py-2 rounded-full text-sm font-bold mb-8 border border-white/20">
                        <Sparkles className="w-4 h-4" />
                        Bạn được giới thiệu bởi mã {code}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        Tìm phòng trọ<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200">
                            minh bạch & an toàn
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Smile Bed – Nền tảng cho thuê phòng trọ đầu tiên tại Việt Nam với hệ thống
                        <strong className="text-white"> xác thực chất lượng</strong>,
                        <strong className="text-white"> giá minh bạch</strong>, và
                        <strong className="text-white"> PCCC đạt chuẩn</strong>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/" className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-black px-8 py-4 rounded-2xl hover:bg-white/90 transition-all active:scale-95 shadow-xl shadow-indigo-900/20 text-lg">
                            Xem phòng ngay
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-md text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/25 transition-all active:scale-95 border border-white/20 text-lg">
                            Đăng ký tài khoản
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TrustBadge
                        icon={<ShieldCheck className="w-7 h-7 text-indigo-600" />}
                        title="100% Xác Thực"
                        desc="Mỗi phòng được kiểm tra và xác thực bởi đội ngũ Smile Bed"
                    />
                    <TrustBadge
                        icon={<Star className="w-7 h-7 text-amber-500" />}
                        title="Giá Minh Bạch"
                        desc="Hiển thị tổng chi phí thực tế, bao gồm điện nước ước tính"
                    />
                    <TrustBadge
                        icon={<Users className="w-7 h-7 text-emerald-500" />}
                        title="Cộng Đồng Tin Cậy"
                        desc="Hơn 1,000+ khách thuê hài lòng trên toàn TP.HCM"
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-3xl mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                    Bắt đầu tìm phòng mơ ước
                </h2>
                <p className="text-slate-500 text-lg mb-8 max-w-xl mx-auto">
                    Hàng trăm phòng trọ chất lượng cao đang chờ bạn.
                    Đăng ký miễn phí và bắt đầu ngay hôm nay.
                </p>
                <Link href="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white font-black px-10 py-5 rounded-2xl hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-200 text-lg">
                    <Home className="w-5 h-5" />
                    Khám phá phòng trọ
                </Link>
            </section>
        </div>
    );
}

function TrustBadge({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <div className="bg-white rounded-[1.5rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="mb-3">{icon}</div>
            <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
            <p className="text-sm text-slate-500">{desc}</p>
        </div>
    );
}
