import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import BookingHeader from '../components/BookingHeader';
import PaymentOption from '../components/PaymentOption';
import { CheckCircleIcon, MapPinIcon, StarIcon, UserCircleIcon, WalletIcon, CreditCardIcon, LandmarkIcon } from '../assets/icons';

const HotelReviewPage: React.FC = () => {
    const { t, language } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);
    const [selectedMethod, setSelectedMethod] = useState('bank');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!bookingContext?.selectedHotel) {
            navigate('/');
        }
    }, [bookingContext, navigate]);

    if (!bookingContext) return null;
    const { selectedHotel } = bookingContext;
    
    if (!selectedHotel) return null;
    
    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment success and navigate to confirmation page
        setTimeout(() => {
            setIsProcessing(false);
            navigate('/hotel-confirmation');
        }, 1500);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('reviewAndConfirm')} />
            <main className="p-4 pb-28 space-y-6">
                
                {/* Hotel Summary */}
                <div className="bg-white rounded-2xl shadow-md border p-4">
                    <div className="flex gap-4">
                        <img src={selectedHotel.image} alt={t(selectedHotel.nameKey)} className="w-24 h-24 rounded-lg object-cover" />
                        <div>
                            {/* FIX: Use nameKey and locationKey with translation */}
                            <h2 className="text-lg font-bold text-slate-800">{t(selectedHotel.nameKey)}</h2>
                             <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                <MapPinIcon className="w-4 h-4"/>
                                <span>{t(selectedHotel.locationKey)}</span>
                             </div>
                             <div className="flex items-center gap-1 mt-2">
                                {Array.from({ length: selectedHotel.rating }).map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Guest Info */}
                <div className="bg-white rounded-2xl shadow-md border p-4">
                    <h2 className="text-lg font-bold text-slate-800 mb-3">{t('guestInfo')}</h2>
                    <div className="flex items-center gap-3">
                        <UserCircleIcon className="w-8 h-8 text-gray-400" />
                        <div>
                            <p className="font-semibold text-gray-800">{t('pishgamanTech')}</p>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-md border p-4">
                    <h2 className="text-lg font-bold text-slate-800 mb-3">{t('paymentMethod')}</h2>
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
            <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="p-4 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">{t('totalPrice')}</p>
                        <p className="text-xl font-bold text-slate-800">
                            {selectedHotel.price.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
                            <span className="text-sm font-normal ms-1">{t('rial')}</span>
                        </p>
                    </div>
                    <button 
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="bg-sky-900 text-white py-2.5 px-6 rounded-lg font-bold hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-md shadow-sky-900/30 disabled:bg-gray-400 disabled:cursor-wait"
                    >
                        {isProcessing ? t('redirectToBank') : t('bookAndPay')}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default HotelReviewPage;