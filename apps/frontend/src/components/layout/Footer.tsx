import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">
            {/* Partner Banner */}
            <div className="border-b border-white/10">
                <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                            <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                        </div>
                        <div>
                            <p className="font-black text-lg">Đối tác chiến lược: <span className="text-indigo-400">AILINKX</span></p>
                            <p className="text-white/50 text-sm font-medium">Nền tảng Dữ liệu & AI cho BĐS · Mã giới thiệu: <span className="text-amber-400 font-black">AILINKX6</span></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/partners" className="px-5 py-2.5 bg-white/10 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/20 transition-all">
                            Tìm hiểu thêm
                        </Link>
                        <a href="https://ailinkx.vn/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-500 transition-all">
                            Truy cập AILINKX →
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
                            <span className="text-lg font-bold">smile<span className="text-indigo-400">bed</span></span>
                        </div>
                        <p className="text-white/40 text-sm font-medium leading-relaxed">
                            Nền tảng quản lý phòng trọ thông minh, minh bạch, dễ dùng.
                        </p>
                    </div>

                    {/* Sản phẩm */}
                    <div>
                        <p className="text-[11px] font-black text-white/30 uppercase tracking-widest mb-4">Sản phẩm</p>
                        <ul className="space-y-2.5">
                            <li><Link href="/" className="text-white/60 text-sm font-medium hover:text-white transition-colors">Tìm phòng</Link></li>
                            <li><Link href="/dashboard/my-room" className="text-white/60 text-sm font-medium hover:text-white transition-colors">Quản lý phòng</Link></li>
                            <li><Link href="/dashboard/bills" className="text-white/60 text-sm font-medium hover:text-white transition-colors">Hóa đơn</Link></li>
                            <li><Link href="/marketplace" className="text-white/60 text-sm font-medium hover:text-white transition-colors">Dịch vụ</Link></li>
                        </ul>
                    </div>

                    {/* Hợp tác */}
                    <div>
                        <p className="text-[11px] font-black text-white/30 uppercase tracking-widest mb-4">Hợp tác</p>
                        <ul className="space-y-2.5">
                            <li><Link href="/partners" className="text-white/60 text-sm font-medium hover:text-white transition-colors">Đối tác & Kinh doanh</Link></li>
                            <li><Link href="/referral" className="text-white/60 text-sm font-medium hover:text-white transition-colors">CTV Sale</Link></li>
                            <li><a href="https://ailinkx.vn/" target="_blank" rel="noopener noreferrer" className="text-white/60 text-sm font-medium hover:text-white transition-colors">AILINKX ↗</a></li>
                            <li><a href="https://github.com/manhcuongk55/smile-bed" target="_blank" rel="noopener noreferrer" className="text-white/60 text-sm font-medium hover:text-white transition-colors">GitHub ↗</a></li>
                        </ul>
                    </div>

                    {/* Liên hệ */}
                    <div>
                        <p className="text-[11px] font-black text-white/30 uppercase tracking-widest mb-4">Liên hệ</p>
                        <ul className="space-y-2.5">
                            <li className="text-white/60 text-sm font-medium">📞 088 6789 186</li>
                            <li className="text-white/60 text-sm font-medium">📍 535 Kim Mã, Ba Đình, HN</li>
                            <li><Link href="/register" className="text-indigo-400 text-sm font-bold hover:text-indigo-300 transition-colors">Đăng ký miễn phí →</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/30 text-xs font-medium">© 2026 SmileBed. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span className="text-white/20 text-xs font-medium">Powered by</span>
                        <span className="text-indigo-400/60 text-xs font-bold">AILINKX · AI & Data Platform</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
