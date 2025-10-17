import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { CalendarIcon, SearchIcon, PlaneIcon, ArrowRightLeftIcon } from '../assets/icons';

const AranAirlinesSearch = () => {
  const [origin, setOrigin] = useState('Tehran');
  const [destination, setDestination] = useState('Mashhad');
  const [departureDate, setDepartureDate] = useState('1403/07/18');
  
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      from: origin,
      to: destination,
      date: departureDate
    }).toString();
    navigate(`/aran-flights?${query}`);
  };
  
  const handleSwap = () => {
      const temp = origin;
      setOrigin(destination);
      setDestination(temp);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <PlaneIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input type="text" placeholder={t('origin')} value={t(origin.toLowerCase())} onChange={(e) => setOrigin(e.target.value)} className="w-full p-3 ps-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>
          
          <div className="relative flex items-center">
              <div className="relative grow">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <PlaneIcon className="w-5 h-5 text-gray-400 -scale-y-100" />
                </div>
                <input type="text" placeholder={t('destination')} value={t(destination.toLowerCase())} onChange={(e) => setDestination(e.target.value)} className="w-full p-3 ps-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-400 outline-none" />
              </div>
               <button type="button" onClick={handleSwap} title={t('swap')} className="absolute top-1/2 -translate-y-1/2 end-1/2 translate-x-1/2 flex-shrink-0 w-8 h-8 bg-gray-100 border rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <ArrowRightLeftIcon className="w-4 h-4 text-gray-600" />
               </button>
          </div>
          
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input type="text" placeholder={t('departureDate')} value={departureDate} onChange={e => setDepartureDate(e.target.value)} className="w-full p-3 ps-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>

          <button type="submit" className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30">
              <SearchIcon className="w-5 h-5" />
              {t('search')}
          </button>
      </form>
    </div>
  );
};


const DestinationCard = ({ city, image, href }: { city: string; image: string, href: string }) => (
  <a href={href} className="relative rounded-2xl overflow-hidden group shadow-lg">
    <img src={image} alt={city} className="w-full h-36 object-cover transform group-hover:scale-105 transition-transform duration-300" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
      <h3 className="text-white text-md font-bold drop-shadow-lg">{city}</h3>
    </div>
  </a>
);

const AranAirlinesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      <BookingHeader title={t('aranAirlines')} />
      <main className="p-4 space-y-8">
        <AranAirlinesSearch />

        <div>
            <h2 className="text-xl font-extrabold text-slate-800 mb-4">{t('popularDestinations')}</h2>
            <div className="grid grid-cols-2 gap-4">
                <DestinationCard city={t('flightToMashhad')} image="https://picsum.photos/seed/mashhad/400/300" href="#/aran-flights?from=Tehran&to=Mashhad&date=1403/07/18"/>
                <DestinationCard city={t('flightToKish')} image="https://picsum.photos/seed/kish/400/300" href="#/aran-flights?from=Tehran&to=Kish&date=1403/07/18"/>
                <DestinationCard city={t('flightToShiraz')} image="https://picsum.photos/seed/shiraz/400/300" href="#/aran-flights?from=Tehran&to=Shiraz&date=1403/07/18"/>
                <DestinationCard city={t('flightToIsfahan')} image="https://picsum.photos/seed/isfahan/400/300" href="#/aran-flights?from=Tehran&to=Isfahan&date=1403/07/18"/>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AranAirlinesPage;