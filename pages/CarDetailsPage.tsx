

import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_CARS } from '../constants';
import { BookingContext } from '../contexts/BookingContext';
import { UsersIcon, CogIcon, FuelIcon, ArrowLeftIcon, ChevronRightIcon } from '../assets/icons';

const SpecDetail = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex flex-col items-center text-center p-2 rounded-lg bg-slate-50">
        <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center border border-cyan-200 mb-1.5">
            {icon}
        </div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-semibold text-slate-700 text-sm">{value}</p>
    </div>
);

const CarDetailsPage = () => {
    const { carId } = useParams();
    const navigate = useNavigate();
    const { t, language, localizeDigits, isRtl } = useTranslation();
    const bookingContext = useContext(BookingContext);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    const car = MOCK_CARS.find(c => c.id === parseInt(carId || ''));

    if (!car) {
        return <div>Car not found</div>;
    }

    const images = car.images || [car.image];
    
    if (!bookingContext) {
        return null;
    }

    const { selectCar } = bookingContext;

    const handleSelect = () => {
        selectCar(car);
        navigate('/passenger-details');
    };

    const nextImage = () => {
        setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setActiveImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('carDetails')} />
            <main className="pb-28">
                <div className="relative w-full h-56 bg-gray-200">
                    <img src={images[activeImageIndex]} alt={t(car.nameKey)} className="w-full h-full object-cover"/>
                     <button onClick={prevImage} className={`absolute top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 text-white hover:bg-black/60 ${isRtl ? 'right-2' : 'left-2'}`}>
                        {isRtl ? <ChevronRightIcon className="w-6 h-6" /> : <ArrowLeftIcon className="w-6 h-6" />}
                    </button>
                    <button onClick={nextImage} className={`absolute top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 text-white hover:bg-black/60 ${isRtl ? 'left-2' : 'right-2'}`}>
                        {isRtl ? <ArrowLeftIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />}
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, index) => (
                            <div key={index} className={`w-2 h-2 rounded-full ${index === activeImageIndex ? 'bg-white' : 'bg-white/50'}`}></div>
                        ))}
                    </div>
                </div>
                
                <div className="p-4 space-y-4">
                    <div className="bg-white rounded-2xl shadow-md border p-4">
                        <h1 className="text-xl font-extrabold text-slate-800">{t(car.nameKey)} <span className="text-base font-normal text-gray-500">{t('orSimilar')}</span></h1>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            <SpecDetail icon={<UsersIcon className="w-6 h-6 text-sky-900" />} label={t('seats')} value={localizeDigits(car.seats)} />
                            <SpecDetail icon={<CogIcon className="w-6 h-6 text-sky-900" />} label={t('transmission')} value={t(car.transmission)} />
                            <SpecDetail icon={<FuelIcon className="w-6 h-6 text-sky-900" />} label={t('fuelType')} value={t(car.fuelType)} />
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-md border">
                        <div className="flex border-b">
                            <button onClick={() => setActiveTab('overview')} className={`flex-1 p-3 font-semibold ${activeTab === 'overview' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500'}`}>{t('overview')}</button>
                            <button onClick={() => setActiveTab('specifications')} className={`flex-1 p-3 font-semibold ${activeTab === 'specifications' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500'}`}>{t('specifications')}</button>
                            <button onClick={() => setActiveTab('rentalInfo')} className={`flex-1 p-3 font-semibold ${activeTab === 'rentalInfo' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500'}`}>{t('rentalInfo')}</button>
                        </div>
                        <div className="p-4 text-sm text-gray-600 leading-relaxed">
                            {activeTab === 'overview' && <p>{car.description}</p>}
                            {activeTab === 'specifications' && <p>{t('detailedSpecificationsPlaceholder')}</p>}
                            {activeTab === 'rentalInfo' && <p>{t('rentalInfoPlaceholder')}</p>}
                        </div>
                    </div>
                </div>
            </main>
            <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="p-4 flex justify-between items-center">
                    <div>
                        <p className="text-xl font-bold text-slate-800">
                            {car.pricePerDay.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
                            <span className="text-sm font-normal ms-1">{t('rial')}</span>
                        </p>
                        <p className="text-sm text-gray-500 -mt-1">{t('perDay')}</p>
                    </div>
                    <button onClick={handleSelect} className="bg-sky-900 text-white py-3 px-8 rounded-lg font-bold hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-md shadow-sky-900/30">
                        {t('bookNow')}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default CarDetailsPage;