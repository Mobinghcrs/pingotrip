import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_ZHAV_ORDERS } from '../../constants';
import { AdminZhavOrder } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { 
    SearchIcon, FileTextIcon, UsersIcon, CheckCircleIcon, GemIcon, ChevronDownIcon
} from '../../assets/icons';
import ZhavOrderDetailsModal from '../../components/admin/ZhavOrderDetailsModal';

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

const ZhavAdminPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [orders, setOrders] = useState<AdminZhavOrder[]>(MOCK_ZHAV_ORDERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<AdminZhavOrder | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const openDetailsModal = (order: AdminZhavOrder) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const handleSave = (updatedOrder: AdminZhavOrder) => {
        setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
        closeModal();
    };

    const filteredOrders = useMemo(() => orders.filter(order => 
        (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || order.orderId.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'all' || order.status === statusFilter)
    ), [orders, searchTerm, statusFilter]);
    
    const statusStyles: { [key in AdminZhavOrder['status']]: string } = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        shipped: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    
    const statusOptions: (AdminZhavOrder['status'] | 'all')[] = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    const totalRevenue = orders.reduce((sum, order) => order.status === 'delivered' ? sum + order.totalPrice : sum, 0);

    return (
        <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="zhav"
            />
            <div className="md:mr-64 transition-all duration-300">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('zhavManagement')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <StatCard icon={<FileTextIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('totalRevenue')} value={`${localizeDigits(totalRevenue.toLocaleString())} ${t('toman')}`} />
                        <StatCard icon={<UsersIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('pendingOrders')} value={localizeDigits(orders.filter(a => a.status === 'pending').length)} />
                        <StatCard icon={<CheckCircleIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('shippedToday')} value={localizeDigits(0)} />
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="text"
                                    placeholder={t('searchByOrderIdOrCustomer')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-cyan-500 text-right"
                                />
                            </div>
                            <div className="relative">
                                <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                 <select
                                    value={statusFilter}
                                    onChange={e => setStatusFilter(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg py-2.5 px-4 outline-none focus:ring-2 focus:ring-cyan-500 appearance-none text-right"
                                >
                                    {statusOptions.map(opt => <option key={opt} value={opt}>{t(opt)}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 responsive-table">
                                <thead className="bg-slate-50 dark:bg-slate-700">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('orderId')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('customerName')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('orderDate')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('totalPrice')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('status')}</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                    {filteredOrders.map(order => (
                                        <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                            <td data-label={t('orderId')} className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-700 dark:text-slate-300">{order.orderId}</td>
                                            <td data-label={t('customerName')} className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 dark:text-slate-100">{order.customerName}</td>
                                            <td data-label={t('orderDate')} className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-slate-400">{localizeDigits(order.orderDate)}</td>
                                            <td data-label={t('totalPrice')} className="px-6 py-4 whitespace-nowrap font-semibold">{localizeDigits(order.totalPrice.toLocaleString())} {t('toman')}</td>
                                            <td data-label={t('status')} className="px-6 py-4 whitespace-nowrap"><span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[order.status]}`}>{t(order.status)}</span></td>
                                            <td data-label={t('actions')} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => openDetailsModal(order)} className="text-cyan-600 hover:text-cyan-900 font-semibold">{t('viewDetails')}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {filteredOrders.length === 0 && <p className="text-center text-gray-500 dark:text-slate-400 py-12">{t('noResultsFound')}</p>}
                </main>
            </div>
            {isModalOpen && selectedOrder && (
                <ZhavOrderDetailsModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    order={selectedOrder}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default ZhavAdminPage;