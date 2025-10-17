import React, { useState } from 'react';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { CreditCardIcon, CheckCircleIcon, ShoppingCartIcon, ShieldIcon } from '../assets/icons';
import CreditActivationModal from '../components/CreditActivationModal';

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-100 border-2 border-cyan-200 text-sky-900 font-bold text-lg flex items-center justify-center">
            {number}
        </div>
        <div>
            <h4 className="font-bold text-slate-800">{title}</h4>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-green-500 mt-1">
            {icon}
        </div>
        <div>
            <h4 className="font-semibold text-slate-700">{title}</h4>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
    </div>
);

const PingoCreditPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('pingoCreditPageTitle')} />
            <main className="pb-8">
                {/* --- HERO SECTION --- */}
                <div className="relative bg-sky-900 text-white text-center p-8 pt-6 rounded-b-3xl overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full"></div>
                    <div className="absolute -bottom-16 -right-5 w-40 h-40 bg-white/5 rounded-full"></div>
                    <CreditCardIcon className="w-16 h-16 text-cyan-300 mx-auto mb-3" />
                    <h1 className="text-3xl font-extrabold">{t('pingoCreditHeroTitle')}</h1>
                    <p className="mt-2 mb-6 max-w-md mx-auto opacity-90">{t('pingoCreditHeroSubtitle')}</p>
                    <button 
                        onClick={() => setIsActivationModalOpen(true)}
                        className="bg-cyan-400 text-sky-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-cyan-300 transition-transform hover:scale-105 duration-300">
                        {t('activateYourCredit')}
                    </button>
                </div>

                {/* --- HOW IT WORKS --- */}
                <div className="p-4 mt-6">
                    <div className="bg-white rounded-2xl shadow-md border p-6">
                        <h2 className="text-xl font-extrabold text-slate-800 mb-6 text-center">{t('howPingoCreditWorks')}</h2>
                        <div className="space-y-6">
                            <StepCard number={localizeDigits(1)} title={t('step1Title')} description={t('step1Desc')} />
                            <StepCard number={localizeDigits(2)} title={t('step2Title')} description={t('step2Desc')} />
                            <StepCard number={localizeDigits(3)} title={t('step3Title')} description={t('step3Desc')} />
                            <StepCard number={localizeDigits(4)} title={t('step4Title')} description={t('step4Desc')} />
                        </div>
                    </div>
                </div>

                {/* --- BENEFITS --- */}
                <div className="p-4 mt-2">
                     <div className="bg-white rounded-2xl shadow-md border p-6">
                         <h2 className="text-xl font-extrabold text-slate-800 mb-6 text-center">{t('benefitsOfPingoCredit')}</h2>
                         <div className="space-y-4">
                            <BenefitCard icon={<CheckCircleIcon className="w-5 h-5"/>} title={t('benefitFinancialFlexibility')} description={t('benefitFinancialFlexibilityDesc')} />
                            <BenefitCard icon={<CheckCircleIcon className="w-5 h-5"/>} title={t('benefitInterestFree')} description={t('benefitInterestFreeDesc')} />
                            <BenefitCard icon={<CheckCircleIcon className="w-5 h-5"/>} title={t('benefitEasyManagement')} description={t('benefitEasyManagementDesc')} />
                         </div>
                    </div>
                </div>

                 {/* --- SECURITY --- */}
                <div className="p-4 mt-2">
                     <div className="bg-cyan-50/50 border-2 border-dashed border-cyan-200 rounded-2xl p-6 flex items-start gap-4">
                        <ShieldIcon className="w-10 h-10 text-sky-900 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-sky-900">{t('secureVerification')}</h3>
                            <p className="text-sm text-slate-600 mt-1">{t('secureVerificationDesc')}</p>
                        </div>
                    </div>
                </div>
            </main>
            <CreditActivationModal 
                isOpen={isActivationModalOpen}
                onClose={() => setIsActivationModalOpen(false)}
            />
        </div>
    );
};

export default PingoCreditPage;
