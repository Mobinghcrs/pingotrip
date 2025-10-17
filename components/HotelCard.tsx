import React from 'react';
import { Link } from 'react-router-dom';
// FIX: Correct import path
import { Hotel } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { StarIcon, MapPinIcon } from '../assets/icons';

interface HotelCardProps {
  hotel: Hotel;
  basePath: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, basePath }) => {
  const { t, language, localizeDigits } = useTranslation();

  return (
    <Link to={`${basePath}/${hotel.id}`} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700 overflow-hidden block">
      <div className="relative">
          <img src={hotel.image} alt={t(hotel.nameKey)} className="w-full h-40 object-cover" />
          <div className="absolute top-2 end-2 bg-black/40 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
              <span>{localizeDigits(hotel.rating)}</span>
          </div>
      </div>
      <div className="p-4">
        <h3 className="text-md font-bold text-slate-800 dark:text-slate-100 truncate">{t(hotel.nameKey)}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-slate-400 mt-1">
          <MapPinIcon className="w-4 h-4"/>
          <span>{t(hotel.locationKey)}</span>
        </div>
        <div className="mt-4 text-end">
            <p className="text-sm text-gray-500 dark:text-slate-400">{t('startsFrom')}</p>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {hotel.price.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
                <span className="text-sm font-normal ms-1 dark:text-slate-400">{t('rial')} / {t('perNight')}</span>
            </p>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;