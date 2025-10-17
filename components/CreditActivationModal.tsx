import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
// FIX: Add CheckIcon to imports
import { XIcon, SpinnerIcon, CheckCircleIcon, CreditCardIcon, CheckIcon } from '../assets/icons';

interface CreditActivationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalStepper = ({ steps, currentStep }: { steps: string[], currentStep: number }) => {
    return (
        <div className="flex items-center mb-6">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold ${currentStep > index ? 'bg-cyan-500 border-cyan-500 text-white' : 'border-gray-300 text-gray-500'}`}>
                           {currentStep > index ? <CheckIcon className="w-5 h-5" /> : index + 1}
                        </div>
                        <p className={`text-xs mt-1 text-center ${currentStep >= index + 1 ? 'text-cyan-600 font-semibold' : 'text-gray-500'}`}>{step}</p>
                    </div>
                    {index < steps.length - 1 && <div className={`flex-grow h-0.5 mx-2 ${currentStep > index + 1 ? 'bg-cyan-500' : 'bg-gray-300'}`}></div>}
                </React.Fragment>
            ))}
        </div>
    );
}

const CreditActivationModal: React.FC<CreditActivationModalProps> = ({ isOpen, onClose }) => {
    const { t, localizeDigits } = useTranslation();
    const [step, setStep] = useState(1);
    const [nationalId, setNationalId] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [countdown, setCountdown] = useState(0);

    const STEPS = [t('stepPersonalInfo'), t('stepVerification'), t('stepCreditCheck'), t('stepCompleted')];

    useEffect(() => {
        if (!isOpen) {
            // Reset state when modal is closed
            setTimeout(() => {
                setStep(1);
                setNationalId('');
                setVerificationCode('');
            }, 300); // Delay to allow for closing animation
        }
    }, [isOpen]);

    // FIX: Remove NodeJS.Timeout and refactor useEffect for better safety and correctness in browser environments.
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);
    
    const startResendTimer = () => setCountdown(60);

    const handleNext = () => setStep(s => s + 1);

    const handleSendCode = (e: React.FormEvent) => {
        e.preventDefault();
        startResendTimer();
        handleNext();
    }
    
    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate verification
        handleNext();
    }
    
    const renderContent = () => {
        switch (step) {
            case 1:
                return (
                    <form onSubmit={handleSendCode} className="space-y-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1">{t('firstName')}</label>
                            <input type="text" id="firstName" required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-1">{t('lastName')}</label>
                            <input type="text" id="lastName" required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        </div>
                        <div>
                            <label htmlFor="nationalId" className="block text-sm font-semibold text-gray-700 mb-1">{t('nationalId')}</label>
                            <input type="text" id="nationalId" value={nationalId} onChange={e => setNationalId(e.target.value)} required pattern="\d{10}" title={t('nationalIdHint')} className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        </div>
                        <button type="submit" className="w-full bg-sky-900 text-white py-3 rounded-xl font-bold text-lg hover:bg-sky-800 transition-colors">{t('sendVerificationCode')}</button>
                    </form>
                );
            case 2:
                 return (
                    <form onSubmit={handleVerify} className="space-y-4 text-center">
                        <p className="text-sm text-gray-600">{t('enterVerificationCodeMsg').replace('{mobile}', localizeDigits('0912***6789'))}</p>
                        <input type="text" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} required maxLength={5} className="w-full p-3 text-center tracking-[1em] font-mono text-2xl border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        <div className="text-sm">
                            {countdown > 0 ? (
                                <p className="text-gray-500">{t('resendCodeIn').replace('{seconds}', localizeDigits(countdown))}</p>
                            ) : (
                                <button type="button" onClick={startResendTimer} className="text-cyan-600 font-semibold hover:underline">{t('resendCode')}</button>
                            )}
                        </div>
                        <button type="submit" className="w-full bg-sky-900 text-white py-3 rounded-xl font-bold text-lg hover:bg-sky-800 transition-colors">{t('verifyAndContinue')}</button>
                    </form>
                );
            case 3:
                return <CreditCheckStep onComplete={handleNext} />;
            case 4:
                return (
                    <div className="text-center">
                        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-slate-800">{t('creditApproved')}</h3>
                        <p className="text-gray-600 mt-2">{t('congratulations')}</p>
                        <div className="my-6 bg-cyan-50 border-2 border-dashed border-cyan-200 rounded-xl p-4">
                            <p className="text-sm font-semibold text-cyan-800">{t('yourCreditLimit')}</p>
                            <p className="text-3xl font-extrabold text-sky-900">{localizeDigits('5,000,000')} {t('toman')}</p>
                        </div>
                        <button onClick={onClose} className="w-full bg-sky-900 text-white py-3 rounded-xl font-bold text-lg hover:bg-sky-800 transition-colors">{t('startShopping')}</button>
                    </div>
                );
            default: return null;
        }
    };
    

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center" 
            onClick={onClose}
        >
            <div 
                className="bg-slate-50 rounded-t-3xl shadow-xl w-full max-w-md p-6 relative animate-fade-in-down"
                style={{ animationDuration: '0.3s' }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 end-4 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1">
                    <XIcon className="w-5 h-5" />
                </button>
                
                <h2 className="text-xl font-bold text-slate-800 mb-4">{t('activatePingoCreditTitle')}</h2>
                <ModalStepper steps={STEPS} currentStep={step} />
                {renderContent()}
            </div>
        </div>
    );
};

const CreditCheckStep = ({ onComplete }: { onComplete: () => void}) => {
    const { t } = useTranslation();
    const [message, setMessage] = useState(t('checkingCredit'));

    useEffect(() => {
        const timer1 = setTimeout(() => setMessage(t('verifyingWithBank')), 1500);
        const timer2 = setTimeout(() => setMessage(t('calculatingLimit')), 3000);
        const timer3 = setTimeout(onComplete, 4500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        }
    }, [onComplete, t]);

    return (
        <div className="text-center py-8 space-y-4">
            <SpinnerIcon className="w-12 h-12 text-cyan-500 mx-auto animate-spin" />
            <p className="font-semibold text-slate-600 transition-opacity duration-300">{message}</p>
        </div>
    )
}

export default CreditActivationModal;