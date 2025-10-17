import React from 'react';
import { Link } from 'react-router-dom';
// FIX: Correct import path
import { Car } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { UsersIcon, CogIcon, FuelIcon } from '../assets/icons';

interface CarCardProps {
  car: Car;
}

const CarSpec = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-slate-300">
        {icon}
        <span className="font-medium">{text}</span>
    </div>
);

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { t, language, localizeDigits } = useTranslation();

  return (
    <Link to={`/car-rental/${car.id}`} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700 overflow-hidden block group transition-all duration-300 hover:shadow-lg hover:border-cyan-300 dark:hover:border-cyan-700">
      <div className="flex">
        <div className="w-1/3 flex-shrink-0">
          <img src={car.image} alt={t(car.nameKey)} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-100 truncate">{t(car.nameKey)}</h3>
            <div className="flex items-center gap-3 mt-2">
                <CarSpec icon={<UsersIcon className="w-4 h-4" />} text={localizeDigits(car.seats)} />
                <CarSpec icon={<CogIcon className="w-4 h-4" />} text={t(car.transmission)} />
            </div>
          </div>
          <div className="mt-3 flex justify-between items-end">
            <div>
              <p className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
                  {car.pricePerDay.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-400 -mt-1">{t('rial')} / {t('perDay')}</p>
            </div>
            <span className="bg-sky-900 text-white py-2 px-4 rounded-lg text-sm font-bold group-hover:bg-sky-800 transition-colors">
              {t('viewDeal')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;