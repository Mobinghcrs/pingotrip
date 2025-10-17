import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { CalendarIcon, SearchIcon, PlaneIcon, ArrowRightLeftIcon } from '../assets/icons';

const HeroSearch = () => {
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
    navigate(`/flights?${query}`);
  };
  
  const handleSwap = () => {
      const temp = origin;
      setOrigin(destination);
      setDestination(temp);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 border dark:border-slate-700">
      <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <PlaneIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input type="text" placeholder={t('origin')} value={t(origin.toLowerCase())} onChange={(e) => setOrigin(e.target.value)} className="w-full p-3 ps-10 border dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>
          
          <div className="relative flex items-center">
              <div className="relative grow">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <PlaneIcon className="w-5 h-5 text-gray-400 -scale-y-100" />
                </div>
                <input type="text" placeholder={t('destination')} value={t(destination.toLowerCase())} onChange={(e) => setDestination(e.target.value)} className="w-full p-3 ps-10 border dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-cyan-400 outline-none" />
              </div>
               <button type="button" onClick={handleSwap} title={t('swap')} className="absolute top-1/2 -translate-y-1/2 end-1/2 translate-x-1/2 flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-slate-700 border dark:border-slate-600 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                  <ArrowRightLeftIcon className="w-4 h-4 text-gray-600 dark:text-slate-300" />
               </button>
          </div>
          
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input type="text" placeholder={t('departureDate')} value={departureDate} onChange={e => setDepartureDate(e.target.value)} className="w-full p-3 ps-10 border dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>

          <button type="submit" className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30">
              <SearchIcon className="w-5 h-5" />
              {t('search')}
          </button>
      </form>
    </div>
  );
};

export default HeroSearch;