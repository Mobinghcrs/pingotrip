import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_ADMIN_HEALTH_APPOINTMENTS } from '../../constants';
import { AdminHealthAppointment } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { 
    SearchIcon, FileTextIcon, UsersIcon, CheckCircleIcon, HeartPulseIcon, ChevronDownIcon
} from '../../assets/icons';
import HealthAppointmentDetailsModal from '../../components/admin/HealthAppointmentDetailsModal';

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

const HealthAdminPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [appointments, setAppointments] = useState<AdminHealthAppointment[]>(MOCK_ADMIN_HEALTH_APPOINTMENTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<AdminHealthAppointment | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const openDetailsModal = (app: AdminHealthAppointment) => {
        setSelectedAppointment(app);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
    };

    const handleSave = (updatedApp: AdminHealthAppointment) => {
        setAppointments(prev => prev.map(a => a.id === updatedApp.id ? updatedApp : a));
        closeModal();
    };

    const filteredAppointments = useMemo(() => appointments.filter(app => 
        (app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || app.ref.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'all' || app.status === statusFilter)
    ), [appointments, searchTerm, statusFilter]);
    
    const statusStyles: { [key in AdminHealthAppointment['status']]: string } = {
        confirmed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800',
        completed: 'bg-blue-100 text-blue-800',
    };
    
    const statusOptions = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];

    return (
        <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="health"
            />
            <div className="md:mr-64 transition-all duration-300">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('healthServicesManagement')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <StatCard icon={<FileTextIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('totalAppointments')} value={localizeDigits(appointments.length)} />
                        <StatCard icon={<UsersIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('appointmentsToday')} value={localizeDigits(appointments.filter(a => a.date === '1403/12/10').length)} />
                        <StatCard icon={<CheckCircleIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('pendingAppointments')} value={localizeDigits(appointments.filter(a => a.status === 'pending').length)} />
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="text"
                                    placeholder={t('searchByPatientOrRef')}
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
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('patient')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('treatment')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('date')} & {t('time')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('status')}</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                    {filteredAppointments.map(app => (
                                        <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                            <td data-label={t('patient')} className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-semibold text-gray-900 dark:text-slate-100">{app.patientName}</div>
                                                <div className="font-mono text-xs text-gray-500 dark:text-slate-400">{app.ref}</div>
                                            </td>
                                            <td data-label={t('treatment')} className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-2"><HeartPulseIcon className="w-4 h-4 text-gray-400"/> {t(app.treatmentKey)}</div></td>
                                            <td data-label={t('date')} className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-slate-400">{localizeDigits(app.date)} - {localizeDigits(app.time)}</td>
                                            <td data-label={t('status')} className="px-6 py-4 whitespace-nowrap"><span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[app.status]}`}>{t(app.status)}</span></td>
                                            <td data-label={t('actions')} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => openDetailsModal(app)} className="text-cyan-600 hover:text-cyan-900 font-semibold">{t('viewDetails')}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {filteredAppointments.length === 0 && <p className="text-center text-gray-500 dark:text-slate-400 py-12">{t('noResultsFound')}</p>}
                </main>
            </div>
            {isModalOpen && selectedAppointment && (
                <HealthAppointmentDetailsModal 
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    appointment={selectedAppointment}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default HealthAdminPage;