import React, { useState } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { MOCK_ACCOUNTING_TRANSACTIONS } from '../../../constants';
import { AdminTransaction } from '../../../types';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminHeader from '../../../components/admin/AdminHeader';
import { DollarSignIcon, CheckCircleIcon, XCircleIcon } from '../../../assets/icons';

const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: string, colorClass: string }> = ({ icon, title, value, colorClass }) => (
    <div className="bg-white rounded-xl shadow-md border p-5">
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClass}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
        </div>
    </div>
);

const AccountingDashboardPage = () => {
    const { t, localizeDigits, language } = useTranslation();
    const [transactions] = useState<AdminTransaction[]>(MOCK_ACCOUNTING_TRANSACTIONS);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const totalRevenue = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netProfit = totalRevenue - totalExpenses;

    const expensePercentage = totalRevenue > 0 ? Math.min((totalExpenses / totalRevenue) * 100, 100) : 0;

    const recentTransactions = transactions.slice(0, 5);

    return (
        <div className="relative min-h-screen bg-slate-100">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="accounting-dashboard"
            />
            <div className="md:mr-64">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('accounting')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatCard icon={<CheckCircleIcon className="w-6 h-6 text-green-600" />} title={t('totalRevenue')} value={`${localizeDigits(totalRevenue.toLocaleString())} ${t('rial')}`} colorClass="bg-green-100" />
                        <StatCard icon={<XCircleIcon className="w-6 h-6 text-red-600" />} title={t('totalExpenses')} value={`${localizeDigits(totalExpenses.toLocaleString())} ${t('rial')}`} colorClass="bg-red-100" />
                        <StatCard icon={<DollarSignIcon className="w-6 h-6 text-sky-900" />} title={t('netProfit')} value={`${localizeDigits(netProfit.toLocaleString())} ${t('rial')}`} colorClass="bg-cyan-100" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-3 bg-white rounded-xl shadow-md border">
                            <h3 className="text-lg font-bold text-slate-800 p-4 border-b">{t('recentTransactions')}</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-right font-medium text-gray-500">{t('date')}</th>
                                            <th className="px-4 py-2 text-right font-medium text-gray-500">{t('description')}</th>
                                            <th className="px-4 py-2 text-right font-medium text-gray-500">{t('amount')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recentTransactions.map(trx => (
                                            <tr key={trx.id}>
                                                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{localizeDigits(trx.date)}</td>
                                                <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-700">{trx.description}</td>
                                                <td className={`px-4 py-3 whitespace-nowrap font-bold ${trx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {trx.type === 'income' ? '+' : '-'} {localizeDigits(trx.amount.toLocaleString())}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border p-4">
                             <h3 className="text-lg font-bold text-slate-800 mb-4">{t('incomeVsExpense')}</h3>
                             <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-1 text-sm">
                                        <span className="text-gray-500">{t('income')}</span>
                                        <span className="font-bold text-slate-700">{localizeDigits(totalRevenue.toLocaleString())}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div className="bg-green-500 h-4 rounded-full" style={{ width: '100%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1 text-sm">
                                        <span className="text-gray-500">{t('expense')}</span>
                                        <span className="font-bold text-slate-700">{localizeDigits(totalExpenses.toLocaleString())}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div className="bg-red-500 h-4 rounded-full" style={{ width: `${expensePercentage}%` }}></div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AccountingDashboardPage;