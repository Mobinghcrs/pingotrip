import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { AdminHealthAppointment } from '../../types';
import { 
    XIcon, UserIcon, FileTextIcon, DollarSignIcon, EditIcon, MailIcon, PhoneIcon, CalendarIcon, HeartPulseIcon
} from '../../assets/icons';

interface HealthAppointmentDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: AdminHealthAppointment;
    onSave: (updatedAppointment: AdminHealthAppointment) => void;
}

const HealthAppointmentDetailsModal: React.FC<HealthAppointmentDetailsModalProps> = ({ isOpen, onClose, appointment, onSave }) => {
    const { t, localizeDigits } = useTranslation();
    const [editableAppointment, setEditableAppointment] = useState<AdminHealthAppointment>(appointment);
    const [smsStatus, setSmsStatus] = useState('');

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as AdminHealthAppointment['status'];
        setEditableAppointment(prev => ({ ...prev, status: newStatus }));
    };
    
    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableAppointment(prev => ({ ...prev, notes: e.target.value }));
    };
    
    const handleSendSms = (type: 'confirmation' | 'reminder') => {
        // Mock SMS sending
        console.log(`Sending ${type} SMS to ${editableAppointment.contactPhone}`);
        setSmsStatus(t('smsSent'));
        setTimeout(() => setSmsStatus(''), 2000);
    };

    const handleSaveChanges = () => {
        onSave(editableAppointment);
    };

    if (!isOpen) return null;

    const statusOptions: AdminHealthAppointment['status'][] = ['pending', 'confirmed', 'completed', 'cancelled'];
    const statusStyles: { [key in AdminHealthAppointment['status']]: string } = {
        confirmed: 'bg-green-100 text-green-800 border-green-300',
        cancelled: 'bg-red-100 text-red-800 border-red-300',
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
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
            <div className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b bg-white rounded-t-2xl">
                    <h2 className="text-xl font-bold text-slate-800">{t('appointmentDetails')} - <span className="font-mono text-sky-800">{appointment.ref}</span></h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                </header>

                <main className="p-6 overflow-y-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><UserIcon className="w-5 h-5"/>{t('patient')}</h3>
                            <div className="space-y-3">
                                <DetailItem label={t('patientName')} value={appointment.patientName} />
                                <DetailItem label={t('phone')} value={localizeDigits(appointment.contactPhone)} />
                                <DetailItem label={t('email')} value={appointment.contactEmail} />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><CalendarIcon className="w-5 h-5"/>{t('appointment')}</h3>
                             <div className="space-y-3">
                                <DetailItem label={t('treatment')} value={t(appointment.treatmentKey)} />
                                <DetailItem label={t('date')} value={localizeDigits(appointment.date)} />
                                <DetailItem label={t('time')} value={localizeDigits(appointment.time)} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                         <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><DollarSignIcon className="w-5 h-5"/>{t('payment')}</h3>
                         <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-600">{t('totalPrice')}</span>
                            <span className="text-2xl font-bold text-sky-900">{localizeDigits(appointment.price.toLocaleString())} {t('rial')}</span>
                        </div>
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

                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><MailIcon className="w-5 h-5"/>SMS</h3>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button onClick={() => handleSendSms('confirmation')} className="flex-1 bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors">{t('sendConfirmationSms')}</button>
                            <button onClick={() => handleSendSms('reminder')} className="flex-1 bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">{t('sendReminderSms')}</button>
                        </div>
                        {smsStatus && <p className="text-sm text-green-600 font-semibold mt-3 text-center animate-fade-in-down">{smsStatus}</p>}
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><FileTextIcon className="w-5 h-5"/>{t('internalNotes')}</h3>
                        <textarea
                            value={editableAppointment.notes || ''}
                            onChange={handleNotesChange}
                            rows={3}
                            className="w-full p-2 border-2 rounded-md bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                            placeholder={t('internalNotes') + '...'}
                        />
                    </div>
                </main>

                <footer className="flex justify-end p-4 border-t bg-white rounded-b-2xl">
                    <button onClick={handleSaveChanges} className="bg-sky-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-800 transition-colors">{t('saveChanges')}</button>
                </footer>
            </div>
        </div>
    );
};

export default HealthAppointmentDetailsModal;
