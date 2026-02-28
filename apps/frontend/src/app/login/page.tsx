'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Login() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -z-10 w-full h-full opacity-10">
                <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-600 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-sky-400 rounded-full blur-3xl animate-float" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass w-full max-w-lg p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-xl shadow-indigo-200">
                        S
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 mb-2">Đăng nhập</h1>
                    <p className="text-slate-500 font-medium italic">Chào mừng bạn quay lại với smile-bed</p>
                </div>

                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard/my-room'; }}>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="ten@vídu.com"
                            className="w-full bg-slate-100/50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl p-4 outline-none font-medium transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter ml-1">Mật khẩu</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-slate-100/50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl p-4 outline-none font-medium transition-all"
                        />
                    </div>

                    <div className="flex justify-end pt-1">
                        <Link href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Quên mật khẩu?</Link>
                    </div>

                    <button type="submit" className="w-full btn-primary !py-4 !text-lg !font-black !rounded-2xl mt-4">
                        Đăng nhập ngay
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                    <p className="text-slate-500 font-medium">Chưa có tài khoản?</p>
                    <Link href="/register" className="text-indigo-600 font-black text-lg hover:underline block mt-2">
                        Đăng ký tham gia cộng đồng Smile
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
