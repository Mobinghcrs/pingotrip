import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { BookingContext } from '../contexts/BookingContext';
import { TopUpDetails } from '../types';
import { PhoneIcon } from '../assets/icons';

const TopUpPage = () => {
    const { t, localizeDigits } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);

    const [mobileNumber, setMobileNumber] = useState('');
    const [operator, setOperator] = useState<TopUpDetails['operator']>('mci');
    const [amount, setAmount] = useState<number>(0);

    if (!bookingContext) return null;

    const { selectTopUp } = bookingContext;

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount <= 0 || !mobileNumber) return;

        selectTopUp({
            mobileNumber,
            operator,
            amount,
        });
        navigate('/topup-review');
    };
    
    const suggestedAmounts = [2000, 5000, 10000, 20000];

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('topUp')} />
            <main className="p-4 pb-28">
                <form onSubmit={handleContinue} className="bg-white rounded-2xl shadow-md p-6 space-y-6">
                    <div>
                        <label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-700 mb-1">{t('mobileNumber')}</label>
                        <div className="relative">
                            <PhoneIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                id="mobileNumber"
                                value={mobileNumber}
                                onChange={e => setMobileNumber(e.target.value)}
                                required
                                className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('selectOperator')}</label>
                        <div className="flex items-center bg-gray-100 rounded-xl p-1">
                            {(['mci', 'irancell', 'rightel'] as const).map(op => (
                                <button
                                    key={op}
                                    type="button"
                                    onClick={() => setOperator(op)}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${operator === op ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-500'}`}
                                >
                                    {t(op)}
                                </button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('selectAmount')}</label>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            {suggestedAmounts.map(val => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setAmount(val)}
                                    className={`py-3 border-2 rounded-lg font-bold transition-colors ${amount === val ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-white hover:bg-gray-100 border-gray-200'}`}
                                >
                                    {localizeDigits(val.toLocaleString())} {t('toman')}
                                </button>
                            ))}
                        </div>
                        <input
                            type="number"
                            value={amount || ''}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            // FIX: Use renamed key `customAmountLabel` to avoid conflicts.
                            placeholder={t('customAmountLabel')}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none text-center"
                        />
                    </div>
                </form>
            </main>
            <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-t p-3">
                <button onClick={handleContinue} disabled={!amount || !mobileNumber} className="w-full bg-sky-900 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-sky-900/40 hover:bg-sky-800 transition-all duration-200 active:scale-95 disabled:bg-gray-400 disabled:shadow-none">
                    {t('confirmAndContinue')}
                </button>
            </footer>
        </div>
    );
};

export default TopUpPage;