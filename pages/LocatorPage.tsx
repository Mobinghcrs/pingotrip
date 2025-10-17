import React, { useState } from 'react';
import BookingHeader from '../components/BookingHeader';
import POICard from '../components/POICard';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_POIS } from '../constants';
import { PointOfInterest } from '../types';
import { SearchIcon, MapPinIcon, TourIcon, UtensilsIcon, ShoppingBagIcon, CreditCardIcon } from '../assets/icons';

type Category = PointOfInterest['category'] | 'all';

const LocatorPage = () => {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState<Category>('all');
    
    const categories: { name: Category, icon: React.ReactNode, titleKey: string }[] = [
        { name: 'attractions', icon: <TourIcon className="w-5 h-5"/>, titleKey: 'attractions' },
        { name: 'restaurants', icon: <UtensilsIcon className="w-5 h-5"/>, titleKey: 'restaurants' },
        { name: 'shopping', icon: <ShoppingBagIcon className="w-5 h-5"/>, titleKey: 'shopping' },
        { name: 'atms', icon: <CreditCardIcon className="w-5 h-5"/>, titleKey: 'atms' },
    ];

    const filteredPois = activeCategory === 'all' 
        ? MOCK_POIS 
        : MOCK_POIS.filter(poi => poi.category === activeCategory);

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('locator')} />
            <main>
                <div className="relative h-72 bg-gray-300">
                    <img src={`https://picsum.photos/seed/tehran-map/400/600`} className="w-full h-full object-cover" alt="Map" />
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    {/* User's location marker */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                     {/* POI markers */}
                    <div className="absolute top-1/3 left-1/4">
                        <MapPinIcon className="w-8 h-8 text-red-500 drop-shadow-lg" />
                    </div>
                     <div className="absolute bottom-1/4 right-1/4">
                        <MapPinIcon className="w-8 h-8 text-red-500 drop-shadow-lg" />
                    </div>


                    <div className="absolute top-4 left-4 right-4 z-10">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={t('searchForPlaces')}
                                className="w-full py-3 ps-10 pe-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none"
                            />
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <SearchIcon className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-6">
                    <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
                        {categories.map(({ name, icon, titleKey }) => (
                            <button
                                key={name}
                                onClick={() => setActiveCategory(name)}
                                className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${
                                    activeCategory === name
                                        ? 'bg-sky-900 text-white shadow-md'
                                        : 'bg-white text-slate-700 border hover:bg-gray-100'
                                }`}
                            >
                                {icon}
                                <span>{t(titleKey)}</span>
                            </button>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-xl font-extrabold text-slate-800 mb-4">{t('nearbyPlaces')}</h2>
                        <div className="space-y-3">
                            {filteredPois.map(poi => (
                                <POICard key={poi.id} poi={poi} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LocatorPage;