import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { AranBooking, AdminPassenger, Flight } from '../../types';
import { XIcon, PlaneIcon, UsersIcon, DollarSignIcon, MailIcon, PhoneIcon } from '../../assets/icons';

interface BookingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: AranBooking;
    isEditing: boolean;
    onSave: (updatedBooking: AranBooking) => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ isOpen, onClose, booking, isEditing, onSave }) => {
    const { t, localizeDigits } = useTranslation();
    const [editableBooking, setEditableBooking] = useState<AranBooking>(() => JSON.parse(JSON.stringify(booking)));

    useEffect(() => {
        setEditableBooking(JSON.parse(JSON.stringify(booking)));
    }, [booking]);

    const handlePassengerChange = (index: number, field: keyof Omit<AdminPassenger, 'id'>, value: string) => {
        const updatedPassengers = [...editableBooking.passengers];
        updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
        setEditableBooking(prev => ({ ...prev, passengers: updatedPassengers }));
    };

    const handleContactChange = (field: 'contactEmail' | 'contactPhone', value: string) => {
        setEditableBooking(prev => ({ ...prev, [field]: value }));
    };
    
    const handleFlightChange = (field: keyof Omit<Flight, 'id' | 'airline' | 'duration' | 'price' | 'type'>, value: string) => {
        setEditableBooking(prev => ({
            ...prev,
            flight: {
                ...prev.flight,
                [field]: value
            }
        }));
    };

    const handleSaveChanges = () => {
        onSave(editableBooking);
    };

    if (!isOpen) return null;

    const DetailItem = ({ label, value, children }: { label: string, value?: string, children?: React.ReactNode }) => (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            {value && <p className="font-semibold text-slate-800">{value}</p>}
            {children}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-down" style={{animationDuration: '0.2s'}}>
            <div className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b bg-white rounded-t-2xl">
                    <h2 className="text-xl font-bold text-slate-800">{isEditing ? t('editBooking') : t('bookingDetails')} - <span className="font-mono text-sky-800">{booking.pnr}</span></h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                </header>

                <main className="p-6 overflow-y-auto space-y-6">
                    {/* Flight Info */}
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><PlaneIcon className="w-5 h-5"/>{t('flightInfo')}</h3>
                        {isEditing ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">{t('flightNum')}</label>
                                    <input type="text" value={editableBooking.flight.flightNumber} onChange={e => handleFlightChange('flightNumber', e.target.value)} className="w-full p-2 border rounded-md bg-white"/>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">{t('date')}</label>
                                    <input type="text" value={editableBooking.flight.date} onChange={e => handleFlightChange('date', e.target.value)} className="w-full p-2 border rounded-md bg-white"/>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">{t('origin')}</label>
                                    <input type="text" value={editableBooking.flight.from} onChange={e => handleFlightChange('from', e.target.value)} className="w-full p-2 border rounded-md bg-white"/>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">{t('destination')}</label>
                                    <input type="text" value={editableBooking.flight.to} onChange={e => handleFlightChange('to', e.target.value)} className="w-full p-2 border rounded-md bg-white"/>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">{t('departureTime')}</label>
                                    <input type="text" value={editableBooking.flight.departureTime} onChange={e => handleFlightChange('departureTime', e.target.value)} className="w-full p-2 border rounded-md bg-white"/>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">{t('arrivalTime')}</label>
                                    <input type="text" value={editableBooking.flight.arrivalTime} onChange={e => handleFlightChange('arrivalTime', e.target.value)} className="w-full p-2 border rounded-md bg-white"/>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <DetailItem label={t('route')} value={`${t(booking.flight.from)} - ${t(booking.flight.to)}`} />
                                <DetailItem label={t('flightNum')} value={booking.flight.flightNumber} />
                                <DetailItem label={t('date')} value={localizeDigits(booking.flight.date)} />
                                <DetailItem label={t('time')} value={`${localizeDigits(booking.flight.departureTime)} - ${localizeDigits(booking.flight.arrivalTime)}`} />
                            </div>
                        )}
                    </div>

                    {/* Passengers Info */}
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><UsersIcon className="w-5 h-5"/>{t('passengersInfo')}</h3>
                        <div className="space-y-3">
                            {editableBooking.passengers.map((p, index) => (
                                <div key={p.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-md">
                                    {isEditing ? (
                                        <>
                                            <input type="text" value={p.fullName} onChange={e => handlePassengerChange(index, 'fullName', e.target.value)} className="w-full p-2 border rounded-md bg-white" />
                                            <input type="text" value={p.nationalId} onChange={e => handlePassengerChange(index, 'nationalId', e.target.value)} className="w-full p-2 border rounded-md bg-white" />
                                            <select value={p.gender} onChange={e => handlePassengerChange(index, 'gender', e.target.value)} className="w-full p-2 border rounded-md bg-white">
                                                <option value="male">{t('male')}</option>
                                                <option value="female">{t('female')}</option>
                                            </select>
                                        </>
                                    ) : (
                                        <>
                                            <DetailItem label={t('fullName')} value={p.fullName} />
                                            <DetailItem label={t('nationalId')} value={localizeDigits(p.nationalId)} />
                                            <DetailItem label={t('gender')} value={t(p.gender)} />
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                     {/* Contact & Price Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><MailIcon className="w-5 h-5"/>{t('contactInfo')}</h3>
                            <div className="space-y-3">
                                {isEditing ? (
                                    <>
                                        <input type="email" value={editableBooking.contactEmail} onChange={e => handleContactChange('contactEmail', e.target.value)} className="w-full p-2 border rounded-md bg-white" />
                                        <input type="tel" value={editableBooking.contactPhone} onChange={e => handleContactChange('contactPhone', e.target.value)} className="w-full p-2 border rounded-md bg-white" />
                                    </>
                                ) : (
                                    <>
                                        <DetailItem label={t('email')} value={booking.contactEmail} />
                                        <DetailItem label={t('phone')} value={localizeDigits(booking.contactPhone)} />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><DollarSignIcon className="w-5 h-5"/>{t('priceSummary')}</h3>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">{t('totalPrice')}</span>
                                <span className="text-2xl font-bold text-sky-900">{localizeDigits(booking.totalPrice.toLocaleString())} {t('rial')}</span>
                            </div>
                        </div>
                    </div>

                </main>

                <footer className="flex justify-end p-4 border-t bg-white rounded-b-2xl">
                    {isEditing ? (
                        <button onClick={handleSaveChanges} className="bg-sky-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-800 transition-colors">{t('saveChanges')}</button>
                    ) : (
                        <button onClick={onClose} className="bg-gray-200 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">{t('close')}</button>
                    )}
                </footer>
            </div>
        </div>
    );
};

export default BookingDetailsModal;