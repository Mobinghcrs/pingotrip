import React from 'react';
import BookingHeader from '../components/BookingHeader';
import InsurancePlanCard from '../components/InsurancePlanCard';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_INSURANCE_PLANS } from '../constants';

const InsuranceResultsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={t('availablePlans')} />
            <main className="px-4 pb-4">
                 <div className="bg-cyan-50 dark:bg-sky-900/50 border border-cyan-200 dark:border-sky-800 text-sky-900 dark:text-cyan-300 text-sm p-3 rounded-2xl my-4 text-center shadow-sm">
                    <span className="font-semibold">{t('searchResultsFor')}:</span> {t('schengen')}
                </div>
                
                <div className="space-y-4">
                    {MOCK_INSURANCE_PLANS.map(plan => (
                        <InsurancePlanCard key={plan.id} plan={plan} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default InsuranceResultsPage;