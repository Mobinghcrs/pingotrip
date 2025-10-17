import React from 'react';
import { PointOfInterest } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { StarIcon, MapPinIcon } from '../assets/icons';

interface POICardProps {
  poi: PointOfInterest;
}

const POICard: React.FC<POICardProps> = ({ poi }) => {
  const { t, localizeDigits } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700 overflow-hidden flex items-center">
      <img src={poi.image} alt={t(poi.nameKey)} className="w-24 h-24 object-cover" />
      <div className="p-3 flex-grow">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 truncate">{t(poi.nameKey)}</h3>
        <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">{t(poi.category)}</p>
        <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                <MapPinIcon className="w-3 h-3"/>
                <span>{localizeDigits(poi.distance)} {t('kmAway')}</span>
            </div>
             <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <StarIcon className="w-4 h-4 fill-current"/>
                <span>{localizeDigits(poi.rating)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default POICard;