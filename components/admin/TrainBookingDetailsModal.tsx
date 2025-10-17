import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { AdminTrainBooking } from '../../types';
import { 
    XIcon, UserIcon, FileTextIcon, DollarSignIcon, EditIcon, TrainIcon, MailIcon, PhoneIcon, CalendarIcon
} from '../../assets/icons';

interface TrainBookingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: AdminTrainBooking;
    onSave: (updatedBooking: AdminTrainBooking) => void;
}

const TrainBookingDetailsModal: React.FC<TrainBookingDetailsModalProps> = ({ isOpen, onClose, booking, onSave }) => {
    const { t, localizeDigits } = useTranslation();
    const [editableBooking, setEditableBooking] = useState<AdminTrainBooking>(booking);
    const [newNote, setNewNote] = useState('');

    const handleStatusChange = (newStatus: AdminTrainBooking['status']) => {
        setEditableBooking(prev => ({ ...prev, status: newStatus }));
    };

    const handleAddNote = () => {
        if (!newNote.trim()) return;

        const note = {
            date: new Date().toLocaleDateString('fa-IR'),
            status: t(editableBooking.status),
            notes: newNote
        };
        
        const history = editableBooking.history ? [note, ...editableBooking.history] : [note];

        setEditableBooking(prev => ({ ...prev, history }));
        setNewNote('');
    };

    const handleSaveChanges = () => {
        onSave(editableBooking);
    };

    if (!isOpen) return null;

    const statusOptions: AdminTrainBooking['status'][] = ['pending', 'confirmed', 'cancelled'];
    const statusStyles: { [key in AdminTrainBooking['status']]: string } = {
        confirmed: 'bg-green-100 text-green-800 border-green-300',
        cancelled: 'bg-red-100 text-red-800 border-red-300',
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };

    const DetailItem = ({ label, value }: { label: string, value: string }) => (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-semibold text-slate-800">{value}</p>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-down" style={{animationDuration: '0.2s'}} onClick={onClose}>
            <div className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b bg-white rounded-t-2xl">
                    <h2 className="text-xl font-bold text-slate-800">{t('bookingDetails')} - <span className="font-mono text-sky-800">{booking.bookingId}</span></h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                </header>

                <main className="p-6 overflow-y-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><TrainIcon className="w-5 h-5"/>{t('trainInfo')}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem label={t('trainCompany')} value={t(booking.train.companyKey)} />
                                <DetailItem label={t('trainNumber')} value={booking.train.trainNumber} />
                                <DetailItem label={t('route')} value={`${t(booking.train.from)} - ${t(booking.train.to)}`} />
                                <DetailItem label={t('date')} value={localizeDigits(booking.train.date)} />
                                <DetailItem label={t('departureTime')} value={localizeDigits(booking.train.departureTime)} />
                                <DetailItem label={t('arrivalTime')} value={localizeDigits(booking.train.arrivalTime)} />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><DollarSignIcon className="w-5 h-5"/>{t('priceSummary')}</h3>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">{t('totalPrice')}</span>
                                <span className="text-2xl font-bold text-sky-900">{localizeDigits(booking.totalPrice.toLocaleString())} {t('rial')}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-700 mt-6 mb-2 flex items-center gap-2"><MailIcon className="w-5 h-5"/>{t('contactInfo')}</h3>
                             <div className="space-y-3">
                                <DetailItem label={t('email')} value={booking.contactEmail} />
                                <DetailItem label={t('phone')} value={localizeDigits(booking.contactPhone)} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><UserIcon className="w-5 h-5"/>{t('passengersInfo')} ({localizeDigits(booking.passengers.length)})</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                           {booking.passengers.map(p => (
                               <div key={p.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-2 bg-gray-50 rounded-md">
                                    <DetailItem label={t('fullName')} value={p.fullName} />
                                    <DetailItem label={t('nationalId')} value={localizeDigits(p.nationalId)} />
                                    <DetailItem label={t('gender')} value={t(p.gender)} />
                               </div>
                           ))}
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><EditIcon className="w-5 h-5"/>{t('actions')}</h3>
                         <div className="flex flex-col sm:flex-row gap-4">
                            <select
                                value={editableBooking.status}
                                onChange={(e) => handleStatusChange(e.target.value as AdminTrainBooking['status'])}
                                className={`w-full sm:w-1/3 p-3 border-2 rounded-lg font-semibold appearance-none ${statusStyles[editableBooking.status]}`}
                            >
                                {statusOptions.map(opt => <option key={opt} value={opt}>{t(opt)}</option>)}
                            </select>
                            <button 
                                onClick={() => handleStatusChange('cancelled')}
                                className="w-full sm:w-auto flex-grow bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors"
                            >
                                {t('refundBooking')}
                            </button>
                         </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><CalendarIcon className="w-5 h-5"/>{t('applicationHistory')}</h3>
                        <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                            {editableBooking.history?.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-1.5"></div>
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-bold text-slate-600">{item.status}</span>
                                            <span className="text-gray-400">{localizeDigits(item.date)}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">{item.notes}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                         <div className="mt-4 border-t pt-4">
                            <h4 className="font-semibold text-slate-600 mb-2">{t('addNote')}</h4>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={newNote}
                                    onChange={e => setNewNote(e.target.value)}
                                    placeholder={t('internalNotes') + '...'}
                                    className="w-full p-2 border rounded-md bg-white"
                                />
                                <button onClick={handleAddNote} className="bg-cyan-600 text-white font-semibold px-4 rounded-md hover:bg-cyan-700">{t('add')}</button>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="flex justify-end p-4 border-t bg-white rounded-b-2xl">
                    <button onClick={handleSaveChanges} className="bg-sky-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-800 transition-colors">{t('saveChanges')}</button>
                </footer>
            </div>
        </div>
    );
};

export default TrainBookingDetailsModal;