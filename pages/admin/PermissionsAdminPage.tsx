import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_ADMIN_USERS, PERMISSIONS_STRUCTURE } from '../../constants';
import { AdminUser } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { CheckCircleIcon, ChevronDownIcon } from '../../assets/icons';

const PermissionsAdminPage = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(users[0]?.id || null);
    const [currentUserPermissions, setCurrentUserPermissions] = useState<Record<string, boolean>>({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    const selectedUser = useMemo(() => users.find(u => u.id === selectedUserId), [users, selectedUserId]);

    useEffect(() => {
        if (selectedUser) {
            setCurrentUserPermissions(selectedUser.permissions || {});
        } else {
            setCurrentUserPermissions({});
        }
    }, [selectedUser]);

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = Number(e.target.value);
        setSelectedUserId(userId);
    };
    
    const handlePermissionToggle = (permissionId: string) => {
        setCurrentUserPermissions(prev => ({
            ...prev,
            [permissionId]: !prev[permissionId]
        }));
    };

    const handleSave = () => {
        if (!selectedUserId) return;

        setUsers(prevUsers => prevUsers.map(user => 
            user.id === selectedUserId ? { ...user, permissions: currentUserPermissions } : user
        ));
        
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
        <div className="relative min-h-screen bg-slate-100">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="permissions"
            />
            <div className="md:mr-64">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('permissionsManagement')}</h2>

                    <div className="bg-white rounded-xl shadow-md border p-6 mb-6">
                        <label htmlFor="user-select" className="block text-lg font-bold text-slate-800 mb-2">{t('selectUser')}</label>
                        <div className="relative">
                            <select
                                id="user-select"
                                value={selectedUserId || ''}
                                onChange={handleUserChange}
                                className="w-full bg-gray-100 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-cyan-500 appearance-none text-right font-semibold"
                            >
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.fullName} ({user.email})</option>
                                ))}
                            </select>
                            <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                    
                    {selectedUser && (
                        <div className="animate-fade-in-down space-y-6">
                            {PERMISSIONS_STRUCTURE.map(group => (
                                <div key={group.groupTitleKey} className="bg-white rounded-xl shadow-md border">
                                    <h3 className="text-lg font-bold text-slate-800 p-4 border-b">{t(group.groupTitleKey)}</h3>
                                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {group.permissions.map(perm => (
                                            <label key={perm.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={!!currentUserPermissions[perm.id]}
                                                    onChange={() => handlePermissionToggle(perm.id)}
                                                    className="w-5 h-5 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
                                                />
                                                <span className="font-semibold text-slate-700">{t(perm.labelKey)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="bg-white rounded-xl shadow-md border p-4 flex justify-between items-center">
                                <p className="text-sm text-gray-500">{t('userPermissionsNote')}</p>
                                <button
                                    onClick={handleSave}
                                    className="bg-sky-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-800 transition-colors shadow-lg shadow-sky-900/30"
                                >
                                    {t('savePermissions')}
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {showSuccess && (
                        <div className="fixed bottom-8 right-8 bg-green-500 text-white py-3 px-6 rounded-lg shadow-xl flex items-center gap-2 animate-fade-in-down">
                            <CheckCircleIcon className="w-6 h-6" />
                            <span className="font-bold">{t('permissionsUpdatedSuccess')}</span>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default PermissionsAdminPage;