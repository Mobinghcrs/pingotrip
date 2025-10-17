import React from 'react';
import { Link } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
// FIX: Replaced SettingsIcon with CogIcon as it is not exported from assets/icons.
import { ChevronRightIcon, UserCircleIcon, SuitcaseIcon, WalletIcon, CogIcon, LogOutIcon, EditIcon, ShieldIcon } from '../assets/icons';

const ProfilePage = () => {
    const { t, language, localizeDigits } = useTranslation();
    const isRtl = language === 'fa' || language === 'ar';

    const ActionButton = ({ icon, text, link = "#", isLogout = false }: { icon: React.ReactNode, text: string, link?: string, isLogout?: boolean }) => (
        <Link to={link} className={`flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group ${isLogout ? 'hover:bg-red-50 dark:hover:bg-red-500/10' : ''}`}>
            <div className="flex items-center gap-4">
                {icon}
                <span className={`font-semibold ${isLogout ? 'text-red-600 dark:text-red-500' : 'text-slate-700 dark:text-slate-200'}`}>{text}</span>
            </div>
            <ChevronRightIcon className={`w-5 h-5 text-gray-400 ${isRtl ? 'rotate-180' : ''}`} />
        </Link>
    );

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <BookingHeader title={t('profile')} />
            <main className="p-4 space-y-6">
                <div className="flex flex-col items-center bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700 p-6">
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full border-4 border-cyan-200 dark:border-cyan-700 flex items-center justify-center bg-cyan-50 dark:bg-slate-700">
                            <UserCircleIcon className="w-16 h-16 text-sky-900 dark:text-sky-400" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t('pishgamanTech')}</h1>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{localizeDigits('09921021055')}</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">ayoub.gharibavi@example.com</p>
                </div>
                
                <div className="space-y-3">
                    <ActionButton icon={<EditIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400"/>} text={t('editProfile')} link="/profile/edit" />
                    <ActionButton icon={<SuitcaseIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400"/>} text={t('myTrips')} link="/purchases" />
                    <ActionButton icon={<WalletIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400"/>} text={t('wallet')} link="/wallet" />
                    <ActionButton icon={<CogIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400"/>} text={t('settings')} link="/profile/settings" />
                    <ActionButton icon={<ShieldIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400"/>} text={t('adminPanel')} link="/admin" />
                    <ActionButton icon={<LogOutIcon className="w-6 h-6 text-red-500"/>} text={t('logout')} isLogout={true} />
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;