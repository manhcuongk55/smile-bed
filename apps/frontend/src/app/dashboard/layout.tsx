import { Home, FileText, Wrench, CreditCard, User, ShoppingBag, ShieldCheck, Megaphone } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const navItems = [
        { icon: Home, label: 'Phòng của tôi', href: '/dashboard/my-room' },
        { icon: FileText, label: 'Hợp đồng', href: '/dashboard/contract' },
        { icon: ShieldCheck, label: 'Bàn giao & Cọc', href: '/dashboard/handover' },
        { icon: CreditCard, label: 'Hóa đơn', href: '/dashboard/bills' },
        { icon: Wrench, label: 'Báo sự cố', href: '/dashboard/maintenance' },
        { icon: ShoppingBag, label: 'Cửa hàng', href: '/dashboard/marketplace' },
        { icon: Megaphone, label: 'CTV Sale', href: '/dashboard/referral' },
        { icon: User, label: 'Hồ sơ', href: '/dashboard/profile' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pt-20">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-slate-100 p-6 space-y-2 hidden md:block">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all font-medium"
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </Link>
                ))}
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Mobile Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 flex items-center justify-around px-4 z-40">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="flex flex-col items-center text-slate-400 p-2">
                        <item.icon className="w-5 h-5" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
