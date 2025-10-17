import React, { useContext, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { BookingContext } from '../contexts/BookingContext';
import { CheckCircleIcon } from '../assets/icons';

const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-2.5 border-b border-dashed">
        <span className="text-gray-600 text-sm">{label}</span>
        <span className="font-semibold text-slate-700 text-sm text-end">{value}</span>
    </div>
);

const TopUpConfirmationPage = () => {
    const { t, localizeDigits, language } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);

    useEffect(() => {
        return () => {
            if (bookingContext) {
                bookingContext.clearBooking();
            }
        };
    }, [bookingContext]);

    if (!bookingContext || !bookingContext.selectedTopUp) {
        return <Navigate to="/topup" replace />;
    }

    const { selectedTopUp } = bookingContext;
    const transactionId = `PG-TOPUP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    return (
        <div className="bg-slate-50 min-h-screen p-4 flex flex-col items-center justify-center text-center">
            <CheckCircleIcon className="w-20 h-20 text-green-500 mb-3" />
            <h1 className="text-2xl font-bold text-slate-800">{t('paymentSuccessful')}</h1>
            <p className="text-gray-600 mt-2 mb-6 max-w-xs">{t('topUpSuccessMsg')}</p>
            
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4 w-full text-start space-y-3 mb-6">
                <h3 className="text-lg font-extrabold text-slate-800 text-center mb-2">{t('receipt')}</h3>
                <DetailRow label={t('mobileNumber')} value={localizeDigits(selectedTopUp.mobileNumber)} />
                <DetailRow label={t('operator')} value={t(selectedTopUp.operator)} />
                <DetailRow label={t('topUpAmount')} value={`${selectedTopUp.amount.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')} ${t('toman')}`} />
                <div className="flex justify-between items-center bg-cyan-50 p-2 rounded-lg mt-2">
                    <span className="text-cyan-800">{t('transactionId')}</span>
                    <span className="font-mono text-cyan-800 font-bold tracking-widest">{transactionId}</span>
                </div>
            </div>

            <div className="mt-2 w-full flex flex-col gap-3">
                <button onClick={() => navigate('/topup')} className="w-full bg-white border-2 border-cyan-500 text-cyan-600 font-bold py-3 px-4 rounded-lg hover:bg-cyan-50 transition-colors">
                    {t('buyAnotherTopUp')}
                </button>
                <button onClick={() => navigate('/')} className="w-full bg-sky-900 text-white font-bold py-3.5 px-4 rounded-lg hover:bg-sky-800 transition-colors shadow-lg shadow-sky-900/30">
                    {t('backToHome')}
                </button>
            </div>
        </div>
    );
};

export default TopUpConfirmationPage;