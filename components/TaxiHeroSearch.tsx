import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { SearchIcon, MapPinIcon } from '../assets/icons';
import { BookingContext } from '../contexts/BookingContext';

const TaxiHeroSearch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const bookingContext = useContext(BookingContext);
  const [pickup, setPickup] = useState('Istanbul Airport');
  const [dropoff, setDropoff] = useState('Sultanahmet Square');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingContext) return;

    bookingContext.startTaxiFlow({ pickup, dropoff });
    navigate(`/taxi/options`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <MapPinIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input type="text" placeholder={t('pickupLocation')} value={pickup} onChange={e => setPickup(e.target.value)} className="w-full p-3 ps-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>
          
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <MapPinIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input type="text" placeholder={t('dropoffLocation')} value={dropoff} onChange={e => setDropoff(e.target.value)} className="w-full p-3 ps-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>

          <button type="submit" className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30">
              <SearchIcon className="w-5 h-5" />
              {t('searchRides')}
          </button>
      </form>
    </div>
  );
};

export default TaxiHeroSearch;