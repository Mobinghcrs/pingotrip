

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import BookingHeader from '../components/BookingHeader';
import Stepper from '../components/Stepper';
import FlightSummaryCard from '../components/FlightSummaryCard';
import TrainSummaryCard from '../components/TrainSummaryCard';
import CarSummaryCard from '../components/CarSummaryCard';
import CIPSummaryCard from '../components/CIPSummaryCard';
import InsuranceSummaryCard from '../components/InsuranceSummaryCard';
// FIX: Correct import path
import { Passenger } from '../types';

const PassengerDetailsPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);

    // For car rental, we only need one primary driver's info.
    const [passengers, setPassengers] = useState<Passenger[]>([{ id: 1, firstName: '', lastName: '', nationalId: '', gender: 'male' }]);

    useEffect(() => {
        if (!bookingContext?.selectedFlight && !bookingContext?.selectedTrain && !bookingContext?.selectedCar && !bookingContext?.selectedCIP && !bookingContext?.selectedVisa && !bookingContext?.selectedInsurance) {
            navigate('/');
        }
    }, [bookingContext, navigate]);

    if (!bookingContext) return null;
    const { selectedFlight, selectedTrain, selectedCar, selectedCIP, selectedInsurance, updatePassengers } = bookingContext;

    const handlePassengerChange = (index: number, field: keyof Omit<Passenger, 'id'>, value: string) => {
        const newPassengers = [...passengers];
        newPassengers[index] = { ...newPassengers[index], [field]: value };
        setPassengers(newPassengers);
    };

    const addPassenger = () => {
        setPassengers([...passengers, { id: Date.now(), firstName: '', lastName: '', nationalId: '', gender: 'male' }]);
    };
    
    const removePassenger = (id: number) => {
        setPassengers(passengers.filter(p => p.id !== id));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updatePassengers(passengers);
        navigate('/review');
    };

    const isAranFlight = selectedFlight?.airline === 'aranAirlines';
    const bookingSteps = isAranFlight ? ['selectSeat', 'passengerDetails', 'reviewAndConfirm', 'payment'] : ['passengerDetails', 'reviewAndConfirm', 'payment'];
    const currentStep = isAranFlight ? 2 : 1;


    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('passengerDetails')} />
            <main className="px-4 pb-24">
                <Stepper steps={bookingSteps} currentStep={currentStep} />
                
                <div className="my-6">
                    {selectedFlight && <FlightSummaryCard flight={selectedFlight} />}
                    {selectedTrain && <TrainSummaryCard train={selectedTrain} />}
                    {selectedCar && <CarSummaryCard car={selectedCar} />}
                    {selectedCIP && <CIPSummaryCard service={selectedCIP} />}
                    {selectedInsurance && <InsuranceSummaryCard plan={selectedInsurance} />}
                </div>

                <form onSubmit={handleSubmit}>
                    {passengers.map((passenger, index) => (
                        <div key={passenger.id} className="bg-white rounded-2xl shadow-md border p-4 mb-4 relative">
                           {passengers.length > 1 && !selectedCar && !selectedCIP && (
                               <button type="button" onClick={() => removePassenger(passenger.id)} className="absolute top-2 end-2 text-red-500 hover:text-red-700 font-bold text-xs">
                                   {t('remove')}
                               </button>
                           )}
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor={`firstName-${passenger.id}`} className="block text-sm font-semibold text-gray-700 mb-1">{t('firstName')}</label>
                                    <input type="text" id={`firstName-${passenger.id}`} value={passenger.firstName} onChange={e => handlePassengerChange(index, 'firstName', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                                </div>
                                <div>
                                    <label htmlFor={`lastName-${passenger.id}`} className="block text-sm font-semibold text-gray-700 mb-1">{t('lastName')}</label>
                                    <input type="text" id={`lastName-${passenger.id}`} value={passenger.lastName} onChange={e => handlePassengerChange(index, 'lastName', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                                </div>
                                <div>
                                    <label htmlFor={`nationalId-${passenger.id}`} className="block text-sm font-semibold text-gray-700 mb-1">{t('nationalId')}</label>
                                    <input type="text" id={`nationalId-${passenger.id}`} value={passenger.nationalId} onChange={e => handlePassengerChange(index, 'nationalId', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                                </div>
                                <div>
                                    <label htmlFor={`gender-${passenger.id}`} className="block text-sm font-semibold text-gray-700 mb-1">{t('gender')}</label>
                                    <select id={`gender-${passenger.id}`} value={passenger.gender} onChange={e => handlePassengerChange(index, 'gender', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none">
                                        <option value="male">{t('male')}</option>
                                        <option value="female">{t('female')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                    {!selectedCar && !selectedCIP && (
                         <button type="button" onClick={addPassenger} className="w-full border-2 border-dashed border-cyan-400 text-cyan-600 font-bold py-2.5 px-4 rounded-lg my-2 hover:bg-cyan-50">
                            {t('addPassenger')}
                        </button>
                    )}
                </form>
            </main>
             <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="p-3">
                    <button onClick={handleSubmit} className="w-full bg-sky-900 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-sky-900/40 hover:bg-sky-800 transition-all duration-200 active:scale-95">
                        {t('confirmAndContinue')}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default PassengerDetailsPage;