import React, { useContext, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ExitFeeContext } from '../contexts/ExitFeeContext';
import { CheckCircleIcon } from '../assets/icons';

const DetailRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between py-2.5 border-b border-dashed">
        <span className="text-gray-600 text-sm">{label}</span>
        <span className="font-semibold text-slate-700 text-sm text-end">{value}</span>
    </div>
);


const ExitFeeConfirmationPage = () => {
    const { t, localizeDigits, language } = useTranslation();
    const navigate = useNavigate();
    const exitFeeContext = useContext(ExitFeeContext);

    // Use effect to clear details on unmount or after a delay
    useEffect(() => {
        const { clearFeeDetails } = exitFeeContext || {};
        return () => {
            if(clearFeeDetails) clearFeeDetails();
        }
    }, [exitFeeContext]);

    if (!exitFeeContext || !exitFeeContext.details || !exitFeeContext.details.transactionId) {
        return <Navigate to="/exit-fee" replace />;
    }

    const { details } = exitFeeContext;

    return (
        <div className="bg-slate-50 min-h-screen p-4 flex flex-col items-center justify-center text-center">
            <CheckCircleIcon className="w-20 h-20 text-green-500 mb-3" />
            <h1 className="text-2xl font-bold text-slate-800">{t('paymentSuccess')}</h1>
            <p className="text-gray-600 mt-2 mb-6 max-w-xs">{t('feePaidSuccessfully')}</p>
            
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4 w-full text-start space-y-3 mb-6">
                <h3 className="text-lg font-extrabold text-slate-800 text-center mb-2">{t('paymentDetails')}</h3>
                <DetailRow label={t('fullName')} value={details.fullName} />
                <DetailRow label={t('nationalId')} value={localizeDigits(details.nationalId)} />
                <DetailRow label={t('feeAmount')} value={`${details.feeAmount.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')} ${t('rial')}`} />
                <div className="flex justify-between items-center bg-cyan-50 p-2 rounded-lg mt-2">
                    <span className="text-cyan-800">{t('transactionId')}</span>
                    <span className="font-mono text-cyan-800 font-bold tracking-widest">{details.transactionId}</span>
                </div>
            </div>

            <button onClick={() => navigate('/')} className="w-full bg-sky-900 text-white font-bold py-3.5 px-4 rounded-lg hover:bg-sky-800 transition-colors shadow-lg shadow-sky-900/30">
                {t('backToHome')}
            </button>
        </div>
    );
};

export default ExitFeeConfirmationPage;