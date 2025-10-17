import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import BookingHeader from '../components/BookingHeader';
import Stepper from '../components/Stepper';
import PaymentOption from '../components/PaymentOption';
import { CheckCircleIcon, WalletIcon, CreditCardIcon, LandmarkIcon } from '../assets/icons';

const PaymentPage: React.FC = () => {
    const { t, language } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [bookingType, setBookingType] = useState<'flight' | 'train' | 'car' | 'cip' | 'visa' | 'insurance' | null>(null);
    const [selectedMethod, setSelectedMethod] = useState('bank');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!bookingContext || (!bookingContext.selectedFlight && !bookingContext.selectedTrain && !bookingContext.selectedCar && !bookingContext.selectedCIP && !bookingContext.selectedVisa && !bookingContext.selectedInsurance)) {
            navigate('/');
        } else {
             if (bookingContext.selectedFlight) setBookingType('flight');
             else if (bookingContext.selectedTrain) setBookingType('train');
             else if (bookingContext.selectedCar) setBookingType('car');
             else if (bookingContext.selectedCIP) setBookingType('cip');
             else if (bookingContext.selectedVisa) setBookingType('visa');
             else if (bookingContext.selectedInsurance) setBookingType('insurance');
        }
    }, [bookingContext, navigate]);

    if (!bookingContext) return null;
    const { selectedFlight, selectedTrain, selectedCar, selectedCIP, selectedVisa, selectedInsurance, passengers, selectedSeat, clearBooking } = bookingContext;

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

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment success
        setTimeout(() => {
            if (bookingType === 'flight') {
                // Navigate to the dedicated confirmation page. It will handle clearing the context.
                navigate('/flight-confirmation');
            } else {
                setPaymentSuccess(true);
                // For other types, show generic success and clear context here.
                clearBooking();
            }
            setIsProcessing(false);
        }, 1500);
    };
    
    // FIX: Use 'aranAirlines' for consistency with other components.
    const isAranFlight = selectedFlight?.airline === 'aranAirlines';
    const visaFlow = !!selectedVisa;
    
    const getBookingSteps = () => {
        if (visaFlow) return ['application', 'reviewAndConfirm', 'payment'];
        if (isAranFlight) return ['selectSeat', 'passengerDetails', 'reviewAndConfirm', 'payment'];
        return ['passengerDetails', 'reviewAndConfirm', 'payment'];
    };

    const getCurrentStep = () => {
        if (visaFlow) return 3;
        if (isAranFlight) return 4;
        return 3;
    };

    const bookingSteps = getBookingSteps();
    const currentStep = getCurrentStep();


    if (paymentSuccess) {
        const getSuccessMessage = () => {
            switch (bookingType) {
                case 'train': return t('trainBookingSuccessSub');
                case 'car': return t('carBookingSuccessSub');
                case 'cip': return t('cipBookingSuccessSub');
                case 'visa': return t('visaBookingSuccessSub');
                case 'insurance': return t('insuranceBookingSuccessSub');
                default: return t('paymentSuccessMsg');
            }
        };

        return (
            <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center text-center p-4">
                <CheckCircleIcon className="w-24 h-24 text-green-500 mb-4" />
                <h1 className="text-2xl font-bold text-slate-800">{t('paymentSuccess')}</h1>
                <p className="text-gray-600 mt-2 mb-6">{getSuccessMessage()}</p>
                <button onClick={() => navigate('/')} className="bg-sky-900 text-white py-2.5 px-6 rounded-lg font-bold">
                    {t('backToHome')}
                </button>
            </div>
        )
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('payment')} />
            <main className="px-4 pb-28">
                <Stepper steps={bookingSteps} currentStep={currentStep} />

                 <div className="mt-6 bg-white rounded-2xl shadow-md border p-4 space-y-4">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">{t('finalPrice')}</p>
                        <p className="text-3xl font-bold text-slate-800 my-1">
                            {totalPrice.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
                            <span className="text-lg font-normal ms-1">{t('rial')}</span>
                        </p>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-bold text-slate-700 mb-3">{t('paymentMethod')}</h3>
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
                 </div>
            </main>
            <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="p-3">
                    <button 
                        onClick={handlePayment} 
                        disabled={isProcessing}
                        className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-green-600/40 hover:bg-green-700 transition-all duration-200 active:scale-95 disabled:bg-gray-400 disabled:cursor-wait">
                        {isProcessing ? t('redirectToBank') : t('payNow')}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default PaymentPage;