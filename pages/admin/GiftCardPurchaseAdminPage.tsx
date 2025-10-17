import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_GIFT_CARD_PURCHASES } from '../../constants';
import { AdminGiftCardPurchase } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import {
    SearchIcon, FileTextIcon, GiftIcon, CheckCircleIcon, ChevronDownIcon
} from '../../assets/icons';
import GiftCardPurchaseDetailsModal from '../../components/admin/GiftCardPurchaseDetailsModal';

const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: string }> = ({ icon, title, value }) => (
    <div className="bg-white rounded-xl shadow-md border p-4">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-cyan-50">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
        </div>
    </div>
);

const GiftCardPurchaseAdminPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [purchases, setPurchases] = useState<AdminGiftCardPurchase[]>(MOCK_GIFT_CARD_PURCHASES);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState<AdminGiftCardPurchase | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const openDetailsModal = (app: AdminGiftCardPurchase) => {
        setSelectedPurchase(app);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPurchase(null);
    };

    const handleSave = (updatedApp: AdminGiftCardPurchase) => {
        setPurchases(prev => prev.map(a => a.id === updatedApp.id ? updatedApp : a));
        closeModal();
    };

    const filteredPurchases = useMemo(() => purchases.filter(app => 
        (app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || app.purchaseId.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'all' || app.status === statusFilter)
    ), [purchases, searchTerm, statusFilter]);
    
    const statusStyles: { [key in AdminGiftCardPurchase['status']]: string } = {
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800',
    };
    
    const statusOptions = ['all', 'pending', 'approved', 'rejected'];

    return (
        <div className="relative min-h-screen bg-slate-100">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="gift-card-purchase-admin"
            />
            <div className="md:mr-64">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('giftCardPurchaseAdmin')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <StatCard icon={<FileTextIcon className="w-6 h-6 text-sky-900" />} title={t('totalPurchases')} value={localizeDigits(purchases.length)} />
                        <StatCard icon={<GiftIcon className="w-6 h-6 text-sky-900" />} title={t('pendingPurchases')} value={localizeDigits(purchases.filter(a => a.status === 'pending').length)} />
                        <StatCard icon={<CheckCircleIcon className="w-6 h-6 text-sky-900" />} title={t('approved')} value={localizeDigits(purchases.filter(a => a.status === 'approved').length)} />
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="text"
                                    placeholder={t('searchByCustomer')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-gray-100 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-cyan-500 text-right"
                                />
                            </div>
                            <div className="relative">
                                <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                 <select
                                    value={statusFilter}
                                    onChange={e => setStatusFilter(e.target.value)}
                                    className="w-full bg-gray-100 rounded-lg py-2.5 px-4 outline-none focus:ring-2 focus:ring-cyan-500 appearance-none text-right"
                                >
                                    {statusOptions.map(opt => <option key={opt} value={opt}>{t(opt)}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('customerName')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('cardDetails')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('purchaseDate')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('amount')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredPurchases.map(p => (
                                        <tr key={p.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-semibold text-gray-900">{p.customerName}</div>
                                                <div className="font-mono text-xs text-gray-500">{p.purchaseId}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap"><div className="text-gray-700">{t(p.card.brandKey)} - {p.card.currency === 'USD' ? '$' : '€'}{p.card.amount}</div></td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{localizeDigits(p.purchaseDate)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap font-semibold">{localizeDigits(p.priceToman.toLocaleString())} {t('toman')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[p.status]}`}>{t(p.status)}</span></td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => openDetailsModal(p)} className="text-cyan-600 hover:text-cyan-900 font-semibold">{t('viewDetails')}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {filteredPurchases.length === 0 && <p className="text-center text-gray-500 py-12">{t('noResultsFound')}</p>}
                </main>
            </div>
            {isModalOpen && selectedPurchase && (
                <GiftCardPurchaseDetailsModal 
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    purchase={selectedPurchase}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default GiftCardPurchaseAdminPage;