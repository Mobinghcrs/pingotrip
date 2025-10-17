import React from 'react';
import { useLocation } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import HotelCard from '../components/HotelCard';
import { useTranslation } from '../hooks/useTranslation';
// FIX: Correct import path
import { MOCK_INTL_HOTELS } from '../constants';

const InternationalHotelsPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get('city') || 'Istanbul';

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={t(city.toLowerCase())} />
            <main className="px-4 pb-4">
                 <div className="bg-cyan-50 dark:bg-sky-900/50 border border-cyan-200 dark:border-sky-800 text-sky-900 dark:text-cyan-300 text-sm p-3 rounded-2xl my-4 text-center shadow-sm">
                    <span className="font-semibold">{t('searchResultsFor')}:</span> {t(city.toLowerCase())}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MOCK_INTL_HOTELS.map(hotel => (
                        <HotelCard key={hotel.id} hotel={hotel} basePath="/hotels/international" />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default InternationalHotelsPage;