import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import BookingHeader from '../components/BookingHeader';
// FIX: Correct import path
import { MOCK_DRIVER } from '../constants';
import { CarIcon, StarIcon } from '../assets/icons';

const TaxiStatusPage: React.FC = () => {
    const { t, localizeDigits } = useTranslation();
    const bookingContext = useContext(BookingContext);
    const [status, setStatus] = useState('driverOnTheWay');

    if (!bookingContext || !bookingContext.selectedRide) {
        return <Navigate to="/" replace />;
    }
    
    useEffect(() => {
        const timer1 = setTimeout(() => setStatus('driverArrived'), 5000);
        const timer2 = setTimeout(() => setStatus('rideInProgress'), 10000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);
    
    const { selectedRide } = bookingContext;
    const driver = MOCK_DRIVER;

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={t('taxi')} />
            <main>
                {/* Map placeholder */}
                <div className="relative h-64 bg-gray-300 dark:bg-slate-800">
                    <img src={`https://picsum.photos/seed/map/400/300`} className="w-full h-full object-cover" alt="Map"/>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                       <p className="text-white bg-black/50 px-4 py-2 rounded-lg">{t('mapPlaceholder')}</p>
                    </div>
                </div>

                <div className="p-4 relative -mt-8 z-10">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 border dark:border-slate-700">
                        <div className="text-center mb-4">
                            <p className="font-bold text-lg text-sky-900 dark:text-cyan-400">{t(status)}</p>
                            <p className="text-sm text-gray-500 dark:text-slate-400">{t('eta')}: {localizeDigits(selectedRide.eta)} {t('minutes')}</p>
                        </div>

                        <div className="border-t dark:border-slate-700 pt-4 flex items-center gap-4">
                            <img src={driver.photoUrl} alt={driver.name} className="w-16 h-16 rounded-full object-cover border-2 border-cyan-200 dark:border-cyan-700" />
                            <div className="grow">
                                <p className="font-bold text-slate-800 dark:text-slate-100 text-lg">{driver.name}</p>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <StarIcon className="w-4 h-4 fill-current"/>
                                    <span className="text-sm font-semibold text-gray-600 dark:text-slate-300">{localizeDigits(driver.rating)}</span>
                                </div>
                            </div>
                            <CarIcon className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                        </div>

                        <div className="mt-4 bg-gray-100 dark:bg-slate-700 rounded-lg p-3 flex justify-between items-center text-sm">
                            <div className="font-semibold text-gray-700 dark:text-slate-200">{driver.carModel}</div>
                            <div className="font-mono bg-yellow-300 text-black px-2 py-1 rounded tracking-widest">{driver.licensePlate}</div>
                        </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <button className="w-full bg-white dark:bg-slate-800 border-2 border-red-500 text-red-500 font-bold py-3 px-4 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                            {t('cancelRide')}
                        </button>
                        <button className="w-full bg-white dark:bg-slate-800 border-2 border-cyan-500 text-cyan-600 font-bold py-3 px-4 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-500/10 transition-colors">
                            {t('contactDriver')}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TaxiStatusPage;