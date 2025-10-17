
import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MenuIcon, BellIcon, UserCircleIcon } from '../../assets/icons';

interface AdminHeaderProps {
    onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
    const { t } = useTranslation();
    return (
        <header className="bg-white dark:bg-slate-800 shadow-sm p-3 flex items-center justify-between sticky top-0 z-10 border-b dark:border-slate-700 h-16">
            {/* Left side on LTR, Right on RTL */}
            <div className="flex items-center gap-2">
                 <button onClick={onMenuClick} className="md:hidden text-slate-600 dark:text-slate-300 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>
            
            {/* Right side on LTR, Left on RTL */}
            <div className="flex items-center gap-3">
                 <button className="relative text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-slate-800"></span>
                </button>
                <button>
                    <UserCircleIcon className="w-9 h-9 text-slate-500" />
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;