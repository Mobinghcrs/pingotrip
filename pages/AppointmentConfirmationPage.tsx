import React, { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import { CheckCircleIcon, PrinterIcon } from '../assets/icons';

const AppointmentConfirmationPage: React.FC = () => {
    const { t, localizeDigits, language } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);

    if (!bookingContext || !bookingContext.selectedAppointment) {
        return <Navigate to="/" replace />;
    }
    
    const { selectedAppointment, clearBooking } = bookingContext;

    const handleFinish = () => {
        clearBooking();
        navigate('/');
    };
    
    const DetailRow = ({ label, value }: { label: string, value: string }) => (
        <div className="flex justify-between py-2 border-b border-dashed">
            <span className="text-gray-600 text-sm">{label}</span>
            <span className="font-semibold text-slate-700 text-sm">{value}</span>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen p-4 flex flex-col items-center justify-center text-center">
            <CheckCircleIcon className="w-24 h-24 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold text-slate-800">{t('appointmentConfirmed')}</h1>
            <p className="text-gray-600 mt-2 mb-6 max-w-xs">{t('appointmentSuccessMsg')}</p>
            
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4 w-full text-start space-y-3">
                 <h3 className="text-lg font-extrabold text-slate-800 text-center mb-2">{t('invoice')}</h3>
                 
                 <DetailRow label={t('patientName')} value={selectedAppointment.patientName} />
                 <DetailRow label={t('treatmentType')} value={selectedAppointment.treatment} />
                 <DetailRow label={t('appointmentDate')} value={localizeDigits(selectedAppointment.date)} />
                 <DetailRow label={t('appointmentTime')} value={localizeDigits(selectedAppointment.time)} />
                 <DetailRow label={t('location')} value={t('mashhadMovementCenter')} />
                 <DetailRow label={t('referenceNumber')} value={selectedAppointment.ref} />

                <div className="flex justify-between items-center pt-3">
                    <span className="font-bold text-slate-800">{t('totalPrice')}</span>
                    <span className="font-extrabold text-xl text-sky-900">
                        {selectedAppointment.price.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')} {t('rial')}
                    </span>
                </div>
            </div>

            <div className="mt-6 w-full flex flex-col gap-3">
                <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-cyan-500 text-cyan-600 font-bold py-3 px-4 rounded-lg hover:bg-cyan-50 transition-colors">
                    <PrinterIcon className="w-5 h-5"/> {t('downloadReceipt')}
                </button>
                <button onClick={handleFinish} className="w-full bg-sky-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-800 transition-colors">
                    {t('finish')}
                </button>
            </div>
        </div>
    );
};

export default AppointmentConfirmationPage;