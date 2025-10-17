import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ExchangeAppointment } from '../../types';
import { MOCK_APPOINTMENT_SLOTS } from '../../constants';
import { ChevronRightIcon } from '../../assets/icons';

interface DateTimeStepProps {
    details: Partial<ExchangeAppointment>;
    onUpdate: (details: Partial<ExchangeAppointment>) => void;
}

const DateTimeStep: React.FC<DateTimeStepProps> = ({ details, onUpdate }) => {
    const { t, localizeDigits, isRtl } = useTranslation();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handleDateSelect = (day: number) => {
        const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        onUpdate({ date: selectedDate, time: '' });
    };

    const handleTimeSelect = (time: string) => {
        onUpdate({ time });
    };

    const changeMonth = (offset: number) => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };

    const calendarGrid = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const grid: (number | null)[] = [];
        // Add nulls for empty days at the start of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            grid.push(null);
        }
        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            grid.push(i);
        }
        return grid;
    }, [currentMonth]);

    const today = new Date();
    const fifteenDaysFromNow = new Date();
    fifteenDaysFromNow.setDate(today.getDate() + 15);

    const isDateAvailable = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return date >= today && date <= fifteenDaysFromNow;
    }
    
    const weekDays = isRtl ? ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
        <div className="bg-white rounded-2xl shadow-md border p-4 animate-fade-in-down">
            <h3 className="text-lg font-bold text-slate-800 mb-4">{t('selectDateAndTime')}</h3>
            
            {/* Calendar */}
            <div>
                <div className="flex justify-between items-center mb-2 px-2">
                    <button onClick={() => changeMonth(-1)} className="p-1 rounded-full hover:bg-gray-100"><ChevronRightIcon className={`w-5 h-5 text-gray-500 ${isRtl ? '' : 'rotate-180'}`} /></button>
                    <span className="font-bold text-cyan-700">{currentMonth.toLocaleString(isRtl ? 'fa-IR' : 'en-US', { month: 'long', year: 'numeric' })}</span>
                    <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-gray-100"><ChevronRightIcon className={`w-5 h-5 text-gray-500 ${isRtl ? 'rotate-180' : ''}`} /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-2">
                    {weekDays.map(day => <div key={day}>{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {calendarGrid.map((day, index) => (
                        <div key={index} className="flex justify-center items-center">
                            {day ? (
                                <button 
                                    onClick={() => handleDateSelect(day)}
                                    disabled={new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) < new Date(today.toDateString())}
                                    className={`w-9 h-9 rounded-full text-sm font-semibold transition-colors disabled:text-gray-300
                                        ${details.date?.toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString() 
                                            ? 'bg-sky-900 text-white' 
                                            : isDateAvailable(day) ? 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200' : 'hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    {localizeDigits(day)}
                                </button>
                            ) : <div></div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Time Slots */}
            {details.date && (
                 <div className="mt-6 border-t pt-4 animate-fade-in-down">
                    <h4 className="font-semibold text-slate-700 mb-3">{t('availableSlots')}</h4>
                    <div className="grid grid-cols-4 gap-2">
                        {MOCK_APPOINTMENT_SLOTS.default.map(time => {
                            const isBooked = MOCK_APPOINTMENT_SLOTS.booked.includes(time);
                            return (
                                <button 
                                    key={time} 
                                    onClick={() => handleTimeSelect(time)}
                                    disabled={isBooked}
                                    className={`p-2 rounded-lg font-mono text-sm font-semibold transition-colors disabled:bg-red-50 disabled:text-red-400 disabled:line-through disabled:cursor-not-allowed
                                        ${details.time === time ? 'bg-sky-900 text-white' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'}
                                    `}
                                >
                                    {localizeDigits(time)}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateTimeStep;
