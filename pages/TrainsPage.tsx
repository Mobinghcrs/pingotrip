import React from 'react';
import { useLocation } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import TrainCard from '../components/TrainCard';
import { useTranslation } from '../hooks/useTranslation';
// FIX: Correct import path
import { MOCK_TRAINS } from '../constants';

const TrainsPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from')?.toLowerCase() || 'tehran';
    const to = queryParams.get('to')?.toLowerCase() || 'mashhad';
    const date = queryParams.get('date') || '1403/09/01';

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={`${t(from)}${t('to')}${t(to)}`} />
            <main className="px-4 pb-4">
                <div className="bg-cyan-50 dark:bg-sky-900/50 border border-cyan-200 dark:border-sky-800 text-sky-900 dark:text-cyan-300 text-sm p-3 rounded-2xl my-4 text-center shadow-sm">
                    <span className="font-semibold">{t('searchResultsFor')}:</span> {t(from)} - {t(to)} - {date}
                </div>
                
                <div className="space-y-4">
                    {MOCK_TRAINS.map(train => (
                        <TrainCard key={train.id} train={train} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default TrainsPage;