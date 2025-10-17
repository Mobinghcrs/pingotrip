import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { CalendarIcon, SearchIcon, MapPinIcon } from '../assets/icons';

const CarRentalHeroSearch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/car-rental/results`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
              <label htmlFor="pickup-location" className="absolute -top-2 start-4 px-1 text-xs text-gray-500 bg-white">{t('pickupLocation')}</label>
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <MapPinIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input type="text" id="pickup-location" placeholder={t('pickupLocation')} defaultValue={t('tehran')} className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
                <label htmlFor="pickup-date" className="absolute -top-2 start-4 px-1 text-xs text-gray-500 bg-white">{t('pickupDate')}</label>
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input type="text" id="pickup-date" placeholder={t('pickupDate')} defaultValue="۱۴۰۳/۱۰/۰۵" className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
            </div>
            <div className="relative">
                 <label htmlFor="return-date" className="absolute -top-2 start-4 px-1 text-xs text-gray-500 bg-white">{t('returnDate')}</label>
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input type="text" id="return-date" placeholder={t('returnDate')} defaultValue="۱۴۰۳/۱۰/۰۸" className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
            </div>
          </div>

          <button type="submit" className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30">
              <SearchIcon className="w-5 h-5" />
              {t('searchCars')}
          </button>
      </form>
    </div>
  );
};

export default CarRentalHeroSearch;
