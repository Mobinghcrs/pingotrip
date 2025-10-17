import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { UserIcon, MailIcon, PhoneIcon } from '../assets/icons';

const EditProfilePage = () => {
    const { t, localizeDigits } = useTranslation();
    const navigate = useNavigate();

    // Mock user data
    const [fullName, setFullName] = useState('ایوب غریباوی');
    const [email, setEmail] = useState('ayoub.gharibavi@example.com');
    const [phone, setPhone] = useState('۰۹۱۲۳۴۵۶۷۸۹');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would be an API call
        console.log({ fullName, email, phone });
        alert(t('profileUpdatedSuccessfully')); // Simple feedback
        navigate('/profile');
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <BookingHeader title={t('editProfile')} />
            <form onSubmit={handleSubmit}>
                <main className="p-4 space-y-6 pb-28">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700 p-6 space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('fullName')}</label>
                            <div className="relative">
                                <UserIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <input id="fullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full p-3 ps-10 border-2 border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="emailAddress" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('emailAddress')}</label>
                            <div className="relative">
                                <MailIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <input id="emailAddress" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 ps-10 border-2 border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('phoneNumber')}</label>
                            <div className="relative">
                                <PhoneIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <input id="phoneNumber" type="tel" value={localizeDigits(phone)} onChange={e => setPhone(e.target.value)} className="w-full p-3 ps-10 border-2 border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700 p-4">
                        <div className="flex justify-between items-center">
                             <div>
                                <p className="font-semibold text-slate-700 dark:text-slate-200">{t('password')}</p>
                                <p className="text-sm text-gray-500 dark:text-slate-400">{t('passwordLastChanged')}</p>
                            </div>
                            <button type="button" className="text-cyan-600 dark:text-cyan-400 font-bold text-sm">{t('changePassword')}</button>
                        </div>
                    </div>
                </main>

                <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-t dark:border-slate-700 p-3">
                    <div className="flex items-center gap-3">
                        <button type="button" onClick={() => navigate('/profile')} className="w-1/3 bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 py-3 rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">
                            {t('cancel')}
                        </button>
                        <button type="submit" className="w-2/3 bg-sky-900 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-sky-900/40 hover:bg-sky-800 transition-all duration-200 active:scale-95">
                            {t('saveChanges')}
                        </button>
                    </div>
                </footer>
            </form>
        </div>
    );
};

export default EditProfilePage;