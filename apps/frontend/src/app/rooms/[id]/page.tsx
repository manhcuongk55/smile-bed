import { MapPin, Wifi, Wind, Zap, Coffee, Building2, Train, CreditCard, ChevronLeft, Star, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default async function RoomDetail({ params }: { params: { id: string } }) {
    let room = {
        title: 'Đang tải thông tin...',
        price: 0,
        area: '32m²',
        floor: 'Tầng trung',
        type: 'Studio',
        location: 'Đang cập nhật',
        description: 'Căn hộ Studio cao cấp đầy đủ nội thất từ giường, tủ, tivi, máy giặt riêng.',
        amenities: ['Wifi 5G', 'Điều hòa', 'Thang máy', 'Bảo vệ 24/7', 'Gym', 'Hồ bơi'],
        transit: [
            { mode: 'Bộ hành', dest: 'Trạm Metro số 1', time: '5 phút' },
            { mode: 'Xe máy', dest: 'Quận 1', time: '10 phút' },
            { mode: 'Xe bus', dest: 'Đại Học HUTECH', time: '15 phút' },
        ],
        nearby: [
            { name: 'Vincom Center', type: 'Trung tâm TM', distance: '200m' },
            { name: 'Công viên Landmark', type: 'Giải trí', distance: '150m' },
            { name: 'Cà phê Highland', type: 'Ăn uống', distance: '50m' },
        ]
    };

    try {
        const res = await fetch(`${API_URL}/discovery/rooms/${params.id}`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            if (data) {
                room = {
                    ...room,
                    title: `${data.roomNumber} - ${data.property?.name || 'Phòng'}`,
                    price: data.price,
                    location: data.property?.address || 'TP.HCM',
                    description: `Phòng ${data.roomNumber} mang đến không gian sống chất lượng cao tại ${data.property?.name || 'đây'}. Được kiểm định bởi smile-bed.`,
                    nearby: data.property?.nearbyPOIs?.map((poi: any) => ({
                        name: poi.name, type: poi.type, distance: `${poi.distance}km`
                    })) || room.nearby
                };
            }
        }
    } catch (e) {
        console.error('Fetch detail failed:', e);
    }


    return (
        <div className="bg-slate-50 min-h-screen pt-20 sm:pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Back and actions */}
                <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="flex items-center gap-2 text-slate-500 font-bold hover:text-indigo-600 transition-all">
                        <ChevronLeft className="w-5 h-5" /> Trở lại tìm kiếm
                    </Link>
                    <div className="flex gap-4">
                        <button className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Gallery Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-4 h-[250px] sm:h-[400px] md:h-[500px] mb-6 sm:mb-10 overflow-hidden rounded-2xl sm:rounded-[2.5rem] shadow-xl sm:shadow-2xl">
                    <div className="md:col-span-2 relative group overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                    </div>
                    <div className="hidden md:grid md:col-span-1 grid-rows-2 gap-2 sm:gap-4">
                        <div className="relative group overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                        </div>
                        <div className="relative group overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                        </div>
                    </div>
                    <div className="hidden md:block md:col-span-1 relative group overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center text-white font-black text-xl backdrop-blur-[2px] cursor-pointer hover:bg-slate-900/60 transition-all">
                            +12 ảnh khác
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12">
                    <div className="lg:col-span-2 space-y-6 sm:space-y-10">
                        {/* Title & Stats */}
                        <section>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-100">Khu vực tốt</span>
                                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-green-100">Giá ổn định</span>
                            </div>
                            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mb-3 sm:mb-4 leading-tight">{room.title}</h1>
                            <div className="flex items-center gap-2 text-slate-500 font-medium mb-8">
                                <MapPin className="w-5 h-5 text-indigo-600" />
                                {room.location}
                            </div>

                            <div className="grid grid-cols-3 gap-2 sm:gap-4 border-y border-slate-100 py-5 sm:py-8">
                                <div className="text-center border-r border-slate-100">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Diện tích</p>
                                    <p className="text-base sm:text-xl font-black text-slate-900">{room.area}</p>
                                </div>
                                <div className="text-center border-r border-slate-100">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Kiểu phòng</p>
                                    <p className="text-base sm:text-xl font-black text-slate-900">{room.type}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Tầng cao</p>
                                    <p className="text-base sm:text-xl font-black text-slate-900">{room.floor}</p>
                                </div>
                            </div>
                        </section>

                        {/* Description */}
                        <section>
                            <h3 className="text-2xl font-bold mb-4">Mô tả chi tiết</h3>
                            <p className="text-slate-600 leading-relaxed font-medium">
                                {room.description}
                            </p>
                        </section>

                        {/* Layout focus: Transit & Convenience */}
                        <section className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-slate-100 shadow-xl">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                                <Train className="w-6 h-6 text-indigo-600" />
                                Duy chuyển & Tiện ích xung quanh
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Khả năng di chuyển</h4>
                                    <div className="space-y-4">
                                        {room.transit.map((t, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                                    <div>
                                                        <p className="font-bold text-slate-900">{t.mode} tới {t.dest}</p>
                                                    </div>
                                                </div>
                                                <span className="text-indigo-600 font-black">{t.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Tiện ích gần bạn</h4>
                                    <div className="space-y-4">
                                        {room.nearby.map((n, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <div className="flex items-center gap-3">
                                                    <Coffee className="w-5 h-5 text-sky-500" />
                                                    <div>
                                                        <p className="font-bold text-slate-900">{n.name}</p>
                                                        <p className="text-xs text-slate-400 font-bold">{n.type}</p>
                                                    </div>
                                                </div>
                                                <span className="text-slate-900 font-black">{n.distance}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Booking Side Card */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-28 glass p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] shadow-2xl border-white/50">
                            <div className="mb-8">
                                <p className="text-sm font-bold text-slate-400 mb-1">Giá thuê hàng tháng</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-indigo-600">{room.price.toLocaleString()}</span>
                                    <span className="text-slate-500 font-bold">VNĐ/tháng</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="p-4 bg-slate-100/50 rounded-2xl">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Tiền cọc cần chuẩn bị</p>
                                    <p className="text-lg font-black text-slate-900">{(room.price * 1).toLocaleString()} VNĐ (1 Tháng)</p>
                                </div>
                                <div className="flex items-center gap-3 p-4 border border-indigo-100 rounded-2xl text-indigo-600 font-bold text-sm">
                                    <CreditCard className="w-5 h-5" /> Thanh toán linh hoạt hàng tháng
                                </div>
                            </div>

                            <Link href={`/onboarding/${params.id}`} className="block">
                                <button className="w-full btn-primary !py-5 !text-lg !font-black !rounded-2xl mb-4 shadow-indigo-300">
                                    Đặt phòng & Ký HĐ Online
                                </button>
                            </Link>
                            <Link href={`/viewing/${params.id}`} className="block">
                                <button className="w-full bg-slate-50 text-slate-900 py-4 rounded-2xl font-bold border border-slate-100 hover:bg-white transition-all">
                                    Yêu cầu xem phòng thực tế
                                </button>
                            </Link>

                            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-black text-indigo-600">SM</div>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                    Quản lý bởi <strong>smile-bed Team</strong>. Chúng tôi đảm bảo thông tin phòng là chính xác 100%.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
