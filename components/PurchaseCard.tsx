import React from 'react';
// FIX: Correct import path
import { Purchase, PurchaseType } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { 
    PlaneIcon, HotelIcon, TrainIcon, ChevronRightIcon, HeartPulseIcon, ShoppingCartIcon,
    CarIcon, CrownIcon, VisaIcon, ShieldIcon, ReceiptIcon, SmartphoneIcon, GemIcon, ExitFeeIcon,
    CharityIcon, CreditCardIcon, BanknoteIcon, GiftIcon, LandmarkIcon, TruckIcon
} from '../assets/icons';

interface PurchaseCardProps {
  purchase: Purchase;
}

const PurchaseCard: React.FC<PurchaseCardProps> = ({ purchase }) => {
    const { t, language } = useTranslation();
    const isRtl = language === 'fa' || language === 'ar';

    const typeDetails: { [key in PurchaseType]: { icon: React.ReactNode, titleKey: string } } = {
        flight: { icon: <PlaneIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'flightTicket' },
        hotel: { icon: <HotelIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'hotelReservation' },
        train: { icon: <TrainIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'trainTicket' },
        health: { icon: <HeartPulseIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'medicalAppointment' },
        foreignPurchase: { icon: <ShoppingCartIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'foreignWebsitePurchase' },
        car: { icon: <CarIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'carRental' },
        cip: { icon: <CrownIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'cipAirport' },
        visa: { icon: <VisaIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'visa' },
        insurance: { icon: <ShieldIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'insurance' },
        bill: { icon: <ReceiptIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'billPayment' },
        topup: { icon: <SmartphoneIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'topUp' },
        zhav: { icon: <GemIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'zhavGoldGallery' },
        exitFee: { icon: <ExitFeeIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'exitFeePayment' },
        charity: { icon: <CharityIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'charity' },
        'pingo-credit': { icon: <CreditCardIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'pingoCredit' },
        // FIX: Add missing purchase types
        currencyPurchase: { icon: <BanknoteIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'buyCurrency' },
        currencyDeposit: { icon: <LandmarkIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'depositToAccount' },
        currencyDelivery: { icon: <TruckIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'currencyDeliveryAtDestination' },
        giftCardPurchase: { icon: <GiftIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />, titleKey: 'buyGiftCards' },
    };

    const details = typeDetails[purchase.type];

    if (!details) {
        return null;
    }

    const { icon, titleKey } = details;

    return (
        <a href="#" className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border dark:border-slate-700 p-4 flex items-center justify-between gap-4 transition-all hover:shadow-md hover:border-cyan-200 dark:hover:border-cyan-700 cursor-pointer block">
            <div className="flex items-center gap-4 flex-grow min-w-0">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-cyan-50 dark:bg-sky-900/50 flex-shrink-0">
                    {icon}
                </div>
                <div className="flex-grow min-w-0">
                    <p className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">{t(titleKey)}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 truncate">{t(purchase.descriptionKey)}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 font-mono">{t('bookingReference')}: {purchase.ref}</p>
                </div>
            </div>
            <div className="text-end flex-shrink-0 flex items-center gap-4">
                 <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">
                        {purchase.price.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 -mt-1">{t('rial')}</p>
                 </div>
                 <ChevronRightIcon className={`w-5 h-5 text-gray-400 ${isRtl ? 'rotate-180' : ''}`} />
            </div>
        </a>
    );
};

export default PurchaseCard;