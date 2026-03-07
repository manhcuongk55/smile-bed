'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="h-16 sm:h-20 flex items-center px-4 sm:px-6 md:px-12 justify-between max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                        S
                    </div>
                    <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                        smile<span className="text-indigo-600">bed</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                    <Link href="/" className="hover:text-indigo-600 transition-colors">Tìm phòng</Link>
                    <Link href="/khu-vuc" className="hover:text-indigo-600 transition-colors flex items-center gap-1">📍 Khu vực</Link>
                    <Link href="/share-vui" className="hover:text-indigo-600 transition-colors flex items-center gap-1">🎬 Share Vui</Link>
                    <Link href="/smile-home" className="hover:text-indigo-600 transition-colors flex items-center gap-1">🏠 Smile Home</Link>
                    <Link href="/dashboard/my-room" className="hover:text-indigo-600 transition-colors">Phòng của tôi</Link>
                    <Link href="/dashboard/bills" className="hover:text-indigo-600 transition-colors">Hóa đơn</Link>
                    <Link href="/partners" className="hover:text-indigo-600 transition-colors">Đối tác</Link>
                    <Link href="/marketplace" className="hover:text-indigo-600 transition-colors">Dịch vụ</Link>
                </div>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-3">
                    <Link href="/login" className="px-4 py-2 rounded-xl font-semibold text-sm text-slate-700 hover:bg-slate-100 transition-all">
                        Đăng nhập
                    </Link>
                    <Link href="/register" className="btn-primary !px-4 !py-2 !rounded-xl !text-sm">
                        Bắt đầu ngay
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-all"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-2xl">
                    <div className="px-4 py-6 space-y-1">
                        <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                            🏠 Tìm phòng
                        </Link>
                        <Link href="/khu-vuc" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                            📍 Khám phá Khu vực
                        </Link>
                        <Link href="/share-vui" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                            🎬 Share Vui Challenge
                        </Link>
                        <Link href="/smile-home" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                            🏠 Smile Home
                        </Link>
                        <Link href="/dashboard/my-room" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                            🛏️ Phòng của tôi
                        </Link>
                        <Link href="/dashboard/bills" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                            💳 Hóa đơn
                        </Link>
                        <Link href="/partners" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                            🤝 Đối tác
                        </Link>
                        <Link href="/marketplace" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                            🛒 Dịch vụ
                        </Link>
                        <div className="border-t border-slate-100 my-3" />
                        <Link href="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-all">
                            Đăng nhập
                        </Link>
                        <Link href="/register" onClick={() => setIsOpen(false)} className="block text-center btn-primary !rounded-xl !py-3 mx-4">
                            Bắt đầu ngay
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
