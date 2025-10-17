import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_PURCHASES } from '../../constants';
import { Purchase } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminPurchaseListItem from '../../components/AdminPurchaseListItem';

interface AdminPurchaseListPageProps {
    pageTitleKey: string;
    activeTabId: string;
    filterTypes: Array<Purchase['type']>;
}

const AdminPurchaseListPage: React.FC<AdminPurchaseListPageProps> = ({ pageTitleKey, activeTabId, filterTypes }) => {
    const { t } = useTranslation();
    const [allBookings, setAllBookings] = useState<Purchase[]>(MOCK_PURCHASES);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const bookings = allBookings.filter(b => filterTypes.includes(b.type));

    const handleStatusChange = (id: number, newStatus: 'approved' | 'rejected') => {
        setAllBookings(prev => 
            prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
        );
    };

    return (
        <div className="relative min-h-screen bg-slate-100">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab={activeTabId}
            />
            <div className="md:mr-64">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">{t(pageTitleKey)}</h2>
                    
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="space-y-3">
                            {bookings.length > 0 
                                ? bookings.map(p => <AdminPurchaseListItem key={p.id} purchase={p} onStatusChange={handleStatusChange} />) 
                                : <p className="text-center text-gray-500 py-8">{t('noResultsFound')}</p>}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPurchaseListPage;