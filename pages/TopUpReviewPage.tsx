import React, { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { BookingContext } from '../contexts/BookingContext';
import BookingHeader from '../components/BookingHeader';
import PaymentOption from '../components/PaymentOption';
import { WalletIcon, CreditCardIcon, LandmarkIcon } from '../assets/icons';

const TopUpReviewPage: React.FC = () => {
    const { t, localizeDigits, language } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);
    const [selectedMethod, setSelectedMethod] = useState('bank');
    
    if (!bookingContext || !bookingContext.selectedTopUp) {
        return <Navigate to="/topup" replace />;
    }

    const { selectedTopUp } = bookingContext;

    const handlePay = () => {
        // Simulate payment and navigate to confirmation
        navigate('/topup-confirmation');
    };

    const DetailRow = ({ label, value }: { label: string; value: string }) => (
        <div className="flex justify-between py-3 border-b border-gray-100 last:border-b-0">
            <span className="text-gray-600">{label}</span>
            <span className="font-semibold text-slate-700">{value}</span>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('reviewAndConfirm')} />
            <main className="p-4 pb-28 space-y-6">
                <div className="bg-white rounded-2xl shadow-md border p-4">
                    {/* FIX: Use renamed key `topUpDetailsLabel` to avoid conflicts. */}
                    <h2 className="text-lg font-bold text-slate-800 mb-3 text-center">{t('topUpDetailsLabel')}</h2>
                    <div className="divide-y divide-gray-100">
                        <DetailRow label={t('mobileNumber')} value={localizeDigits(selectedTopUp.mobileNumber)} />
                        <DetailRow label={t('operator')} value={t(selectedTopUp.operator)} />
                        <DetailRow label={t('topUpAmount')} value={`${selectedTopUp.amount.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')} ${t('toman')}`} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md border p-4">
                    <h2 className="text-lg font-bold text-slate-800 mb-3">{t('paymentMethod')}</h2>
                    <div className="space-y-2">
                        <PaymentOption icon={<WalletIcon className="w-6 h-6 text-cyan-600" />} title={t('pingoWallet')} isSelected={selectedMethod === 'wallet'} onClick={() => setSelectedMethod('wallet')} />
                        <PaymentOption icon={<CreditCardIcon className="w-6 h-6 text-cyan-600" />} title={t('bankGateway')} isSelected={selectedMethod === 'bank'} onClick={() => setSelectedMethod('bank')} />
                        <PaymentOption icon={<LandmarkIcon className="w-6 h-6 text-cyan-600" />} title={t('pingoCredit')} isSelected={selectedMethod === 'credit'} onClick={() => setSelectedMethod('credit')} />
                    </div>
                </div>
            </main>
            <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-t p-3">
                <div className="flex justify-between items-center px-1 mb-2">
                    <span className="text-sm text-gray-600">{t('totalPrice')}</span>
                    <span className="text-xl font-bold text-sky-900">{localizeDigits(selectedTopUp.amount.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR'))} {t('toman')}</span>
                </div>
                <button onClick={handlePay} className="w-full bg-sky-900 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-sky-900/40 hover:bg-sky-800 transition-all duration-200 active:scale-95">
                    {t('confirmAndPay')}
                </button>
            </footer>
        </div>
    );
};

export default TopUpReviewPage;