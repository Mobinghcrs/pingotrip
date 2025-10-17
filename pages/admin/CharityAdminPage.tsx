import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_ADMIN_DONATIONS } from '../../constants';
import { AdminDonation } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { 
    SearchIcon, FileTextIcon, UsersIcon, CheckCircleIcon, GemIcon, ChevronDownIcon, CharityIcon
} from '../../assets/icons';
import DonationDetailsModal from '../../components/admin/DonationDetailsModal';

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

const CharityAdminPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [donations, setDonations] = useState<AdminDonation[]>(MOCK_ADMIN_DONATIONS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState<AdminDonation | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const openDetailsModal = (donation: AdminDonation) => {
        setSelectedDonation(donation);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDonation(null);
    };

    const handleSave = (updatedDonation: AdminDonation) => {
        setDonations(prev => prev.map(d => d.id === updatedDonation.id ? updatedDonation : d));
        closeModal();
    };

    const filteredDonations = useMemo(() => donations.filter(donation => 
        (donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) || donation.transactionId.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [donations, searchTerm]);
    
    const statusStyles: { [key in AdminDonation['status']]: string } = {
        successful: 'bg-green-100 text-green-800',
        failed: 'bg-red-100 text-red-800',
    };
    
    const totalDonationAmount = donations.reduce((sum, d) => d.status === 'successful' ? sum + d.amount : sum, 0);

    return (
        <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="charity"
            />
            <div className="md:mr-64 transition-all duration-300">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('charityManagement')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <StatCard icon={<CharityIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('totalDonations')} value={`${localizeDigits(totalDonationAmount.toLocaleString())} ${t('toman')}`} />
                        <StatCard icon={<UsersIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('totalDonationsCount')} value={localizeDigits(donations.length)} />
                        <StatCard icon={<CheckCircleIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('mostSupportedProject')} value={t('schoolBuilding')} />
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-4 mb-6">
                        <div className="relative">
                            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                                type="text"
                                placeholder={t('searchByDonorOrId')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-cyan-500 text-right"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 responsive-table">
                                <thead className="bg-slate-50 dark:bg-slate-700">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('donorName')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('projectName')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('donationDate')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('amount')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('status')}</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                    {filteredDonations.map(donation => (
                                        <tr key={donation.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                            <td data-label={t('donorName')} className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-semibold text-gray-900 dark:text-slate-100">{donation.donorName}</div>
                                                <div className="font-mono text-xs text-gray-500 dark:text-slate-400">{donation.transactionId}</div>
                                            </td>
                                            <td data-label={t('projectName')} className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-slate-300">{t(donation.project.titleKey)}</td>
                                            <td data-label={t('donationDate')} className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-slate-400">{localizeDigits(donation.date)}</td>
                                            <td data-label={t('amount')} className="px-6 py-4 whitespace-nowrap font-semibold">{localizeDigits(donation.amount.toLocaleString())} {t('toman')}</td>
                                            <td data-label={t('status')} className="px-6 py-4 whitespace-nowrap"><span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[donation.status]}`}>{t(donation.status)}</span></td>
                                            <td data-label={t('actions')} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => openDetailsModal(donation)} className="text-cyan-600 hover:text-cyan-900 font-semibold">{t('viewDetails')}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {filteredDonations.length === 0 && <p className="text-center text-gray-500 dark:text-slate-400 py-12">{t('noResultsFound')}</p>}
                </main>
            </div>
            {isModalOpen && selectedDonation && (
                <DonationDetailsModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    donation={selectedDonation}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default CharityAdminPage;