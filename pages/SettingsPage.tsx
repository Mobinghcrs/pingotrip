import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import ToggleSwitch from '../components/ToggleSwitch';
import { useTranslation } from '../hooks/useTranslation';
import { ThemeContext, Theme } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { Language } from '../types';
import {
    ChevronRightIcon,
    UserIcon,
    LockIcon,
    BellIcon,
    TagIcon,
    MailIcon,
    GlobeIcon,
    SunIcon,
    MoonIcon,
    SparklesIcon,
    FileTextIcon,
    HelpCircleIcon,
    LogOutIcon,
} from '../assets/icons';

// Local Section Component
const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h2 className="px-4 pb-2 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</h2>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border dark:border-slate-700">
            <div className="divide-y dark:divide-slate-700">{children}</div>
        </div>
    </div>
);

// Local Row Component for Links
interface SettingsLinkProps {
    icon: React.ReactNode;
    label: string;
    value?: string;
    link?: string;
}
const SettingsLink: React.FC<SettingsLinkProps> = ({ icon, label, value, link = "#" }) => {
    const { isRtl } = useTranslation();
    return (
        <Link to={link} className="flex items-center justify-between p-4 group">
            <div className="flex items-center gap-4">
                <div className="text-gray-400 dark:text-slate-500">{icon}</div>
                <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">{label}</p>
                    {value && <p className="text-sm text-gray-500 dark:text-slate-400">{value}</p>}
                </div>
            </div>
            <ChevronRightIcon className={`w-5 h-5 text-gray-400 ${isRtl ? 'rotate-180' : ''}`} />
        </Link>
    );
};

// Local Row Component for Toggles
interface SettingsToggleProps {
    icon: React.ReactNode;
    label: string;
    initialChecked?: boolean;
}
const SettingsToggle: React.FC<SettingsToggleProps> = ({ icon, label, initialChecked = false }) => {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
                <div className="text-gray-400 dark:text-slate-500">{icon}</div>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{label}</p>
            </div>
            <ToggleSwitch initialChecked={initialChecked} />
        </div>
    );
};

const LanguageSelector: React.FC = () => {
    const { t } = useTranslation();
    const languageContext = useContext(LanguageContext);

    if (!languageContext) return null;

    const { language: selectedLanguage, setLanguage } = languageContext;
    
    const languages: {id: Language, label: string}[] = [
        { id: 'fa', label: 'فارسی' },
        { id: 'en', label: 'English' },
        { id: 'ar', label: 'العربية' },
    ];

    return (
        <div className="p-4">
             <div className="flex items-center gap-4 mb-3">
                <div className="text-gray-400 dark:text-slate-500"><GlobeIcon className="w-6 h-6" /></div>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{t('language')}</p>
            </div>
            <div className="flex items-center justify-center bg-gray-100 dark:bg-slate-700/50 rounded-xl p-1">
                {languages.map(lang => (
                     <button 
                        key={lang.id}
                        onClick={() => setLanguage(lang.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-lg transition-colors duration-300 ${
                            selectedLanguage === lang.id 
                                ? 'bg-white dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 shadow-sm' 
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                    >
                        <span>{lang.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};


const ThemeSelector: React.FC = () => {
    const { t } = useTranslation();
    const themeContext = useContext(ThemeContext);

    if (!themeContext) return null;

    const { theme: selectedTheme, setTheme } = themeContext;
    
    const themes: {id: Theme, label: string, icon: React.ReactNode}[] = [
        { id: 'light', label: t('light'), icon: <SunIcon className="w-5 h-5" /> },
        { id: 'dark', label: t('dark'), icon: <MoonIcon className="w-5 h-5" /> },
        { id: 'system', label: t('systemDefault'), icon: <SparklesIcon className="w-5 h-5" /> },
    ];

    return (
        <div className="p-4">
             <div className="flex items-center gap-4 mb-3">
                <div className="text-gray-400 dark:text-slate-500"><SunIcon className="w-6 h-6" /></div>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{t('theme')}</p>
            </div>
            <div className="flex items-center justify-center bg-gray-100 dark:bg-slate-700/50 rounded-xl p-1">
                {themes.map(theme => (
                     <button 
                        key={theme.id}
                        onClick={() => setTheme(theme.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-lg transition-colors duration-300 ${
                            selectedTheme === theme.id 
                                ? 'bg-white dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 shadow-sm' 
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                    >
                        {theme.icon}
                        <span>{theme.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};


const SettingsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <BookingHeader title={t('settingsPageTitle')} />
            <main className="p-4 space-y-8">
                <Section title={t('account')}>
                    <SettingsLink icon={<UserIcon className="w-6 h-6"/>} label={t('personalInfo')} link="/profile/edit" />
                    <SettingsLink icon={<LockIcon className="w-6 h-6"/>} label={t('loginAndSecurity')} link="/profile/login-security" />
                </Section>
                
                <Section title={t('notifications')}>
                    <SettingsToggle icon={<BellIcon className="w-6 h-6"/>} label={t('pushNotifications')} initialChecked={true} />
                    <SettingsToggle icon={<MailIcon className="w-6 h-6"/>} label={t('emailNotifications')} />
                    <SettingsToggle icon={<TagIcon className="w-6 h-6"/>} label={t('offersAndPromotions')} initialChecked={true} />
                </Section>
                
                <Section title={t('appearance')}>
                    <LanguageSelector />
                    <ThemeSelector />
                </Section>

                <Section title={t('legalAndSupport')}>
                    <SettingsLink icon={<FileTextIcon className="w-6 h-6"/>} label={t('termsOfService')} link="/profile/terms-of-service" />
                    <SettingsLink icon={<FileTextIcon className="w-6 h-6"/>} label={t('privacyPolicy')} />
                    <SettingsLink icon={<HelpCircleIcon className="w-6 h-6"/>} label={t('helpCenter')} link="/profile/help-center" />
                </Section>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border dark:border-slate-700">
                    <button className="w-full text-red-600 dark:text-red-500 font-bold p-4 flex items-center justify-center gap-3">
                        <LogOutIcon className="w-6 h-6" />
                        <span>{t('logout')}</span>
                    </button>
                </div>

            </main>
        </div>
    );
};

export default SettingsPage;