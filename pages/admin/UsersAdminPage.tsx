import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_ADMIN_USERS } from '../../constants';
import { AdminUser } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { 
    SearchIcon, UsersIcon, CheckCircleIcon, ChevronDownIcon, EditIcon, Trash2Icon, XCircleIcon
} from '../../assets/icons';
import UserDetailsModal from '../../components/admin/UserDetailsModal';

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

const UsersAdminPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const openModal = (user: AdminUser | null = null) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleSave = (userToSave: AdminUser) => {
        setUsers(prev => {
            if (userToSave.id) {
                return prev.map(u => u.id === userToSave.id ? userToSave : u);
            }
            return [...prev, { ...userToSave, id: Date.now() }];
        });
        closeModal();
    };
    
    const handleDelete = (userId: number) => {
        if (window.confirm(t('confirmDeleteUser'))) {
             setUsers(prev => prev.filter(u => u.id !== userId));
        }
    };
    
    const toggleSuspend = (user: AdminUser) => {
        const newStatus = user.status === 'active' ? 'suspended' : 'active';
        handleSave({ ...user, status: newStatus });
    };

    const filteredUsers = useMemo(() => users.filter(user => 
        (user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'all' || user.status === statusFilter)
    ), [users, searchTerm, statusFilter]);
    
    const statusStyles: { [key in AdminUser['status']]: string } = {
        active: 'bg-green-100 text-green-800',
        suspended: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800',
    };
    
    const statusOptions = ['all', 'active', 'suspended', 'pending'];

    return (
        <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="users"
            />
            <div className="md:mr-64 transition-all duration-300">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('userManagement')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <StatCard icon={<UsersIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('totalUsers')} value={localizeDigits(users.length)} />
                        <StatCard icon={<CheckCircleIcon className="w-6 h-6 text-sky-900 dark:text-cyan-400" />} title={t('activeUsers')} value={localizeDigits(users.filter(a => a.status === 'active').length)} />
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-4 mb-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="relative w-full md:w-1/2">
                                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="text"
                                    placeholder={t('searchByUser')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-cyan-500 text-right"
                                />
                            </div>
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="relative flex-grow">
                                    <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                     <select
                                        value={statusFilter}
                                        onChange={e => setStatusFilter(e.target.value)}
                                        className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg py-2.5 px-4 outline-none focus:ring-2 focus:ring-cyan-500 appearance-none text-right"
                                    >
                                        {statusOptions.map(opt => <option key={opt} value={opt}>{t(opt)}</option>)}
                                    </select>
                                </div>
                                 <button onClick={() => openModal()} className="bg-sky-900 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-sky-800 transition-colors flex-shrink-0">{t('addUser')}</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 responsive-table">
                                <thead className="bg-slate-50 dark:bg-slate-700">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('fullName')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('contactInfo')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('registrationDate')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('status')}</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                    {filteredUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                            <td data-label={t('fullName')} className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full object-cover" src={user.avatarUrl} alt={user.fullName} />
                                                    </div>
                                                    <div className="mr-4">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{user.fullName}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-label={t('contactInfo')} className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-slate-300">{user.email}</div>
                                                <div className="text-sm text-gray-500 dark:text-slate-400">{localizeDigits(user.phone)}</div>
                                            </td>
                                            <td data-label={t('registrationDate')} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">{localizeDigits(user.registrationDate)}</td>
                                            <td data-label={t('status')} className="px-6 py-4 whitespace-nowrap"><span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[user.status]}`}>{t(user.status)}</span></td>
                                            <td data-label={t('actions')} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => openModal(user)} className="text-gray-400 hover:text-cyan-600" title={t('editUser')}><EditIcon className="w-5 h-5"/></button>
                                                    <button onClick={() => toggleSuspend(user)} className="text-gray-400 hover:text-yellow-600" title={user.status === 'active' ? t('suspendUser') : t('activateUser')}><XCircleIcon className="w-5 h-5"/></button>
                                                    <button onClick={() => handleDelete(user.id)} className="text-gray-400 hover:text-red-600" title={t('deleteUser')}><Trash2Icon className="w-5 h-5"/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {filteredUsers.length === 0 && <p className="text-center text-gray-500 dark:text-slate-400 py-12">{t('noResultsFound')}</p>}
                </main>
            </div>
            {isModalOpen && (
                <UserDetailsModal 
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    user={selectedUser}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default UsersAdminPage;