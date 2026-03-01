import Hero from '@/components/discovery/Hero';
import RoomCard from '@/components/discovery/RoomCard';
import { ShieldCheck, Info } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const MOCK_ROOMS = [
    {
        id: '1',
        title: 'Phòng Studio Landmark 81 View',
        price: 8500000,
        estimatedUtilities: 600000,
        location: 'Bình Thạnh, TP.HCM',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: true,
        fireSafetyScore: 9.5,
    },
    {
        id: '2',
        title: 'Căn hộ Mini Hiện Đại - Gần ĐHQG',
        price: 4200000,
        estimatedUtilities: 400000,
        location: 'Thủ Đức, TP.HCM',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: true,
        fireSafetyScore: 8.8,
    },
    {
        id: '3',
        title: 'Phòng Trọ Cao Cấp - Sân Bay',
        price: 5500000,
        estimatedUtilities: 500000,
        location: 'Tân Bình, TP.HCM',
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: false,
        fireSafetyScore: 7.5,
    },
];

export default async function Home() {
    let displayRooms = MOCK_ROOMS;
    try {
        const res = await fetch(`${API_URL}/discovery/rooms`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) {
                displayRooms = data.map((r: any) => ({
                    id: r.id,
                    title: `${r.property?.name || 'Phòng'} - ${r.roomNumber}`,
                    price: r.price,
                    estimatedUtilities: 500000, // Placeholder
                    location: r.property?.address || 'TP.HCM',
                    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    verified: true,
                    fireSafetyScore: 9.5,
                }));
            }
        }
    } catch (e) {
        console.error('Fetch failed, falling back to mock:', e);
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <Hero />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 sm:mb-12">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Phòng đã xác thực (Verified)</h2>
                        <p className="text-slate-500 font-medium italic text-sm sm:text-base">Minh bạch thông tin, an tâm lựa chọn.</p>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-600 font-bold px-4 py-2 bg-indigo-50 rounded-xl text-sm shrink-0 self-start sm:self-auto">
                        <ShieldCheck className="w-5 h-5" /> Hệ thống Smile Verified
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {displayRooms.map((room) => (
                        <div key={room.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300 relative">
                            <div className="relative h-64 overflow-hidden">
                                {room.verified && (
                                    <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                        <ShieldCheck className="w-3 h-3" /> Đã xác thực
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md border border-slate-100">
                                    PCCC: {room.fireSafetyScore}/10
                                </div>
                                <img
                                    src={room.image}
                                    alt={room.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-5 sm:p-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{room.title}</h3>
                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                                    <MapPin className="w-4 h-4" /> {room.location}
                                </div>

                                <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Tổng chi phí dự kiến</span>
                                        <Info className="w-3 h-3 text-slate-400 cursor-help" />
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black text-indigo-600">{(room.price + room.estimatedUtilities).toLocaleString()}</span>
                                        <span className="text-slate-400 text-xs font-bold">đ / tháng</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1">Gồm {room.price.toLocaleString()}đ thuê + {room.estimatedUtilities.toLocaleString()}đ (Điện/Nước/Wifi)</p>
                                </div>

                                <Link href={`/rooms/${room.id}`} className="block">
                                    <button className="w-full py-4 rounded-2xl font-black bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl transition-all active:scale-95 shadow-lg shadow-indigo-100">
                                        Xem chi tiết
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function MapPin(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}
