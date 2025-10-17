import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { AdminExchangeAppointment } from '../../types';
import { 
    XIcon, UserIcon, CalendarCheckIcon, DollarSignIcon, EditIcon, StoreIcon, FileTextIcon
} from '../../assets/icons';

interface ExchangeAppointmentDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: AdminExchangeAppointment;
    onSave: (updatedApplication: AdminExchangeAppointment) => void;
}

const ExchangeAppointmentDetailsModal: React.FC<ExchangeAppointmentDetailsModalProps> = ({ isOpen, onClose, appointment, onSave }) => {
    const { t, localizeDigits } = useTranslation();
    const [editableAppointment, setEditableAppointment] = useState<AdminExchangeAppointment>(appointment);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as AdminExchangeAppointment['status'];
        setEditableAppointment(prev => ({ ...prev, status: newStatus }));
    };
    
    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableAppointment(prev => ({ ...prev, notes: e.target.value }));
    };

    const handleSaveChanges = () => {
        onSave(editableAppointment);
    };

    if (!isOpen) return null;

    const statusOptions: AdminExchangeAppointment['status'][] = ['confirmed', 'cancelled', 'completed'];
    const statusStyles: { [key in AdminExchangeAppointment['status']]: string } = {
        confirmed: 'bg-green-100 text-green-800 border-green-300',
        cancelled: 'bg-red-100 text-red-800 border-red-300',
        completed: 'bg-blue-100 text-blue-800 border-blue-300',
    };

    const DetailItem = ({ label, value }: { label: string, value: string }) => (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-semibold text-slate-800">{value}</p>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-down" style={{animationDuration: '0.2s'}} onClick={onClose}>
            <div className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b bg-white rounded-t-2xl">
                    <h2 className="text-xl font-bold text-slate-800">{t('appointmentDetails')} - <span className="font-mono text-sky-800">{appointment.appointmentId}</span></h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                </header>

                <main className="p-6 overflow-y-auto space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><UserIcon className="w-5 h-5"/>{t('personalInfo')}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem label={t('customerName')} value={appointment.customerName} />
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><CalendarCheckIcon className="w-5 h-5"/>{t('appointmentDetails')}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem label={t('date')} value={localizeDigits(appointment.date)} />
                            <DetailItem label={t('time')} value={localizeDigits(appointment.time)} />
                            <DetailItem label={t('branch')} value={t(appointment.branchNameKey)} />
                            <DetailItem label={t('expert')} value={t(appointment.expertNameKey)} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-4">
                         <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><DollarSignIcon className="w-5 h-5"/>{t('service')}</h3>
                         <div className="grid grid-cols-2 gap-4">
                             <DetailItem 
                                label={t('serviceType')} 
                                value={appointment.serviceType === 'coin' ? t('buyCoin') : t('buyCurrency')} 
                            />
                            {appointment.currencyType && <DetailItem label={t('currency')} value={appointment.currencyType} />}
                         </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><FileTextIcon className="w-5 h-5"/>{t('notes')}</h3>
                        <textarea
                            value={editableAppointment.notes || ''}
                            onChange={handleNotesChange}
                            rows={4}
                            className="w-full p-2 border-2 rounded-md bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                            placeholder={t('notes') + '...'}
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-4">
                         <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><EditIcon className="w-5 h-5"/>{t('updateStatus')}</h3>
                         <select
                            value={editableAppointment.status}
                            onChange={handleStatusChange}
                            className={`w-full p-3 border-2 rounded-lg font-semibold appearance-none ${statusStyles[editableAppointment.status]}`}
                        >
                            {statusOptions.map(opt => <option key={opt} value={opt}>{t(opt)}</option>)}
                        </select>
                    </div>
                </main>

                <footer className="flex justify-end p-4 border-t bg-white rounded-b-2xl">
                    <button onClick={handleSaveChanges} className="bg-sky-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-800 transition-colors">{t('saveChanges')}</button>
                </footer>
            </div>
        </div>
    );
};

export default ExchangeAppointmentDetailsModal;