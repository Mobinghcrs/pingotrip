import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { DonationContext } from '../contexts/DonationContext';
import { MOCK_CHARITY_PROJECTS } from '../constants';
import BookingHeader from '../components/BookingHeader';
import PaymentOption from '../components/PaymentOption';
import { WalletIcon, CreditCardIcon, LandmarkIcon } from '../assets/icons';

const DonationPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { t, language, localizeDigits } = useTranslation();
    const navigate = useNavigate();
    const donationContext = useContext(DonationContext);

    const project = MOCK_CHARITY_PROJECTS.find(p => p.id === projectId);

    const [amount, setAmount] = useState<number>(0);
    const [selectedMethod, setSelectedMethod] = useState('bank');

    if (!donationContext || (!donationContext.selectedProject && !project)) {
        return <Navigate to="/charity" replace />;
    }
    
    const { setDonation, selectProject } = donationContext;
    
    // Ensure project is in context if navigating directly
    if (project && !donationContext.selectedProject) {
        selectProject(project);
    }
    const currentProject = donationContext.selectedProject || project;
    if (!currentProject) return null;


    const suggestedAmounts = [50000, 100000, 250000];

    const handleAmountSelect = (value: number) => {
        setAmount(value);
    };
    
    const handlePay = () => {
        if (amount <= 0) return;
        const donation = {
            project: currentProject,
            amount,
            transactionId: `DNT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        };
        setDonation(donation);
        navigate('/donation-confirmation');
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('makeDonation')} />
            <main className="p-4 pb-28 space-y-6">
                <div className="bg-white rounded-2xl shadow-md border p-4 flex items-center gap-4">
                    <img src={currentProject.image} alt={t(currentProject.titleKey)} className="w-20 h-20 rounded-lg object-cover" />
                    <div>
                        <p className="text-sm text-gray-500">{t('youAreSupporting')}</p>
                        <h2 className="text-lg font-bold text-slate-800">{t(currentProject.titleKey)}</h2>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md border p-4">
                    <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">{t('donationAmount')} ({t('toman')})</label>
                    <div className="flex justify-between gap-2 mb-4">
                        {suggestedAmounts.map(val => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => handleAmountSelect(val)}
                                className={`w-full py-2.5 border-2 rounded-lg text-sm font-bold transition-colors ${
                                    amount === val
                                    ? 'bg-cyan-500 text-white border-cyan-500' 
                                    : 'bg-white hover:bg-gray-100 border-gray-200'
                                }`}
                            >
                                {val.toLocaleString(language === 'fa' ? 'fa-IR' : 'en-US')}
                            </button>
                        ))}
                    </div>
                    <input
                        type="number"
                        id="amount"
                        value={amount || ''}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder={t('customAmount')}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none text-lg font-bold text-center"
                        required
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-md border p-4">
                    <h2 className="text-lg font-bold text-slate-800 mb-3">{t('paymentMethod')}</h2>
                    <div className="space-y-2">
                        <PaymentOption icon={<WalletIcon className="w-6 h-6 text-cyan-600" />} title={t('pingoWallet')} isSelected={selectedMethod === 'wallet'} onClick={() => setSelectedMethod('wallet')} />
                        <PaymentOption icon={<CreditCardIcon className="w-6 h-6 text-cyan-600" />} title={t('bankGateway')} isSelected={selectedMethod === 'bank'} onClick={() => setSelectedMethod('bank')} />
                        <PaymentOption icon={<LandmarkIcon className="w-6 h-6 text-cyan-600" />} title={t('pingoCredit')} isSelected={selectedMethod === 'credit'} onClick={() => setSelectedMethod('credit')} />
                    </div>
                </div>
            </main>
            <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-t p-3">
                <div className="flex justify-between items-center px-1 mb-2">
                    <span className="text-sm text-gray-600">{t('totalPrice')}</span>
                    <span className="text-xl font-bold text-sky-900">{localizeDigits((amount || 0).toLocaleString(language === 'en' ? 'en-US' : 'fa-IR'))} {t('toman')}</span>
                </div>
                <button onClick={handlePay} disabled={!amount} className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-green-600/40 hover:bg-green-700 transition-all duration-200 active:scale-95 disabled:bg-gray-400 disabled:shadow-none">
                    {t('confirmAndPay')}
                </button>
            </footer>
        </div>
    );
};

export default DonationPage;