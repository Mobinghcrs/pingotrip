import React from 'react';
import BookingHeader from '../components/BookingHeader';
import OfferCard from '../components/OfferCard';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_OFFERS } from '../constants';

const OffersPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('offersPageTitle')} />
            <main className="p-4 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    {MOCK_OFFERS.map(offer => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default OffersPage;
