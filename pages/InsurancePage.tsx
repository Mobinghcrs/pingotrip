import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { SearchIcon, CalendarIcon, GlobeIcon, UsersIcon, ShieldIcon } from '../assets/icons';

const InsuranceHeroSearch = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/insurance/results`);
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-5">
            <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                    <label className="absolute -top-2 start-4 px-1 text-xs text-gray-500 bg-white">{t('destination')}</label>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <GlobeIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input type="text" defaultValue={t('schengen')} className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <label className="absolute -top-2 start-4 px-1 text-xs text-gray-500 bg-white">{t('tripStartDate')}</label>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <CalendarIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <input type="text" defaultValue="۱۴۰۳/۱۱/۳۰" className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                    </div>
                     <div className="relative">
                        <label className="absolute -top-2 start-4 px-1 text-xs text-gray-500 bg-white">{t('tripEndDate')}</label>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <CalendarIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <input type="text" defaultValue="۱۴۰۳/۱۲/۱۴" className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                    </div>
                </div>
                 <div className="relative">
                    <label className="absolute -top-2 start-4 px-1 text-xs text-gray-500 bg-white">{t('travelers')}</label>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <UsersIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input type="text" defaultValue="۱ نفر" className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                </div>

                <button type="submit" className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30">
                    <SearchIcon className="w-5 h-5" />
                    {t('getQuote')}
                </button>
            </form>
        </div>
    );
};

const FeatureCard = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
    <div className="flex flex-col items-center text-center p-2">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-cyan-100 border-2 border-cyan-200 mb-2">
            {icon}
        </div>
        <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
    </div>
);

const InsurancePage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-50 min-h-screen">
            <BookingHeader title={t('insuranceService')} />
            <main>
                <div className="relative h-72">
                    <img src="https://picsum.photos/seed/insurance-hero/400/600" className="absolute inset-0 w-full h-full object-cover" alt="Travel Insurance" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
                    <div className="relative p-4 flex flex-col h-full justify-between">
                        <div/>
                        <div>
                            <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">{t('insurancePageTitle')}</h1>
                            <div className="mt-4">
                                <InsuranceHeroSearch />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-6 mt-4">
                    <div className="bg-white rounded-2xl shadow-md p-5 border">
                        <h3 className="text-xl font-extrabold text-slate-800 mb-5 text-center">{t('whyGetInsurance')}</h3>
                        <div className="grid grid-cols-3 gap-2">
                           <FeatureCard icon={<ShieldIcon className="w-8 h-8 text-sky-900"/>} title={t('medicalCoverage')} />
                           <FeatureCard icon={<ShieldIcon className="w-8 h-8 text-sky-900"/>} title={t('tripCancellation')} />
                           <FeatureCard icon={<ShieldIcon className="w-8 h-8 text-sky-900"/>} title={t('baggageLoss')} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InsurancePage;
