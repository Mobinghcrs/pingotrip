import React, { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ExitFeeContext } from '../contexts/ExitFeeContext';
import BookingHeader from '../components/BookingHeader';

const DetailRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between py-3 border-b border-gray-100 last:border-b-0">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-slate-700">{value}</span>
    </div>
);


const ExitFeeReviewPage = () => {
    const { t, localizeDigits, language } = useTranslation();
    const navigate = useNavigate();
    const exitFeeContext = useContext(ExitFeeContext);

    if (!exitFeeContext || !exitFeeContext.details) {
        return <Navigate to="/exit-fee" replace />;
    }

    const { details } = exitFeeContext;

    const tripTypeTranslations = {
        first: t('firstTrip'),
        second: t('secondTrip'),
        thirdAndMore: t('thirdTripAndMore')
    };

    const travelMethodTranslations = {
        air: t('air'),
        land: t('land'),
        atabatLand: t('atabatLand'),
        sea: t('sea')
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('reviewAndConfirm')} />
            <main className="p-4 pb-28">
                <div className="bg-white rounded-2xl shadow-md border p-4">
                    <h2 className="text-lg font-bold text-slate-800 mb-3 text-center">{t('exitFeeDetails')}</h2>
                    <div className="divide-y divide-gray-100">
                        <DetailRow label={t('fullName')} value={details.fullName} />
                        <DetailRow label={t('nationalId')} value={localizeDigits(details.nationalId)} />
                        <DetailRow label={t('travelMethod')} value={travelMethodTranslations[details.travelMethod]} />
                        <DetailRow label={t('tripType')} value={tripTypeTranslations[details.tripType]} />
                        <DetailRow label={t('feeAmount')} value={`${details.feeAmount.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')} ${t('rial')}`} />
                    </div>
                </div>
            </main>
            <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="p-3 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">{t('totalPrice')}</p>
                        <p className="text-xl font-bold text-slate-800">
                            {details.feeAmount.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
                            <span className="text-sm font-normal ms-1">{t('rial')}</span>
                        </p>
                    </div>
                    <button onClick={() => navigate('/exit-fee/payment')} className="bg-sky-900 text-white py-3 px-6 rounded-xl font-bold text-base shadow-lg shadow-sky-900/40 hover:bg-sky-800 transition-all duration-200 active:scale-95">
                        {t('confirmAndPay')}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ExitFeeReviewPage;
