import React, { useState } from 'react';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { SearchIcon, ChevronDownIcon, MessageSquareIcon } from '../assets/icons';

const FAQ_DATA = {
    bookingAndPayment: ['faq1_q', 'faq3_q'],
    accountAndProfile: ['faq2_q'],
};

// FIX: Define props for the `FAQItem` component using an interface and `React.FC` to resolve a TypeScript error related to the `key` prop used in list rendering.
interface FAQItemProps {
    questionKey: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ questionKey }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    // Derive answer key from question key, e.g., 'faq1_q' -> 'faq1_a'
    const answerKey = questionKey.replace('_q', '_a');

    return (
        <div className="border-b dark:border-slate-700 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-start p-4"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-slate-800 dark:text-slate-100">{t(questionKey)}</span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="px-4 pb-4 text-slate-600 dark:text-slate-300 animate-fade-in-down" style={{animationDuration: '0.3s'}}>
                    <p>{t(answerKey)}</p>
                </div>
            )}
        </div>
    );
};

const HelpCenterPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <BookingHeader title={t('helpCenter')} />
            <main className="p-4 space-y-8">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t('searchHelpTopics')}
                        className="w-full py-4 ps-12 pe-4 bg-white dark:bg-slate-800 rounded-xl shadow-md border dark:border-slate-700 focus:ring-2 focus:ring-cyan-400 outline-none text-lg"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                        <SearchIcon className="w-6 h-6 text-gray-400" />
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 p-4 border-b dark:border-slate-700">{t('faq')}</h2>
                    <div>
                        <div className="p-2 bg-slate-50 dark:bg-slate-700/50">
                            <h3 className="font-bold text-cyan-800 dark:text-cyan-400 px-2">{t('bookingAndPayment')}</h3>
                        </div>
                        {FAQ_DATA.bookingAndPayment.map(qKey => <FAQItem key={qKey} questionKey={qKey} />)}

                        <div className="p-2 bg-slate-50 dark:bg-slate-700/50 mt-2">
                            <h3 className="font-bold text-cyan-800 dark:text-cyan-400 px-2">{t('accountAndProfile')}</h3>
                        </div>
                        {FAQ_DATA.accountAndProfile.map(qKey => <FAQItem key={qKey} questionKey={qKey} />)}
                    </div>
                </div>

                {/* Contact Support Section */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border dark:border-slate-700 p-6 text-center">
                    <MessageSquareIcon className="w-12 h-12 text-cyan-500 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{t('cantFindAnswer')}</h3>
                    <button className="mt-4 bg-sky-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-800 transition-colors shadow-lg shadow-sky-900/30">
                        {t('contactSupport')}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default HelpCenterPage;