import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { BookingContext } from '../contexts/BookingContext';
import { BillDetails } from '../types';
import { HashIcon, BarcodeIcon } from '../assets/icons';

const BillPaymentPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);
    const [billId, setBillId] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!bookingContext) return null;

    const { selectBill } = bookingContext;

    const handleInquiry = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call to get bill details
        setTimeout(() => {
            const mockBill: BillDetails = {
                billId,
                paymentId,
                type: 'electricity',
                amount: 350000, // in Rial
            };
            selectBill(mockBill);
            setIsLoading(false);
            navigate('/bill-review');
        }, 1000);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('billPayment')} />
            <main className="p-4">
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <form onSubmit={handleInquiry} className="space-y-4">
                        <div>
                            <label htmlFor="billId" className="block text-sm font-semibold text-gray-700 mb-1">{t('billId')}</label>
                            <div className="relative">
                                <HashIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="billId"
                                    value={billId}
                                    onChange={e => setBillId(e.target.value)}
                                    required
                                    className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                                />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="paymentId" className="block text-sm font-semibold text-gray-700 mb-1">{t('paymentId')}</label>
                            <div className="relative">
                                <HashIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="paymentId"
                                    value={paymentId}
                                    onChange={e => setPaymentId(e.target.value)}
                                    required
                                    className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                             <button
                                type="button"
                                className="w-1/3 bg-gray-100 text-slate-700 p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                            >
                                <BarcodeIcon className="w-6 h-6"/>
                                {t('scanBarcode')}
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-2/3 bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30 disabled:bg-gray-400 disabled:cursor-wait"
                            >
                                {isLoading ? t('inquiring') : t('billInquiry')}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default BillPaymentPage;