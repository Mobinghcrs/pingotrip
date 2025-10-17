import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { MOCK_ACCOUNTING_TRANSACTIONS } from '../../../constants';
import { AdminTransaction } from '../../../types';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminHeader from '../../../components/admin/AdminHeader';
import { SearchIcon, ChevronDownIcon } from '../../../assets/icons';

const AccountingTransactionsPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [transactions] = useState<AdminTransaction[]>(MOCK_ACCOUNTING_TRANSACTIONS);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');

    const filteredTransactions = useMemo(() => transactions.filter(trx => 
        (trx.description.toLowerCase().includes(searchTerm.toLowerCase()) || trx.referenceId.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (typeFilter === 'all' || trx.type === typeFilter)
    ).sort((a, b) => new Date(b.date.replace(/[/]/g, '-')).getTime() - new Date(a.date.replace(/[/]/g, '-')).getTime()), [transactions, searchTerm, typeFilter]);

    return (
        <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="accounting-transactions"
            />
            <div className="md:mr-64 transition-all duration-300">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('transactions')}</h2>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="text"
                                    placeholder={t('search') + '...'}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-cyan-500 text-right"
                                />
                            </div>
                             <div className="relative">
                                <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                 <select
                                    value={typeFilter}
                                    onChange={e => setTypeFilter(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg py-2.5 px-4 outline-none focus:ring-2 focus:ring-cyan-500 appearance-none text-right"
                                >
                                    <option value="all">{t('all')}</option>
                                    <option value="income">{t('income')}</option>
                                    <option value="expense">{t('expense')}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 responsive-table">
                                <thead className="bg-slate-50 dark:bg-slate-700">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('date')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('description')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('category')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('amount')}</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                    {filteredTransactions.map(trx => (
                                        <tr key={trx.id}>
                                            <td data-label={t('date')} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">{localizeDigits(trx.date)}</td>
                                            <td data-label={t('description')} className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{trx.description}</div>
                                                <div className="text-xs text-gray-500 dark:text-slate-400 font-mono">{trx.referenceId}</div>
                                            </td>
                                            <td data-label={t('category')} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">{t(trx.categoryKey)}</td>
                                            <td data-label={t('amount')} className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${trx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                                {trx.type === 'income' ? '+' : '-'} {localizeDigits(trx.amount.toLocaleString())} {t('rial')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AccountingTransactionsPage;