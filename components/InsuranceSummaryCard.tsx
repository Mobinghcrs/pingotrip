import React from 'react';
import { InsurancePlan } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { ShieldIcon } from '../assets/icons';

interface InsuranceSummaryCardProps {
    plan: InsurancePlan;
}

const InsuranceSummaryCard: React.FC<InsuranceSummaryCardProps> = ({ plan }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-2xl shadow-md border p-4">
            <div className="flex items-center gap-4">
                 <div className="w-16 h-16 flex-shrink-0 rounded-lg flex items-center justify-center bg-cyan-50 border border-cyan-100">
                    <ShieldIcon className="w-8 h-8 text-sky-900" />
                </div>
                <div>
                    <p className="font-bold text-lg text-slate-800">{t(plan.planNameKey)}</p>
                    {/* FIX: Use providerKey and translate it */}
                    <p className="text-sm text-gray-500 mt-1">{t(plan.providerKey)}</p>
                </div>
            </div>
        </div>
    );
};

export default InsuranceSummaryCard;