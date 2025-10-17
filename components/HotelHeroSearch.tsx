import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { CalendarIcon, SearchIcon, HotelIcon, UsersIcon } from '../assets/icons';

const HotelHeroSearch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/hotels`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <HotelIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input type="text" placeholder={t('cityOrHotel')} defaultValue={t('tehran')} className="w-full p-3 ps-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input type="text" placeholder={t('checkIn')} defaultValue="1403/08/10" className="w-full p-3 ps-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-400 outline-none" />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input type="text" placeholder={t('checkOut')} defaultValue="1403/08/12" className="w-full p-3 ps-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-400 outline-none" />
            </div>
          </div>
          
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <UsersIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input type="text" placeholder={t('guests')} defaultValue="۲ نفر" className="w-full p-3 ps-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>

          <button type="submit" className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30">
              <SearchIcon className="w-5 h-5" />
              {t('searchHotels')}
          </button>
      </form>
    </div>
  );
};

export default HotelHeroSearch;