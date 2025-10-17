import React from 'react';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
// FIX: Correct import path
import { MOCK_DISCOUNTS } from '../constants';
import DiscountCard from '../components/DiscountCard';

const DiscountsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={t('discountsPageTitle')} />
            <main className="p-4 space-y-4">
                {MOCK_DISCOUNTS.map(discount => (
                    <DiscountCard key={discount.id} discount={discount} />
                ))}
            </main>
        </div>
    );
};

export default DiscountsPage;