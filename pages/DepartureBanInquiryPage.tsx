
import React, { useState } from 'react';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { UserIcon, SearchIcon, CheckCircleIcon, XCircleIcon, SpinnerIcon } from '../assets/icons';

type InquiryStatus = 'idle' | 'loading' | 'banned' | 'not_banned' | 'error';

const DepartureBanInquiryPage = () => {
    const { t } = useTranslation();
    const [nationalId, setNationalId] = useState('');
    const [status, setStatus] = useState<InquiryStatus>('idle');

    const handleInquiry = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            if (nationalId === '1111111111') {
                setStatus('banned');
            } else if (nationalId === '2222222222') {
                 setStatus('error');
            } else {
                setStatus('not_banned');
            }
        }, 1500);
    };

    const renderResult = () => {
        switch (status) {
            case 'loading':
                return (
                    <div className="text-center p-6 flex flex-col items-center">
                        <SpinnerIcon className="w-12 h-12 text-cyan-500 animate-spin" />
                        <p className="mt-4 font-semibold text-slate-600">{t('checkingStatus')}</p>
                    </div>
                );
            case 'banned':
                return (
                    <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
                        <XCircleIcon className="w-16 h-16 text-red-500 mx-auto" />
                        <h3 className="mt-4 text-xl font-bold text-red-800">{t('departureBanActive')}</h3>
                        <p className="mt-2 text-red-700">{t('departureBanMessage')}</p>
                    </div>
                );
            case 'not_banned':
                return (
                    <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                        <h3 className="mt-4 text-xl font-bold text-green-800">{t('noDepartureBan')}</h3>
                        <p className="mt-2 text-green-700">{t('noDepartureBanMessage')}</p>
                    </div>
                );
            case 'error':
                 return (
                    <div className="text-center p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="mt-2 text-yellow-700">{t('inquiryError')}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('departureBanInquiry')} />
            <main className="p-4 space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <p className="text-center text-gray-600 mb-6">{t('enterNationalIdForBanInquiry')}</p>
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
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-sky-900 text-white p-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-lg shadow-sky-900/30 disabled:bg-gray-400 disabled:cursor-wait"
                        >
                            {status === 'loading' ? t('inquiring') : t('inquiry')}
                        </button>
                    </form>
                </div>

                {status !== 'idle' && (
                    <div className="animate-fade-in-down">
                        {renderResult()}
                    </div>
                )}
            </main>
        </div>
    );
};

export default DepartureBanInquiryPage;
