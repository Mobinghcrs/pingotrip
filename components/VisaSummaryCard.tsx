import React from 'react';
import { VisaService, VisaApplication } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { VisaIcon } from '../assets/icons';

interface VisaSummaryCardProps {
    visa: VisaService;
    application: VisaApplication;
}

const VisaSummaryCard: React.FC<VisaSummaryCardProps> = ({ visa, application }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-2xl shadow-md border p-4">
            <div className="flex items-center gap-4">
                <img src={visa.image} alt={t(visa.country)} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                    <p className="font-bold text-lg text-slate-800">{t(visa.country)} - {t(visa.visaType)}</p>
                    <p className="text-sm text-gray-500 mt-1">{t('visaService')}</p>
                    <p className="text-xs text-gray-500 mt-2">{t('applicantInfo')}: {application.personal.firstName} {application.personal.lastName}</p>
                </div>
            </div>
        </div>
    );
};

export default VisaSummaryCard;
