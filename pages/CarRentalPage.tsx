import React from 'react';
import BookingHeader from '../components/BookingHeader';
import CarRentalHeroSearch from '../components/CarRentalHeroSearch';
import { useTranslation } from '../hooks/useTranslation';

const DestinationCard = ({ city, image, href }: { city: string; image: string, href: string }) => (
  <a href={href} className="relative rounded-2xl overflow-hidden group shadow-lg">
    <img src={image} alt={city} className="w-full h-36 object-cover transform group-hover:scale-105 transition-transform duration-300" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
      <h3 className="text-white text-md font-bold drop-shadow-lg">{city}</h3>
    </div>
  </a>
);

const CarRentalPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      <BookingHeader title={t('carRentalPageTitle')} />
      <main className="space-y-8">
        <div className="relative h-64">
            <img src="https://picsum.photos/seed/car-hero/400/600" className="absolute inset-0 w-full h-full object-cover" alt="Car rental hero" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative p-4 flex flex-col h-full justify-end">
                <CarRentalHeroSearch />
            </div>
        </div>

        <div className="p-4">
            <h2 className="text-xl font-extrabold text-slate-800 mb-4">{t('popularDestinations')}</h2>
            <div className="grid grid-cols-2 gap-4">
                <DestinationCard city={t('tehran')} image="https://picsum.photos/seed/tehran-car/400/300" href="#"/>
                <DestinationCard city={t('kish')} image="https://picsum.photos/seed/kish-car/400/300" href="#"/>
            </div>
        </div>
      </main>
    </div>
  );
};

export default CarRentalPage;