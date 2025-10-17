import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InsurancePlan } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { BookingContext } from '../contexts/BookingContext';
import { CheckCircleIcon } from '../assets/icons';

interface InsurancePlanCardProps {
  plan: InsurancePlan;
}

const InsurancePlanCard: React.FC<InsurancePlanCardProps> = ({ plan }) => {
  const { t, language, localizeDigits } = useTranslation();
  const navigate = useNavigate();
  const bookingContext = useContext(BookingContext);

  if (!bookingContext) {
    return null;
  }

  const { selectInsurance } = bookingContext;

  const handleSelect = () => {
    selectInsurance(plan);
    navigate('/passenger-details');
  };

  const formatCoverage = (amount: number) => {
    return `${t('upTo')} ${amount.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')} ${t('rial')}`;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700 overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{t(plan.planNameKey)}</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400">{t(plan.providerKey)}</p>
        
        <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                <CheckCircleIcon className="w-5 h-5 text-green-500"/>
                <span>{t('medicalCoverage')}: {formatCoverage(plan.coverage.medical)}</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                <CheckCircleIcon className="w-5 h-5 text-green-500"/>
                <span>{t('tripCancellation')}: {formatCoverage(plan.coverage.cancellation)}</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                <CheckCircleIcon className="w-5 h-5 text-green-500"/>
                <span>{t('baggageLoss')}: {formatCoverage(plan.coverage.baggage)}</span>
            </li>
        </ul>
      </div>

      <div className="bg-gray-50 dark:bg-slate-800/50 p-4 flex items-center justify-between border-t dark:border-slate-700">
         <div>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {plan.price.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-400 -mt-1">{t('rial')}</p>
        </div>
        <button onClick={handleSelect} className="bg-sky-900 text-white py-2.5 px-6 rounded-lg font-bold hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-md shadow-sky-900/30">
            {t('selectPlan')}
        </button>
      </div>
    </div>
  );
};

export default InsurancePlanCard;