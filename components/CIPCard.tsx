import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CIPService } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { BookingContext } from '../contexts/BookingContext';
import { CheckCircleIcon } from '../assets/icons';

interface CIPCardProps {
  service: CIPService;
}

const CIPCard: React.FC<CIPCardProps> = ({ service }) => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const bookingContext = useContext(BookingContext);

  if (!bookingContext) {
    return null;
  }

  const { selectCIP } = bookingContext;

  const handleSelect = () => {
    selectCIP(service);
    navigate('/passenger-details');
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700 overflow-hidden">
      <img src={service.image} alt={t(service.loungeNameKey)} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{t(service.loungeNameKey)}</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400">{t(service.airport)}</p>
        
        <ul className="mt-4 space-y-2">
            {service.features.map(feature => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                    <CheckCircleIcon className="w-5 h-5 text-green-500"/>
                    <span>{t(feature)}</span>
                </li>
            ))}
        </ul>
      </div>

      <div className="bg-gray-50 dark:bg-slate-800/50 p-4 flex items-center justify-between border-t dark:border-slate-700">
         <div>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {service.price.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-400 -mt-1">{t('rial')}</p>
        </div>
        <button onClick={handleSelect} className="bg-sky-900 text-white py-2.5 px-6 rounded-lg font-bold hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-md shadow-sky-900/30">
            {t('bookCIP')}
        </button>
      </div>
    </div>
  );
};

export default CIPCard;