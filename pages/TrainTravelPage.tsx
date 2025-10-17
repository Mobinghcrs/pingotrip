import React from 'react';
import BookingHeader from '../components/BookingHeader';
import TrainHeroSearch from '../components/TrainHeroSearch';
import { useTranslation } from '../hooks/useTranslation';

const DestinationCard = ({ city, image, href }: { city: string; image: string, href: string }) => (
  <a href={href} className="relative rounded-2xl overflow-hidden group shadow-lg">
    <img src={image} alt={city} className="w-full h-36 object-cover transform group-hover:scale-105 transition-transform duration-300" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
      <h3 className="text-white text-md font-bold drop-shadow-lg">{city}</h3>
    </div>
  </a>
);

const TrainTravelPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      <BookingHeader title={t('trainTicket')} />
      <main className="p-4 space-y-8">
        <TrainHeroSearch />

        <div>
            <h2 className="text-xl font-extrabold text-slate-800 mb-4">{t('popularTrainRoutes')}</h2>
            <div className="grid grid-cols-2 gap-4">
                <DestinationCard city={t('trainTehranMashhad')} image="https://picsum.photos/seed/mashhad-train/400/300" href="#/trains?from=Tehran&to=Mashhad&date=1403/09/01"/>
                <DestinationCard city={t('trainTehranAhvaz')} image="https://picsum.photos/seed/ahvaz-train/400/300" href="#/trains?from=Tehran&to=Ahvaz&date=1403/09/01"/>
            </div>
        </div>
      </main>
    </div>
  );
};

export default TrainTravelPage;