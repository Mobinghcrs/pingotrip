import React, { useState } from 'react';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import ToggleSwitch from '../components/ToggleSwitch';
import { SmartphoneIcon, GlobeIcon, LockIcon } from '../assets/icons';

const Section: React.FC<{ title: string, children: React.ReactNode, description?: string }> = ({ title, children, description }) => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700">
        <div className="p-4 border-b dark:border-slate-700">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h2>
            {description && <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{description}</p>}
        </div>
        <div className="p-4">
            {children}
        </div>
    </div>
);

const LoginAndSecurityPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    const mockSessions = [
        { id: 1, deviceKey: 'chromeOnWindows', location: 'Tehran, Iran', timeKey: 'activeNow', icon: <GlobeIcon className="w-6 h-6 text-gray-500 dark:text-slate-400"/> },
        { id: 2, deviceKey: 'pingoAppOnAndroid', location: 'Isfahan, Iran', timeKey: 'lastActive', icon: <SmartphoneIcon className="w-6 h-6 text-gray-500 dark:text-slate-400"/> },
    ];

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        alert(t('passwordChangedSuccessfully'));
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <BookingHeader title={t('loginAndSecurity')} />
            <main className="p-4 space-y-6">
                <Section title={t('changePassword')}>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('currentPassword')}</label>
                            <div className="relative">
                                <LockIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="w-full p-3 ps-10 border-2 border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('newPassword')}</label>
                            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full p-3 border-2 border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">{t('confirmNewPassword')}</label>
                            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full p-3 border-2 border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        </div>
                        <button type="submit" className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold hover:bg-sky-800 transition-colors">{t('saveNewPassword')}</button>
                    </form>
                </Section>
                
                <Section title={t('twoFactorAuthentication')} description={t('twoFactorAuthenticationDesc')}>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-700 dark:text-slate-200">{t('enable2FA')}</p>
                        <ToggleSwitch initialChecked={is2FAEnabled} onChange={setIs2FAEnabled} />
                    </div>
                </Section>

                <Section title={t('loginActivity')}>
                    <div className="space-y-4">
                        {mockSessions.map(session => (
                             <div key={session.id} className="flex items-center gap-4">
                                {session.icon}
                                <div className="flex-grow">
                                    <p className="font-semibold text-slate-800 dark:text-slate-100">{t(session.deviceKey)}</p>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">{session.location} &bull; <span className={session.timeKey === 'activeNow' ? 'text-green-500 font-semibold' : ''}>{t(session.timeKey)}</span></p>
                                </div>
                                {session.timeKey !== 'activeNow' && <button className="text-xs font-semibold text-red-500 hover:underline">{t('logout')}</button>}
                             </div>
                        ))}
                        <div className="border-t dark:border-slate-700 pt-4">
                             <button className="w-full text-red-500 dark:text-red-400 font-bold text-sm py-2 bg-red-50 dark:bg-red-500/10 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
                                {t('logoutOtherSessions')}
                            </button>
                        </div>
                    </div>
                </Section>
            </main>
        </div>
    );
};

export default LoginAndSecurityPage;
