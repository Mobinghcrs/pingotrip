import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { SearchIcon, CalendarIcon, CrownIcon, NavigationIcon, LoungeSofaIcon, UtensilsIcon, SuitcaseIcon } from '../assets/icons';

const CIPHeroSearch = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/cip/results`);
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-5">
            <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                    <label className="absolute -top-2 start-4 px-1 text-xs text-gray-500 bg-white">{t('selectAirport')}</label>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <CrownIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input type="text" defaultValue={t('ikaAirport')} className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                </div>
                
                <div className="relative">
                    <label className="absolute -top-2 start-4 px-1 text-xs text-gray-500 bg-white">{t('serviceDate')}</label>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <CalendarIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input type="text" defaultValue="۱۴۰۳/۱۱/۲۰" className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                </div>

                <button type="submit" className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30">
                    <SearchIcon className="w-5 h-5" />
                    {t('searchServices')}
                </button>
            </form>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-cyan-100 border border-cyan-200">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-slate-800">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </div>
);

const CIPPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-50 min-h-screen">
            <BookingHeader title={t('cipPageTitle')} />
            <main>
                <div className="relative h-72">
                    <img src="https://picsum.photos/seed/cip-hero/400/600" className="absolute inset-0 w-full h-full object-cover" alt="CIP Lounge" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
                    <div className="relative p-4 flex flex-col h-full justify-between">
                        <div/>
                        <div>
                            <h1 className="text-2xl font-extrabold text-white drop-shadow-lg">{t('experienceUltimateComfort')}</h1>
                            <div className="mt-4">
                                <CIPHeroSearch />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-6 mt-4">
                    <div className="bg-white rounded-2xl shadow-md p-5 border">
                        <h3 className="text-xl font-extrabold text-slate-800 mb-5 text-center">{t('whatsIncluded')}</h3>
                        <div className="space-y-5">
                            <FeatureCard icon={<NavigationIcon className="w-6 h-6 text-sky-900"/>} title={t('fastTrack')} description={t('fastTrackDesc')} />
                            <FeatureCard icon={<LoungeSofaIcon className="w-6 h-6 text-sky-900"/>} title={t('privateLounge')} description={t('privateLoungeDesc')} />
                            <FeatureCard icon={<UtensilsIcon className="w-6 h-6 text-sky-900"/>} title={t('foodAndBeverage')} description={t('foodAndBeverageDesc')} />
                            <FeatureCard icon={<SuitcaseIcon className="w-6 h-6 text-sky-900"/>} title={t('baggageHandling')} description={t('baggageHandlingDesc')} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CIPPage;
