import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_HEALTH_SERVICES } from '../constants';
import { CalendarIcon, SearchIcon, HeartPulseIcon, ChevronDownIcon } from '../assets/icons';
import { BookingContext } from '../contexts/BookingContext';

const HealthServicesPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);
    const [treatmentId, setTreatmentId] = React.useState(MOCK_HEALTH_SERVICES[0].id);
    const [date, setDate] = React.useState('۱۴۰۳/۱۲/۱۰');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookingContext) return;
        
        bookingContext.startHealthFlow({ treatmentId, date });
        
        const query = new URLSearchParams({ treatment: treatmentId, date }).toString();
        navigate(`/health-services/booking?${query}`);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('healthServicesPageTitle')} />
            <main className="p-4">
                <div className="bg-white rounded-2xl shadow-lg p-5 mt-4">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div>
                            <label htmlFor="treatment-type" className="block text-sm font-semibold text-gray-700 mb-1">{t('treatmentType')}</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <HeartPulseIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <select 
                                    id="treatment-type" 
                                    value={treatmentId}
                                    onChange={e => setTreatmentId(e.target.value)}
                                    className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none appearance-none"
                                >
                                    <option value="" disabled>{t('selectTreatment')}</option>
                                    {MOCK_HEALTH_SERVICES.map(treatmentItem => <option key={treatmentItem.id} value={treatmentItem.id}>{t(treatmentItem.nameKey)}</option>)}
                                </select>
                                <div className="absolute inset-y-0 end-0 flex items-center px-3.5 pointer-events-none">
                                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="appointment-date" className="block text-sm font-semibold text-gray-700 mb-1">{t('appointmentDate')}</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <input 
                                    type="text" 
                                    id="appointment-date" 
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30 mt-4">
                            <SearchIcon className="w-5 h-5" />
                            {t('searchAppointments')}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default HealthServicesPage;