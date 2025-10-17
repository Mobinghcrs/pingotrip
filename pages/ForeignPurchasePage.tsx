import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import BookingHeader from '../components/BookingHeader';
import Stepper from '../components/Stepper';
import PaymentOption from '../components/PaymentOption';
import { ForeignPurchase } from '../types';
import { CheckCircleIcon, PrinterIcon, DollarSignIcon, UploadCloudIcon, WalletIcon, CreditCardIcon, LandmarkIcon } from '../assets/icons';
import { RIAL_RATES_PER_CURRENCY } from '../constants';

const ForeignPurchasePage: React.FC = () => {
    const { t, localizeDigits } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);
    
    const [step, setStep] = useState(1);
    const [purchaseData, setPurchaseData] = useState<Omit<ForeignPurchase, 'transactionId' | 'tomanAmount'>>({
        productUrl: 'https://www.amazon.com/example-product',
        productImage: '',
        foreignAmount: 500,
        foreignCurrency: 'USD',
    });
    const [selectedMethod, setSelectedMethod] = useState('bank');
    
    const [tomanAmount, setTomanAmount] = useState(0);

    useEffect(() => {
        const rateInRial = RIAL_RATES_PER_CURRENCY[purchaseData.foreignCurrency];
        const amountInRial = purchaseData.foreignAmount * rateInRial;
        setTomanAmount(amountInRial / 10);
    }, [purchaseData.foreignAmount, purchaseData.foreignCurrency]);

    if (!bookingContext) return null;
    const { updateForeignPurchase, foreignPurchase } = bookingContext;

    const handleDataChange = (field: keyof typeof purchaseData, value: string | number) => {
        setPurchaseData(prev => ({ ...prev, [field]: value as any }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleDataChange('productImage', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleConfirm = () => {
        const transactionId = `PG-FP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        updateForeignPurchase({
            ...purchaseData,
            tomanAmount,
            transactionId
        });
        setStep(3); // Go directly to confirmation after payment simulation
    };
    
    const steps = ['stepRequestDetails', 'stepReviewAndPay', 'stepConfirmation'];
    
    const DetailRow = ({ label, value, isLink }: { label: string, value: string, isLink?: boolean }) => (
        <div className="flex justify-between py-2.5 border-b border-dashed">
            <span className="text-gray-600 text-sm">{label}</span>
            {isLink ? 
                <a href={value} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-600 text-sm text-end truncate hover:underline">{value}</a>
                : <span className="font-semibold text-slate-700 text-sm text-end">{value}</span>
            }
        </div>
    );

    const renderStepContent = () => {
        switch(step) {
            case 1:
                return (
                    <div className="bg-white rounded-2xl shadow-md border p-4 space-y-4 animate-fade-in-down">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('productLink')}</label>
                            <input type="url" value={purchaseData.productUrl} onChange={e => handleDataChange('productUrl', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('productImage')}</label>
                            <input
                                type="file"
                                id="product-image-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <label
                                htmlFor="product-image-upload"
                                className={`w-full p-3 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                                    purchaseData.productImage
                                        ? 'border-green-400 bg-green-50 text-green-700'
                                        : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-500'
                                }`}
                            >
                                {purchaseData.productImage ? <CheckCircleIcon className="w-5 h-5" /> : <UploadCloudIcon className="w-5 h-5" />}
                                <span className="font-semibold">{purchaseData.productImage ? t('imageUploaded') : t('uploadImage')}</span>
                            </label>
                            {purchaseData.productImage && (
                                <div className="mt-2 text-center">
                                    <img src={purchaseData.productImage} alt="Product Preview" className="w-20 h-20 rounded-lg object-cover inline-block border p-1" />
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('productPrice')}</label>
                                <input type="number" value={purchaseData.foreignAmount} onChange={e => handleDataChange('foreignAmount', Number(e.target.value))} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('selectCurrency')}</label>
                                <select value={purchaseData.foreignCurrency} onChange={e => handleDataChange('foreignCurrency', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none">
                                    <option value="USD">{t('usd')}</option>
                                    <option value="EUR">{t('eur')}</option>
                                    <option value="GBP">{t('gbp')}</option>
                                </select>
                            </div>
                        </div>
                        <div className="border-t pt-4">
                             <div className="flex justify-between items-center text-lg font-bold"><span className="text-slate-800">{t('payableInToman')}</span><span className="text-sky-900 text-xl">~ {localizeDigits(tomanAmount.toLocaleString())}</span></div>
                        </div>
                        <button onClick={() => setStep(2)} className="w-full bg-sky-900 text-white py-3 mt-2 rounded-xl font-bold text-lg hover:bg-sky-800 transition-colors">{t('nextStep')}</button>
                    </div>
                );
            case 2:
                return (
                     <div className="bg-white rounded-2xl shadow-md border p-4 space-y-4 animate-fade-in-down">
                        <h3 className="text-xl font-extrabold text-slate-800 text-center">{t('reviewRequest')}</h3>
                         {purchaseData.productImage && (
                            <div className="flex justify-center py-2">
                                <img src={purchaseData.productImage} alt="Product" className="w-24 h-24 rounded-lg object-cover border-2 p-1" />
                            </div>
                        )}
                        <DetailRow label={t('productLink')} value={purchaseData.productUrl} isLink />
                        <DetailRow label={t('productPrice')} value={`${localizeDigits(purchaseData.foreignAmount.toLocaleString())} ${purchaseData.foreignCurrency}`} />
                        
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

                        <div className="flex justify-between items-center pt-3 border-t">
                            <span className="font-bold text-slate-800">{t('totalPrice')}</span>
                            <span className="font-extrabold text-xl text-sky-900">
                                {localizeDigits(tomanAmount.toLocaleString())} {t('toman')}
                            </span>
                        </div>

                        <button onClick={handleConfirm} className="w-full bg-green-600 text-white py-3.5 mt-2 rounded-xl font-bold text-lg shadow-lg shadow-green-600/40 hover:bg-green-700 transition-all duration-200 active:scale-95">
                           {t('confirmAndPay')}
                        </button>
                        <button onClick={() => setStep(1)} className="w-full bg-gray-100 text-slate-600 py-3 rounded-xl font-bold text-base hover:bg-gray-200 transition-colors">
                           {t('previousStep')}
                        </button>
                    </div>
                );
            case 3:
                if (!foreignPurchase) return null;
                return (
                     <div className="text-center p-4 animate-fade-in-down">
                        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-800">{t('paymentSuccess')}</h2>
                        <p className="text-gray-600 mt-2 mb-6">{t('purchaseSuccessMsg')}</p>
                        <div className="bg-white rounded-2xl shadow-md border p-4 mt-6 text-start space-y-3">
                            <h3 className="text-lg font-bold text-slate-800 text-center mb-2">{t('invoice')}</h3>
                             {foreignPurchase.productImage && (
                                <div className="flex justify-center py-2 border-b border-dashed">
                                    <img src={foreignPurchase.productImage} alt="Product" className="w-24 h-24 rounded-lg object-cover" />
                                </div>
                            )}
                            <DetailRow label={t('productLink')} value={foreignPurchase.productUrl} isLink />
                            <DetailRow label={t('productPrice')} value={`${localizeDigits(foreignPurchase.foreignAmount.toLocaleString())} ${foreignPurchase.foreignCurrency}`} />
                            <DetailRow label={t('payableInToman')} value={localizeDigits(foreignPurchase.tomanAmount.toLocaleString())} />
                            <div className="flex justify-between items-center bg-cyan-50 p-2 rounded-lg"><span className="text-cyan-800">{t('transactionId')}</span><span className="font-mono text-cyan-800 font-bold tracking-widest">{foreignPurchase.transactionId}</span></div>
                        </div>
                        <div className="mt-6 flex flex-col gap-3">
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
            <BookingHeader title={t('foreignPurchasePageTitle')} />
            <main className="px-4 pb-4">
                <Stepper steps={steps} currentStep={step} />
                <div className="mt-6">
                    {renderStepContent()}
                </div>
            </main>
        </div>
    );
};

export default ForeignPurchasePage;