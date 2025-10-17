import React, { useState } from 'react';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { ExchangeAppointment } from '../types';
import { MOCK_CITIES } from '../constants';
import Stepper from '../components/Stepper';
import LocationStep from '../components/exchange/LocationStep';
import DateTimeStep from '../components/exchange/DateTimeStep';
import ExpertStep from '../components/exchange/ExpertStep';
import ServiceStep from '../components/exchange/ServiceStep';
import ConfirmationStep from '../components/exchange/ConfirmationStep';

const ExchangeAppointmentPage = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [appointmentDetails, setAppointmentDetails] = useState<Partial<ExchangeAppointment>>({
        cityId: MOCK_CITIES[0].id,
        exchangeOfficeId: '',
        date: null,
        time: '',
        expertId: '',
        service: undefined,
        currencyType: undefined
    });

    const updateDetails = (details: Partial<ExchangeAppointment>) => {
        setAppointmentDetails(prev => ({ ...prev, ...details }));
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);
    const resetFlow = () => {
        setStep(1);
        setAppointmentDetails({
            cityId: MOCK_CITIES[0].id,
            exchangeOfficeId: '',
            date: null,
            time: '',
            expertId: '',
            service: undefined,
            currencyType: undefined
        });
    };

    const STEPS = t('appointmentSteps').split(',');

    const renderCurrentStep = () => {
        switch (step) {
            case 1:
                return <LocationStep details={appointmentDetails} onUpdate={updateDetails} />;
            case 2:
                return <DateTimeStep details={appointmentDetails} onUpdate={updateDetails} />;
            case 3:
                return <ExpertStep details={appointmentDetails} onUpdate={updateDetails} />;
            case 4:
                return <ServiceStep details={appointmentDetails} onUpdate={updateDetails} />;
            case 5:
                return <ConfirmationStep details={appointmentDetails as ExchangeAppointment} onReset={resetFlow} />;
            default:
                return <LocationStep details={appointmentDetails} onUpdate={updateDetails} />;
        }
    };
    
    const isNextDisabled = () => {
        switch (step) {
            case 1: return !appointmentDetails.exchangeOfficeId;
            case 2: return !appointmentDetails.date || !appointmentDetails.time;
            case 3: return !appointmentDetails.expertId;
            case 4: return !appointmentDetails.service || (appointmentDetails.service === 'currency' && !appointmentDetails.currencyType);
            default: return true;
        }
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('exchangeAppointment')} />
            <main className="p-4 pb-24">
                <Stepper steps={STEPS} currentStep={step} />
                <div className="mt-6">
                    {renderCurrentStep()}
                </div>
            </main>
            {step < 5 && (
                 <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                    <div className="p-3 flex items-center gap-3">
                        {step > 1 && (
                             <button onClick={prevStep} className="w-1/3 bg-gray-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors">
                                {t('previous')}
                            </button>
                        )}
                        <button onClick={step === 4 ? nextStep : nextStep} disabled={isNextDisabled()} className="flex-grow bg-sky-900 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-sky-900/40 hover:bg-sky-800 transition-all duration-200 active:scale-95 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed">
                           {step === 4 ? t('confirmAndBook') : t('next')}
                        </button>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default ExchangeAppointmentPage;
