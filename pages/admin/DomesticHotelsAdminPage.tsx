import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_DOMESTIC_HOTEL_BOOKINGS } from '../../constants';
import { AdminHotelBooking } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import {
    SearchIcon, CalendarIcon, EditIcon, FileTextIcon, NavigationIcon
} from '../../assets/icons';
import HotelBookingDetailsModal from '../../components/admin/HotelBookingDetailsModal';

const DomesticHotelsAdminPage = () => {
    const { t, localizeDigits } = useTranslation();
    const [bookings, setBookings] = useState<AdminHotelBooking[]>(MOCK_DOMESTIC_HOTEL_BOOKINGS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<AdminHotelBooking | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const openDetailsModal = (booking: AdminHotelBooking) => {
        setSelectedBooking(booking);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (booking: AdminHotelBooking) => {
        setSelectedBooking(booking);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const handleSave = (updatedBooking: AdminHotelBooking) => {
        setBookings(prev => prev.map(b => b.id === updatedBooking.id ? updatedBooking : b));
        closeModal();
    };

    const filteredBookings = bookings.filter(booking =>
        booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t(booking.hotel.nameKey).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const statusStyles: { [key in AdminHotelBooking['status']]: string } = {
        confirmed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800',
    };

    return (
        <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900">
            <AdminSidebar
                isSidebarOpen={isSidebarOpen}
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="domestic-hotels-admin"
            />
            <div className="md:mr-64 transition-all duration-300">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('domesticHotelsAdmin')}</h2>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder={t('searchBookings')}
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
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('bookingId')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('hotelName')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('guestName')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('checkInDate')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{t('status')}</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                    {filteredBookings.map(booking => (
                                        <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                            <td data-label={t('bookingId')} className="px-6 py-4 whitespace-nowrap">
                                                <button onClick={() => openDetailsModal(booking)} className="font-mono font-bold text-sky-800 dark:text-cyan-400 hover:underline focus:outline-none">
                                                    {booking.bookingId}
                                                </button>
                                            </td>
                                            <td data-label={t('hotelName')} className="px-6 py-4 whitespace-nowrap"><div className="font-semibold text-gray-900 dark:text-slate-100">{t(booking.hotel.nameKey)}</div></td>
                                            <td data-label={t('guestName')} className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-slate-300">{booking.guestName}</td>
                                            <td data-label={t('checkInDate')} className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-slate-400">{localizeDigits(booking.checkInDate)}</td>
                                            <td data-label={t('status')} className="px-6 py-4 whitespace-nowrap"><span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[booking.status]}`}>{t(booking.status)}</span></td>
                                            <td data-label={t('actions')} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => openDetailsModal(booking)} className="text-gray-400 hover:text-cyan-600" title={t('viewDetails')}><FileTextIcon className="w-5 h-5"/></button>
                                                    <button onClick={() => openEditModal(booking)} className="text-gray-400 hover:text-blue-600" title={t('editBooking')}><EditIcon className="w-5 h-5"/></button>
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
                <HotelBookingDetailsModal
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

export default DomesticHotelsAdminPage;