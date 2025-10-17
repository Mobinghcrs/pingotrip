
import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import BookingHeader from '../components/BookingHeader';
import Stepper from '../components/Stepper';
import { MOCK_SYSTEM_SEAT_MAP } from '../constants';
import { SeatData } from '../types';
import { ChevronRightIcon } from '../assets/icons';

interface SeatProps {
    seat: SeatData;
    isSelected: boolean;
    onSelect: (seat: SeatData) => void;
}

const Seat: React.FC<SeatProps> = ({ seat, isSelected, onSelect }) => {
    const { t } = useTranslation();
    const isOccupied = seat.status === 'occupied' || seat.status === 'unavailable';

    let seatClass = 'transition-all duration-200';
    const baseClasses = 'w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold';

    switch (seat.status) {
        case 'available': seatClass += ' border-slate-400 bg-slate-200/80 hover:bg-slate-300'; break;
        case 'premium': seatClass += ' border-yellow-500 bg-yellow-300 hover:bg-yellow-400'; break;
        case 'exit': seatClass += ' border-emerald-600 bg-emerald-400 hover:bg-emerald-500 text-white'; break;
        case 'occupied': seatClass += ' bg-slate-300 border-slate-400 cursor-not-allowed opacity-70'; break;
        case 'unavailable': seatClass += ' bg-red-300 border-red-400 cursor-not-allowed'; break;
    }
    if (isSelected) seatClass += ' bg-cyan-500 border-cyan-700 text-white shadow-lg ring-2 ring-cyan-300 scale-110';
    if(isOccupied) seatClass += ' cursor-not-allowed'; else seatClass += ' cursor-pointer';


    return (
        <button
            onClick={() => onSelect(seat)}
            disabled={isOccupied}
            className={`${baseClasses} ${seatClass}`}
            title={`${t('seat')} ${seat.id} ${seat.price > 0 ? `(${seat.price.toLocaleString()} ${t('rial')})` : ''}`}
            aria-label={`${t('seat')} ${seat.id}`}
        >
            {seat.id.replace(/\d+/g, '')}
        </button>
    );
};

const SeatLegendItem = ({ colorClass, label }: { colorClass: string; label: string; }) => {
    return (
        <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-md border ${colorClass}`}></div>
            <span className="text-xs text-gray-600">{label}</span>
        </div>
    );
}

const SeatSelectionPage = () => {
    const { t, localizeDigits, isRtl } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);

    const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);

    if (!bookingContext || !bookingContext.selectedFlight) {
        return <Navigate to="/" replace />;
    }

    const { selectedFlight, updateSeatSelection, selectedSeat } = bookingContext;
    
    const handleSeatSelect = (seat: SeatData) => {
        if (seat.status === 'occupied' || seat.status === 'unavailable') return;
        
        if (selectedSeatId === seat.id) {
            setSelectedSeatId(null);
            updateSeatSelection(null);
        } else {
            setSelectedSeatId(seat.id);
            updateSeatSelection({ id: seat.id, price: seat.price });
        }
    };
    
    const handleContinue = () => {
        navigate('/passenger-details');
    };

    const handleSelectAtCounter = () => {
        updateSeatSelection(null);
        navigate('/passenger-details');
    };
    
    const bookingSteps = ['selectSeat', 'passengerDetails', 'reviewAndConfirm', 'payment'];
    const totalPrice = selectedFlight.price + (selectedSeat?.price || 0);

    return (
        <div className="bg-slate-100 min-h-screen">
            <BookingHeader title={t('seatSelection')} />
            <main className="px-4 pb-48">
                <Stepper steps={bookingSteps} currentStep={1} />
                
                <div className="mt-4 bg-white rounded-2xl shadow-md border p-4">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">{t('seatLegend')}</h3>
                    <div className="grid grid-cols-3 gap-x-2 gap-y-2">
                        <SeatLegendItem colorClass="bg-slate-200 border-slate-400" label={t('available')} />
                        <SeatLegendItem colorClass="bg-yellow-300 border-yellow-500" label={t('premium')} />
                        <SeatLegendItem colorClass="bg-emerald-400 border-emerald-600" label={t('exitRow')} />
                        <SeatLegendItem colorClass="bg-red-300 border-red-400" label={t('unavailable')} />
                        <SeatLegendItem colorClass="bg-slate-300 border-slate-400" label={t('occupied')} />
                        <SeatLegendItem colorClass="bg-cyan-500 border-cyan-700" label={t('yourSelection')} />
                    </div>
                </div>

                <div className="mt-6 space-y-6">
                    {MOCK_SYSTEM_SEAT_MAP.map(section => (
                        <div key={section.titleKey} className="bg-white rounded-2xl shadow-md border p-4">
                            <h3 className="text-xl font-bold text-slate-800 text-center mb-4">{t(section.titleKey)}</h3>
                            <div className="flex flex-col items-center gap-y-2">
                                {section.rows.map((row) => (
                                    <div key={row.rowNumber} className="flex items-center justify-center gap-x-1.5 w-full">
                                        <span className="w-6 text-center text-sm font-semibold text-gray-500">{localizeDigits(row.rowNumber)}</span>
                                        <div className="flex-grow flex justify-center gap-x-1.5">
                                            {row.seats.map((seatOrSpace, seatIndex) => {
                                                // FIX: Use typeof to correctly narrow the type and resolve the error.
                                                if (typeof seatOrSpace === 'string') {
                                                    return <div key={`aisle-${seatIndex}`} className="w-8 h-8"></div>;
                                                }
                                                return <Seat
                                                            key={seatOrSpace.id}
                                                            seat={seatOrSpace}
                                                            isSelected={selectedSeatId === seatOrSpace.id}
                                                            onSelect={handleSeatSelect}
                                                        />;
                                            })}
                                        </div>
                                        <span className="w-6 text-center text-sm font-semibold text-gray-500">{localizeDigits(row.rowNumber)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-3 space-y-2">
                 <div className="flex justify-between items-center text-sm px-1">
                    <div>
                        <span className="text-gray-500">{t('flightPrice')}:</span>
                        <span className="font-semibold text-slate-700 ms-1">{localizeDigits(selectedFlight.price.toLocaleString())}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">{t('seatPrice')}:</span>
                        <span className="font-semibold text-slate-700 ms-1">{selectedSeat ? `+ ${localizeDigits(selectedSeat.price.toLocaleString())}` : localizeDigits(0)}</span>
                    </div>
                 </div>
                 <div className="border-t pt-2">
                    <div className="flex justify-between items-center text-lg px-1 font-bold text-slate-800">
                        <span>{t('totalPrice')}</span>
                        <span>{localizeDigits(totalPrice.toLocaleString())} {t('rial')}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                     <button onClick={handleSelectAtCounter} className="w-1/3 bg-gray-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors">
                        {t('selectAtCounter')}
                    </button>
                    <button onClick={handleContinue} className="w-2/3 bg-sky-900 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-sky-900/40 hover:bg-sky-800 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
                        {t('confirmAndContinue')} <ChevronRightIcon className={`w-6 h-6 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                 </div>
            </footer>
        </div>
    );
};

export default SeatSelectionPage;