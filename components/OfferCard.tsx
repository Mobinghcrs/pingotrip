import React from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { TagIcon } from '../assets/icons';

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const { t } = useTranslation();

  return (
    <Link to={offer.link} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700 overflow-hidden block group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
          <img src={offer.image} alt={t(offer.titleKey)} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
          {offer.discount && (
            <div className="absolute top-3 end-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                <TagIcon className="w-4 h-4"/>
                <span>{t('discount')} {offer.discount}</span>
            </div>
          )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 truncate">{t(offer.titleKey)}</h3>
        <p className="text-sm text-gray-600 dark:text-slate-300 mt-1 h-10">{t(offer.descriptionKey)}</p>
        <div className="mt-4 text-end">
            <span className="bg-sky-900 text-white py-2 px-5 rounded-lg font-bold group-hover:bg-sky-800 transition-colors">
                {t('viewDetails')}
            </span>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;