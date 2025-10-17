import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import RideOptionCard from '../components/RideOptionCard';
import { useTranslation } from '../hooks/useTranslation';
// FIX: Correct import path
import { MOCK_TAXI_RIDES } from '../constants';
import { BookingContext } from '../contexts/BookingContext';

const TaxiOptionsPage = () => {
    const { t } = useTranslation();
    const bookingContext = useContext(BookingContext);

    if (!bookingContext || !bookingContext.taxiFlowState) {
        return <Navigate to="/" replace />;
    }

    const { taxiFlowState } = bookingContext;

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={t('chooseRide')} />
            <main className="px-4 pb-4">
                <div className="bg-cyan-50 dark:bg-sky-900/50 border border-cyan-200 dark:border-sky-800 text-sky-900 dark:text-cyan-300 text-sm p-3 rounded-2xl my-4 text-center shadow-sm">
                    <span className="font-semibold">{t('searchResultsFor')}:</span> {taxiFlowState.pickup} به {taxiFlowState.dropoff}
                </div>
                <div className="space-y-4">
                    {MOCK_TAXI_RIDES.map(ride => (
                        <RideOptionCard key={ride.id} ride={ride} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default TaxiOptionsPage;