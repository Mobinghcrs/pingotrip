import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ExchangeAppointment } from '../../types';
import { DollarSignIcon, CoinIcon } from '../../assets/icons';

interface ServiceStepProps {
    details: Partial<ExchangeAppointment>;
    onUpdate: (details: Partial<ExchangeAppointment>) => void;
}

const ServiceButton = ({ icon, text, onClick, isSelected }: { icon: React.ReactNode; text: string; onClick: () => void; isSelected: boolean }) => (
    <button 
        onClick={onClick}
        className={`w-full p-4 border-2 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
            isSelected ? 'bg-cyan-50 border-cyan-500 shadow-md' : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/50'
        }`}
    >
        {icon}
        <span className="font-bold text-slate-800">{text}</span>
    </button>
);


const ServiceStep: React.FC<ServiceStepProps> = ({ details, onUpdate }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-2xl shadow-md border p-4 animate-fade-in-down">
            <h3 className="text-lg font-bold text-slate-800 mb-4">{t('selectService')}</h3>
            <div className="grid grid-cols-2 gap-4">
                <ServiceButton 
                    icon={<DollarSignIcon className="w-8 h-8 text-sky-900" />}
                    text={t('buyCurrency')}
                    isSelected={details.service === 'currency'}
                    onClick={() => onUpdate({ service: 'currency' })}
                />
                <ServiceButton 
                    icon={<CoinIcon className="w-8 h-8 text-sky-900" />}
                    text={t('buyCoin')}
                    isSelected={details.service === 'coin'}
                    onClick={() => onUpdate({ service: 'coin', currencyType: undefined })}
                />
            </div>

            {details.service === 'currency' && (
                <div className="mt-6 border-t pt-4 animate-fade-in-down">
                     <h4 className="font-semibold text-slate-700 mb-3">{t('selectYourCurrency')}</h4>
                     <div className="flex justify-center gap-2">
                        {(['USD', 'EUR', 'GBP'] as const).map(currency => (
                            <button
                                key={currency}
                                onClick={() => onUpdate({ currencyType: currency })}
                                className={`py-2 px-6 rounded-full font-semibold transition-colors ${
                                    details.currencyType === currency ? 'bg-sky-900 text-white' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                                }`}
                            >
                                {t(currency.toLowerCase())}
                            </button>
                        ))}
                     </div>
                </div>
            )}
        </div>
    );
};

export default ServiceStep;
