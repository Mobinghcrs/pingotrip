import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { AdminUser } from '../../types';
import { XIcon, UserIcon, MailIcon, PhoneIcon } from '../../assets/icons';

interface UserDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: AdminUser | null;
    onSave: (user: AdminUser) => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, user, onSave }) => {
    const { t } = useTranslation();
    const [editableUser, setEditableUser] = useState<Partial<AdminUser>>({});

    useEffect(() => {
        if (user) {
            setEditableUser(user);
        } else {
            setEditableUser({
                fullName: '',
                email: '',
                phone: '',
                status: 'pending',
                registrationDate: new Date().toLocaleDateString('fa-IR'),
            });
        }
    }, [user, isOpen]);

    const handleChange = (field: keyof Omit<AdminUser, 'id' | 'avatarUrl'>, value: string) => {
        setEditableUser(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editableUser as AdminUser);
    };

    if (!isOpen) return null;

    const isNewUser = !user;
    const statusOptions: AdminUser['status'][] = ['pending', 'active', 'suspended'];
     const statusStyles: { [key in AdminUser['status']]: string } = {
        active: 'bg-green-100 text-green-800 border-green-300',
        suspended: 'bg-red-100 text-red-800 border-red-300',
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };


    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-down" style={{animationDuration: '0.2s'}} onClick={onClose}>
            <form className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()} onSubmit={handleSaveChanges}>
                <header className="flex items-center justify-between p-4 border-b bg-white rounded-t-2xl">
                    <h2 className="text-xl font-bold text-slate-800">{isNewUser ? t('addUser') : t('editUser')}</h2>
                    <button type="button" onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                </header>

                {/* FIX: Changed main to div to resolve potential parsing issues. */}
                <div className="p-6 overflow-y-auto space-y-4">
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('fullName')}</label>
                        <div className="relative">
                            <UserIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                            <input type="text" value={editableUser.fullName || ''} onChange={e => handleChange('fullName', e.target.value)} required className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('emailAddress')}</label>
                        <div className="relative">
                            <MailIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                            <input type="email" value={editableUser.email || ''} onChange={e => handleChange('email', e.target.value)} required className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('phoneNumber')}</label>
                        <div className="relative">
                            <PhoneIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                            <input type="tel" value={editableUser.phone || ''} onChange={e => handleChange('phone', e.target.value)} required className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        </div>
                    </div>
                    <div>
                         <label className="block text-sm font-semibold text-gray-700 mb-1">{t('status')}</label>
                         <select
                            value={editableUser.status}
                            onChange={(e) => handleChange('status', e.target.value)}
                            className={`w-full p-3 border-2 rounded-lg font-semibold appearance-none ${statusStyles[editableUser.status || 'pending']}`}
                        >
                            {statusOptions.map(opt => <option key={opt} value={opt}>{t(opt)}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('internalNotes')}</label>
                        <textarea
                            value={editableUser.notes || ''}
                            onChange={e => handleChange('notes', e.target.value)}
                            rows={3}
                            className="w-full p-2 border-2 rounded-md bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                            placeholder={t('notes') + '...'}
                        />
                    </div>
                </div>

                {/* FIX: Changed footer to div to resolve potential parsing issues. */}
                <div className="flex justify-end p-4 border-t bg-white rounded-b-2xl">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors mr-3">{t('cancel')}</button>
                    <button type="submit" className="bg-sky-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-800 transition-colors">{t('saveChanges')}</button>
                </div>
            </form>
        </div>
    );
};

export default UserDetailsModal;
