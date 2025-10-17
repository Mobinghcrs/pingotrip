import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_INTERNATIONAL_FLIGHT_BOOKINGS } from '../../constants';
import { AranBooking } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { 
    SearchIcon, CalendarIcon, FileTextIcon, EditIcon, PrinterIcon, NavigationIcon,
    UsersIcon
} from '../../assets/icons';
import BookingDetailsModal from '../../components/admin/BookingDetailsModal';

const InternationalFlightsAdminPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [bookings, setBookings] = useState<AranBooking[]>(MOCK_INTERNATIONAL_FLIGHT_BOOKINGS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<AranBooking | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const openDetailsModal = (booking: AranBooking) => {
        setSelectedBooking(booking);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (booking: AranBooking) => {
        setSelectedBooking(booking);
        setIsEditing(true);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const handleSave = (updatedBooking: AranBooking) => {
        setBookings(prev => prev.map(b => b.id === updatedBooking.id ? updatedBooking : b));
        closeModal();
    };

    const filteredBookings = bookings.filter(booking => 
        booking.pnr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.passengers.some(p => p.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    const statusStyles: { [key in AranBooking['status']]: string } = {
        confirmed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800',
    };

    return (
        <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="international-flights-admin"
            />
            <div className="md:mr-64 transition-all duration-300">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('internationalFlightsAdmin')}</h2>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="text"
                                    placeholder={t('searchByPnrName')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-cyan-500 text-right"
                                />
                            </div>
                            <div className="relative">
                                <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="date"
                                    className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg py-2.5 px-4 outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 responsive-table">
                                <thead className="bg-slate-50 dark:bg-slate-700">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('pnr')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('route')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('flightNum')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('passengers')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('totalPrice')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('status')}</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                    {filteredBookings.map(booking => (
                                        <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                            <td data-label={t('pnr')} className="px-6 py-4 whitespace-nowrap">
                                                <button onClick={() => openDetailsModal(booking)} className="font-mono font-bold text-sky-800 dark:text-cyan-400 hover:underline focus:outline-none">
                                                    {booking.pnr}
                                                </button>
                                            </td>
                                            <td data-label={t('route')} className="px-6 py-4 whitespace-nowrap"><div className="font-semibold text-gray-900 dark:text-slate-100">{t(booking.flight.from)} - {t(booking.flight.to)}</div></td>
                                            <td data-label={t('flightNum')} className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-slate-400">{booking.flight.flightNumber}</td>
                                            <td data-label={t('passengers')} className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
                                                    <UsersIcon className="w-4 h-4" />
                                                    <span>{localizeDigits(booking.passengers.length)}</span>
                                                </div>
                                            </td>
                                            <td data-label={t('totalPrice')} className="px-6 py-4 whitespace-nowrap font-semibold">{localizeDigits(booking.totalPrice.toLocaleString())} {t('rial')}</td>
                                            <td data-label={t('status')} className="px-6 py-4 whitespace-nowrap"><span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[booking.status]}`}>{t(booking.status)}</span></td>
                                            <td data-label={t('actions')} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => openDetailsModal(booking)} className="text-gray-400 hover:text-cyan-600" title={t('viewDetails')}><FileTextIcon className="w-5 h-5"/></button>
                                                    <button onClick={() => openEditModal(booking)} className="text-gray-400 hover:text-blue-600" title={t('editBooking')}><EditIcon className="w-5 h-5"/></button>
                                                    <button className="text-gray-400 hover:text-green-600" title={t('downloadTicket')}><PrinterIcon className="w-5 h-5"/></button>
                                                    <button className="text-gray-400 hover:text-purple-600" title={t('sendConfirmation')}><NavigationIcon className="w-5 h-5"/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {filteredBookings.length === 0 && <p className="text-center text-gray-500 dark:text-slate-400 py-12">{t('noResultsFound')}</p>}
                </main>
            </div>
            {isModalOpen && selectedBooking && (
                <BookingDetailsModal 
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    booking={selectedBooking}
                    isEditing={isEditing}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default InternationalFlightsAdminPage;