import React from 'react';
import { Flight, Passenger, SeatInfo } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_QR_CODE_URL } from '../../constants';
import { PlaneIcon, AranAirlinesIcon } from '../../assets/icons';

interface FlightTicketProps {
    flight: Flight;
    passengers: Passenger[];
    seat: SeatInfo | null;
}

const FlightTicket: React.FC<FlightTicketProps> = ({ flight, passengers, seat }) => {
    const { t, localizeDigits } = useTranslation();
    const pnr = `PG-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border dark:border-slate-700 font-sans my-4 flex flex-col" id="ticket-to-print">
            <div className="p-5 flex-grow">
                <header className="flex items-center justify-between pb-4 border-b dark:border-slate-700">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-slate-400">{t('boardingPass')}</p>
                        <h2 className="text-2xl font-bold text-sky-900 dark:text-cyan-400">{t(flight.airline)}</h2>
                    </div>
                    <AranAirlinesIcon className="w-12 h-12 text-sky-900 dark:text-cyan-400" />
                </header>
                <div className="grid grid-cols-3 gap-4 my-4">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{t('origin')}</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{flight.from.substring(0,3).toUpperCase()}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{t(flight.from.toLowerCase())}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <PlaneIcon className="w-8 h-8 text-gray-400 dark:text-slate-500" />
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-slate-400">{t('destination')}</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{flight.to.substring(0,3).toUpperCase()}</p>
                         <p className="text-sm text-slate-600 dark:text-slate-300">{t(flight.to.toLowerCase())}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-b dark:border-slate-700">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{t('flightNum')}</p>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{flight.flightNumber}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{t('date')}</p>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{localizeDigits(flight.date)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-slate-400">{t('departureTime')}</p>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{localizeDigits(flight.departureTime)}</p>
                    </div>
                </div>
                <div className="py-4">
                    <p className="text-xs text-gray-500 dark:text-slate-400">{t('passengers')}</p>
                    {passengers.map((p) => (
                         <p key={p.id} className="font-semibold text-slate-800 dark:text-slate-200">{p.firstName} {p.lastName}</p>
                    ))}
                </div>
            </div>

            {/* Stub */}
            <div className="p-5 border-t-2 border-dashed border-gray-200 dark:border-slate-600 flex items-center justify-around">
                <div className="flex flex-col gap-4 text-center">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{t('gate')}</p>
                        <p className="font-bold text-2xl text-slate-800 dark:text-slate-200">A12</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{t('seat')}</p>
                        <p className="font-bold text-2xl text-slate-800 dark:text-slate-200">{seat ? seat.id : '--'}</p>
                    </div>
                </div>
                <div className="text-center">
                    <img src={`${MOCK_QR_CODE_URL}${pnr}`} alt="QR Code" className="w-24 h-24 rounded-md" />
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{t('pnr')}</p>
                    <p className="font-mono font-bold text-md text-slate-800 dark:text-slate-200">{pnr}</p>
                </div>
            </div>
        </div>
    );
};

export default FlightTicket;