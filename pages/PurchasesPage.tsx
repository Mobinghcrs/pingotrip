import React from 'react';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
// FIX: Correct import path
import { MOCK_PURCHASES } from '../constants';
import PurchaseCard from '../components/PurchaseCard';

const PurchasesPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={t('myTrips')} />
            <main className="p-4 space-y-4">
                {MOCK_PURCHASES.map(purchase => (
                    <PurchaseCard key={purchase.id} purchase={purchase} />
                ))}
            </main>
        </div>
    );
};

export default PurchasesPage;