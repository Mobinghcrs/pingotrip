import React from 'react';
import { Link } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronRightIcon, BanknoteIcon, TruckIcon, StoreIcon, LandmarkIcon, ShoppingCartIcon, GiftIcon } from '../assets/icons';

const ServiceOption = ({ icon, title, description, to = "#" }: { icon: React.ReactNode, title: string, description: string, to?: string }) => {
    const { isRtl } = useTranslation();
    return (
        <Link to={to} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md border hover:border-cyan-300 hover:shadow-lg transition-all duration-300 group">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-cyan-50 border border-cyan-100 flex-shrink-0 group-hover:bg-cyan-100 transition-colors">
                {icon}
            </div>
            <div className="flex-grow">
                <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
            <ChevronRightIcon className={`w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-cyan-500 transition-colors ${isRtl ? 'rotate-180' : ''}`} />
        </Link>
    );
};

const CurrencyServicesPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('currencyServicesPageTitle')} />
            <main className="p-4 space-y-4">
                <ServiceOption 
                    icon={<BanknoteIcon className="w-8 h-8 text-sky-900" />}
                    title={t('buyCurrency')}
                    description={t('buyCurrencyDesc')}
                    to="/currency-services/buy"
                />
                 <ServiceOption 
                    icon={<GiftIcon className="w-8 h-8 text-sky-900" />}
                    title={t('buyGiftCards')}
                    description={t('buyGiftCardsDesc')}
                    to="/currency-services/gift-cards"
                />
                 <ServiceOption 
                    icon={<ShoppingCartIcon className="w-8 h-8 text-sky-900" />}
                    title={t('purchaseFromForeignSites')}
                    description={t('purchaseFromForeignSitesDesc')}
                    to="/currency-services/foreign-purchase"
                />
                <ServiceOption 
                    icon={<TruckIcon className="w-8 h-8 text-sky-900" />}
                    title={t('currencyDeliveryAtDestination')}
                    description={t('currencyDeliveryAtDestinationDesc')}
                    to="/currency-services/delivery"
                />
                 <ServiceOption 
                    icon={<StoreIcon className="w-8 h-8 text-sky-900" />}
                    title={t('partnerExchanges')}
                    description={t('partnerExchangesDesc')}
                    to="/currency-services/partners"
                />
                 <ServiceOption 
                    icon={<LandmarkIcon className="w-8 h-8 text-sky-900" />}
                    title={t('depositToAccount')}
                    description={t('depositToAccountDesc')}
                    to="/currency-services/deposit"
                />
            </main>
        </div>
    );
};

export default CurrencyServicesPage;