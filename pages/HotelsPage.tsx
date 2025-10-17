import React from 'react';
import BookingHeader from '../components/BookingHeader';
import HotelCard from '../components/HotelCard';
import { useTranslation } from '../hooks/useTranslation';
// FIX: Correct import path
import { MOCK_HOTELS } from '../constants';

const HotelsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={t('hotelResultsTitle')} />
            <main className="px-4 pb-4">
                 <div className="bg-cyan-50 dark:bg-sky-900/50 border border-cyan-200 dark:border-sky-800 text-sky-900 dark:text-cyan-300 text-sm p-3 rounded-2xl my-4 text-center shadow-sm">
                    <span className="font-semibold">{t('searchResultsFor')}:</span> {t('tehran')}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MOCK_HOTELS.map(hotel => (
                        <HotelCard key={hotel.id} hotel={hotel} basePath="/hotels" />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default HotelsPage;