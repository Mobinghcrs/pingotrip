import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_ADMIN_BILL_PAYMENTS, MOCK_ADMIN_TOPUP_PURCHASES } from '../../constants';
import { AdminBillPayment, AdminTopUpPurchase } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { 
    SearchIcon, FileTextIcon, UsersIcon, CheckCircleIcon, ReceiptIcon, SmartphoneIcon, ChevronDownIcon
} from '../../assets/icons';
import BillTopUpDetailsModal from '../../components/admin/BillTopUpDetailsModal';

const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: string }> = ({ icon, title, value }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-4">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-cyan-50 dark:bg-slate-700">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">{title}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
            </div>
        </div>
    </div>
);

const BillsAdminPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [bills, setBills] = useState<AdminBillPayment[]>(MOCK_ADMIN_BILL_PAYMENTS);
    const [topUps, setTopUps] = useState<AdminTopUpPurchase[]>(MOCK_ADMIN_TOPUP_PURCHASES);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeTab, setActiveTab] = useState('bills');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<AdminBillPayment | AdminTopUpPurchase | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const openDetailsModal = (item: AdminBillPayment | AdminTopUpPurchase) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleSave = (updatedItem: AdminBillPayment | AdminTopUpPurchase) => {
        if (activeTab === 'bills') {
            setBills(prev => prev.map(a => a.id === updatedItem.id ? (updatedItem as AdminBillPayment) : a));
        } else {
            setTopUps(prev => prev.map(a => a.id === updatedItem.id ? (updatedItem as AdminTopUpPurchase) : a));
        }
        closeModal();
    };

    const filteredBills = useMemo(() => bills.filter(item => 
        (item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || item.details.billId.includes(searchTerm)) &&
        (statusFilter === 'all' || item.status === statusFilter)
    ), [bills, searchTerm, statusFilter]);
    
    const filteredTopUps = useMemo(() => topUps.filter(item => 
        (item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || item.details.mobileNumber.includes(searchTerm)) &&
        (statusFilter === 'all' || item.status === statusFilter)
    ), [topUps, searchTerm, statusFilter]);
    
    const statusStyles: { [key in AdminBillPayment['status']]: string } = {
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800',
    };
    
    const statusOptions = ['all', 'pending', 'approved', 'rejected'];

    const totalBills = bills.filter(b => b.status === 'approved').reduce((sum, b) => sum + b.details.amount, 0);
    const totalTopUps = topUps.filter(t => t.status === 'approved').reduce((sum, t) => sum + t.details.amount, 0);
    const pendingCount = bills.filter(b => b.status === 'pending').length + topUps.filter(t => t.status === 'pending').length;

    return (
        <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="bills"
            />
            <div className="md:mr-64 transition-all duration-300">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('billsAdminManagement')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <StatCard icon={<ReceiptIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('totalBillsPaid')} value={`${localizeDigits(totalBills.toLocaleString())} ${t('rial')}`} />
                        <StatCard icon={<SmartphoneIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('totalTopUps')} value={`${localizeDigits(totalTopUps.toLocaleString())} ${t('toman')}`} />
                        <StatCard icon={<UsersIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('pendingTransactions')} value={localizeDigits(pendingCount)} />
                    </div>

                    <div className="border-b border-gray-200 dark:border-slate-700 mb-6">
                        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                            <button onClick={() => setActiveTab('bills')} className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${activeTab === 'bills' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('billPayment')}</button>
                            <button onClick={() => setActiveTab('topups')} className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${activeTab === 'topups' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('topUpPurchases')}</button>
                        </nav>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="text"
                                    placeholder={t('searchByBillIdOrPhone')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-cyan-500 text-right"
                                />
                            </div>
                            <div className="relative">
                                <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg py-2.5 px-4 outline-none focus:ring-2 focus:ring-cyan-500 appearance-none text-right">
                                    {statusOptions.map(opt => <option key={opt} value={opt}>{t(opt)}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            {activeTab === 'bills' && (
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 responsive-table">
                                    <thead className="bg-slate-50 dark:bg-slate-700">
                                        <tr>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('customerName')}</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('billType')}</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('amount')}</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('status')}</th>
                                            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                        {filteredBills.map(item => (
                                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                                <td data-label={t('customerName')} className="px-6 py-4 whitespace-nowrap"><div className="font-semibold text-gray-900 dark:text-slate-100">{item.customerName}</div><div className="font-mono text-xs text-gray-500 dark:text-slate-400">{item.transactionId}</div></td>
                                                <td data-label={t('billType')} className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-slate-300">{t(`${item.details.type}Bill`)}</td>
                                                <td data-label={t('amount')} className="px-6 py-4 whitespace-nowrap font-semibold">{localizeDigits(item.details.amount.toLocaleString())} {t('rial')}</td>
                                                <td data-label={t('status')} className="px-6 py-4 whitespace-nowrap"><span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[item.status]}`}>{t(item.status)}</span></td>
                                                <td data-label={t('actions')} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => openDetailsModal(item)} className="text-cyan-600 hover:text-cyan-900 font-semibold">{t('viewDetails')}</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {activeTab === 'topups' && (
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 responsive-table">
                                    <thead className="bg-slate-50 dark:bg-slate-700">
                                        <tr>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('customerName')}</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('mobileNumber')}</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('operator')}</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('amount')}</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('status')}</th>
                                            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                        {filteredTopUps.map(item => (
                                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                                <td data-label={t('customerName')} className="px-6 py-4 whitespace-nowrap"><div className="font-semibold text-gray-900 dark:text-slate-100">{item.customerName}</div><div className="font-mono text-xs text-gray-500 dark:text-slate-400">{item.transactionId}</div></td>
                                                <td data-label={t('mobileNumber')} className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-slate-300 font-mono">{localizeDigits(item.details.mobileNumber)}</td>
                                                <td data-label={t('operator')} className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-slate-300">{t(item.details.operator)}</td>
                                                <td data-label={t('amount')} className="px-6 py-4 whitespace-nowrap font-semibold">{localizeDigits(item.details.amount.toLocaleString())} {t('toman')}</td>
                                                <td data-label={t('status')} className="px-6 py-4 whitespace-nowrap"><span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[item.status]}`}>{t(item.status)}</span></td>
                                                <td data-label={t('actions')} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => openDetailsModal(item)} className="text-cyan-600 hover:text-cyan-900 font-semibold">{t('viewDetails')}</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                     {(activeTab === 'bills' && filteredBills.length === 0) || (activeTab === 'topups' && filteredTopUps.length === 0) && (
                        <p className="text-center text-gray-500 dark:text-slate-400 py-12">{t('noResultsFound')}</p>
                    )}
                </main>
            </div>
            {isModalOpen && selectedItem && (
                <BillTopUpDetailsModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    item={selectedItem}
                    type={activeTab === 'bills' ? 'bill' : 'topup'}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default BillsAdminPage;