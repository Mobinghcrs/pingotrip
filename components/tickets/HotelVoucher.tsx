import React from 'react';
import { Hotel } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_QR_CODE_URL } from '../../constants';
import { HotelIcon, UserIcon, CalendarIcon, MapPinIcon, PhoneIcon } from '../../assets/icons';

interface HotelVoucherProps {
    hotel: Hotel;
    guestName: string;
    checkInDate: string;
    checkOutDate: string;
}

const HotelVoucher: React.FC<HotelVoucherProps> = ({ hotel, guestName, checkInDate, checkOutDate }) => {
    const { t, localizeDigits } = useTranslation();
    const bookingId = `PGH-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border dark:border-slate-700 font-sans my-4 overflow-hidden" id="voucher-to-print">
            <header className="bg-sky-900 text-white p-4 flex items-center gap-4">
                <HotelIcon className="w-8 h-8" />
                <div>
                    <h2 className="text-xl font-bold">{t('bookingVoucher')}</h2>
                    <p className="text-sm opacity-80">{t(hotel.nameKey)}</p>
                </div>
            </header>

            <div className="p-5 space-y-4">
                <div className="text-center">
                    <img src={`${MOCK_QR_CODE_URL}${bookingId}`} alt="QR Code" className="w-28 h-28 rounded-md mx-auto border-4 border-white dark:border-slate-700 shadow-md" />
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">{t('bookingId')}</p>
                    <p className="font-mono font-bold text-lg text-slate-800 dark:text-slate-200">{bookingId}</p>
                </div>

                <div className="border-t dark:border-slate-700 pt-4 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1"><UserIcon className="w-4 h-4" />{t('guestName')}</p>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">{guestName}</p>
                    </div>
                     <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1"><CalendarIcon className="w-4 h-4" />{t('checkInDate')}</p>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">{localizeDigits(checkInDate)}</p>
                    </div>
                     <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1"><CalendarIcon className="w-4 h-4" />{t('checkOutDate')}</p>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">{localizeDigits(checkOutDate)}</p>
                    </div>
                </div>

                <div className="border-t dark:border-slate-700 pt-4">
                     <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1"><MapPinIcon className="w-4 h-4" />{t('hotelAddress')}</p>
                     <p className="font-semibold text-slate-800 dark:text-slate-100">{t('someAddressInTehran')}</p> {/* Mock address */}
                </div>
            </div>
        </div>
    );
};

export default HotelVoucher;
