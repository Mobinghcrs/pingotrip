

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import BookingHeader from '../components/BookingHeader';
import Stepper from '../components/Stepper';
import FlightSummaryCard from '../components/FlightSummaryCard';
import TrainSummaryCard from '../components/TrainSummaryCard';
import CarSummaryCard from '../components/CarSummaryCard';
import CIPSummaryCard from '../components/CIPSummaryCard';
import VisaSummaryCard from '../components/VisaSummaryCard';
import InsuranceSummaryCard from '../components/InsuranceSummaryCard';
import { UserCircleIcon } from '../assets/icons';

const ReviewPage: React.FC = () => {
    const { t, language, localizeDigits } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);

    useEffect(() => {
        if (!bookingContext?.selectedFlight && !bookingContext?.selectedTrain && !bookingContext?.selectedCar && !bookingContext?.selectedCIP && !bookingContext.selectedVisa && !bookingContext.selectedInsurance) {
            navigate('/');
        }
        if (bookingContext?.passengers.length === 0 && !bookingContext.selectedVisa) {
            navigate('/passenger-details');
        }
        if(bookingContext?.selectedVisa && !bookingContext.visaApplication) {
            navigate('/visa/application');
        }
    }, [bookingContext, navigate]);

    if (!bookingContext) return null;
    const { selectedFlight, selectedTrain, selectedCar, selectedCIP, selectedVisa, selectedInsurance, passengers, visaApplication, selectedSeat } = bookingContext;

    const bookingItem = selectedFlight || selectedTrain || selectedCar || selectedCIP || selectedVisa || selectedInsurance;
    if (!bookingItem) return null;

    // Assuming a fixed 3-day rental for price calculation simplicity
    const rentalDays = 3; 

    const getItemPrice = () => {
        if (selectedCar) return selectedCar.pricePerDay;
        if (selectedFlight) return selectedFlight.price;
        if (selectedTrain) return selectedTrain.price;
        if (selectedCIP) return selectedCIP.price;
        if (selectedVisa) return selectedVisa.price;
        if (selectedInsurance) return selectedInsurance.price;
        return 0;
    }
    
    const calculateTotalPrice = () => {
        const itemPrice = getItemPrice();
        const seatPrice = selectedSeat?.price || 0;
        let total = 0;
        if (selectedCar) total = itemPrice * rentalDays;
        else if (selectedVisa || selectedInsurance) total = itemPrice;
        else total = itemPrice * (passengers.length || 1);

        return total + seatPrice;
    }

    const totalPrice = calculateTotalPrice();
    
    const isAranFlight = selectedFlight?.airline === 'aranAirlines';
    const visaFlow = !!selectedVisa;

    const getBookingSteps = () => {
        if (visaFlow) return ['application', 'reviewAndConfirm', 'payment'];
        if (isAranFlight) return ['selectSeat', 'passengerDetails', 'reviewAndConfirm', 'payment'];
        return ['passengerDetails', 'reviewAndConfirm', 'payment'];
    };

    const getCurrentStep = () => {
        if (visaFlow) return 2;
        if (isAranFlight) return 3;
        return 2;
    };

    const bookingSteps = getBookingSteps();
    const currentStep = getCurrentStep();


    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('reviewAndConfirm')} />
            <main className="px-4 pb-28">
                <Stepper steps={bookingSteps} currentStep={currentStep} />

                <div className="mt-6 bg-white rounded-2xl shadow-md border">
                    <div className="p-4">
                        <h2 className="text-lg font-bold text-slate-800 mb-3">{t('bookingSummary')}</h2>
                        {selectedFlight && <FlightSummaryCard flight={selectedFlight} />}
                        {selectedTrain && <TrainSummaryCard train={selectedTrain} />}
                        {selectedCar && <CarSummaryCard car={selectedCar} />}
                        {selectedCIP && <CIPSummaryCard service={selectedCIP} />}
                        {selectedVisa && visaApplication && <VisaSummaryCard visa={selectedVisa} application={visaApplication} />}
                        {selectedInsurance && <InsuranceSummaryCard plan={selectedInsurance} />}
                    </div>

                    <div className="border-t p-4">
                        <h2 className="text-lg font-bold text-slate-800 mb-3">{selectedVisa ? t('applicantInfo') : selectedInsurance ? t('insuredPerson') : t('passengersInfo')}</h2>
                        <div className="space-y-3">
                            {selectedVisa && visaApplication ? (
                                 <div className="flex items-center gap-3">
                                    <UserCircleIcon className="w-8 h-8 text-gray-400 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{visaApplication.personal.firstName} {visaApplication.personal.lastName}</p>
                                        <p className="text-xs text-gray-500">{t('nationality')}: {visaApplication.personal.nationality}</p>
                                    </div>
                                </div>
                            ) : passengers.map(p => (
                                <div key={p.id} className="flex items-center gap-3">
                                    <UserCircleIcon className="w-8 h-8 text-gray-400 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{p.firstName} {p.lastName}</p>
                                        <p className="text-xs text-gray-500">{t('nationalId')}: {p.nationalId} {isAranFlight && selectedSeat ? `| ${t('seat')}: ${selectedSeat.id}` : ''}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t p-4">
                        <h2 className="text-lg font-bold text-slate-800 mb-3">{t('priceSummary')}</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-gray-600">
                                {/* FIX: Changed 'flights' key to 'flight' for singular translation */}
                                <span>{selectedCar ? `${localizeDigits(rentalDays)} ${t('perDay')}` : selectedVisa ? t('visaService') : selectedInsurance ? t('insuranceService') : `${localizeDigits(passengers.length)} x ${t(selectedFlight ? 'flight' : selectedTrain ? 'train' : 'cipService')}`}</span>
                                <span>{getItemPrice().toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')} {t('rial')}</span>
                            </div>
                             {selectedSeat && selectedSeat.price > 0 && (
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>{t('seatPrice')} ({t('seat')} {selectedSeat.id})</span>
                                    <span>+{selectedSeat.price.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')} {t('rial')}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center font-bold text-lg text-slate-800 pt-2">
                                <span>{t('totalPrice')}</span>
                                <span>{totalPrice.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')} {t('rial')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="p-3 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">{t('totalPrice')}</p>
                        <p className="text-xl font-bold text-slate-800">
                            {totalPrice.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
                            <span className="text-sm font-normal ms-1">{t('rial')}</span>
                        </p>
                    </div>
                    <button onClick={() => navigate('/payment')} className="bg-sky-900 text-white py-3 px-6 rounded-xl font-bold text-base shadow-lg shadow-sky-900/40 hover:bg-sky-800 transition-all duration-200 active:scale-95">
                        {t('confirmAndPay')}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ReviewPage;