import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import BookingHeader from '../components/BookingHeader';
import Stepper from '../components/Stepper';
import PaymentOption from '../components/PaymentOption';
import { CurrencyPurchase } from '../types';
import { MOCK_CITIES, MOCK_EXCHANGES, RIAL_RATES_PER_CURRENCY } from '../constants';
import { CheckCircleIcon, PrinterIcon, StoreIcon, ChevronDownIcon, MapPinIcon, WalletIcon, CreditCardIcon, LandmarkIcon } from '../assets/icons';

const BuyCurrencyPage: React.FC = () => {
    const { t, localizeDigits } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);
    
    const [step, setStep] = useState(1);
    const [purchaseData, setPurchaseData] = useState<Omit<CurrencyPurchase, 'transactionId'>>({
        amountToman: 5000000,
        selectedCurrency: 'EUR',
        cityId: MOCK_CITIES[0].id,
        exchangeOfficeId: ''
    });
    const [selectedMethod, setSelectedMethod] = useState('bank');

    // Reset exchange office when the selected city changes
    useEffect(() => {
        handleDataChange('exchangeOfficeId', '');
    }, [purchaseData.cityId]);

    const availableExchanges = MOCK_EXCHANGES.filter(e => e.cityId === purchaseData.cityId);
    const selectedExchange = MOCK_EXCHANGES.find(e => e.id === purchaseData.exchangeOfficeId);

    if (!bookingContext) return null;
    const { updateCurrencyPurchase, currencyPurchase } = bookingContext;

    const handleDataChange = (field: keyof typeof purchaseData, value: string | number) => {
        setPurchaseData(prev => ({ ...prev, [field]: value as any }));
    };

    const handleConfirmPurchase = () => {
        if (!purchaseData.exchangeOfficeId) return;
        const transactionId = `PG-BUY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        updateCurrencyPurchase({
            ...purchaseData,
            transactionId
        });
        setStep(2);
    };
    
    const steps = ['stepPurchaseDetails', 'stepConfirmation'];
    
    const renderStepContent = () => {
        const currencyKey = purchaseData.selectedCurrency as keyof typeof RIAL_RATES_PER_CURRENCY;
        const rateInRial = RIAL_RATES_PER_CURRENCY[currencyKey];
        const amountInRial = purchaseData.amountToman * 10;
        const receiveAmount = amountInRial / rateInRial;
        const payableAmount = amountInRial;

        switch(step) {
            case 1:
                return (
                    <div className="bg-white rounded-2xl shadow-md border p-4 space-y-4 animate-fade-in-down">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('amountToBuyToman')}</label>
                            <input type="number" value={purchaseData.amountToman} onChange={e => handleDataChange('amountToman', Number(e.target.value))} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('currencyYouReceive')}</label>
                             <select value={purchaseData.selectedCurrency} onChange={e => handleDataChange('selectedCurrency', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none">
                                <option value="EUR">{t('eur')}</option>
                                <option value="GBP">{t('gbp')}</option>
                                <option value="TRY">{t('try')}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('selectCity')}</label>
                            <select value={purchaseData.cityId} onChange={e => handleDataChange('cityId', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none">
                                {MOCK_CITIES.map(city => <option key={city.id} value={city.id}>{t(city.nameKey)}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('selectExchange')}</label>
                            <div className="relative">
                                <StoreIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400 pointer-events-none" />
                                <select value={purchaseData.exchangeOfficeId} onChange={e => handleDataChange('exchangeOfficeId', e.target.value)} required className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none appearance-none" disabled={!availableExchanges.length}>
                                    <option value="">{t('selectExchange')}</option>
                                    {availableExchanges.map(ex => <option key={ex.id} value={ex.id}>{t(ex.nameKey)}</option>)}
                                </select>
                                <div className="absolute inset-y-0 end-0 flex items-center px-3.5 pointer-events-none">
                                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {selectedExchange && (
                            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 mt-2 space-y-2 animate-fade-in-down">
                                <div>
                                    <p className="text-xs font-bold text-sky-900">{t('address')}</p>
                                    <p className="text-sm text-slate-700">{t(selectedExchange.addressKey)}</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-cyan-600 font-semibold p-2 bg-white rounded-md justify-center cursor-pointer hover:bg-gray-50">
                                    <MapPinIcon className="w-4 h-4" />
                                    <span>{t('viewOnMap')}</span>
                                </div>
                            </div>
                        )}
                        
                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-gray-600">{t('youReceive')}</span><span className="font-semibold text-green-600">~ {localizeDigits(receiveAmount.toFixed(2))} {currencyKey}</span></div>
                            <div className="flex justify-between text-lg font-bold"><span className="text-slate-800">{t('payableAmount')}</span><span className="text-sky-900">{localizeDigits(payableAmount.toLocaleString())} {t('rial')}</span></div>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="font-bold text-slate-700 mb-3">{t('paymentMethod')}</h3>
                            <div className="space-y-2">
                                <PaymentOption
                                    icon={<WalletIcon className="w-6 h-6 text-cyan-600" />}
                                    title={t('pingoWallet')}
                                    isSelected={selectedMethod === 'wallet'}
                                    onClick={() => setSelectedMethod('wallet')}
                                />
                                <PaymentOption
                                    icon={<CreditCardIcon className="w-6 h-6 text-cyan-600" />}
                                    title={t('bankGateway')}
                                    isSelected={selectedMethod === 'bank'}
                                    onClick={() => setSelectedMethod('bank')}
                                />
                                <PaymentOption
                                    icon={<LandmarkIcon className="w-6 h-6 text-cyan-600" />}
                                    title={t('pingoCredit')}
                                    isSelected={selectedMethod === 'credit'}
                                    onClick={() => setSelectedMethod('credit')}
                                />
                            </div>
                        </div>

                        <button onClick={handleConfirmPurchase} disabled={!purchaseData.exchangeOfficeId} className="w-full bg-sky-900 text-white py-3 mt-2 rounded-xl font-bold text-lg hover:bg-sky-800 transition-colors disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed">{t('confirmAndPay')}</button>
                    </div>
                );
            case 2:
                if (!currencyPurchase) return null;
                const finalExchange = MOCK_EXCHANGES.find(e => e.id === currencyPurchase.exchangeOfficeId);
                const finalAmountRial = currencyPurchase.amountToman * 10;
                const finalReceiveAmount = finalAmountRial / RIAL_RATES_PER_CURRENCY[currencyPurchase.selectedCurrency as keyof typeof RIAL_RATES_PER_CURRENCY];

                return (
                     <div className="text-center p-4 animate-fade-in-down">
                        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-800">{t('purchaseSuccessful')}</h2>
                        <p className="text-gray-600 mt-2 mb-6">{t('purchaseSuccessMsg')}</p>
                        <div className="bg-white rounded-2xl shadow-md border p-4 mt-6 text-start space-y-3">
                            <h3 className="text-lg font-bold text-slate-800 text-center mb-2">{t('purchaseDetails')}</h3>
                            <div className="flex justify-between"><span className="text-gray-600">{t('amount')}</span><span className="font-semibold text-slate-700">{localizeDigits(finalAmountRial.toLocaleString())} {t('rial')}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">{t('youReceive')}</span><span className="font-semibold text-slate-700">~ {localizeDigits(finalReceiveAmount.toFixed(2))} {currencyPurchase.selectedCurrency}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">{t('exchangeOffice')}</span><span className="font-semibold text-slate-700">{finalExchange ? t(finalExchange.nameKey) : ''}</span></div>
                            <div className="flex justify-between items-center bg-cyan-50 p-2 rounded-lg"><span className="text-cyan-800">{t('transactionId')}</span><span className="font-mono text-cyan-800 font-bold tracking-widest">{currencyPurchase.transactionId}</span></div>
                        </div>
                        <div className="mt-6 flex flex-col gap-3">
                            <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-cyan-500 text-cyan-600 font-bold py-3 px-4 rounded-lg hover:bg-cyan-50 transition-colors">
                                <PrinterIcon className="w-5 h-5"/> {t('downloadReceipt')}
                            </button>
                            <button onClick={() => navigate('/')} className="w-full bg-sky-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-800 transition-colors">
                                {t('finish')}
                            </button>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('buyCurrencyPageTitle')} />
            <main className="px-4 pb-4">
                <Stepper steps={steps} currentStep={step} />
                <div className="mt-6">
                    {renderStepContent()}
                </div>
            </main>
        </div>
    );
};

export default BuyCurrencyPage;
