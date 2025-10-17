import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { 
    HomeIcon, PlaneIcon, HotelIcon, DollarSignIcon, TrainIcon, SuitcaseIcon, VisaIcon, HeartPulseIcon,
    ShieldIcon, ReceiptIcon, GemIcon, CharityIcon, CreditCardIcon, AranAirlinesIcon, GlobeIcon,
    CalendarCheckIcon, ChevronDownIcon, XIcon, BanknoteIcon, LandmarkIcon, TruckIcon, GiftIcon, ShoppingCartIcon, FileTextIcon, UsersIcon, LockIcon, EditIcon
} from '../../assets/icons';

interface AdminSidebarProps {
    isSidebarOpen: boolean;
    closeSidebar: () => void;
    activeTab: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isSidebarOpen, closeSidebar, activeTab }) => {
    const { t } = useTranslation();
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    const sidebarLinks = [
        { id: 'dashboard', titleKey: 'dashboard', icon: <HomeIcon className="w-5 h-5" />, path: '/admin' },
        { 
            id: 'users-parent', titleKey: 'users', icon: <UsersIcon className="w-5 h-5" />,
            subItems: [
                { id: 'users', titleKey: 'userManagement', icon: <UsersIcon className="w-5 h-5" />, path: '/admin/users' },
                { id: 'permissions', titleKey: 'permissionsManagement', icon: <LockIcon className="w-5 h-5" />, path: '/admin/permissions' },
            ]
        },
        { 
            id: 'flights', titleKey: 'flightsHeader', icon: <PlaneIcon className="w-5 h-5" />,
            subItems: [
                { id: 'aran-flights', titleKey: 'aranAirlines', icon: <AranAirlinesIcon className="w-5 h-5" />, path: '/admin/aran-flights' },
                { id: 'domestic-flights-admin', titleKey: 'domesticFlightsAdmin', icon: <PlaneIcon className="w-5 h-5" />, path: '/admin/domestic-flights' },
                { id: 'international-flights-admin', titleKey: 'internationalFlightsAdmin', icon: <GlobeIcon className="w-5 h-5" />, path: '/admin/international-flights' },
            ]
        },
        { 
            id: 'hotels', titleKey: 'hotels', icon: <HotelIcon className="w-5 h-5" />,
            subItems: [
                { id: 'domestic-hotels-admin', titleKey: 'domesticHotelsAdmin', icon: <HotelIcon className="w-5 h-5" />, path: '/admin/domestic-hotels' },
                { id: 'international-hotels-admin', titleKey: 'internationalHotelsAdmin', icon: <GlobeIcon className="w-5 h-5" />, path: '/admin/international-hotels' },
            ]
        },
        { 
            id: 'exchange', titleKey: 'exchange', icon: <DollarSignIcon className="w-5 h-5" />,
            subItems: [
                { id: 'currency-purchase-admin', titleKey: 'currencyPurchaseAdmin', icon: <BanknoteIcon className="w-5 h-5" />, path: '/admin/currency-purchase' },
                { id: 'currency-deposit-admin', titleKey: 'currencyDepositAdmin', icon: <LandmarkIcon className="w-5 h-5" />, path: '/admin/currency-deposit' },
                { id: 'currency-delivery-admin', titleKey: 'currencyDeliveryAdmin', icon: <TruckIcon className="w-5 h-5" />, path: '/admin/currency-delivery' },
                { id: 'foreign-purchase-admin', titleKey: 'foreignPurchaseAdmin', icon: <ShoppingCartIcon className="w-5 h-5" />, path: '/admin/foreign-purchase' },
                { id: 'gift-card-purchase-admin', titleKey: 'giftCardPurchaseAdmin', icon: <GiftIcon className="w-5 h-5" />, path: '/admin/gift-card-purchase' },
                { id: 'exchange-appointment-admin', titleKey: 'exchangeAppointmentAdmin', icon: <CalendarCheckIcon className="w-5 h-5" />, path: '/admin/exchange-appointments' },
            ]
        },
        { 
            id: 'accounting', titleKey: 'accounting', icon: <BanknoteIcon className="w-5 h-5" />,
            subItems: [
                { id: 'accounting-dashboard', titleKey: 'dashboard', icon: <HomeIcon className="w-5 h-5" />, path: '/admin/accounting' },
                { id: 'accounting-transactions', titleKey: 'transactions', icon: <FileTextIcon className="w-5 h-5" />, path: '/admin/accounting/transactions' },
                { id: 'accounting-reports', titleKey: 'reports', icon: <FileTextIcon className="w-5 h-5" />, path: '/admin/accounting/reports' },
            ]
        },
        { 
            id: 'visa-parent', titleKey: 'visa', icon: <VisaIcon className="w-5 h-5" />,
            subItems: [
                { id: 'visa-support', titleKey: 'visaApplications', icon: <FileTextIcon className="w-5 h-5" />, path: '/admin/visa' },
                { id: 'manage-visa', titleKey: 'createVisa', icon: <FileTextIcon className="w-5 h-5" />, path: '/admin/visa/manage' },
            ]
        },
        { id: 'train', titleKey: 'train', icon: <TrainIcon className="w-5 h-5" />, path: '/admin/train' },
        { id: 'cipAirport', titleKey: 'cipAirport', icon: <SuitcaseIcon className="w-5 h-5" />, path: '/admin/cip' },
        { 
            id: 'health-parent', titleKey: 'healthCenterAdmin', icon: <HeartPulseIcon className="w-5 h-5" />,
            subItems: [
                { id: 'health', titleKey: 'healthServicesManagement', icon: <HeartPulseIcon className="w-5 h-5" />, path: '/admin/health' },
                { id: 'manage-health-services', titleKey: 'createHealthService', icon: <EditIcon className="w-5 h-5" />, path: '/admin/health/manage' },
            ]
        },
        { id: 'insurance', titleKey: 'insurance', icon: <ShieldIcon className="w-5 h-5" />, path: '/admin/insurance' },
        { id: 'bills', titleKey: 'billsAndTopUp', icon: <ReceiptIcon className="w-5 h-5" />, path: '/admin/bills' },
        { id: 'zhav', titleKey: 'zhavGoldGallery', icon: <GemIcon className="w-5 h-5" />, path: '/admin/zhav' },
        { id: 'charity', titleKey: 'charity', icon: <CharityIcon className="w-5 h-5" />, path: '/admin/charity' },
        { id: 'pingo-credit', titleKey: 'pingoCredit', icon: <CreditCardIcon className="w-5 h-5" />, path: '/admin/pingo-credit' },
    ];

    useEffect(() => {
        const parent = sidebarLinks.find(link => link.subItems?.some(sub => sub.id === activeTab));
        if (parent) {
            setExpandedMenu(parent.id);
        } else {
            setExpandedMenu(null);
        }
    }, [activeTab]);

    const handleParentClick = (menuId: string) => {
        setExpandedMenu(expandedMenu === menuId ? null : menuId);
    };
    
    const transformClass = isSidebarOpen ? 'translate-x-0' : 'translate-x-full';

    return (
        <>
            {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={closeSidebar}></div>}
            
            <aside className={`bg-sky-900 text-white w-64 min-h-screen p-2 flex flex-col fixed inset-y-0 right-0 z-30 transform md:translate-x-0 transition-transform duration-300 ease-in-out ${transformClass}`}>
                <div className="flex items-center justify-between p-2">
                    <Link to="/" className="text-2xl font-bold text-white">Pingo Trip</Link>
                    <button onClick={closeSidebar} className="md:hidden text-sky-200 hover:text-white">
                        <XIcon className="w-6 h-6"/>
                    </button>
                </div>
                <nav className="mt-6 flex-1 flex flex-col space-y-1 overflow-y-auto custom-scrollbar">
                    {sidebarLinks.map(link => (
                        link.subItems ? (
                            <div key={link.id}>
                                <button
                                    onClick={() => handleParentClick(link.id)}
                                    className={`w-full flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg text-start font-semibold transition-colors text-sky-100 hover:bg-sky-800 hover:text-white`}
                                >
                                    <div className="flex items-center gap-3">
                                        {link.icon}
                                        <span>{t(link.titleKey)}</span>
                                    </div>
                                    <ChevronDownIcon className={`w-4 h-4 transition-transform ${expandedMenu === link.id ? 'rotate-180' : ''}`} />
                                </button>
                                {expandedMenu === link.id && (
                                    <div className="pt-1 pb-1 pr-4 space-y-1">
                                        {link.subItems.map(subItem => (
                                            <Link
                                                key={subItem.id}
                                                to={subItem.path || '#'}
                                                onClick={() => { if (window.innerWidth < 768) { closeSidebar(); } }}
                                                className={`w-full text-start flex items-center gap-3 py-2 px-3 rounded-md font-medium transition-colors text-sm ${
                                                    activeTab === subItem.id
                                                        ? 'bg-sky-950 text-white'
                                                        : 'text-sky-200 hover:bg-sky-800 hover:text-white'
                                                }`}
                                            >
                                                 {subItem.icon}
                                                 <span>{t(subItem.titleKey)}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                             <Link
                                key={link.id}
                                to={link.path || '#'}
                                onClick={() => { if (window.innerWidth < 768) { closeSidebar(); } }}
                                className={`flex items-center gap-3 py-2.5 px-3 rounded-lg text-start font-semibold transition-colors relative ${
                                    activeTab === link.id
                                        ? 'bg-sky-950 text-white'
                                        : 'text-sky-100 hover:bg-sky-800 hover:text-white'
                                }`}
                            >
                                {activeTab === link.id && <div className="absolute right-0 top-1 bottom-1 w-1 bg-cyan-400 rounded-r-full"></div>}
                                {link.icon}
                                <span>{t(link.titleKey)}</span>
                            </Link>
                        )
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default AdminSidebar;