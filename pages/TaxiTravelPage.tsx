import React from 'react';
import BookingHeader from '../components/BookingHeader';
import TaxiHeroSearch from '../components/TaxiHeroSearch';
import { useTranslation } from '../hooks/useTranslation';

const TaxiTravelPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      <BookingHeader title={t('taxiService')} />
      <main className="p-4 space-y-8">
        <TaxiHeroSearch />
      </main>
    </div>
  );
};

export default TaxiTravelPage;