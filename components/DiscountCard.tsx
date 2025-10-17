import React, { useState } from 'react';
// FIX: Correct import path
import { Discount } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { TagIcon, ClipboardCopyIcon, ClipboardCheckIcon } from '../assets/icons';

interface DiscountCardProps {
  discount: Discount;
}

const DiscountCard: React.FC<DiscountCardProps> = ({ discount }) => {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(discount.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border dark:border-slate-700 p-4">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-cyan-50 dark:bg-sky-900/50 flex-shrink-0">
                    <TagIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="flex-grow min-w-0">
                    <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">{t(discount.descriptionKey)}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{t('validUntil')}: {discount.expiry}</p>
                    <div className="mt-3 flex items-center gap-2">
                        <div className="font-mono text-cyan-700 dark:text-cyan-300 bg-cyan-100/60 dark:bg-sky-900/70 border-2 border-dashed border-cyan-300 dark:border-sky-800 rounded-lg px-4 py-1.5 text-center tracking-widest text-sm">
                            {discount.code}
                        </div>
                        <button 
                            onClick={handleCopy}
                            className={`px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-colors ${
                                copied 
                                ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
                            }`}
                        >
                            {copied ? <ClipboardCheckIcon className="w-4 h-4"/> : <ClipboardCopyIcon className="w-4 h-4"/>}
                            {copied ? t('copied') : t('copyCode')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountCard;