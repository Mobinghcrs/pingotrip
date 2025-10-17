import React from 'react';
import BookingHeader from '../components/BookingHeader';
import CarCard from '../components/CarCard';
import { useTranslation } from '../hooks/useTranslation';
// FIX: Correct import path
import { MOCK_CARS } from '../constants';
import { SlidersHorizontalIcon } from '../assets/icons';

const CarResultsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={t('carResultsTitle')} />
            <main className="px-4 pb-4">
                 <div className="bg-cyan-50 dark:bg-sky-900/50 border border-cyan-200 dark:border-sky-800 text-sky-900 dark:text-cyan-300 text-sm p-3 rounded-2xl my-4 text-center shadow-sm">
                    <span className="font-semibold">{t('searchResultsFor')}:</span> {t('tehran')}
                </div>
                
                <div className="sticky top-16 bg-slate-50 dark:bg-slate-950 py-2 z-10">
                    <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg py-2 px-4 text-slate-700 dark:text-slate-200 font-semibold hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                        <SlidersHorizontalIcon className="w-5 h-5" />
                        <span>{t('sortAndFilter')}</span>
                    </button>
                </div>
                
                <div className="space-y-4 mt-4">
                    {MOCK_CARS.map(car => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default CarResultsPage;