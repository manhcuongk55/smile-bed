import { MapPin, Wifi, Wind, Zap } from 'lucide-react';
import Image from 'next/image';

interface RoomCardProps {
    title: string;
    price: number;
    location: string;
    image: string;
    features: string[];
}

export default function RoomCard({ title, price, location, image, features }: RoomCardProps) {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300">
            <div className="relative h-56 overflow-hidden">
                <div className="absolute top-4 right-4 z-10 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    Mới
                </div>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {title}
                    </h3>
                    <div className="text-right">
                        <span className="text-2xl font-black text-indigo-600">
                            {price.toLocaleString()}
                        </span>
                        <span className="text-slate-400 text-sm font-medium">/tháng</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {location}
                </div>

                <div className="flex gap-4 mb-6 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-1 text-slate-600 font-medium text-sm">
                        <Wifi className="w-4 h-4 text-sky-500" /> Wi-fi
                    </div>
                    <div className="flex items-center gap-1 text-slate-600 font-medium text-sm">
                        <Wind className="w-4 h-4 text-sky-500" /> AC
                    </div>
                    <div className="flex items-center gap-1 text-slate-600 font-medium text-sm">
                        <Zap className="w-4 h-4 text-sky-500" /> Điện
                    </div>
                </div>

                <button className="w-full py-3 rounded-2xl font-bold bg-slate-50 text-slate-900 hover:bg-indigo-600 hover:text-white transition-all transform active:scale-95">
                    Xem chi tiết
                </button>
            </div>
        </div>
    );
}
