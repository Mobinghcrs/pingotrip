

import React, { useState } from 'react';
import { Purchase } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { 
    PlaneIcon, HotelIcon, TrainIcon, ChevronRightIcon, HeartPulseIcon, ShoppingCartIcon, CheckIcon, XIcon,
    CarIcon, CrownIcon, VisaIcon, ShieldIcon, ReceiptIcon, SmartphoneIcon, GemIcon, ExitFeeIcon,
    CharityIcon, CreditCardIcon, BanknoteIcon, GiftIcon, LandmarkIcon, TruckIcon
} from '../assets/icons';

interface AdminPurchaseListItemProps {
  purchase: Purchase;
  onStatusChange: (id: number, newStatus: 'approved' | 'rejected') => void;
}

const AdminPurchaseListItem: React.FC<AdminPurchaseListItemProps> = ({ purchase, onStatusChange }) => {
    const { t, language } = useTranslation();
    const [isUpdating, setIsUpdating] = useState(false);

    const typeDetails: { [key in Purchase['type']]: { icon: React.ReactNode, titleKey: string } } = {
        flight: { icon: <PlaneIcon className="w-6 h-6 text-sky-900" />, titleKey: 'flightTicket' },
        hotel: { icon: <HotelIcon className="w-6 h-6 text-sky-900" />, titleKey: 'hotelReservation' },
        train: { icon: <TrainIcon className="w-6 h-6 text-sky-900" />, titleKey: 'trainTicket' },
        health: { icon: <HeartPulseIcon className="w-6 h-6 text-sky-900" />, titleKey: 'medicalAppointment' },
        foreignPurchase: { icon: <ShoppingCartIcon className="w-6 h-6 text-sky-900" />, titleKey: 'foreignWebsitePurchase' },
        car: { icon: <CarIcon className="w-6 h-6 text-sky-900" />, titleKey: 'carRental' },
        cip: { icon: <CrownIcon className="w-6 h-6 text-sky-900" />, titleKey: 'cipAirport' },
        visa: { icon: <VisaIcon className="w-6 h-6 text-sky-900" />, titleKey: 'visa' },
        insurance: { icon: <ShieldIcon className="w-6 h-6 text-sky-900" />, titleKey: 'insurance' },
        bill: { icon: <ReceiptIcon className="w-6 h-6 text-sky-900" />, titleKey: 'billPayment' },
        topup: { icon: <SmartphoneIcon className="w-6 h-6 text-sky-900" />, titleKey: 'topUp' },
        zhav: { icon: <GemIcon className="w-6 h-6 text-sky-900" />, titleKey: 'zhavGoldGallery' },
        exitFee: { icon: <ExitFeeIcon className="w-6 h-6 text-sky-900" />, titleKey: 'exitFeePayment' },
        charity: { icon: <CharityIcon className="w-6 h-6 text-sky-900" />, titleKey: 'charity' },
        'pingo-credit': { icon: <CreditCardIcon className="w-6 h-6 text-sky-900" />, titleKey: 'pingoCredit' },
        // FIX: Add missing purchase types
        currencyPurchase: { icon: <BanknoteIcon className="w-6 h-6 text-sky-900" />, titleKey: 'buyCurrency' },
        currencyDeposit: { icon: <LandmarkIcon className="w-6 h-6 text-sky-900" />, titleKey: 'depositToAccount' },
        currencyDelivery: { icon: <TruckIcon className="w-6 h-6 text-sky-900" />, titleKey: 'currencyDeliveryAtDestination' },
        giftCardPurchase: { icon: <GiftIcon className="w-6 h-6 text-sky-900" />, titleKey: 'buyGiftCards' },
    };

    const details = typeDetails[purchase.type];

    if (!details) {
        return null;
    }

    const { icon, titleKey } = details;

    const statusStyles: { [key in Purchase['status']]: string } = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        approved: 'bg-green-100 text-green-800 border-green-200',
        rejected: 'bg-red-100 text-red-800 border-red-200',
    };

    const handleUpdateStatus = (newStatus: 'approved' | 'rejected') => {
        setIsUpdating(true);
        // Simulate API call
        setTimeout(() => {
            onStatusChange(purchase.id, newStatus);
            setIsUpdating(false);
        }, 300);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-3">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-cyan-50 flex-shrink-0">
                        {details.icon}
                    </div>
                    <div>
                        <p className="font-bold text-slate-800 text-sm truncate">{t(details.titleKey)}</p>
                        <p className="text-xs text-gray-500 font-mono">{purchase.ref}</p>
                    </div>
                </div>
                 <div className="text-end flex-shrink-0">
                    <p className="font-bold text-slate-800 text-lg">
                        {purchase.price.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
                    </p>
                    <p className="text-xs text-gray-500 -mt-1">{t('rial')}</p>
                </div>
            </div>

            <div>
                 <p className="text-sm text-gray-600">{t(purchase.descriptionKey)}</p>
            </div>
           
            <div className="flex justify-between items-center border-t pt-3">
                <div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusStyles[purchase.status]}`}>
                        {t(purchase.status)}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleUpdateStatus('approved')}
                        disabled={isUpdating || purchase.status === 'approved'}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-100 text-green-600 hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                        title={t('approve')}
                    >
                        <CheckIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleUpdateStatus('rejected')}
                        disabled={isUpdating || purchase.status === 'rejected'}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                        title={t('reject')}
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPurchaseListItem;