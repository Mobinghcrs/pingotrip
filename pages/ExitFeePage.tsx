import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { ExitFeeContext } from '../contexts/ExitFeeContext';
import { ExitFeeDetails } from '../types';
import { UserIcon, PhoneIcon, GlobeIcon, ChevronDownIcon } from '../assets/icons';

const ExitFeePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const exitFeeContext = useContext(ExitFeeContext);
    const [nationalId, setNationalId] = useState('');
    const [travelMethod, setTravelMethod] = useState<ExitFeeDetails['travelMethod']>('air');
    const [isLoading, setIsLoading] = useState(false);

    if (!exitFeeContext) return null;

    const { setFeeDetails } = exitFeeContext;

    const handleInquiry = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call to get fee details
        setTimeout(() => {
            // Mock data based on national ID or just random
            const mockDetails: ExitFeeDetails = {
                nationalId,
                fullName: 'ایوب غریباوی',
                tripType: 'first',
                travelMethod,
                feeAmount: 4000000, // in Rial
            };
            setFeeDetails(mockDetails);
            setIsLoading(false);
            navigate('/exit-fee/review');
        }, 1500);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('exitFeeInquiryTitle')} />
            <main className="p-4">
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <p className="text-center text-gray-600 mb-6">{t('enterNationalIdForFee')}</p>
                    <form onSubmit={handleInquiry} className="space-y-4">
                        <div>
                            <label htmlFor="nationalId" className="block text-sm font-semibold text-gray-700 mb-1">{t('nationalId')}</label>
                            <div className="relative">
                                <UserIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="nationalId"
                                    value={nationalId}
                                    onChange={e => setNationalId(e.target.value)}
                                    required
                                    pattern="\d{10}"
                                    title={t('nationalIdHint')}
                                    className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                                />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="travelMethod" className="block text-sm font-semibold text-gray-700 mb-1">{t('travelMethod')}</label>
                            <div className="relative">
                                <GlobeIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <select
                                    id="travelMethod"
                                    value={travelMethod}
                                    onChange={e => setTravelMethod(e.target.value as ExitFeeDetails['travelMethod'])}
                                    required
                                    className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none appearance-none"
                                >
                                    <option value="air">{t('air')}</option>
                                    <option value="land">{t('land')}</option>
                                    <option value="atabatLand">{t('atabatLand')}</option>
                                    <option value="sea">{t('sea')}</option>
                                </select>
                                <ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 end-3 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-1">{t('mobileNumberOptional')}</label>
                             <div className="relative">
                                <PhoneIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    id="mobile"
                                    className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30 disabled:bg-gray-400 disabled:cursor-wait"
                        >
                            {isLoading ? t('inquiring') : t('inquiry')}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ExitFeePage;