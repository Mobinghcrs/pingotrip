import React from 'react';
import BookingHeader from '../components/BookingHeader';
import HotelHeroSearch from '../components/HotelHeroSearch';
import { useTranslation } from '../hooks/useTranslation';

const DestinationCard = ({ city, image, href }: { city: string; image: string, href: string }) => (
  <a href={href} className="relative rounded-2xl overflow-hidden group shadow-lg">
    <img src={image} alt={city} className="w-full h-36 object-cover transform group-hover:scale-105 transition-transform duration-300" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
      <h3 className="text-white text-md font-bold drop-shadow-lg">{city}</h3>
    </div>
  </a>
);

const HotelTravelPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      <BookingHeader title={t('domesticHotelBooking')} />
      <main className="p-4 space-y-8">
        <HotelHeroSearch />

        <div>
            <h2 className="text-xl font-extrabold text-slate-800 mb-4">{t('popularHotels')}</h2>
            <div className="grid grid-cols-2 gap-4">
                <DestinationCard city={t('tehran')} image="https://picsum.photos/seed/tehran-city/400/300" href="#/hotels?city=Tehran"/>
                <DestinationCard city={t('mashhad')} image="https://picsum.photos/seed/mashhad-city/400/300" href="#/hotels?city=Mashhad"/>
            </div>
        </div>
      </main>
    </div>
  );
};

export default HotelTravelPage;