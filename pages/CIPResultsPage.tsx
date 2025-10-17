import React from 'react';
import BookingHeader from '../components/BookingHeader';
import CIPCard from '../components/CIPCard';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_CIP_SERVICES } from '../constants';

const CIPResultsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={t('cipResultsTitle')} />
            <main className="px-4 pb-4">
                 <div className="bg-cyan-50 dark:bg-sky-900/50 border border-cyan-200 dark:border-sky-800 text-sky-900 dark:text-cyan-300 text-sm p-3 rounded-2xl my-4 text-center shadow-sm">
                    <span className="font-semibold">{t('searchResultsFor')}:</span> {t('ikaAirport')} - ۱۴۰۳/۱۱/۲۰
                </div>
                
                <div className="space-y-4">
                    {MOCK_CIP_SERVICES.map(service => (
                        <CIPCard key={service.id} service={service} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default CIPResultsPage;