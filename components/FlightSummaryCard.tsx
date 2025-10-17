

import React from 'react';
// FIX: Correct import path
import { Flight } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { PlaneIcon } from '../assets/icons';

interface FlightSummaryCardProps {
    flight: Flight;
}

const FlightSummaryCard: React.FC<FlightSummaryCardProps> = ({ flight }) => {
    const { t, localizeDigits } = useTranslation();

    return (
        <div className="bg-white rounded-2xl shadow-md border p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-cyan-100 border border-cyan-200">
                        <PlaneIcon className="w-6 h-6 text-sky-900"/>
                    </div>
                    <div>
                        <p className="font-bold text-sm">{t(flight.airline)}</p>
                        <p className="text-xs text-gray-500">{flight.flightNumber}</p>
                    </div>
                </div>
                <div className="text-xs text-gray-600 font-semibold bg-gray-100 px-2.5 py-1.5 rounded-lg">{flight.date}</div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-center">
                    <p className="text-xl font-bold text-slate-800">{localizeDigits(flight.departureTime)}</p>
                    <p className="text-sm font-semibold text-gray-600">{t(flight.from.toLowerCase())}</p>
                </div>
                <div className="text-center text-xs text-gray-500 px-2 grow">
                     <div className="w-full h-px bg-gray-200 relative flex items-center justify-center">
                        <PlaneIcon className="w-4 h-4 text-gray-400 bg-white px-1"/>
                    </div>
                    <p className="mt-1">{flight.duration}</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold text-slate-800">{localizeDigits(flight.arrivalTime)}</p>
                    <p className="text-sm font-semibold text-gray-600">{t(flight.to.toLowerCase())}</p>
                </div>
            </div>
        </div>
    );
};

export default FlightSummaryCard;