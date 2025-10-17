import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
// FIX: Correct import paths
import { MOCK_TRANSACTIONS } from '../constants';
import { Transaction } from '../types';
import { ArrowUpCircleIcon, ArrowDownCircleIcon, WalletIcon } from '../assets/icons';
import IncreaseCreditModal from '../components/IncreaseCreditModal';

// FIX: Explicitly define component props to prevent type errors when passing the `key` prop during list rendering.
interface TransactionItemProps {
    transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
    const { t, language } = useTranslation();
    const isCredit = transaction.type === 'credit';

    return (
        <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border dark:border-slate-700">
            <div className="flex items-center gap-3">
                {isCredit ? (
                    <ArrowUpCircleIcon className="w-8 h-8 text-green-500" />
                ) : (
                    <ArrowDownCircleIcon className="w-8 h-8 text-red-500" />
                )}
                <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{t(transaction.title)}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{transaction.date}</p>
                </div>
            </div>
            <div className={`font-bold text-lg ${isCredit ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                {isCredit ? '+' : ''}{Math.abs(transaction.amount).toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
                <span className="text-xs font-normal ms-1">{t('rial')}</span>
            </div>
        </div>
    );
};

const WalletPage = () => {
    const { t, language, localizeDigits } = useTranslation();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const filter = queryParams.get('filter');
    const [isIncreaseCreditModalOpen, setIncreaseCreditModalOpen] = useState(false);

    const transactionsToDisplay = filter === 'credit'
        ? MOCK_TRANSACTIONS.filter(tx => tx.type === 'credit')
        : MOCK_TRANSACTIONS;

    const historyTitle = filter === 'credit' ? t('topUpHistory') : t('transactionHistory');

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={t('wallet')} />
            <main className="p-4 space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 text-center border dark:border-slate-700">
                    <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300">
                        <WalletIcon className="w-5 h-5"/>
                        <span className="font-semibold">{t('walletCredit')}</span>
                    </div>
                    <div className="my-2">
                        <span className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">{localizeDigits((12850000).toLocaleString(language === 'fa' ? 'fa-IR' : 'en-US'))}</span>
                        <span className="ms-1 font-medium text-slate-500 dark:text-slate-400">{t('rial')}</span>
                    </div>
                    <button onClick={() => setIncreaseCreditModalOpen(true)} className="w-full bg-sky-900 text-white p-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30 mt-4">
                        {t('increaseCredit')}
                    </button>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">{historyTitle}</h2>
                    <div className="space-y-3">
                        {transactionsToDisplay.map(tx => (
                            <TransactionItem key={tx.id} transaction={tx} />
                        ))}
                    </div>
                </div>
            </main>
            <IncreaseCreditModal isOpen={isIncreaseCreditModalOpen} onClose={() => setIncreaseCreditModalOpen(false)} />
        </div>
    );
};

export default WalletPage;