import React from 'react';
import { CIPService } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { CrownIcon } from '../assets/icons';

interface CIPSummaryCardProps {
    service: CIPService;
}

const CIPSummaryCard: React.FC<CIPSummaryCardProps> = ({ service }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-2xl shadow-md border p-4">
            <div className="flex items-center gap-4">
                <img src={service.image} alt={t(service.loungeNameKey)} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                    <p className="font-bold text-lg text-slate-800">{t(service.loungeNameKey)}</p>
                    <p className="text-sm text-gray-500 mt-1">{t('cipService')}</p>
                    <p className="text-xs text-gray-500 mt-2">{t(service.airport)}</p>
                </div>
            </div>
        </div>
    );
};

export default CIPSummaryCard;