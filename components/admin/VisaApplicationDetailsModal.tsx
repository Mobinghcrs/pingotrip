
import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { AdminVisaApplication } from '../../types';
// FIX: Replaced non-existent 'DownloadCloudIcon' and 'ClockIcon' with 'ArrowDownCircleIcon' and 'CalendarIcon' respectively.
import { 
    XIcon, UserIcon, FileTextIcon, LandmarkIcon, ArrowDownCircleIcon, CalendarIcon, EditIcon
} from '../../assets/icons';

interface VisaApplicationDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    application: AdminVisaApplication;
    onSave: (updatedApplication: AdminVisaApplication) => void;
}

const VisaApplicationDetailsModal: React.FC<VisaApplicationDetailsModalProps> = ({ isOpen, onClose, application, onSave }) => {
    const { t, localizeDigits } = useTranslation();
    const [editableApplication, setEditableApplication] = useState<AdminVisaApplication>(application);
    const [newNote, setNewNote] = useState('');

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as AdminVisaApplication['status'];
        setEditableApplication(prev => ({ ...prev, status: newStatus }));
    };

    const handleAddNote = () => {
        if (!newNote.trim()) return;

        const note = {
            date: new Date().toLocaleDateString('fa-IR'),
            status: t(editableApplication.status),
            notes: newNote
        };
        setEditableApplication(prev => ({
            ...prev,
            history: [note, ...prev.history]
        }));
        setNewNote('');
    };

    const handleSaveChanges = () => {
        onSave(editableApplication);
    };

    if (!isOpen) return null;

    const statusOptions: AdminVisaApplication['status'][] = ['pending', 'in_review', 'approved', 'rejected'];
    const statusStyles: { [key in AdminVisaApplication['status']]: string } = {
        approved: 'bg-green-100 text-green-800 border-green-300',
        rejected: 'bg-red-100 text-red-800 border-red-300',
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        in_review: 'bg-blue-100 text-blue-800 border-blue-300',
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
                    <h2 className="text-xl font-bold text-slate-800">{t('applicationDetails')} - <span className="font-mono text-sky-800">{application.applicationId}</span></h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                </header>

                <main className="p-6 overflow-y-auto space-y-6">
                    {/* Applicant & Passport Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><UserIcon className="w-5 h-5"/>{t('personalInfo')}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem label={t('applicantName')} value={application.applicantName} />
                                <DetailItem label={t('dateOfBirth')} value={localizeDigits(application.personalInfo.dateOfBirth)} />
                                <DetailItem label={t('nationality')} value={application.personalInfo.nationality} />
                                <DetailItem label={t('gender')} value={t(application.personalInfo.gender)} />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><LandmarkIcon className="w-5 h-5"/>{t('passportInfo')}</h3>
                             <div className="grid grid-cols-2 gap-4">
                                <DetailItem label={t('passportNumber')} value={application.passportInfo.number} />
                                <DetailItem label={t('issueDate')} value={localizeDigits(application.passportInfo.issueDate)} />
                                <DetailItem label={t('expiryDate')} value={localizeDigits(application.passportInfo.expiryDate)} />
                            </div>
                        </div>
                    </div>

                     {/* Documents & Status */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><FileTextIcon className="w-5 h-5"/>{t('documents')}</h3>
                            <div className="space-y-2">
                                <a href={application.documents.passportScan} className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100">
                                    <span className="text-sm font-semibold text-slate-700">{t('passportScan')}</span>
                                    <ArrowDownCircleIcon className="w-5 h-5 text-cyan-600"/>
                                </a>
                                <a href={application.documents.photo} className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100">
                                    <span className="text-sm font-semibold text-slate-700">{t('applicantPhoto')}</span>
                                    <ArrowDownCircleIcon className="w-5 h-5 text-cyan-600"/>
                                </a>
                            </div>
                        </div>
                         <div className="bg-white rounded-lg shadow-sm border p-4">
                             <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><EditIcon className="w-5 h-5"/>{t('updateStatus')}</h3>
                             <select
                                value={editableApplication.status}
                                onChange={handleStatusChange}
                                className={`w-full p-3 border-2 rounded-lg font-semibold appearance-none ${statusStyles[editableApplication.status]}`}
                            >
                                {statusOptions.map(opt => <option key={opt} value={opt}>{t(opt)}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    {/* History & Notes */}
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><CalendarIcon className="w-5 h-5"/>{t('applicationHistory')}</h3>
                        <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                            {editableApplication.history.map((item, index) => (
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
                                    placeholder={t('internalNotes')}
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

export default VisaApplicationDetailsModal;