import React from 'react';
import { useLocation } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import FlightCard from '../components/FlightCard';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_FLIGHTS } from '../constants';

const AranFlightsPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from')?.toLowerCase() || 'tehran';
    const to = queryParams.get('to')?.toLowerCase() || 'mashhad';
    const date = queryParams.get('date') || '۱۴۰۳/۰۷/۱۸';

    const aranFlights = MOCK_FLIGHTS.filter(f => f.airline === 'aranAirlines');

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={`${t('aranAirlines')}: ${t(from)} به ${t(to)}`} />
            <main className="px-4 pb-4">
                <div className="bg-cyan-50 dark:bg-sky-900/50 border border-cyan-200 dark:border-sky-800 text-sky-900 dark:text-cyan-300 text-sm p-3 rounded-2xl my-4 text-center shadow-sm">
                    <span className="font-semibold">{t('searchResultsFor')}:</span> {t(from)} - {t(to)} - {date}
                </div>
                
                <div className="space-y-4">
                    {aranFlights.length > 0 ? (
                        aranFlights.map(flight => (
                            <FlightCard key={flight.id} flight={flight} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-slate-400 py-8">{t('noResultsFound')}</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AranFlightsPage;
