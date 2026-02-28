import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-20 glass flex items-center px-6 md:px-12 justify-between">
            <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    S
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                    user<span className="text-indigo-600">smile</span>
                </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                <Link href="/discover" className="hover:text-indigo-600 transition-colors">Tìm phòng</Link>
                <Link href="/my-room" className="hover:text-indigo-600 transition-colors">Phòng của tôi</Link>
                <Link href="/bills" className="hover:text-indigo-600 transition-colors">Hóa đơn</Link>
                <Link href="/support" className="hover:text-indigo-600 transition-colors">Hỗ trợ</Link>
            </div>

            <div className="flex items-center gap-4">
                <Link href="/login" className="px-5 py-2.5 rounded-xl font-semibold text-slate-900 hover:bg-slate-100 transition-all">
                    Đăng nhập
                </Link>
                <Link href="/register" className="btn-primary !px-5 !py-2.5 !rounded-xl !text-sm">
                    Bắt đầu ngay
                </Link>
            </div>
        </nav>
    );
}
