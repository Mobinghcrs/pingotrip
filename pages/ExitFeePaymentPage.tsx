import React, { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ExitFeeContext } from '../contexts/ExitFeeContext';
import BookingHeader from '../components/BookingHeader';
import PaymentOption from '../components/PaymentOption';
import { WalletIcon, CreditCardIcon, LandmarkIcon } from '../assets/icons';

const ExitFeePaymentPage = () => {
    const { t, localizeDigits, language } = useTranslation();
    const navigate = useNavigate();
    const exitFeeContext = useContext(ExitFeeContext);
    const [selectedMethod, setSelectedMethod] = useState('bank');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!exitFeeContext || !exitFeeContext.details) {
        return <Navigate to="/exit-fee" replace />;
    }

    const { details, setFeeDetails } = exitFeeContext;

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment success
        setTimeout(() => {
            const transactionId = `PGEF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            setFeeDetails({ ...details, transactionId });
            setIsProcessing(false);
            navigate('/exit-fee/confirmation');
        }, 1500);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('payment')} />
            <main className="p-4 pb-28">
                 <div className="bg-white rounded-2xl shadow-md border p-4 space-y-4">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">{t('finalPrice')}</p>
                        <p className="text-3xl font-bold text-slate-800 my-1">
                            {details.feeAmount.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
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
                    <button onClick={handlePayment} disabled={isProcessing} className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-green-600/40 hover:bg-green-700 transition-all duration-200 active:scale-95 disabled:bg-gray-400 disabled:cursor-wait">
                        {isProcessing ? t('redirectToBank') : t('payNow')}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ExitFeePaymentPage;