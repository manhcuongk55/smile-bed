'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, UserPlus, CheckCircle2, AlertCircle, ArrowRight, Mail, Sparkles } from 'lucide-react';

const ROLES = [
    { value: 'TENANT', label: 'Người thuê', desc: 'Tìm phòng & quản lý chỗ ở', emoji: '🏠' },
    { value: 'PROPERTY_OWNER', label: 'Chủ nhà', desc: 'Quản lý tài sản cho thuê', emoji: '🏢' },
    { value: 'MANAGER', label: 'Quản lý', desc: 'Vận hành tòa nhà', emoji: '⚙️' },
];

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

export default function Register() {
    const router = useRouter();
    const [step, setStep] = useState<'method' | 'form'>('method');
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'TENANT',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSocialLogin = (provider: string) => {
        setLoading(true);
        setTimeout(() => {
            const mockUser = {
                id: `social-${Date.now()}`,
                email: `user-${provider}@smilebed.vn`,
                firstName: provider === 'google' ? 'Google User' : provider === 'facebook' ? 'Facebook User' : 'Zalo User',
                lastName: '',
                role: form.role,
                provider,
            };
            localStorage.setItem('access_token', `mock-token-${Date.now()}`);
            localStorage.setItem('user', JSON.stringify(mockUser));
            setSuccess(true);
            setTimeout(() => router.push('/dashboard/my-room'), 1500);
        }, 1200);
    };

    const handleEmailRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.firstName || !form.email || !form.password) {
            setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
            return;
        }
        if (form.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError('Xác nhận mật khẩu không khớp.');
            return;
        }

        setLoading(true);
        // Mock registration — store user directly
        setTimeout(() => {
            const newUser = {
                id: `user-${Date.now()}`,
                email: form.email,
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
                role: form.role,
            };
            localStorage.setItem('access_token', `token-${Date.now()}`);
            localStorage.setItem('user', JSON.stringify(newUser));
            setSuccess(true);
            setLoading(false);
            setTimeout(() => router.push('/dashboard/my-room'), 1500);
        }, 1000);
    };

    // ── Success Screen ──────────────
    if (success) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass w-full max-w-md p-12 rounded-[2.5rem] shadow-2xl text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </motion.div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Chào mừng! 🎉</h2>
                    <p className="text-slate-500 font-medium mb-6">Tài khoản đã sẵn sàng. Đang đưa bạn vào Smile Home...</p>
                    <div className="flex items-center justify-center gap-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2.5 h-2.5 bg-indigo-600 rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center bg-slate-50 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 -z-10 w-full h-full opacity-[0.07]">
                <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-emerald-400 rounded-full blur-[80px] animate-float" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sky-400 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                    <h1 className="text-3xl font-black text-slate-900 mb-1">Tham gia Smile</h1>
                    <p className="text-slate-400 font-medium">Chọn cách đăng ký nhanh nhất cho bạn</p>
                </div>

                {/* Role Selection — always visible */}
                <div className="mb-6">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Bạn là</p>
                    <div className="grid grid-cols-3 gap-2">
                        {ROLES.map((role) => (
                            <button
                                type="button"
                                key={role.value}
                                onClick={() => setForm({ ...form, role: role.value })}
                                className={`p-3 rounded-2xl border-2 text-center transition-all ${form.role === role.value
                                    ? 'border-indigo-600 bg-indigo-50 scale-[1.02] shadow-md shadow-indigo-100'
                                    : 'border-transparent bg-slate-50 text-slate-500 hover:bg-slate-100 hover:scale-[1.01]'
                                    }`}
                            >
                                <span className="text-xl">{role.emoji}</span>
                                <p className={`font-bold text-xs mt-1 ${form.role === role.value ? 'text-indigo-600' : ''}`}>{role.label}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 'method' ? (
                        <motion.div
                            key="method"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-3"
                        >
                            {/* Social Login Buttons */}
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

                            {/* Divider */}
                            <div className="flex items-center gap-4 py-3">
                                <div className="flex-1 h-px bg-slate-100"></div>
                                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">hoặc</span>
                                <div className="flex-1 h-px bg-slate-100"></div>
                            </div>

                            {/* Email option */}
                            <button
                                onClick={() => setStep('form')}
                                className="w-full flex items-center gap-4 px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-md hover:scale-[1.01] transition-all font-bold text-slate-600 group"
                            >
                                <Mail className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                                <span className="flex-1 text-left group-hover:text-indigo-600">Đăng ký bằng Email</span>
                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                            </button>

                            {/* Loading state banner */}
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-indigo-50 rounded-2xl p-4 flex items-center justify-center gap-3"
                                >
                                    <svg className="animate-spin w-5 h-5 text-indigo-600" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                    <span className="text-sm font-bold text-indigo-600">Đang xác thực...</span>
                                </motion.div>
                            )}

                            {/* Benefits */}
                            <div className="pt-4 grid grid-cols-3 gap-3">
                                {[
                                    { icon: '⚡', text: '1 click đăng ký' },
                                    { icon: '🔒', text: 'Bảo mật tuyệt đối' },
                                    { icon: '🎁', text: 'Miễn phí hoàn toàn' },
                                ].map((b) => (
                                    <div key={b.text} className="text-center">
                                        <span className="text-lg">{b.icon}</span>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1">{b.text}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {/* Back button */}
                            <button
                                onClick={() => { setStep('method'); setError(''); }}
                                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 mb-5 transition-colors"
                            >
                                ← Quay lại chọn phương thức
                            </button>

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

                            <form className="space-y-4" onSubmit={handleEmailRegister}>
                                {/* Name */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Họ</label>
                                        <input
                                            type="text" name="lastName" value={form.lastName} onChange={handleChange}
                                            placeholder="Nguyễn"
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl p-3.5 outline-none font-medium transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên *</label>
                                        <input
                                            type="text" name="firstName" value={form.firstName} onChange={handleChange}
                                            placeholder="Văn A"
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl p-3.5 outline-none font-medium transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email *</label>
                                    <input
                                        type="email" name="email" value={form.email} onChange={handleChange}
                                        placeholder="ten@vidu.com"
                                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl p-3.5 outline-none font-medium transition-all text-sm"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Số điện thoại</label>
                                    <input
                                        type="tel" name="phone" value={form.phone} onChange={handleChange}
                                        placeholder="0909 xxx xxx"
                                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl p-3.5 outline-none font-medium transition-all text-sm"
                                    />
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mật khẩu *</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                                            placeholder="Ít nhất 6 ký tự"
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl p-3.5 pr-12 outline-none font-medium transition-all text-sm"
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Xác nhận mật khẩu *</label>
                                    <input
                                        type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                                        placeholder="Nhập lại mật khẩu"
                                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl p-3.5 outline-none font-medium transition-all text-sm"
                                    />
                                </div>

                                <button
                                    type="submit" disabled={loading}
                                    className="w-full btn-primary !py-4 !text-base !font-black !rounded-2xl mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                            Đang tạo tài khoản...
                                        </span>
                                    ) : (
                                        <><UserPlus className="w-5 h-5" /> Tạo tài khoản</>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-400 font-medium text-sm">Đã có tài khoản?</p>
                    <Link href="/login" className="text-indigo-600 font-black text-base hover:underline block mt-1">
                        Đăng nhập ngay
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
