import React, { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { BookingContext } from '../contexts/BookingContext';
import { MOCK_GIFT_CARD_BRANDS } from '../constants';
import { CheckCircleIcon, ClipboardCopyIcon, ClipboardCheckIcon, PrinterIcon } from '../assets/icons';

const GiftCardConfirmationPage: React.FC = () => {
    const { t, localizeDigits } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);
    const [copied, setCopied] = useState(false);
    
    if (!bookingContext || !bookingContext.giftCardPurchase) {
        return <Navigate to="/currency-services/gift-cards" replace />;
    }

    const { giftCardPurchase, clearBooking } = bookingContext;
    const { selectedGiftCard, transactionId } = giftCardPurchase;

    const brand = MOCK_GIFT_CARD_BRANDS.find(b => b.id === selectedGiftCard.brandId);
    
    // Mock gift card code
    const mockCode = `ABCD-EFGH-IJKL-${Math.random().toString().substr(2, 4)}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(mockCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFinish = () => {
        clearBooking();
        navigate('/');
    };
    
    const DetailRow = ({ label, value }: { label: string, value: string }) => (
        <div className="flex justify-between py-2.5 border-b border-dashed">
            <span className="text-gray-600 text-sm">{label}</span>
            <span className="font-semibold text-slate-700 text-sm text-end">{value}</span>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen p-4 flex flex-col items-center justify-center text-center">
            <CheckCircleIcon className="w-20 h-20 text-green-500 mb-3" />
            <h1 className="text-2xl font-bold text-slate-800">{t('giftCardPurchaseSuccess')}</h1>
            <p className="text-gray-600 mt-2 mb-6 max-w-xs">{t('giftCardPurchaseSuccessMsg')}</p>
            
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4 w-full text-start space-y-3">
                <h3 className="text-lg font-extrabold text-slate-800 text-center mb-2">{t('giftCardCode')}</h3>
                <div className="flex items-center gap-2 bg-cyan-50 border-2 border-dashed border-cyan-200 rounded-lg p-3">
                    <span className="font-mono text-cyan-800 text-xl font-bold tracking-widest flex-grow text-center">{mockCode}</span>
                    <button onClick={handleCopy} className="p-2 bg-white rounded-md shadow-sm border">
                        {copied ? <ClipboardCheckIcon className="w-5 h-5 text-green-600"/> : <ClipboardCopyIcon className="w-5 h-5 text-cyan-700"/>}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border p-4 w-full text-start space-y-3 mt-4">
                <h3 className="text-lg font-bold text-slate-800 text-center mb-2">{t('giftCardDetails')}</h3>
                <DetailRow label={t('service')} value={brand ? t(brand.nameKey) : ''} />
                <DetailRow label={t('amount')} value={`${selectedGiftCard.currency === 'USD' ? '$' : '€'}${localizeDigits(selectedGiftCard.amount)}`} />
                <DetailRow label={t('totalPrice')} value={`${localizeDigits(selectedGiftCard.priceToman.toLocaleString())} ${t('toman')}`} />
                <DetailRow label={t('transactionId')} value={transactionId} />
            </div>

            <div className="mt-6 w-full flex flex-col gap-3">
                <button onClick={handleFinish} className="w-full bg-sky-900 text-white font-bold py-3.5 px-4 rounded-lg hover:bg-sky-800 transition-colors shadow-lg shadow-sky-900/30">
                    {t('finish')}
                </button>
            </div>
        </div>
    );
};

export default GiftCardConfirmationPage;