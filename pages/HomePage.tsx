import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import {
    BellIcon, WalletIcon, TagIcon, ArrowUpCircleIcon,
    GlobeIcon, HotelIcon, TaxiIcon, CrownIcon,
    VisaIcon, ShieldIcon, TrainIcon, NavigationIcon, ChevronRightIcon, UserCircleIcon, UsersIcon, SuitcaseIcon, PlaneIcon, CarIcon, DollarSignIcon, HeartPulseIcon, CreditCardIcon, CalendarCheckIcon, CharityIcon, AranAirlinesIcon, ExitFeeIcon, DepartureBanIcon, GemIcon, ReceiptIcon, SmartphoneIcon
} from '../assets/icons';
import IncreaseCreditModal from '../components/IncreaseCreditModal';

const ServiceButton = ({ icon, text, link = "#" }: { icon: React.ReactNode, text: string, link?: string }) => (
    <Link to={link} className="flex flex-col items-center justify-start text-center group">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-cyan-50 dark:bg-sky-900/50 mb-2 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:bg-cyan-100 dark:group-hover:bg-sky-900">
            {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 text-sky-900 dark:text-cyan-400" })}
        </div>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-tight px-1">{text}</span>
    </Link>
);

const WalletAction = ({ icon, text, onClick }: { icon: React.ReactNode, text: string, onClick?: () => void }) => (
    <button onClick={onClick} className="flex flex-col items-center text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors w-1/4">
        {icon}
        <span className="text-xs font-medium mt-1">{text}</span>
    </button>
);

const HomePage = () => {
    const { t, language, localizeDigits } = useTranslation();
    const isRtl = language === 'fa' || language === 'ar';
    const navigate = useNavigate();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const bellRef = useRef<HTMLButtonElement>(null);
    const [isIncreaseCreditModalOpen, setIncreaseCreditModalOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                notificationsRef.current &&
                !notificationsRef.current.contains(event.target as Node) &&
                bellRef.current &&
                !bellRef.current.contains(event.target as Node)
            ) {
                setIsNotificationsOpen(false);
            }
        };

        if (isNotificationsOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNotificationsOpen]);


    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            {/* --- HEADER --- */}
            <header className="bg-sky-900 text-white p-4 pb-6 rounded-b-3xl sticky top-0 z-20 shadow-lg">
                <div className="flex justify-between items-center">
                    <Link to="/profile" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center bg-white/20 group-hover:bg-white/30 transition-colors">
                            <UserCircleIcon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">{t('pishgamanTech')}</p>
                            <p className="text-sm opacity-80">{t('welcome')}</p>
                        </div>
                    </Link>
                    <div className="relative flex items-center gap-2">
                        <button ref={bellRef} onClick={() => setIsNotificationsOpen(prev => !prev)} className="p-2 rounded-full hover:bg-white/10 relative">
                            <BellIcon className="w-6 h-6" />
                            <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-sky-900"></span>
                        </button>
                         {/* --- NOTIFICATIONS PANEL --- */}
                        {isNotificationsOpen && (
                            <div ref={notificationsRef} className="absolute top-full mt-4 end-0 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border dark:border-slate-700 z-30 animate-fade-in-down">
                                <div className="p-3 border-b dark:border-slate-700">
                                    <h3 className="font-bold text-slate-800 dark:text-slate-100">{t('notifications')}</h3>
                                </div>
                                <div className="divide-y dark:divide-slate-700 max-h-80 overflow-y-auto">
                                    <div className="p-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer">
                                       <div className="w-10 h-10 rounded-full flex-shrink-0 bg-cyan-100 flex items-center justify-center">
                                            <TagIcon className="w-5 h-5 text-cyan-600"/>
                                       </div>
                                       <div>
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t('autumnDiscountNotifTitle')}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('autumnDiscountNotifDesc')}</p>
                                       </div>
                                    </div>
                                    <div className="p-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer">
                                       <div className="w-10 h-10 rounded-full flex-shrink-0 bg-green-100 flex items-center justify-center">
                                            <PlaneIcon className="w-5 h-5 text-green-600"/>
                                       </div>
                                       <div>
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t('flightBookedNotifTitle')}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('flightBookedNotifDesc')}</p>
                                       </div>
                                    </div>
                                </div>
                                <div className="p-2 bg-gray-50 dark:bg-slate-700/50 rounded-b-2xl text-center">
                                    <a href="#" className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">{t('viewAll')}</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="p-4 relative z-10 space-y-6">
                
                {/* --- WALLET CARD --- */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 border dark:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                           <WalletIcon className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                           <span className="font-bold text-slate-700 dark:text-slate-200">{t('walletCredit')}</span>
                        </div>
                        <Link to="/wallet?filter=credit" className="flex items-center text-cyan-600 dark:text-cyan-400 font-semibold text-sm">
                            <span>{t('details')}</span>
                            <ChevronRightIcon className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                        </Link>
                    </div>
                    <div className={`text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <span>{localizeDigits('۱۲,۸۵۰,۰۰۰')} </span>
                        <span className="text-lg font-medium text-slate-500 dark:text-slate-400">{t('toman')}</span>
                    </div>
                    <div className="flex justify-around items-center border-t dark:border-slate-700 pt-3">
                       <WalletAction icon={<ArrowUpCircleIcon className="w-7 h-7" />} text={t('increase')} onClick={() => setIncreaseCreditModalOpen(true)} />
                       <WalletAction icon={<SuitcaseIcon className="w-7 h-7" />} text={t('myTrips')} onClick={() => navigate('/purchases')} />
                       <WalletAction icon={<TagIcon className="w-7 h-7" />} text={t('discount')} onClick={() => navigate('/discounts')} />
                       <WalletAction icon={<UsersIcon className="w-7 h-7" />} text={t('customerClub')} onClick={() => navigate('/customer-club')} />
                    </div>
                </div>

                {/* --- AUTUMN TRAVEL BANNER --- */}
                <div className="relative rounded-2xl shadow-md overflow-hidden group">
                    <img src="https://picsum.photos/seed/autumn/400/200" alt="Autumn Travel" className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10"></div>
                    <div className={`absolute inset-0 flex flex-col justify-center text-white p-4 ${isRtl ? 'items-start text-start' : 'items-start text-left'}`}>
                        <h3 className="font-bold text-md">{t('autumnTravelTitle')}</h3>
                        <p className="text-xs mb-3 opacity-90">{t('autumnTravelSubtitle')}</p>
                        <Link to="/offers" className="bg-cyan-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-cyan-600 transition-colors flex items-center gap-1">
                            {t('viewOffers')}
                            <ChevronRightIcon className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                        </Link>
                    </div>
                </div>
                
                {/* --- SERVICES GRID --- */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 pt-6 border dark:border-slate-700">
                    <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                        <ServiceButton icon={<AranAirlinesIcon />} text={t('aranAirlines')} link="/aran-airlines" />
                        <ServiceButton icon={<PlaneIcon />} text={t('domesticFlight')} link="/travel" />
                        <ServiceButton icon={<GlobeIcon />} text={t('internationalFlightBooking')} link="/travel/international" />
                        <ServiceButton icon={<HotelIcon />} text={t('domesticHotelBooking')} link="/travel/hotels" />
                        <ServiceButton icon={<HotelIcon />} text={t('internationalHotelBooking')} link="/travel/hotels/international" />
                        <ServiceButton icon={<TrainIcon />} text={t('train')} link="/travel/train" />
                        <ServiceButton icon={<TaxiIcon />} text={t('taxi')} link="/taxi" />
                        <ServiceButton icon={<CarIcon />} text={t('carRental')} link="/car-rental" />
                        <ServiceButton icon={<ReceiptIcon />} text={t('billPayment')} link="/bills" />
                        <ServiceButton icon={<SmartphoneIcon />} text={t('topUp')} link="/topup" />
                        <ServiceButton icon={<CrownIcon />} text={t('cipAirport')} link="/cip" />
                        <ServiceButton icon={<VisaIcon />} text={t('visa')} link="/visa" />
                        <ServiceButton icon={<ShieldIcon />} text={t('insurance')} link="/insurance" />
                        <ServiceButton icon={<NavigationIcon />} text={t('locator')} link="/locator" />
                        <ServiceButton icon={<DollarSignIcon />} text={t('currencyServices')} link="/currency-services" />
                        <ServiceButton icon={<CalendarCheckIcon />} text={t('salimaniAppointment')} link="/exchange-appointment" />
                        <ServiceButton icon={<GemIcon />} text={t('zhavGoldGallery')} link="/zhav-gold-gallery" />
                        <ServiceButton icon={<HeartPulseIcon />} text={t('healthServices')} link="/health-services" />
                        <ServiceButton icon={<CharityIcon />} text={t('charity')} link="/charity" />
                        <ServiceButton icon={<CreditCardIcon />} text={t('pingoBuyCredit')} link="/pingo-credit" />
                        <ServiceButton icon={<ExitFeeIcon />} text={t('exitFeePayment')} link="/exit-fee" />
                        <ServiceButton icon={<DepartureBanIcon />} text={t('departureBanInquiry')} link="/departure-ban-inquiry" />
                    </div>
                </div>
                
                {/* --- PROMO BANNER --- */}
                <div className="bg-gradient-to-r from-sky-900 to-sky-700 rounded-2xl shadow-md text-white p-4 text-center flex flex-col items-center">
                    <h3 className="font-bold text-lg">{t('specialOfferTitle')}</h3>
                    <p className="text-sm opacity-80 mt-1 mb-3">{t('specialOfferSubtitle')}</p>
                    <Link to="/offers" className="bg-white text-sky-800 font-bold text-sm text-center py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-colors">{t('specialOfferAction')}</Link>
                </div>

            </main>
            <IncreaseCreditModal isOpen={isIncreaseCreditModalOpen} onClose={() => setIncreaseCreditModalOpen(false)} />
        </div>
    );
};

export default HomePage;