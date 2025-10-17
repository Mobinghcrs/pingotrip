import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import BookingHeader from '../components/BookingHeader';
import Stepper from '../components/Stepper';
import PaymentOption from '../components/PaymentOption';
import { CurrencyDelivery } from '../types';
import { CheckCircleIcon, GlobeIcon, MapPinIcon, DollarSignIcon, BuildingIcon, PrinterIcon, UploadCloudIcon, CameraIcon, WalletIcon, CreditCardIcon, LandmarkIcon } from '../assets/icons';
import { RIAL_RATES_PER_CURRENCY, MOCK_DELIVERY_COUNTRIES, AVAILABLE_CURRENCIES_BY_COUNTRY } from '../constants';

const FileUploadButton = ({ label, onUpload, isUploaded }: { label: string, onUpload: () => void, isUploaded: boolean }) => {
    const { t } = useTranslation();
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
            <button
                type="button"
                onClick={onUpload}
                className={`w-full p-3 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    isUploaded
                        ? 'border-green-400 bg-green-50 text-green-700'
                        : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-500'
                }`}
            >
                {isUploaded ? <CheckCircleIcon className="w-5 h-5" /> : <UploadCloudIcon className="w-5 h-5" />}
                <span className="font-semibold">{isUploaded ? t('imageUploaded') : t('uploadImage')}</span>
            </button>
        </div>
    );
};

const CurrencyDeliveryPage: React.FC = () => {
    const { t, localizeDigits } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);
    
    const [step, setStep] = useState(1);
    const [deliveryData, setDeliveryData] = useState<Omit<CurrencyDelivery, 'transactionId'>>({
        destinationCountry: 'turkey',
        destinationCity: 'استانبول',
        selectedCurrency: 'TRY',
        amountForeign: 10000,
        destinationAddress: 'میدان تکسیم، خیابان استقلال، پلاک ۱',
        nationalIdImage: '',
        recipientPhoto: ''
    });
    const [selectedMethod, setSelectedMethod] = useState('bank');

    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        const available = AVAILABLE_CURRENCIES_BY_COUNTRY[deliveryData.destinationCountry];
        if (!available.includes(deliveryData.selectedCurrency)) {
            handleDataChange('selectedCurrency', available[0]);
        }
    }, [deliveryData.destinationCountry]);


    if (!bookingContext) return null;
    const { updateCurrencyDelivery, currencyDelivery } = bookingContext;

    const handleDataChange = (field: keyof typeof deliveryData, value: string | number) => {
        setDeliveryData(prev => ({ ...prev, [field]: value as any }));
    };

    const handlePayment = () => {
        const transactionId = `PG-DEL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        updateCurrencyDelivery({
            ...deliveryData,
            transactionId
        });
        // Simulate payment success
        setTimeout(() => {
            setStep(3);
        }, 1500);
    };

    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsCameraOpen(true);
        } catch (err) {
            console.error("Error accessing camera: ", err);
            alert("Could not access the camera. Please check permissions.");
        }
    };

    const closeCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        setIsCameraOpen(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUrl = canvas.toDataURL('image/jpeg');
                handleDataChange('recipientPhoto', dataUrl);
                closeCamera();
            }
        }
    };

    const steps = ['stepRequestDetails', 'stepReviewAndPay', 'stepConfirmation'];

    const DetailRow = ({ label, value }: { label: string, value: string }) => (
        <div className="flex justify-between py-2.5 border-b border-dashed">
            <span className="text-gray-600 text-sm">{label}</span>
            <span className="font-semibold text-slate-700 text-sm text-end">{value}</span>
        </div>
    );

    const CameraModal = () => (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4">
            <video ref={videoRef} autoPlay playsInline className="w-full max-w-md rounded-lg mb-4 h-auto aspect-video object-cover"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <div className="flex gap-4">
                <button onClick={capturePhoto} className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg">{t('takePhoto')}</button>
                <button onClick={closeCamera} className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg">{t('close')}</button>
            </div>
        </div>
    );

    const renderStepContent = () => {
        const currencyKey = deliveryData.selectedCurrency;
        const rateInRial = RIAL_RATES_PER_CURRENCY[currencyKey];
        const payableInRial = deliveryData.amountForeign * rateInRial;
        const payableInToman = payableInRial / 10;
        const availableCurrencies = AVAILABLE_CURRENCIES_BY_COUNTRY[deliveryData.destinationCountry];

        switch(step) {
            case 1:
                return (
                    <div className="bg-white rounded-2xl shadow-md border p-4 space-y-4 animate-fade-in-down">
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('destinationCountry')}</label>
                            <div className="relative">
                                <GlobeIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <select value={deliveryData.destinationCountry} onChange={e => handleDataChange('destinationCountry', e.target.value)} required className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none appearance-none">
                                    {MOCK_DELIVERY_COUNTRIES.map(c => <option key={c.id} value={c.id}>{t(c.nameKey)}</option>)}
                                </select>
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('destinationCity')}</label>
                            <div className="relative">
                                <BuildingIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                <input type="text" value={deliveryData.destinationCity} onChange={e => handleDataChange('destinationCity', e.target.value)} required className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('selectCurrency')}</label>
                                <div className="relative">
                                    <DollarSignIcon className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                                    <select value={deliveryData.selectedCurrency} onChange={e => handleDataChange('selectedCurrency', e.target.value)} required className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none appearance-none">
                                        {availableCurrencies.map(c => <option key={c} value={c}>{t(c.toLowerCase())}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('amount')}</label>
                                <input type="number" value={deliveryData.amountForeign} onChange={e => handleDataChange('amountForeign', Number(e.target.value))} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('destinationAddress')}</label>
                             <div className="relative">
                                <MapPinIcon className="absolute top-4 start-3 w-5 h-5 text-gray-400" />
                                <textarea value={deliveryData.destinationAddress} onChange={e => handleDataChange('destinationAddress', e.target.value)} required rows={3} className="w-full p-3 ps-10 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                        </div>
                        <FileUploadButton
                            label={t('nationalIdImage')}
                            isUploaded={!!deliveryData.nationalIdImage}
                            onUpload={() => handleDataChange('nationalIdImage', 'uploaded_placeholder.jpg')}
                        />
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('recipientPhoto')}</label>
                            {!deliveryData.recipientPhoto ? (
                                <button type="button" onClick={openCamera} className="w-full p-3 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 transition-colors border-gray-300 bg-white hover:bg-gray-50 text-gray-500">
                                    <CameraIcon className="w-5 h-5" />
                                    <span className="font-semibold">{t('takePhoto')}</span>
                                </button>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <img src={deliveryData.recipientPhoto} alt="Recipient" className="w-24 h-24 rounded-lg object-cover border-2 border-green-400" />
                                    <button type="button" onClick={openCamera} className="bg-gray-100 text-slate-600 py-2 px-4 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
                                        {t('retakePhoto')}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="border-t pt-4">
                             <div className="flex justify-between text-lg font-bold"><span className="text-slate-800">{t('payableInToman')}</span><span className="text-sky-900">~ {localizeDigits(payableInToman.toLocaleString())}</span></div>
                        </div>
                        <button onClick={() => setStep(2)} className="w-full bg-sky-900 text-white py-3 mt-2 rounded-xl font-bold text-lg hover:bg-sky-800 transition-colors">{t('reviewRequest')}</button>
                    </div>
                );
            case 2:
                return (
                    <div className="bg-white rounded-2xl shadow-md border p-4 space-y-4 animate-fade-in-down">
                        <h3 className="text-xl font-extrabold text-slate-800 text-center">{t('reviewRequest')}</h3>
                        <DetailRow label={t('destinationCountry')} value={t(deliveryData.destinationCountry)} />
                        <DetailRow label={t('destinationCity')} value={deliveryData.destinationCity} />
                        <DetailRow label={t('amount')} value={`${localizeDigits(deliveryData.amountForeign.toLocaleString())} ${deliveryData.selectedCurrency}`} />
                        <DetailRow label={t('destinationAddress')} value={deliveryData.destinationAddress} />
                        <DetailRow label={t('nationalIdImage')} value={t('imageUploaded')} />
                        <DetailRow label={t('recipientPhoto')} value={t('photoCaptured')} />
                        
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
                                {localizeDigits(payableInToman.toLocaleString())} {t('toman')}
                            </span>
                        </div>

                        <button onClick={handlePayment} className="w-full bg-green-600 text-white py-3.5 mt-2 rounded-xl font-bold text-lg shadow-lg shadow-green-600/40 hover:bg-green-700 transition-all duration-200 active:scale-95">
                           {t('confirmAndPay')}
                        </button>
                        <button onClick={() => setStep(1)} className="w-full bg-gray-100 text-slate-600 py-3 rounded-xl font-bold text-base hover:bg-gray-200 transition-colors">
                           {t('previousStep')}
                        </button>
                    </div>
                );
            case 3:
                if (!currencyDelivery) return null;
                const finalPayableInToman = (currencyDelivery.amountForeign * RIAL_RATES_PER_CURRENCY[currencyDelivery.selectedCurrency]) / 10;
                return (
                     <div className="text-center p-4 animate-fade-in-down">
                        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-800">{t('paymentSuccessful')}</h2>
                        <p className="text-gray-600 mt-2 mb-6">{t('deliverySuccessDesc')}</p>
                        <div className="bg-white rounded-2xl shadow-md border p-4 mt-6 text-start space-y-3">
                            <h3 className="text-lg font-bold text-slate-800 text-center mb-2">{t('purchaseDetails')}</h3>
                            <DetailRow label={t('destination')} value={`${currencyDelivery.destinationCity}, ${t(currencyDelivery.destinationCountry)}`} />
                            <DetailRow label={t('amount')} value={`${localizeDigits(currencyDelivery.amountForeign.toLocaleString())} ${currencyDelivery.selectedCurrency}`} />
                            <DetailRow label={t('payableInToman')} value={localizeDigits(finalPayableInToman.toLocaleString())} />
                            <div className="flex justify-between items-center bg-cyan-50 p-2 rounded-lg"><span className="text-cyan-800">{t('transactionId')}</span><span className="font-mono text-cyan-800 font-bold tracking-widest">{currencyDelivery.transactionId}</span></div>
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
            <BookingHeader title={t('currencyDeliveryPageTitle')} />
            <main className="px-4 pb-4">
                {isCameraOpen && <CameraModal />}
                <Stepper steps={steps} currentStep={step} />
                <div className="mt-6">
                    {renderStepContent()}
                </div>
            </main>
        </div>
    );
};

export default CurrencyDeliveryPage;