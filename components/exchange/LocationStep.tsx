import React, { useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ExchangeAppointment } from '../../types';
import { MOCK_CITIES, MOCK_EXCHANGES } from '../../constants';
import { MapPinIcon, StoreIcon, ChevronDownIcon } from '../../assets/icons';

interface LocationStepProps {
    details: Partial<ExchangeAppointment>;
    onUpdate: (details: Partial<ExchangeAppointment>) => void;
}

const LocationStep: React.FC<LocationStepProps> = ({ details, onUpdate }) => {
    const { t } = useTranslation();

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onUpdate({ cityId: e.target.value, exchangeOfficeId: '' });
    };

    const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onUpdate({ exchangeOfficeId: e.target.value });
    };

    const availableExchanges = MOCK_EXCHANGES.filter(ex => ex.cityId === details.cityId);
    
    // Auto-select first branch if only one is available
    useEffect(() => {
        if(availableExchanges.length === 1 && !details.exchangeOfficeId) {
            onUpdate({ exchangeOfficeId: availableExchanges[0].id });
        }
    }, [availableExchanges, details.exchangeOfficeId, onUpdate]);

    return (
        <div className="bg-white rounded-2xl shadow-md border p-4 space-y-4 animate-fade-in-down">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('selectCity')}</label>
                <div className="relative">
                    <MapPinIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                    <select value={details.cityId} onChange={handleCityChange} className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none appearance-none">
                        {MOCK_CITIES.map(city => <option key={city.id} value={city.id}>{t(city.nameKey)}</option>)}
                    </select>
                    <ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 end-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('selectBranch')}</label>
                <div className="relative">
                    <StoreIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                    <select value={details.exchangeOfficeId} onChange={handleBranchChange} className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none appearance-none" disabled={!availableExchanges.length}>
                        <option value="">{t('selectBranch')}</option>
                        {/* FIX: Use t(ex.nameKey) instead of ex.name */}
                        {availableExchanges.map(ex => <option key={ex.id} value={ex.id}>{t(ex.nameKey)}</option>)}
                    </select>
                     <ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 end-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default LocationStep;