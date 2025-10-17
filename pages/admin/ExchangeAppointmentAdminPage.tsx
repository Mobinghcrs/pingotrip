import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_EXCHANGE_APPOINTMENTS } from '../../constants';
import { AdminExchangeAppointment } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import {
    SearchIcon, FileTextIcon, UsersIcon, CalendarCheckIcon, ChevronDownIcon
} from '../../assets/icons';
import ExchangeAppointmentDetailsModal from '../../components/admin/ExchangeAppointmentDetailsModal';

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

const ExchangeAppointmentAdminPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [appointments, setAppointments] = useState<AdminExchangeAppointment[]>(MOCK_EXCHANGE_APPOINTMENTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<AdminExchangeAppointment | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const openDetailsModal = (app: AdminExchangeAppointment) => {
        setSelectedAppointment(app);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
    };

    const handleSave = (updatedApp: AdminExchangeAppointment) => {
        setAppointments(prev => prev.map(a => a.id === updatedApp.id ? updatedApp : a));
        closeModal();
    };

    const filteredAppointments = useMemo(() => appointments.filter(app => 
        (app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || app.appointmentId.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'all' || app.status === statusFilter)
    ), [appointments, searchTerm, statusFilter]);
    
    const statusStyles: { [key in AdminExchangeAppointment['status']]: string } = {
        confirmed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        completed: 'bg-blue-100 text-blue-800',
    };
    
    const statusOptions = ['all', 'confirmed', 'cancelled', 'completed'];

    return (
        <div className="relative min-h-screen bg-slate-100">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="exchange-appointment-admin"
            />
            <div className="md:mr-64">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('exchangeAppointmentAdmin')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <StatCard icon={<FileTextIcon className="w-6 h-6 text-sky-900" />} title={t('totalAppointments')} value={localizeDigits(appointments.length)} />
                        <StatCard icon={<CalendarCheckIcon className="w-6 h-6 text-sky-900" />} title={t('appointmentsToday')} value={localizeDigits(2)} />
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="text"
                                    placeholder={t('searchByCustomerName')}
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
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('branch')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')} & {t('time')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredAppointments.map(app => (
                                        <tr key={app.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-semibold text-gray-900">{app.customerName}</div>
                                                <div className="font-mono text-xs text-gray-500">{app.appointmentId}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap"><div className="text-gray-700">{t(app.branchNameKey)}</div></td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{localizeDigits(app.date)} - {localizeDigits(app.time)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[app.status]}`}>{t(app.status)}</span></td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => openDetailsModal(app)} className="text-cyan-600 hover:text-cyan-900 font-semibold">{t('viewDetails')}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {filteredAppointments.length === 0 && <p className="text-center text-gray-500 py-12">{t('noResultsFound')}</p>}
                </main>
            </div>
            {isModalOpen && selectedAppointment && (
                <ExchangeAppointmentDetailsModal 
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    appointment={selectedAppointment}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default ExchangeAppointmentAdminPage;