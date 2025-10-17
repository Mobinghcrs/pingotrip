import React from 'react';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_GIFT_CARD_BRANDS } from '../constants';
import GiftCardBrandCard from '../components/GiftCardBrandCard';

const GiftCardPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('giftCardPageTitle')} />
            <main className="p-4">
                <div className="grid grid-cols-2 gap-4">
                    {MOCK_GIFT_CARD_BRANDS.map(brand => (
                        <GiftCardBrandCard key={brand.id} brand={brand} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default GiftCardPage;