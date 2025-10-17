import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { AdminHotelBooking, AdminPassenger } from '../../types';
import { XIcon, HotelIcon, UsersIcon, DollarSignIcon, MailIcon, PhoneIcon, CalendarIcon } from '../../assets/icons';

interface HotelBookingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: AdminHotelBooking;
    isEditing: boolean;
    onSave: (updatedBooking: AdminHotelBooking) => void;
}

const HotelBookingDetailsModal: React.FC<HotelBookingDetailsModalProps> = ({ isOpen, onClose, booking, isEditing, onSave }) => {
    const { t, localizeDigits } = useTranslation();
    const [editableBooking, setEditableBooking] = useState<AdminHotelBooking>(() => JSON.parse(JSON.stringify(booking)));

    useEffect(() => {
        setEditableBooking(JSON.parse(JSON.stringify(booking)));
    }, [booking]);

    const handleGuestChange = (index: number, field: keyof Omit<AdminPassenger, 'id'>, value: string) => {
        const updatedGuests = [...editableBooking.guests];
        updatedGuests[index] = { ...updatedGuests[index], [field]: value };
        setEditableBooking(prev => ({ ...prev, guests: updatedGuests }));
    };

    const handleContactChange = (field: 'contactEmail' | 'contactPhone' | 'guestName' | 'checkInDate' | 'checkOutDate', value: string) => {
        setEditableBooking(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = () => {
        onSave(editableBooking);
    };

    if (!isOpen) return null;

    const DetailItem = ({ label, value }: { label: string, value?: string }) => (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            {value && <p className="font-semibold text-slate-800">{value}</p>}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-down" style={{animationDuration: '0.2s'}} onClick={onClose}>
            <div className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b bg-white rounded-t-2xl">
                    <h2 className="text-xl font-bold text-slate-800">{isEditing ? t('editBooking') : t('bookingDetails')} - <span className="font-mono text-sky-800">{booking.bookingId}</span></h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                </header>

                <main className="p-6 overflow-y-auto space-y-6">
                    {/* Hotel Info */}
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><HotelIcon className="w-5 h-5"/>{t('hotelDetails')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <DetailItem label={t('hotelName')} value={t(booking.hotel.nameKey)} />
                            <DetailItem label={t('location')} value={t(booking.hotel.locationKey)} />
                        </div>
                    </div>

                     {/* Booking Dates */}
                     <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><CalendarIcon className="w-5 h-5"/>{t('bookingDate')}</h3>
                         {isEditing ? (
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">{t('checkInDate')}</label>
                                    <input type="text" value={editableBooking.checkInDate} onChange={e => handleContactChange('checkInDate', e.target.value)} className="w-full p-2 border rounded-md bg-white"/>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">{t('checkOutDate')}</label>
                                    <input type="text" value={editableBooking.checkOutDate} onChange={e => handleContactChange('checkOutDate', e.target.value)} className="w-full p-2 border rounded-md bg-white"/>
                                </div>
                            </div>
                         ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <DetailItem label={t('checkInDate')} value={localizeDigits(booking.checkInDate)} />
                                <DetailItem label={t('checkOutDate')} value={localizeDigits(booking.checkOutDate)} />
                                <DetailItem label={t('perNight')} value={localizeDigits(booking.numberOfNights)} />
                            </div>
                         )}
                    </div>

                    {/* Guests Info */}
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><UsersIcon className="w-5 h-5"/>{t('passengersInfo')}</h3>
                        <div className="space-y-3">
                            {editableBooking.guests.map((p, index) => (
                                <div key={p.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-md">
                                    {isEditing ? (
                                        <>
                                            <input type="text" value={p.fullName} onChange={e => handleGuestChange(index, 'fullName', e.target.value)} className="w-full p-2 border rounded-md bg-white" />
                                            <input type="text" value={p.nationalId} onChange={e => handleGuestChange(index, 'nationalId', e.target.value)} className="w-full p-2 border rounded-md bg-white" />
                                            <select value={p.gender} onChange={e => handleGuestChange(index, 'gender', e.target.value)} className="w-full p-2 border rounded-md bg-white">
                                                <option value="male">{t('male')}</option>
                                                <option value="female">{t('female')}</option>
                                            </select>
                                        </>
                                    ) : (
                                        <>
                                            <DetailItem label={t('fullName')} value={p.fullName} />
                                            <DetailItem label={t('nationalId')} value={p.nationalId} />
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

export default HotelBookingDetailsModal;