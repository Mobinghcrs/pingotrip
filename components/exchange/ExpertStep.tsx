import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ExchangeAppointment } from '../../types';
import { MOCK_EXPERTS } from '../../constants';
import { MaleUserIcon, FemaleUserIcon } from '../../assets/icons';

interface ExpertStepProps {
    details: Partial<ExchangeAppointment>;
    onUpdate: (details: Partial<ExchangeAppointment>) => void;
}

const ExpertStep: React.FC<ExpertStepProps> = ({ details, onUpdate }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-2xl shadow-md border p-4 animate-fade-in-down">
            <h3 className="text-lg font-bold text-slate-800 mb-4">{t('selectAnExpert')}</h3>
            <div className="space-y-3">
                {MOCK_EXPERTS.map(expert => (
                    <button 
                        key={expert.id}
                        onClick={() => onUpdate({ expertId: expert.id })}
                        className={`w-full text-start p-3 border-2 rounded-xl flex items-center gap-4 transition-all duration-200 ${
                            details.expertId === expert.id ? 'bg-cyan-50 border-cyan-500 shadow-md' : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/50'
                        }`}
                    >
                        <div className="w-14 h-14 rounded-full bg-cyan-100 flex-shrink-0 flex items-center justify-center">
                            {expert.gender === 'male' ? (
                                <MaleUserIcon className="w-8 h-8 text-sky-900" />
                            ) : (
                                <FemaleUserIcon className="w-8 h-8 text-sky-900" />
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800">{t(expert.nameKey)}</p>
                            <p className="text-xs text-gray-500">{t(expert.specialtyKey)}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ExpertStep;