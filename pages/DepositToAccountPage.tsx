import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import BookingHeader from '../components/BookingHeader';
import Stepper from '../components/Stepper';
import PaymentOption from '../components/PaymentOption';
import { CurrencyDeposit } from '../types';
import { CheckCircleIcon, PrinterIcon, GlobeIcon, HashIcon, BuildingIcon, UserCircleIcon, WalletIcon, CreditCardIcon, LandmarkIcon } from '../assets/icons';
import { RIAL_RATES_PER_CURRENCY } from '../constants';

const DepositToAccountPage: React.FC = () => {
    const { t, localizeDigits } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);
    
    const [step, setStep] = useState(1);
    const [depositData, setDepositData] = useState<Omit<CurrencyDeposit, 'transactionId'>>({
        amountToman: 10000000,
        destinationCountry: 'germany',
        recipientFullName: '',
        recipientAddress: '',
        iban: '',
        swiftBic: '',
        bankName: ''
    });
    const [selectedMethod, setSelectedMethod] = useState('bank');

    const EXCHANGE_RATES_TO_FOREIGN = {
        germany: { to: 'EUR', rateKey: 'EUR' },
        france: { to: 'EUR', rateKey: 'EUR' },
        uk: { to: 'GBP', rateKey: 'GBP' }
    };

    if (!bookingContext) return null;
    const { updateCurrencyDeposit, currencyDeposit } = bookingContext;

    const handleDataChange = (field: keyof typeof depositData, value: string | number) => {
        setDepositData(prev => ({ ...prev, [field]: value }));
    };

    const handleConfirmDeposit = () => {
        const transactionId = `PG-DEP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        updateCurrencyDeposit({
            ...depositData,
            transactionId
        });
        setStep(3);
    };
    
    const steps = ['stepTransferDetails', 'stepRecipientInfo', 'stepConfirmDeposit'];

    const renderStepContent = () => {
        const countryKey = depositData.destinationCountry as keyof typeof EXCHANGE_RATES_TO_FOREIGN;
        const exchangeInfo = EXCHANGE_RATES_TO_FOREIGN[countryKey];
        const rateInRial = RIAL_RATES_PER_CURRENCY[exchangeInfo.rateKey];
        const amountInRial = depositData.amountToman * 10;
        const recipientAmount = amountInRial / rateInRial;
        const payableAmount = amountInRial;

        switch(step) {
            case 1:
                return (
                    <div className="bg-white rounded-2xl shadow-md border p-4 space-y-4 animate-fade-in-down">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('amountToDepositToman')}</label>
                            <input type="number" value={depositData.amountToman} onChange={e => handleDataChange('amountToman', Number(e.target.value))} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('destinationCountry')}</label>
                            <div className="relative">
                                <GlobeIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <select value={depositData.destinationCountry} onChange={e => handleDataChange('destinationCountry', e.target.value)} required className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none appearance-none">
                                    <option value="germany">{t('germany')}</option>
                                    <option value="france">{t('france')}</option>
                                    <option value="uk">{t('uk')}</option>
                                </select>
                            </div>
                        </div>
                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-gray-600">{t('recipientGets')}</span><span className="font-semibold text-green-600">~ {localizeDigits(recipientAmount.toFixed(2))} {exchangeInfo.to}</span></div>
                            <div className="flex justify-between text-lg font-bold"><span className="text-slate-800">{t('payableAmount')}</span><span className="text-sky-900">{localizeDigits(payableAmount.toLocaleString())} {t('rial')}</span></div>
                        </div>
                        <button onClick={() => setStep(2)} className="w-full bg-sky-900 text-white py-3 mt-2 rounded-xl font-bold text-lg hover:bg-sky-800 transition-colors">{t('nextStep')}</button>
                    </div>
                );
            case 2:
                return (
                    <div className="bg-white rounded-2xl shadow-md border p-4 space-y-4 animate-fade-in-down">
                        <h3 className="text-lg font-bold text-slate-800">{t('recipientInfo')}</h3>
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('recipientFullName')}</label>
                            <div className="relative">
                                <UserCircleIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <input type="text" value={depositData.recipientFullName} onChange={e => handleDataChange('recipientFullName', e.target.value)} required className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 pt-2">{t('bankDetails')}</h3>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('iban')}</label>
                            <div className="relative">
                                <HashIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <input type="text" value={depositData.iban} onChange={e => handleDataChange('iban', e.target.value)} required className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('swiftBic')}</label>
                            <div className="relative">
                                <HashIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <input type="text" value={depositData.swiftBic} onChange={e => handleDataChange('swiftBic', e.target.value)} required className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('bankName')}</label>
                            <div className="relative">
                                <BuildingIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <input type="text" value={depositData.bankName} onChange={e => handleDataChange('bankName', e.target.value)} required className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                        </div>
                        <div className="border-t pt-4 mt-4">
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
                        <div className="flex gap-4 mt-2">
                            <button onClick={() => setStep(1)} className="w-full bg-gray-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors">{t('previousStep')}</button>
                            <button onClick={handleConfirmDeposit} className="w-full bg-sky-900 text-white py-3 rounded-xl font-bold hover:bg-sky-800 transition-colors">{t('confirmAndPay')}</button>
                        </div>
                    </div>
                );
            case 3:
                if (!currencyDeposit) return null;
                return (
                     <div className="text-center p-4 animate-fade-in-down">
                        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-800">{t('depositSuccess')}</h2>
                        <p className="text-gray-600 mt-2 mb-6">{t('depositSuccessMsg')}</p>
                        <div className="bg-white rounded-2xl shadow-md border p-4 mt-6 text-start space-y-3">
                            <h3 className="text-lg font-bold text-slate-800 text-center mb-2">{t('reviewDepositDetails')}</h3>
                            <div className="flex justify-between"><span className="text-gray-600">{t('amount')}</span><span className="font-semibold text-slate-700">{localizeDigits(currencyDeposit.amountToman.toLocaleString())} {t('toman')}</span></div>
                             <div className="flex justify-between"><span className="text-gray-600">{t('recipientFullName')}</span><span className="font-semibold text-slate-700">{currencyDeposit.recipientFullName}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">{t('bankName')}</span><span className="font-semibold text-slate-700">{currencyDeposit.bankName}</span></div>
                            <div className="flex justify-between items-center bg-cyan-50 p-2 rounded-lg"><span className="text-cyan-800">{t('transactionId')}</span><span className="font-mono text-cyan-800 font-bold tracking-widest">{currencyDeposit.transactionId}</span></div>
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
                )
            default: return null;
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('depositToAccountTitle')} />
            <main className="px-4 pb-4">
                <Stepper steps={steps} currentStep={step} />
                <div className="mt-6">
                    {renderStepContent()}
                </div>
            </main>
        </div>
    );
};

export default DepositToAccountPage;