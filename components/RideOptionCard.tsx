import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// FIX: Correct import path
import { TaxiRide } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { BookingContext } from '../contexts/BookingContext';
import { CarIcon } from '../assets/icons';

interface RideOptionCardProps {
  ride: TaxiRide;
}

const RideOptionCard: React.FC<RideOptionCardProps> = ({ ride }) => {
  const { t, language, localizeDigits } = useTranslation();
  const navigate = useNavigate();
  const bookingContext = useContext(BookingContext);

  if (!bookingContext) {
    return null;
  }

  const { selectRide } = bookingContext;

  const handleSelectRide = () => {
    selectRide(ride);
    navigate('/taxi/status');
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700 overflow-hidden p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <CarIcon className="w-12 h-12 text-slate-700 dark:text-slate-300"/>
        <div>
          <p className="font-bold text-slate-800 dark:text-slate-100">{t(ride.providerKey)} <span className="font-normal text-gray-600 dark:text-slate-300">{t(ride.carTypeKey)}</span></p>
          <p className="text-sm text-green-600 font-semibold">{localizeDigits(ride.eta)} {t('minutes')}</p>
        </div>
      </div>
      <div className="text-end">
        <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
            {ride.price.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
            <span className="text-xs font-normal ms-1">{t('rial')}</span>
        </p>
        <button onClick={handleSelectRide} className="mt-1 bg-sky-900 text-white py-1.5 px-5 text-sm rounded-lg font-bold hover:bg-sky-800 transition-transform hover:scale-105 duration-300">
            {t('selectRide')}
        </button>
      </div>
    </div>
  );
};

export default RideOptionCard;