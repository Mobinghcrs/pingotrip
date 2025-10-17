import React, { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { DonationContext } from '../contexts/DonationContext';
import { CheckCircleIcon } from '../assets/icons';

const DonationConfirmationPage: React.FC = () => {
    const { t, localizeDigits, language } = useTranslation();
    const navigate = useNavigate();
    const donationContext = useContext(DonationContext);
    
    if (!donationContext || !donationContext.donation) {
        return <Navigate to="/charity" replace />;
    }

    const { donation, clearDonation } = donationContext;

    const handleFinish = () => {
        clearDonation();
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
            <h1 className="text-3xl font-extrabold text-slate-800">{t('donationSuccess')}</h1>
            <p className="text-gray-600 mt-2 mb-6 max-w-xs">{t('donationSuccessMsg')}</p>
            
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4 w-full text-start space-y-3">
                <h3 className="text-lg font-extrabold text-slate-800 text-center mb-2">{t('donationSummary')}</h3>
                <DetailRow label={t('project')} value={t(donation.project.titleKey)} />
                <DetailRow label={t('amount')} value={`${localizeDigits(donation.amount.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR'))} ${t('toman')}`} />
                <div className="flex justify-between items-center bg-cyan-50 p-2 rounded-lg mt-2"><span className="text-cyan-800">{t('transactionId')}</span><span className="font-mono text-cyan-800 font-bold tracking-widest">{donation.transactionId}</span></div>
            </div>

            <div className="mt-6 w-full flex flex-col gap-3">
                <button onClick={handleFinish} className="w-full bg-sky-900 text-white font-bold py-3.5 px-4 rounded-lg hover:bg-sky-800 transition-colors shadow-lg shadow-sky-900/30">
                    {t('backToHome')}
                </button>
            </div>
        </div>
    );
};

export default DonationConfirmationPage;