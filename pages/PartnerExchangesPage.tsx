import React, { useState } from 'react';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_CITIES, MOCK_EXCHANGES } from '../constants';
import { StoreIcon, MapPinIcon } from '../assets/icons';

const PartnerExchangesPage = () => {
    const { t } = useTranslation();
    const [selectedCityId, setSelectedCityId] = useState(MOCK_CITIES[0].id);

    const filteredExchanges = MOCK_EXCHANGES.filter(ex => ex.cityId === selectedCityId);

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('partnerExchanges')} />
            <main className="p-4 space-y-4">
                <div className="bg-white rounded-2xl shadow-md p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t('selectCity')}</label>
                    <select 
                        value={selectedCityId} 
                        onChange={e => setSelectedCityId(e.target.value)} 
                        className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                    >
                        {MOCK_CITIES.map(city => <option key={city.id} value={city.id}>{t(city.nameKey)}</option>)}
                    </select>
                </div>
                
                <div className="space-y-4">
                    {filteredExchanges.map(exchange => (
                        <div key={exchange.id} className="bg-white rounded-2xl shadow-sm border p-4">
                            <div className="flex items-center gap-4 mb-3">
                                <StoreIcon className="w-8 h-8 text-sky-900" />
                                <div>
                                    <h3 className="font-bold text-slate-800">{t(exchange.nameKey)}</h3>
                                    <p className="text-sm text-gray-500">{t(exchange.addressKey)}</p>
                                </div>
                            </div>
                            <a href={exchange.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-cyan-600 font-semibold p-2 bg-cyan-50 rounded-md hover:bg-cyan-100 transition-colors">
                                <MapPinIcon className="w-4 h-4" />
                                <span>{t('viewOnMap')}</span>
                            </a>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default PartnerExchangesPage;