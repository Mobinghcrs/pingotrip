import React from 'react';

interface PaymentOptionProps {
    icon: React.ReactNode;
    title: string;
    isSelected: boolean;
    onClick: () => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ icon, title, isSelected, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer w-full text-start transition-all duration-200 ${
                isSelected
                    ? 'bg-cyan-50 dark:bg-sky-900/50 border-cyan-500 dark:border-cyan-700 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
            }`}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span className="font-semibold text-sky-900 dark:text-slate-100">{title}</span>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-cyan-500 bg-cyan-500' : 'border-gray-300 dark:border-slate-600'}`}>
                {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
        </button>
    );
};

export default PaymentOption;