import React from 'react';
import BookingHeader from '../components/BookingHeader';
import HeroSearch from '../components/HeroSearch';
import { useTranslation } from '../hooks/useTranslation';

const DestinationCard = ({ city, image, href }: { city: string; image: string, href: string }) => (
  <a href={href} className="relative rounded-2xl overflow-hidden group shadow-lg">
    <img src={image} alt={city} className="w-full h-36 object-cover transform group-hover:scale-105 transition-transform duration-300" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
      <h3 className="text-white text-md font-bold drop-shadow-lg">{city}</h3>
    </div>
  </a>
);

const TravelPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen">
      <BookingHeader title={t('domesticFlight')} />
      <main className="p-4 space-y-8">
        <HeroSearch />

        <div>
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">{t('popularDestinations')}</h2>
            <div className="grid grid-cols-2 gap-4">
                <DestinationCard city={t('flightToMashhad')} image="https://picsum.photos/seed/mashhad/400/300" href="#/flights?from=Tehran&to=Mashhad&date=1403/07/18"/>
                <DestinationCard city={t('flightToKish')} image="https://picsum.photos/seed/kish/400/300" href="#/flights?from=Tehran&to=Kish&date=1403/07/18"/>
                <DestinationCard city={t('flightToShiraz')} image="https://picsum.photos/seed/shiraz/400/300" href="#/flights?from=Tehran&to=Shiraz&date=1403/07/18"/>
                <DestinationCard city={t('flightToIsfahan')} image="https://picsum.photos/seed/isfahan/400/300" href="#/flights?from=Tehran&to=Isfahan&date=1403/07/18"/>
            </div>
        </div>
      </main>
    </div>
  );
};

export default TravelPage;