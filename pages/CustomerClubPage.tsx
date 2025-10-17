import React from 'react';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { MedalIcon, StarIcon, CheckCircleIcon } from '../assets/icons';

const TierCard = ({ tier, points, benefits, color, isCurrent, isNext }: { tier: string, points: string, benefits: string[], color: string, isCurrent?: boolean, isNext?: boolean }) => {
    const { t } = useTranslation();
    const cardStyle = isCurrent 
        ? `border-2 border-cyan-500 shadow-cyan-500/30` 
        : isNext 
        ? `border-2 border-dashed border-slate-400 dark:border-slate-600`
        : `border border-slate-200 dark:border-slate-700`;

    return (
        <div className={`bg-white dark:bg-slate-800 rounded-2xl p-5 text-center transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${cardStyle}`}>
            <div className="flex justify-center mb-3">
                <MedalIcon className={`w-12 h-12 ${color}`} />
            </div>
            <h3 className={`text-xl font-bold ${color}`}>{t(tier)}</h3>
            <p className="text-slate-500 dark:text-slate-400 font-semibold mt-1">{points} {t('pointsUnit')}</p>
            <div className="border-t dark:border-slate-700 my-4"></div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 text-start">
                {benefits.map(benefit => (
                    <li key={benefit} className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{t(benefit)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const CustomerClubPage = () => {
    const { t, localizeDigits } = useTranslation();
    const currentPoints = 2350;
    const pointsForGold = 5000;
    const progress = Math.min((currentPoints / pointsForGold) * 100, 100);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <BookingHeader title={t('customerClubPageTitle')} />
            <main className="p-4 space-y-8">

                {/* --- USER STATUS CARD --- */}
                <div className="bg-gradient-to-br from-sky-900 to-cyan-700 text-white rounded-2xl shadow-xl p-6">
                    <p className="text-sm opacity-80">{t('youAreA')}</p>
                    <div className="flex items-center gap-2">
                         <MedalIcon className="w-8 h-8 text-slate-300" />
                         <h2 className="text-2xl font-bold">{t('silverMember')}</h2>
                    </div>
                   
                    <div className="mt-4">
                        <p className="text-sm font-semibold opacity-90">{t('yourPoints')}</p>
                        <p className="text-3xl font-extrabold">{localizeDigits(currentPoints.toLocaleString())}</p>
                    </div>

                    <div className="mt-4">
                        <div className="w-full bg-black/20 rounded-full h-2.5">
                            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-xs text-center mt-1.5 opacity-90">
                           {t('pointsToNextTier').replace('{count}', localizeDigits(pointsForGold - currentPoints))}
                        </p>
                    </div>
                </div>

                {/* --- CURRENT BENEFITS --- */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 border dark:border-slate-700">
                    <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mb-4">{t('currentTierBenefits')}</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-50 dark:bg-slate-700 rounded-full flex items-center justify-center"><CheckCircleIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400"/></div>
                            <span className="font-semibold text-slate-700 dark:text-slate-200">{t('benefitDiscount')}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-50 dark:bg-slate-700 rounded-full flex items-center justify-center"><CheckCircleIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400"/></div>
                            <span className="font-semibold text-slate-700 dark:text-slate-200">{t('benefitSupport')}</span>
                        </div>
                    </div>
                </div>

                {/* --- EXPLORE TIERS --- */}
                <div>
                     <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mb-4 px-1">{t('exploreTiers')}</h3>
                     <div className="space-y-4">
                        <TierCard 
                            tier="bronzeMember"
                            points={localizeDigits(0)}
                            benefits={['benefitDiscount']}
                            color="text-amber-700"
                        />
                         <TierCard 
                            tier="silverMember"
                            points={localizeDigits('1,000')}
                            benefits={['benefitDiscount', 'benefitSupport']}
                            color="text-slate-500"
                            isCurrent={true}
                        />
                         <TierCard 
                            tier="goldMember"
                            points={localizeDigits('5,000')}
                            benefits={['benefitDiscount', 'benefitSupport', 'benefitEarlyAccess']}
                            color="text-yellow-500"
                            isNext={true}
                        />
                     </div>
                </div>

                 {/* --- HOW TO EARN POINTS --- */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 border dark:border-slate-700">
                    <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mb-4">{t('howToEarnPoints')}</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-50 dark:bg-slate-700 rounded-full flex items-center justify-center"><StarIcon className="w-5 h-5 text-green-600 dark:text-green-400"/></div>
                            <span className="text-sm text-slate-700 dark:text-slate-200">{t('earnByBooking')}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-50 dark:bg-slate-700 rounded-full flex items-center justify-center"><StarIcon className="w-5 h-5 text-green-600 dark:text-green-400"/></div>
                            <span className="text-sm text-slate-700 dark:text-slate-200">{t('earnByReview')}</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CustomerClubPage;