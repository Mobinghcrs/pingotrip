import React, { useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ExchangeAppointment } from '../../types';
import { CheckCircleIcon, TicketIcon } from '../../assets/icons';
import { MOCK_EXCHANGES, MOCK_EXPERTS } from '../../constants';

interface ConfirmationStepProps {
    details: ExchangeAppointment;
    onReset: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ details, onReset }) => {
    const { t, localizeDigits, isRtl } = useTranslation();
    
    // Generate a random ID on mount
    useEffect(() => {
        if (!details.appointmentId) {
            details.appointmentId = `SLM-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        }
    }, [details]);

    const expert = MOCK_EXPERTS.find(e => e.id === details.expertId);
    const branch = MOCK_EXCHANGES.find(e => e.id === details.exchangeOfficeId);

    const DetailRow = ({ label, value }: { label: string; value: string }) => (
        <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="font-bold text-slate-700 text-sm text-end">{value}</span>
        </div>
    );

    return (
        <div className="text-center p-4 animate-fade-in-down">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-slate-800">{t('appointmentConfirmedTitle')}</h2>
            <p className="text-gray-600 mt-2 mb-6 max-w-sm mx-auto">{t('appointmentConfirmedDesc')}</p>

            <div className="bg-white rounded-2xl shadow-lg border p-4 text-start relative overflow-hidden">
                <div className="absolute -top-4 -start-4 w-12 h-12 bg-slate-50 rounded-full"></div>
                <div className="absolute -top-4 -end-4 w-12 h-12 bg-slate-50 rounded-full"></div>
                <div className="absolute -bottom-4 -start-4 w-12 h-12 bg-slate-50 rounded-full"></div>
                <div className="absolute -bottom-4 -end-4 w-12 h-12 bg-slate-50 rounded-full"></div>

                <div className="flex items-center gap-3 mb-3 pb-2 border-b">
                    <TicketIcon className="w-6 h-6 text-cyan-600" />
                    <h3 className="text-lg font-bold text-slate-800">{t('appointmentTicket')}</h3>
                </div>

                <DetailRow label={t('appointmentId')} value={details.appointmentId || ''} />
                <DetailRow label={t('date')} value={details.date?.toLocaleDateString(isRtl ? 'fa-IR' : 'en-CA') || ''} />
                <DetailRow label={t('time')} value={localizeDigits(details.time)} />
                {/* FIX: Use branch?.nameKey with translation instead of branch?.name */}
                <DetailRow label={t('branch')} value={branch ? t(branch.nameKey) : ''} />
                <DetailRow label={t('expert')} value={expert ? t(expert.nameKey) : ''} />
                <DetailRow 
                    label={t('service')} 
                    value={details.service === 'coin' ? t('buyCoin') : `${t('buyCurrency')} (${t(details.currencyType?.toLowerCase() || '')})`} 
                />
                 <div className="flex justify-center py-4">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 text-slate-800" fill="currentColor">
                        <path d="M0 0 H35 V35 H0 Z" />
                        <path d="M5 5 H30 V30 H5 Z" fill="white" />
                        <path d="M10 10 H25 V25 H10 Z" />
                        <path d="M65 0 H100 V35 H65 Z" />
                        <path d="M70 5 H95 V30 H70 Z" fill="white" />
                        <path d="M75 10 H90 V25 H75 Z" />
                        <path d="M0 65 H35 V100 H0 Z" />
                        <path d="M5 70 H30 V95 H5 Z" fill="white" />
                        <path d="M10 75 H25 V90 H10 Z" />
                        <path d="M40 5 h5v5h-5z M50 5 h5v5h-5z M40 15 h5v5h-5z M60 15 h5v5h-5z M45 25 h5v5h-5z M55 25 h5v5h-5z M40 40 h5v5h-5z M50 40 h5v5h-5z M60 40 h5v5h-5z M70 40 h5v5h-5z M80 40 h5v5h-5z M90 40 h5v5h-5z M45 50 h5v5h-5z M55 50 h5v5h-5z M65 50 h5v5h-5z M75 50 h5v5h-5z M85 50 h5v5h-5z M40 60 h5v5h-5z M50 60 h5v5h-5z M60 60 h5v5h-5z M70 60 h5v5h-5z M80 60 h5v5h-5z M90 60 h5v5h-5z M40 70 h5v5h-5z M50 70 h5v5h-5z M60 70 h5v5h-5z M45 80 h5v5h-5z M55 80 h5v5h-5z M65 80 h5v5h-5z M75 80 h5v5h-5z M85 80 h5v5h-5z M40 90 h5v5h-5z M50 90 h5v5h-5z M60 90 h5v5h-5z M70 90 h5v5h-5z M80 90 h5v5h-5z M90 90 h5v5h-5z" />
                    </svg>
                </div>
            </div>

            <button onClick={onReset} className="mt-8 w-full bg-sky-900 text-white font-bold py-3.5 px-4 rounded-lg hover:bg-sky-800 transition-colors shadow-lg shadow-sky-900/30">
                {t('bookAnotherAppointment')}
            </button>
        </div>
    );
};

export default ConfirmationStep;