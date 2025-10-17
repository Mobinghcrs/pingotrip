import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_HEALTH_SERVICES } from '../../constants';
import { HealthService } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { EditIcon, Trash2Icon } from '../../assets/icons';
import HealthServiceFormModal from '../../components/admin/HealthServiceFormModal';

const ManageHealthServicesAdminPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [services, setServices] = useState<HealthService[]>(MOCK_HEALTH_SERVICES);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<HealthService | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleOpenModal = (service: HealthService | null) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    const handleSave = (serviceToSave: HealthService) => {
        setServices(prev => {
            // This is a simplified ID generation for the mock setup.
            // A real app would use a proper ID from a database.
            if (serviceToSave.id) { // Existing service
                return prev.map(s => s.id === serviceToSave.id ? serviceToSave : s);
            }
            // New service
            const newId = serviceToSave.nameKey.toLowerCase().replace(/\s+/g, '-');
            return [...prev, { ...serviceToSave, id: newId }];
        });
        handleCloseModal();
    };
    
    const handleDelete = (serviceId: string) => {
        if (window.confirm(t('confirmDeleteService'))) {
             setServices(prev => prev.filter(s => s.id !== serviceId));
        }
    };

    return (
        <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="manage-health-services"
            />
            <div className="md:mr-64 transition-all duration-300">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t('manageHealthServicesAdmin')}</h2>
                        <button onClick={() => handleOpenModal(null)} className="bg-sky-900 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-800 transition-colors">{t('addNewService')}</button>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 responsive-table">
                                <thead className="bg-slate-50 dark:bg-slate-700">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('serviceName')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('price')}</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                    {services.map(service => (
                                        <tr key={service.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                            <td data-label={t('serviceName')} className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 dark:text-slate-100">{t(service.nameKey)}</td>
                                            <td data-label={t('price')} className="px-6 py-4 whitespace-nowrap font-semibold">{localizeDigits(service.price.toLocaleString())} {t('rial')}</td>
                                            <td data-label={t('actions')} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button onClick={() => handleOpenModal(service)} className="text-gray-400 hover:text-cyan-600" title={t('editService')}><EditIcon className="w-5 h-5"/></button>
                                                    <button onClick={() => handleDelete(service.id)} className="text-gray-400 hover:text-red-600" title={t('delete')}><Trash2Icon className="w-5 h-5"/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
            {isModalOpen && (
                <HealthServiceFormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    service={selectedService}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default ManageHealthServicesAdminPage;