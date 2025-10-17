

import React from 'react';
// FIX: Correct import path
import { Train } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { TrainIcon } from '../assets/icons';

interface TrainSummaryCardProps {
    train: Train;
}

const TrainSummaryCard: React.FC<TrainSummaryCardProps> = ({ train }) => {
    const { t, localizeDigits } = useTranslation();

    return (
        <div className="bg-white rounded-2xl shadow-md border p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-cyan-100 border border-cyan-200">
                        <TrainIcon className="w-6 h-6 text-sky-900"/>
                    </div>
                    <div>
                        {/* FIX: Use companyKey and translate it */}
                        <p className="font-bold text-sm">{t(train.companyKey)}</p>
                        <p className="text-xs text-gray-500">{train.trainNumber}</p>
                    </div>
                </div>
                <div className="text-xs text-gray-600 font-semibold bg-gray-100 px-2.5 py-1.5 rounded-lg">{train.date}</div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-center">
                    <p className="text-xl font-bold text-slate-800">{localizeDigits(train.departureTime)}</p>
                    <p className="text-sm font-semibold text-gray-600">{t(train.from.toLowerCase())}</p>
                </div>
                <div className="text-center text-xs text-gray-500 px-2 grow">
                     <div className="w-full h-px bg-gray-200 relative flex items-center justify-center">
                        <TrainIcon className="w-4 h-4 text-gray-400 bg-white px-1"/>
                    </div>
                    <p className="mt-1">{train.duration}</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold text-slate-800">{localizeDigits(train.arrivalTime)}</p>
                    <p className="text-sm font-semibold text-gray-600">{t(train.to.toLowerCase())}</p>
                </div>
            </div>
        </div>
    );
};

export default TrainSummaryCard;