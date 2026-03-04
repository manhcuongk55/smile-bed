'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Globe, Brain, TrendingUp, Shield, Users, Zap, Building2, BarChart3, Phone, MapPin, ExternalLink, Star, Handshake, Rocket, Award } from 'lucide-react';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function Partners() {
    return (
        <div className="min-h-screen pt-20 bg-slate-50">

            {/* ═══ Hero ═══ */}
            <section className="relative overflow-hidden py-20 md:py-28">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-5xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
                            <Handshake className="w-4 h-4" /> Đối tác & Hợp tác Kinh doanh
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-5 leading-tight">
                            Cùng nhau xây dựng <br />
                            <span className="bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">Hệ sinh thái BĐS thông minh</span>
                        </h1>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium mb-10">
                            SmileBed kết nối với các đối tác chiến lược để mang lại giá trị tối đa cho người thuê, chủ nhà và nhà đầu tư.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register" className="btn-primary !px-8 !py-4 !text-lg !rounded-2xl inline-flex items-center gap-2">
                                <Rocket className="w-5 h-5" /> Tham gia ngay
                            </Link>
                            <a href="#ailinkx" className="px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-700 font-bold text-lg hover:border-indigo-200 hover:shadow-lg transition-all inline-flex items-center gap-2">
                                Tìm hiểu đối tác <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ Why Partner With Us ═══ */}
            <section className="py-16 md:py-20">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div {...fadeUp} className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Tại sao hợp tác cùng SmileBed?</h2>
                        <p className="text-slate-400 font-medium max-w-xl mx-auto">Hệ sinh thái mở, minh bạch, và đầy tiềm năng tăng trưởng</p>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: <Users className="w-7 h-7" />, title: 'Mạng lưới người dùng', desc: 'Tiếp cận hàng ngàn người thuê, chủ nhà và nhà đầu tư trên nền tảng', color: 'bg-indigo-50 text-indigo-600' },
                            { icon: <Brain className="w-7 h-7" />, title: 'Tích hợp AI & Data', desc: 'Kết nối dữ liệu thông minh, insight thời gian thực cho quyết định chính xác', color: 'bg-emerald-50 text-emerald-600' },
                            { icon: <TrendingUp className="w-7 h-7" />, title: 'Doanh thu chia sẻ', desc: 'Mô hình hoa hồng CTV, referral code và revenue share hấp dẫn', color: 'bg-amber-50 text-amber-600' },
                        ].map((item, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${item.color}`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ AILINKX Featured Partner ═══ */}
            <section id="ailinkx" className="py-16 md:py-24">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div {...fadeUp} className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
                            <Star className="w-4 h-4" /> Đối tác Chiến lược
                        </div>
                    </motion.div>

                    {/* AILINKX Card */}
                    <motion.div {...fadeUp} className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                                            <Globe className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black">AILINKX</h3>
                                            <p className="text-indigo-300 text-sm font-bold">Nền tảng Dữ liệu & AI cho BĐS</p>
                                        </div>
                                    </div>
                                    <p className="text-white/60 font-medium max-w-lg leading-relaxed">
                                        Xây dựng tương lai với trí tuệ nhân tạo và kết nối giá trị bền vững. Hệ sinh thái dữ liệu thông minh cho thị trường BĐS & Tài chính.
                                    </p>
                                </div>

                                {/* Referral Badge */}
                                <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-sm">
                                    <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">Mã giới thiệu</p>
                                    <p className="text-3xl font-black text-white tracking-wider">AILINKX6</p>
                                    <p className="text-[10px] text-white/40 mt-1 font-medium">Nhận ưu đãi đặc biệt</p>
                                </div>
                            </div>

                            {/* Services Grid */}
                            <div className="grid md:grid-cols-3 gap-4 mb-10">
                                {[
                                    { icon: <Brain className="w-5 h-5" />, title: 'AI & Dữ liệu', items: ['Chuẩn hóa data quốc gia', 'Mô hình dự báo giá', 'Insight thời gian thực'] },
                                    { icon: <Building2 className="w-5 h-5" />, title: 'Bất động sản', items: ['Dữ liệu pháp lý chuẩn', 'Lịch sử giao dịch', 'So sánh khu vực'] },
                                    { icon: <BarChart3 className="w-5 h-5" />, title: 'Tài chính & Đầu tư', items: ['Phân tích IRR, NPV', 'Gói đầu tư VN100', 'Bảo toàn vốn'] },
                                ].map((service, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                        <div className="flex items-center gap-2 mb-4 text-indigo-300">
                                            {service.icon}
                                            <span className="font-black text-sm">{service.title}</span>
                                        </div>
                                        <ul className="space-y-2">
                                            {service.items.map((item, j) => (
                                                <li key={j} className="flex items-center gap-2 text-white/70 text-sm font-medium">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Values */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
                                <p className="text-indigo-300 font-black text-xs uppercase tracking-widest mb-4">Triết lý hoạt động</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { icon: <Shield className="w-5 h-5" />, text: 'Dữ liệu là tài sản chiến lược' },
                                        { icon: <Brain className="w-5 h-5" />, text: 'AI phục vụ con người' },
                                        { icon: <Zap className="w-5 h-5" />, text: 'Minh bạch & giải thích được' },
                                        { icon: <Award className="w-5 h-5" />, text: 'Giá trị bền vững' },
                                    ].map((v, i) => (
                                        <div key={i} className="flex items-center gap-2 text-white/60 text-xs font-bold">
                                            <span className="text-emerald-400">{v.icon}</span>
                                            {v.text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <a
                                    href="https://ailinkx.vn/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-base hover:scale-105 transition-all inline-flex items-center justify-center gap-2 shadow-xl"
                                >
                                    Truy cập AILINKX <ExternalLink className="w-4 h-4" />
                                </a>
                                <div className="flex items-center gap-4 text-white/40 text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" /> 088 6789 186
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> 535 Kim Mã, Hà Nội
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ Who Benefits ═══ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div {...fadeUp} className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Giá trị cho mọi đối tác</h2>
                        <p className="text-slate-400 font-medium">Từ doanh nghiệp đến cá nhân — ai cũng được hưởng lợi</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { emoji: '🏢', title: 'Doanh nghiệp', benefits: ['Dữ liệu chiến lược để ra quyết định nhanh', 'Tạo sự khác biệt trong tư vấn & sản phẩm', 'Tích hợp API & data feed'] },
                            { emoji: '💰', title: 'Nhà đầu tư', benefits: ['Phân tích rủi ro & cơ hội dựa trên dữ liệu chuẩn', 'Tối ưu hóa lợi suất đầu tư', 'Báo cáo thị trường định kỳ'] },
                            { emoji: '👤', title: 'Người dùng cá nhân', benefits: ['Truy cập thông tin minh bạch', 'Tự tin trong quyết định lớn', 'Hỗ trợ cá nhân hóa với mã AILINKX6'] },
                            { emoji: '🌍', title: 'Cộng đồng', benefits: ['Dữ liệu mở → thị trường minh bạch', 'Workshop & Meetup về AI trong BĐS', 'Kết nối doanh nghiệp – nhà đầu tư'] },
                        ].map((group, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} className="bg-slate-50 rounded-3xl p-7 hover:shadow-lg transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">{group.emoji}</span>
                                    <h3 className="text-xl font-black text-slate-900">{group.title}</h3>
                                </div>
                                <ul className="space-y-2.5">
                                    {group.benefits.map((b, j) => (
                                        <li key={j} className="flex items-start gap-2 text-slate-600 text-sm font-medium">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA Section ═══ */}
            <section className="py-20 md:py-28">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <motion.div {...fadeUp}>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Sẵn sàng tham gia hệ sinh thái?</h2>
                        <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto">
                            Đăng ký SmileBed miễn phí, sử dụng mã AILINKX6 để nhận ưu đãi đặc biệt và bắt đầu trải nghiệm ngay hôm nay.
                        </p>

                        <div className="bg-indigo-50 rounded-2xl p-6 inline-block mb-8">
                            <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">Mã giới thiệu đối tác</p>
                            <p className="text-4xl font-black text-indigo-600 tracking-[0.2em]">AILINKX6</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register" className="btn-primary !px-10 !py-4 !text-lg !rounded-2xl inline-flex items-center gap-2">
                                Đăng ký ngay <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a
                                href="https://ailinkx.vn/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-10 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-700 font-bold text-lg hover:border-indigo-200 hover:shadow-lg transition-all inline-flex items-center gap-2"
                            >
                                Tìm hiểu AILINKX <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
