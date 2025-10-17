import React from 'react';
import { useLocation } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import FlightCard from '../components/FlightCard';
import { useTranslation } from '../hooks/useTranslation';
// FIX: Correct import path
import { MOCK_INTL_FLIGHTS } from '../constants';

const InternationalFlightsPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from')?.toLowerCase() || 'tehran';
    const to = queryParams.get('to')?.toLowerCase() || 'istanbul';
    const date = queryParams.get('date') || '1403/08/05';

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={`${t(from)}${t('to')}${t(to)}`} />
            <main className="px-4 pb-4">
                <div className="bg-cyan-50 dark:bg-sky-900/50 border border-cyan-200 dark:border-sky-800 text-sky-900 dark:text-cyan-300 text-sm p-3 rounded-2xl my-4 text-center shadow-sm">
                    <span className="font-semibold">{t('searchResultsFor')}:</span> {t(from)} - {t(to)} - {date}
                </div>
                
                <div className="space-y-4">
                    {MOCK_INTL_FLIGHTS.map(flight => (
                        <FlightCard key={flight.id} flight={flight} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default InternationalFlightsPage;