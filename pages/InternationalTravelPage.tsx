import React from 'react';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, SearchIcon, PlaneIcon, ArrowRightLeftIcon } from '../assets/icons';

const InternationalHeroSearch = () => {
  const [origin, setOrigin] = React.useState('Tehran');
  const [destination, setDestination] = React.useState('Istanbul');
  const [departureDate, setDepartureDate] = React.useState('1403/08/05');
  
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      from: origin,
      to: destination,
      date: departureDate
    }).toString();
    navigate(`/flights/international?${query}`);
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

const InternationalTravelPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      <BookingHeader title={t('internationalFlight')} />
      <main className="p-4 space-y-8">
        <InternationalHeroSearch />

        <div>
            <h2 className="text-xl font-extrabold text-slate-800 mb-4">{t('popularIntlDestinations')}</h2>
            <div className="grid grid-cols-2 gap-4">
                <DestinationCard city={t('flightToIstanbul')} image="https://picsum.photos/seed/istanbul/400/300" href="#/flights/international?from=Tehran&to=Istanbul&date=1403/08/05"/>
                <DestinationCard city={t('flightToDubai')} image="https://picsum.photos/seed/dubai/400/300" href="#/flights/international?from=Tehran&to=Dubai&date=1403/08/05"/>
                <DestinationCard city={t('flightToLondon')} image="https://picsum.photos/seed/london/400/300" href="#/flights/international?from=Tehran&to=London&date=1403/08/05"/>
            </div>
        </div>
      </main>
    </div>
  );
};

export default InternationalTravelPage;