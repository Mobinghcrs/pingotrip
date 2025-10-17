import React, { useContext, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import FlightTicket from '../components/tickets/FlightTicket';
import { ArrowDownCircleIcon } from '../assets/icons';

const FlightConfirmationPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);

    useEffect(() => {
        // Clear booking details when the component unmounts
        return () => {
            bookingContext?.clearBooking();
        };
    }, [bookingContext]);

    if (!bookingContext || !bookingContext.selectedFlight) {
        return <Navigate to="/" replace />;
    }

    const { selectedFlight, passengers, selectedSeat } = bookingContext;

    const handleDownload = () => {
        window.print();
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <style>{`
                @media print {
                    body, html { background: #fff; }
                    body * { visibility: hidden; }
                    #ticket-to-print, #ticket-to-print * { visibility: visible; }
                    #ticket-to-print { position: absolute; left: 50%; top: 2rem; transform: translateX(-50%); width: 100%; max-width: 28rem; }
                    .no-print { display: none; }
                }
            `}</style>
            <header className="bg-sky-900 text-white p-4 rounded-b-2xl no-print">
                <h1 className="text-xl font-bold text-center">{t('paymentSuccess')}</h1>
                <p className="text-center text-sm opacity-90">{t('flightBookingSuccessSub')}</p>
            </header>

            <main className="p-4">
                <FlightTicket flight={selectedFlight} passengers={passengers} seat={selectedSeat} />

                <div className="mt-6 flex flex-col gap-3 no-print">
                    <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold py-3 px-4 rounded-lg hover:bg-cyan-50 dark:hover:bg-sky-900 transition-colors">
                        <ArrowDownCircleIcon className="w-5 h-5"/> {t('downloadReceipt')}
                    </button>
                    <button onClick={() => navigate('/')} className="w-full bg-sky-900 text-white font-bold py-3.5 px-4 rounded-lg hover:bg-sky-800 transition-colors">
                        {t('backToHome')}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default FlightConfirmationPage;
