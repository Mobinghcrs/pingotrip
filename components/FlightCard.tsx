import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// FIX: Correct import path
import { Flight } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { BookingContext } from '../contexts/BookingContext';
import { PlaneIcon } from '../assets/icons';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const { t, language, localizeDigits } = useTranslation();
  const navigate = useNavigate();
  const bookingContext = useContext(BookingContext);

  if (!bookingContext) {
    return null;
  }

  const { selectFlight } = bookingContext;

  const handleSelectFlight = () => {
    selectFlight(flight);
    if (flight.airline === 'aranAirlines') {
      navigate('/seat-selection');
    } else {
      navigate('/passenger-details');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-cyan-100 dark:bg-sky-900 border border-cyan-200 dark:border-sky-800">
              <PlaneIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400"/>
            </div>
            <div>
              <span className="font-bold text-gray-800 dark:text-slate-100">{t(flight.airline)}</span>
              <p className="text-xs text-gray-500 dark:text-slate-400">{t(flight.type.toLowerCase())}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400">{flight.flightNumber}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-center">
              <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{localizeDigits(flight.departureTime)}</p>
              <p className="text-sm text-gray-600 dark:text-slate-300 font-semibold">{t(flight.from.toLowerCase())}</p>
          </div>
          <div className="text-center text-xs text-gray-500 dark:text-slate-400 px-2 grow">
              <div className="w-full h-px bg-gray-200 dark:bg-slate-600 relative flex items-center justify-center">
                   <PlaneIcon className="w-5 h-5 text-cyan-400 bg-white dark:bg-slate-800 px-1"/>
              </div>
              <p className="mt-1">{flight.duration}</p>
          </div>
          <div className="text-center">
              <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{localizeDigits(flight.arrivalTime)}</p>
              <p className="text-sm text-gray-600 dark:text-slate-300 font-semibold">{t(flight.to.toLowerCase())}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-slate-800/50 p-4 flex items-center justify-between border-t dark:border-slate-700">
         <div>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {flight.price.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-400 -mt-1">{t('rial')}</p>
        </div>
        <button onClick={handleSelectFlight} className="bg-sky-900 text-white py-2.5 px-6 rounded-lg font-bold hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-md shadow-sky-900/30">
            {t('selectFlight')}
        </button>
      </div>
    </div>
  );
};

export default FlightCard;