import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { useTranslation } from '../hooks/useTranslation';
import BookingHeader from '../components/BookingHeader';
import Stepper from '../components/Stepper';
import { VisaApplication } from '../types';

const VisaApplicationPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const bookingContext = useContext(BookingContext);
    
    const [step, setStep] = useState(1);
    const [applicationData, setApplicationData] = useState<VisaApplication>({
        personal: { firstName: '', lastName: '', gender: 'male', dateOfBirth: '', nationality: '' },
        passport: { number: '', issueDate: '', expiryDate: '' }
    });

    useEffect(() => {
        if (!bookingContext?.selectedVisa) {
            navigate('/');
        }
    }, [bookingContext, navigate]);

    if (!bookingContext) return null;
    const { updateVisaApplication } = bookingContext;
    
    const handleNext = () => setStep(prev => prev + 1);
    const handlePrev = () => setStep(prev => prev - 1);
    
    const handlePersonalChange = (field: keyof VisaApplication['personal'], value: string) => {
        setApplicationData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
    };

    const handlePassportChange = (field: keyof VisaApplication['passport'], value: string) => {
        setApplicationData(prev => ({ ...prev, passport: { ...prev.passport, [field]: value } }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateVisaApplication(applicationData);
        navigate('/review');
    };
    
    const bookingSteps = ['application', 'reviewAndConfirm', 'payment'];

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('visaApplication')} />
            <main className="px-4 pb-24">
                <Stepper steps={bookingSteps} currentStep={1} />
                
                <form onSubmit={handleSubmit} className="mt-6">
                    {step === 1 && (
                        <div className="bg-white rounded-2xl shadow-md border p-4 space-y-4 animate-fade-in-down">
                            <h3 className="text-lg font-bold text-slate-800">{t('personalInfo')}</h3>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('firstName')}</label>
                                <input type="text" value={applicationData.personal.firstName} onChange={e => handlePersonalChange('firstName', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('lastName')}</label>
                                <input type="text" value={applicationData.personal.lastName} onChange={e => handlePersonalChange('lastName', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                             <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('gender')}</label>
                                <select value={applicationData.personal.gender} onChange={e => handlePersonalChange('gender', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none">
                                    <option value="male">{t('male')}</option>
                                    <option value="female">{t('female')}</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('dateOfBirth')}</label>
                                <input type="text" placeholder="YYYY/MM/DD" value={applicationData.personal.dateOfBirth} onChange={e => handlePersonalChange('dateOfBirth', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                             <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('nationality')}</label>
                                <input type="text" value={applicationData.personal.nationality} onChange={e => handlePersonalChange('nationality', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                            <button type="button" onClick={handleNext} className="w-full bg-sky-900 text-white py-3 mt-2 rounded-xl font-bold text-lg hover:bg-sky-800 transition-colors">
                                {t('nextStep')}
                            </button>
                        </div>
                    )}
                    
                    {step === 2 && (
                         <div className="bg-white rounded-2xl shadow-md border p-4 space-y-4 animate-fade-in-down">
                            <h3 className="text-lg font-bold text-slate-800">{t('passportInfo')}</h3>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('passportNumber')}</label>
                                <input type="text" value={applicationData.passport.number} onChange={e => handlePassportChange('number', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                             <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('issueDate')}</label>
                                <input type="text" placeholder="YYYY/MM/DD" value={applicationData.passport.issueDate} onChange={e => handlePassportChange('issueDate', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('expiryDate')}</label>
                                <input type="text" placeholder="YYYY/MM/DD" value={applicationData.passport.expiryDate} onChange={e => handlePassportChange('expiryDate', e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                            <div className="flex gap-4 mt-2">
                                <button type="button" onClick={handlePrev} className="w-full bg-gray-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors">
                                    {t('previousStep')}
                                </button>
                                <button type="submit" className="w-full bg-sky-900 text-white py-3 rounded-xl font-bold hover:bg-sky-800 transition-colors">
                                    {t('reviewApplication')}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </main>
        </div>
    );
};

export default VisaApplicationPage;