import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { CalendarIcon, SearchIcon, HotelIcon, UsersIcon } from '../assets/icons';

const InternationalHotelHeroSearch = () => {
  const { t, localizeDigits } = useTranslation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/hotels/international`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <HotelIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input type="text" placeholder={t('cityOrHotel')} defaultValue={t('istanbul')} className="w-full p-3 ps-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input type="text" placeholder={t('checkIn')} defaultValue={localizeDigits("2024/11/15")} className="w-full p-3 ps-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-400 outline-none" />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input type="text" placeholder={t('checkOut')} defaultValue={localizeDigits("2024/11/18")} className="w-full p-3 ps-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-400 outline-none" />
            </div>
          </div>
          
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <UsersIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input type="text" placeholder={t('guests')} defaultValue={localizeDigits("2")} className="w-full p-3 ps-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>

          <button type="submit" className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30">
              <SearchIcon className="w-5 h-5" />
              {t('searchHotels')}
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

const InternationalHotelTravelPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      <BookingHeader title={t('internationalHotelBooking')} />
      <main className="p-4 space-y-8">
        <InternationalHotelHeroSearch />

        <div>
            <h2 className="text-xl font-extrabold text-slate-800 mb-4">{t('popularIntlHotels')}</h2>
            <div className="grid grid-cols-2 gap-4">
                <DestinationCard city={t('istanbul')} image="https://picsum.photos/seed/istanbul-city/400/300" href="#/hotels/international?city=Istanbul"/>
                <DestinationCard city={t('dubai')} image="https://picsum.photos/seed/dubai-city/400/300" href="#/hotels/international?city=Dubai"/>
            </div>
        </div>
      </main>
    </div>
  );
};

export default InternationalHotelTravelPage;