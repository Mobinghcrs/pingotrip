import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { WalletIcon, XIcon } from '../assets/icons';

interface IncreaseCreditModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const IncreaseCreditModal: React.FC<IncreaseCreditModalProps> = ({ isOpen, onClose }) => {
    const { t, language, localizeDigits } = useTranslation();
    const [amount, setAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const suggestedAmounts = [500000, 1000000, 2000000];

    const handleAmountSelect = (value: number) => {
        setAmount(String(value));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || parseInt(amount) <= 0) return;

        setIsProcessing(true);
        // Simulate API call and redirection
        setTimeout(() => {
            alert(t('redirectToBank'));
            setIsProcessing(false);
            onClose();
            setAmount('');
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in-down" 
            style={{ animationDuration: '0.2s' }}
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-sm p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 end-4 text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200">
                    <XIcon className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-2 mb-4">
                    <WalletIcon className="w-6 h-6 text-cyan-500" />
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t('increaseCredit')}</h2>
                </div>

                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">{t('amount')} ({t('rial')})</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder={localizeDigits(0)}
                            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-cyan-400 outline-none text-lg font-bold text-center"
                            required
                        />
                    </div>

                    <div className="mb-6">
                         <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">{t('suggestedAmounts')}</p>
                         <div className="flex justify-between gap-2">
                            {suggestedAmounts.map(val => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => handleAmountSelect(val)}
                                    className={`w-full py-2 border dark:border-slate-600 rounded-lg text-sm font-semibold transition-colors ${
                                        amount === String(val) 
                                        ? 'bg-cyan-500 text-white border-cyan-500' 
                                        : 'bg-white dark:bg-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-600'
                                    }`}
                                >
                                    {val.toLocaleString(language === 'fa' ? 'fa-IR' : 'en-US')}
                                </button>
                            ))}
                         </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isProcessing}
                        className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30 disabled:bg-sky-800/50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? t('redirectToBank') : t('confirmAndPay')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IncreaseCreditModal;