import Navbar from '@/components/layout/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'user-smile | Nền tảng quản lý tài sản thuê hiện đại',
    description: 'Tìm phòng, thuê phòng và quản lý cuộc sống thuê trọ của bạn một cách dễ dàng.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
            <body className={inter.className}>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    );
}
