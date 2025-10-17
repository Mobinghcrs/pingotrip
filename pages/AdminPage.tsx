import React, { useState, useMemo, FC } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_PURCHASES, MOCK_ADMIN_USERS, MOCK_REVENUE_CHART_DATA, MOCK_SALES_DISTRIBUTION_DATA } from '../constants';
import { Purchase, PurchaseType, RevenueDataPoint, SalesDistributionDataPoint } from '../types';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import { 
    DollarSignIcon, ShoppingCartIcon, UsersIcon, TrendingUpIcon, TrendingDownIcon,
    PlaneIcon, HotelIcon, TrainIcon, HeartPulseIcon, VisaIcon
} from '../assets/icons';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    trend: number;
}
const StatCard: React.FC<StatCardProps> = ({ icon, title, value, trend }) => {
    const { t } = useTranslation();
    const isPositive = trend >= 0;
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-5">
            <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isPositive ? 'bg-green-100 dark:bg-green-500/20' : 'bg-red-100 dark:bg-red-500/20'}`}>
                    {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`})}
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-slate-400">{title}</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
                </div>
            </div>
             <div className="mt-3 flex items-center text-sm">
                <span className={`flex items-center font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? <TrendingUpIcon className="w-4 h-4" /> : <TrendingDownIcon className="w-4 h-4" />}
                    <span>{Math.abs(trend)}%</span>
                </span>
                 <span className="text-gray-500 dark:text-slate-400 ms-1">{t('fromLastMonth')}</span>
            </div>
        </div>
    );
};

interface RevenueChartProps {
    data: RevenueDataPoint[];
}
const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
    const { t, localizeDigits } = useTranslation();
    const maxValue = Math.max(...data.map(d => d.revenue));

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{t('revenueOverTime')}</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">{t('last30Days')}</p>
            <div className="flex justify-between items-end h-64 gap-2">
                {data.map(item => (
                    <div key={item.day} className="flex-1 flex flex-col items-center justify-end group">
                        <div 
                            className="w-full bg-cyan-200 dark:bg-cyan-800 rounded-t-md group-hover:bg-cyan-400 dark:group-hover:bg-cyan-600 transition-all duration-300"
                            style={{ height: `${(item.revenue / maxValue) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-400 dark:text-slate-500 mt-2">{localizeDigits(item.day)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface SalesDistributionChartProps {
    data: SalesDistributionDataPoint[];
}
const SalesDistributionChart: React.FC<SalesDistributionChartProps> = ({ data }) => {
    const { t } = useTranslation();
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativeOffset = 0;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">{t('salesDistribution')}</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-40 h-40">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="15.915" className="stroke-current text-gray-200 dark:text-slate-700" strokeWidth="3.8" fill="transparent" />
                        {data.map(item => {
                            const circumference = 2 * Math.PI * 15.915;
                            const dash = (item.value / totalValue) * circumference;
                            const offset = (cumulativeOffset / totalValue) * circumference;
                            cumulativeOffset += item.value;
                            return (
                                <circle
                                    key={item.service}
                                    cx="18" cy="18" r="15.915"
                                    className={`stroke-current ${item.color.replace('bg-', 'text-')}`}
                                    strokeWidth="3.8" fill="transparent"
                                    strokeDasharray={`${dash} ${circumference - dash}`}
                                    strokeDashoffset={-offset}
                                />
                            );
                        })}
                    </svg>
                </div>
                <div className="flex-1 space-y-2 w-full">
                    {data.map(item => (
                        <div key={item.service} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                <span className="text-slate-600 dark:text-slate-300">{t(item.service)}</span>
                            </div>
                            <span className="font-bold text-slate-800 dark:text-slate-100">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const RecentActivityItem: React.FC<{ purchase: Purchase, user: string }> = ({ purchase, user }) => {
    const { t, localizeDigits } = useTranslation();
    const typeDetails: { [key in PurchaseType]?: { icon: React.ReactNode } } = {
        flight: { icon: <PlaneIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400"/> },
        hotel: { icon: <HotelIcon className="w-5 h-5 text-blue-600 dark:text-blue-400"/> },
        train: { icon: <TrainIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400"/> },
        health: { icon: <HeartPulseIcon className="w-5 h-5 text-red-600 dark:text-red-400"/> },
        visa: { icon: <VisaIcon className="w-5 h-5 text-purple-600 dark:text-purple-400"/> },
    };
    const details = typeDetails[purchase.type];

    return (
        <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">{details?.icon || <ShoppingCartIcon className="w-5 h-5 text-gray-600 dark:text-slate-300"/>}</div>
                <div>
                    <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">{user}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{t(purchase.descriptionKey)}</p>
                </div>
            </div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">{localizeDigits((purchase.price/10).toLocaleString())} {t('toman')}</div>
        </div>
    );
};

const AdminPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const totalRevenue = MOCK_PURCHASES.filter(b => b.status === 'approved').reduce((acc, purchase) => acc + purchase.price, 0) / 10;
    const totalBookings = MOCK_PURCHASES.length;
    const newUsers = MOCK_ADMIN_USERS.length;
    const avgBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

    const recentActivities = MOCK_PURCHASES.slice(0, 5);

    return (
        <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="dashboard"
            />
            <div className="md:mr-64 transition-all duration-300">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('dashboard')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                        <StatCard icon={<DollarSignIcon />} title={t('totalRevenue')} value={`${localizeDigits((totalRevenue / 1000000).toFixed(1))} M`} trend={5.2} />
                        <StatCard icon={<ShoppingCartIcon />} title={t('totalBookings')} value={localizeDigits(totalBookings)} trend={-1.5} />
                        <StatCard icon={<UsersIcon />} title={t('newUsers')} value={localizeDigits(newUsers)} trend={12} />
                        <StatCard icon={<DollarSignIcon />} title={t('avgBookingValue')} value={localizeDigits(avgBookingValue.toLocaleString(undefined, {maximumFractionDigits: 0}))} trend={2.1} />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 mb-8">
                        <div className="xl:col-span-3">
                             <RevenueChart data={MOCK_REVENUE_CHART_DATA} />
                        </div>
                        <div className="xl:col-span-2">
                             <SalesDistributionChart data={MOCK_SALES_DISTRIBUTION_DATA} />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 p-4 border-b dark:border-slate-700">{t('recentActivity')}</h3>
                        <div className="divide-y dark:divide-slate-700">
                            {recentActivities.map(purchase => (
                                <RecentActivityItem key={purchase.id} purchase={purchase} user={MOCK_ADMIN_USERS[purchase.id % MOCK_ADMIN_USERS.length].fullName} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPage;