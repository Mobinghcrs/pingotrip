import React from 'react';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700 p-6">
        <h2 className="text-xl font-bold text-sky-900 dark:text-cyan-400 mb-3">{title}</h2>
        <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
            {children}
        </div>
    </div>
);

const TermsOfServicePage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <BookingHeader title={t('termsOfService')} />
            <main className="p-4 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{t('termsOfServiceTitle')}</h1>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{t('lastUpdated')}: 2024/07/26</p>
                </div>
                
                <Section title={t('introduction')}>
                    <p>{t('introductionText')}</p>
                </Section>
                
                <Section title={t('userAccounts')}>
                    <p>{t('userAccountsText')}</p>
                </Section>

                <Section title={t('prohibitedActivities')}>
                    <p>{t('prohibitedActivitiesText')}</p>
                </Section>

                <Section title={t('termination')}>
                    <p>{t('terminationText')}</p>
                </Section>

                <Section title={t('governingLaw')}>
                    <p>{t('governingLawText')}</p>
                </Section>

                <Section title={t('contactUs')}>
                    <p>{t('contactUsText')}</p>
                </Section>
            </main>
        </div>
    );
};

export default TermsOfServicePage;