import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import BookingHeader from '../components/BookingHeader';
import PaymentOption from '../components/PaymentOption';
// FIX: Correctly import MOCK_HEALTH_SERVICES instead of the non-existent MOCK_TREATMENTS.
import { MOCK_APPOINTMENT_TIMES, MOCK_HEALTH_SERVICES } from '../constants';
import { WalletIcon, CreditCardIcon, LandmarkIcon } from '../assets/icons';

const AppointmentBookingPage: React.FC = () => {
    const { t, localizeDigits, language } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);
    
    const [selectedTime, setSelectedTime] = useState('');
    const [patientName, setPatientName] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('bank');

    // FIX: Redirect if the specific flow state is not present in the context.
    // On refresh, this state will be null, guaranteeing a redirect to home.
    if (!bookingContext || !bookingContext.healthFlowState) {
        return <Navigate to="/" replace />;
    }
    
    const { healthFlowState, selectAppointment } = bookingContext;
    const { treatmentId, date } = healthFlowState;

    const treatment = MOCK_HEALTH_SERVICES.find(t => t.id === treatmentId);

    // This handles a rare edge case where the treatmentId from context is invalid.
    if (!treatment) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTime || !patientName) return;

        const appointment = {
            treatment: t(treatment.nameKey),
            date,
            time: selectedTime,
            patientName,
            price: treatment.price,
            ref: `PGM-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
        };
        selectAppointment(appointment);
        navigate('/health-services/confirmation');
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('appointmentBooking')} />
            <main className="px-4 pb-40">
                <div className="bg-cyan-50 border border-cyan-200 text-sky-900 text-sm p-3 rounded-2xl my-4 text-center shadow-sm">
                    {t(treatment.nameKey)} - {date}
                </div>

                <div className="bg-white rounded-2xl shadow-md border p-4">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">{t('availableTimes')}</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {MOCK_APPOINTMENT_TIMES.map(time => (
                            <button 
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 rounded-lg font-mono text-lg font-bold transition-colors ${
                                    selectedTime === time 
                                    ? 'bg-sky-900 text-white shadow-md' 
                                    : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                                }`}
                            >
                                {localizeDigits(time)}
                            </button>
                        ))}
                    </div>
                </div>

                 <div className="bg-white rounded-2xl shadow-md border p-4 mt-6">
                    <label htmlFor="patient-name" className="block text-sm font-semibold text-gray-700 mb-1">{t('patientName')}</label>
                    <input 
                        type="text" 
                        id="patient-name" 
                        value={patientName}
                        onChange={e => setPatientName(e.target.value)}
                        required
                        className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" 
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-md border p-4 mt-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">{t('paymentMethod')}</h3>
                    <div className="space-y-2">
                         <PaymentOption
                            icon={<WalletIcon className="w-6 h-6 text-cyan-600" />}
                            title={t('pingoWallet')}
                            isSelected={selectedMethod === 'wallet'}
                            onClick={() => setSelectedMethod('wallet')}
                        />
                        <PaymentOption
                            icon={<CreditCardIcon className="w-6 h-6 text-cyan-600" />}
                            title={t('bankGateway')}
                            isSelected={selectedMethod === 'bank'}
                            onClick={() => setSelectedMethod('bank')}
                        />
                        <PaymentOption
                            icon={<LandmarkIcon className="w-6 h-6 text-cyan-600" />}
                            title={t('pingoCredit')}
                            isSelected={selectedMethod === 'credit'}
                            onClick={() => setSelectedMethod('credit')}
                        />
                    </div>
                </div>
            </main>
             <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="p-3">
                    <div className="flex justify-between items-center text-sm px-1 mb-2">
                        <span className="text-gray-500">{t('totalPrice')}</span>
                        <span className="font-bold text-lg text-slate-800">
                            {treatment.price.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')} {t('rial')}
                        </span>
                    </div>
                    <button onClick={handleSubmit} disabled={!selectedTime || !patientName} className="w-full bg-sky-900 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-sky-900/40 hover:bg-sky-800 transition-all duration-200 active:scale-95 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed">
                        {t('confirmAndPay')}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default AppointmentBookingPage;