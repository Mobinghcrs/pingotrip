import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_VISA_SERVICES } from '../../constants';
import { VisaService } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { SearchIcon, EditIcon, Trash2Icon } from '../../assets/icons';
import VisaFormModal from '../../components/admin/VisaFormModal';

const ManageVisaAdminPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [visas, setVisas] = useState<VisaService[]>(MOCK_VISA_SERVICES);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVisa, setSelectedVisa] = useState<VisaService | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleOpenModal = (visa: VisaService | null) => {
        setSelectedVisa(visa);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVisa(null);
    };

    const handleSave = (visaToSave: VisaService) => {
        setVisas(prev => {
            if (visaToSave.id > 0) { // Existing visa
                return prev.map(v => v.id === visaToSave.id ? visaToSave : v);
            }
            // New visa
            const newId = Math.max(0, ...prev.map(v => v.id)) + 1;
            return [...prev, { ...visaToSave, id: newId }];
        });
        handleCloseModal();
    };
    
    const handleDelete = (visaId: number) => {
        if (window.confirm(t('confirmDeleteVisa'))) {
             setVisas(prev => prev.filter(v => v.id !== visaId));
        }
    };

    return (
        <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="manage-visa"
            />
            <div className="md:mr-64 transition-all duration-300">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t('manageVisas')}</h2>
                        <button onClick={() => handleOpenModal(null)} className="bg-sky-900 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-800 transition-colors">{t('addNewVisa')}</button>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 responsive-table">
                                <thead className="bg-slate-50 dark:bg-slate-700">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('country')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('visaType')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('price')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('processingTime')}</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                    {visas.map(visa => (
                                        <tr key={visa.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                            <td data-label={t('country')} className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 dark:text-slate-100">{t(visa.country)}</td>
                                            <td data-label={t('visaType')} className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-slate-300">{t(visa.visaType)}</td>
                                            <td data-label={t('price')} className="px-6 py-4 whitespace-nowrap font-semibold">{localizeDigits(visa.price.toLocaleString())} {t('rial')}</td>
                                            <td data-label={t('processingTime')} className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-slate-400">{localizeDigits(visa.processingTime)} {t('days')}</td>
                                            <td data-label={t('actions')} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button onClick={() => handleOpenModal(visa)} className="text-gray-400 hover:text-cyan-600" title={t('editVisa')}><EditIcon className="w-5 h-5"/></button>
                                                    <button onClick={() => handleDelete(visa.id)} className="text-gray-400 hover:text-red-600" title={t('deleteVisa')}><Trash2Icon className="w-5 h-5"/></button>
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
                <VisaFormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    visa={selectedVisa}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default ManageVisaAdminPage;