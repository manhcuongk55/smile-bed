'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, AlertCircle, Eye, EyeOff, ArrowRight, Mail, Sparkles } from 'lucide-react';

function GoogleIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

function ZaloIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#0068FF" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z" />
            <path fill="#FFFFFF" d="M13.5,20.5h9c0.276,0,0.5,0.224,0.5,0.5v0c0,0.276-0.224,0.5-0.5,0.5H14l8.5,9.5h-9 c-0.276,0-0.5-0.224-0.5-0.5v0c0-0.276,0.224-0.5,0.5-0.5H22L13.5,20.5z M25.5,20.5h2v9h4v1.5h-6V20.5z M32.5,21 c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S34.828,22.5,34,22.5S32.5,21.828,32.5,21z" />
        </svg>
    );
}

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showEmailForm, setShowEmailForm] = useState(false);

    const handleSocialLogin = (provider: string) => {
        setLoading(true);
        setTimeout(() => {
            const mockUser = {
                id: `social-${Date.now()}`,
                email: `${provider}@smilebed.vn`,
                firstName: provider === 'google' ? 'Google User' : provider === 'facebook' ? 'Facebook User' : 'Zalo User',
                lastName: '',
                role: 'TENANT',
                provider,
            };
            localStorage.setItem('access_token', `mock-token-${Date.now()}`);
            localStorage.setItem('user', JSON.stringify(mockUser));
            router.push('/dashboard/my-room');
        }, 1200);
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Vui lòng nhập email và mật khẩu.');
            return;
        }

        setLoading(true);
        // Mock login — directly authenticate
        setTimeout(() => {
            const mockUser = {
                id: `user-${Date.now()}`,
                email,
                firstName: email.split('@')[0],
                lastName: '',
                role: 'TENANT',
            };
            localStorage.setItem('access_token', `token-${Date.now()}`);
            localStorage.setItem('user', JSON.stringify(mockUser));
            router.push('/dashboard/my-room');
        }, 800);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-slate-50 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 -z-10 w-full h-full opacity-[0.07]">
                <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-sky-400 rounded-full blur-[80px] animate-float" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass w-full max-w-lg p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative z-10"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5 }}
                        className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-5 shadow-xl shadow-indigo-200"
                    >
                        S
                    </motion.div>
                    <h1 className="text-3xl font-black text-slate-900 mb-1">Chào mừng trở lại</h1>
                    <p className="text-slate-400 font-medium">Đăng nhập vào Smile Home của bạn</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-4 mb-5 flex items-center gap-3 text-sm font-medium"
                    >
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </motion.div>
                )}

                <div className="space-y-3">
                    {/* Social Login */}
                    <button
                        onClick={() => handleSocialLogin('google')}
                        disabled={loading}
                        className="w-full flex items-center gap-4 px-5 py-4 bg-white border-2 border-slate-100 rounded-2xl hover:border-slate-200 hover:shadow-lg hover:scale-[1.01] transition-all font-bold text-slate-700 disabled:opacity-50 group"
                    >
                        <GoogleIcon />
                        <span className="flex-1 text-left">Tiếp tục với Google</span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                    </button>

                    <button
                        onClick={() => handleSocialLogin('facebook')}
                        disabled={loading}
                        className="w-full flex items-center gap-4 px-5 py-4 bg-[#1877F2] border-2 border-[#1877F2] rounded-2xl hover:bg-[#166FE5] hover:shadow-lg hover:scale-[1.01] transition-all font-bold text-white disabled:opacity-50 group"
                    >
                        <FacebookIcon />
                        <span className="flex-1 text-left">Tiếp tục với Facebook</span>
                        <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-all" />
                    </button>

                    <button
                        onClick={() => handleSocialLogin('zalo')}
                        disabled={loading}
                        className="w-full flex items-center gap-4 px-5 py-4 bg-[#0068FF] border-2 border-[#0068FF] rounded-2xl hover:bg-[#005CE5] hover:shadow-lg hover:scale-[1.01] transition-all font-bold text-white disabled:opacity-50 group"
                    >
                        <ZaloIcon />
                        <span className="flex-1 text-left">Tiếp tục với Zalo</span>
                        <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-all" />
                    </button>

                    {/* Loading */}
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-indigo-50 rounded-2xl p-4 flex items-center justify-center gap-3"
                        >
                            <svg className="animate-spin w-5 h-5 text-indigo-600" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            <span className="text-sm font-bold text-indigo-600">Đang đăng nhập...</span>
                        </motion.div>
                    )}

                    {/* Divider */}
                    <div className="flex items-center gap-4 py-2">
                        <div className="flex-1 h-px bg-slate-100"></div>
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">hoặc</span>
                        <div className="flex-1 h-px bg-slate-100"></div>
                    </div>

                    {/* Email Login */}
                    {!showEmailForm ? (
                        <button
                            onClick={() => setShowEmailForm(true)}
                            className="w-full flex items-center gap-4 px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-md hover:scale-[1.01] transition-all font-bold text-slate-600 group"
                        >
                            <Mail className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                            <span className="flex-1 text-left group-hover:text-indigo-600">Đăng nhập bằng Email</span>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                        </button>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-4 pt-2"
                            onSubmit={handleEmailLogin}
                        >
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                    placeholder="ten@vidu.com"
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl p-3.5 outline-none font-medium transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mật khẩu</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl p-3.5 pr-12 outline-none font-medium transition-all text-sm"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Link href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Quên mật khẩu?</Link>
                            </div>

                            <button
                                type="submit" disabled={loading}
                                className="w-full btn-primary !py-3.5 !text-base !font-black !rounded-2xl flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                <LogIn className="w-5 h-5" /> Đăng nhập
                            </button>
                        </motion.form>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-400 font-medium text-sm">Chưa có tài khoản?</p>
                    <Link href="/register" className="text-indigo-600 font-black text-base hover:underline block mt-1">
                        Đăng ký miễn phí →
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
