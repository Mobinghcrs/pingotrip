import React, { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { BookingContext } from '../contexts/BookingContext';
import BookingHeader from '../components/BookingHeader';
import PaymentOption from '../components/PaymentOption';
import { MOCK_GIFT_CARD_BRANDS } from '../constants';
import { WalletIcon, CreditCardIcon, LandmarkIcon } from '../assets/icons';

const GiftCardReviewPage: React.FC = () => {
    const { t, language, localizeDigits } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);
    const [selectedMethod, setSelectedMethod] = useState('bank');
    
    if (!bookingContext || !bookingContext.giftCardPurchase) {
        return <Navigate to="/currency-services/gift-cards" replace />;
    }

    const { giftCardPurchase } = bookingContext;
    const { selectedGiftCard } = giftCardPurchase;

    const brand = MOCK_GIFT_CARD_BRANDS.find(b => b.id === selectedGiftCard.brandId);

    const handlePay = () => {
        // Simulate payment and navigate to confirmation
        navigate('/gift-card-confirmation');
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('reviewAndConfirm')} />
            <main className="p-4 pb-28 space-y-6">
                <div className="bg-white rounded-2xl shadow-md border p-4">
                    <h2 className="text-lg font-bold text-slate-800 mb-3">{t('bookingSummary')}</h2>
                    <div className="flex items-center gap-4">
                        <img src={brand?.image} alt={brand ? t(brand.nameKey) : ''} className="w-20 h-20 object-contain p-2 bg-gray-100 rounded-xl" />
                        <div>
                            <p className="font-bold text-lg text-slate-800">{brand ? t(brand.nameKey) : ''}</p>
                            <p className="font-semibold text-cyan-700 text-xl">{selectedGiftCard.currency === 'USD' ? '$' : '€'}{localizeDigits(selectedGiftCard.amount)}</p>
                            <p className="text-sm text-gray-500">{t('region')}: {selectedGiftCard.region}</p>
                        </div>
                    </div>
                </div>

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
            <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-3">
                <div className="flex justify-between items-center px-1 mb-2">
                    <span className="text-sm text-gray-600">{t('totalPrice')}</span>
                    <span className="text-xl font-bold text-sky-900">{localizeDigits(selectedGiftCard.priceToman.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR'))} {t('toman')}</span>
                </div>
                <button onClick={handlePay} className="w-full bg-sky-900 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-sky-900/40 hover:bg-sky-800 transition-all duration-200 active:scale-95">
                    {t('confirmAndPay')}
                </button>
            </footer>
        </div>
    );
};

export default GiftCardReviewPage;