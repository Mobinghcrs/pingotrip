import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_PURCHASES } from '../../constants';
import { Purchase } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminPurchaseListItem from '../../components/AdminPurchaseListItem';
import { CheckIcon, XIcon } from '../../assets/icons';

const CurrencyDeliveryAdminPage = () => {
    const { t, language } = useTranslation();
    const [allBookings, setAllBookings] = useState<Purchase[]>(MOCK_PURCHASES);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    const bookings = allBookings.filter(b => b.type === 'currencyDelivery');

    const handleStatusChange = (id: number, newStatus: 'approved' | 'rejected') => {
        setAllBookings(prev => 
            prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
        );
    };

    const statusStyles: { [key in Purchase['status']]: string } = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    };

    return (
        <div className="relative min-h-screen bg-slate-100">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="currency-delivery-admin"
            />
            <div className="md:mr-64">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('currencyDeliveryAdmin')}</h2>
                    
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="md:hidden p-4 space-y-3">
                            {bookings.length > 0 ? bookings.map(p => <AdminPurchaseListItem key={p.id} purchase={p} onStatusChange={handleStatusChange} />) : <p className="text-center text-gray-500 py-8">{t('noResultsFound')}</p>}
                        </div>

                        <div className="hidden md:block overflow-x-auto">
                            {bookings.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('bookingId')}</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('customer')}</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('details')}</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('amount')}</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">{t('actions')}</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {bookings.map(purchase => (
                                            <tr key={purchase.id}>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="font-mono text-gray-500">{purchase.ref}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="font-medium text-gray-900">ایوب غریباوی</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-gray-900">{t(purchase.descriptionKey)}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="font-semibold text-gray-800">{purchase.price.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')} {t('rial')}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[purchase.status]}`}>{t(purchase.status)}</span></td>
                                                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => handleStatusChange(purchase.id, 'approved')} disabled={purchase.status === 'approved'} className="text-green-600 hover:text-green-900 disabled:text-gray-300 disabled:cursor-not-allowed"><CheckIcon className="w-5 h-5"/></button>
                                                        <button onClick={() => handleStatusChange(purchase.id, 'rejected')} disabled={purchase.status === 'rejected'} className="text-red-600 hover:text-red-900 disabled:text-gray-300 disabled:cursor-not-allowed"><XIcon className="w-5 h-5"/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center text-gray-500 py-12">{t('noResultsFound')}</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CurrencyDeliveryAdminPage;