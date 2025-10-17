import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { GlobeIcon, VisaIcon, ChevronDownIcon } from '../assets/icons';
import { MOCK_VISA_SERVICES } from '../constants';
import { BookingContext } from '../contexts/BookingContext';

const VisaPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);

    const [selectedVisaId, setSelectedVisaId] = useState(MOCK_VISA_SERVICES[0].id);
    const selectedVisa = MOCK_VISA_SERVICES.find(v => v.id === selectedVisaId);

    if (!bookingContext || !selectedVisa) return null;
    const { selectVisa } = bookingContext;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        selectVisa(selectedVisa);
        navigate('/visa/application');
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <BookingHeader title={t('visaPageTitle')} />
            <main>
                 <div className="relative h-64">
                    <img src="https://picsum.photos/seed/visa-hero/400/600" className="absolute inset-0 w-full h-full object-cover" alt="Travel Visa" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
                     <div className="relative p-4 flex flex-col h-full justify-end">
                         <h1 className="text-3xl font-extrabold text-white drop-shadow-lg mb-2">{t('visaSimplified')}</h1>
                    </div>
                </div>

                <div className="p-4 space-y-6 -mt-10 relative z-10">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-5">
                         <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('selectDestinationCountry')}</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <GlobeIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <select 
                                        value={selectedVisaId}
                                        onChange={(e) => setSelectedVisaId(Number(e.target.value))}
                                        className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none appearance-none"
                                    >
                                        {MOCK_VISA_SERVICES.map(visa => (
                                            <option key={visa.id} value={visa.id}>{t(visa.country)}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 end-0 flex items-center px-3.5 pointer-events-none">
                                        <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('visaType')}</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <VisaIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input type="text" readOnly value={t(selectedVisa.visaType)} className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-gray-100" />
                                </div>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <span className="text-gray-600">{t('processingTime')}</span>
                                    <span className="font-semibold text-slate-700">{selectedVisa.processingTime} {t('days')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-semibold">{t('totalPrice')}</span>
                                    <span className="font-bold text-xl text-sky-900">{selectedVisa.price.toLocaleString()} {t('rial')}</span>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30">
                                {t('startApplication')}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VisaPage;