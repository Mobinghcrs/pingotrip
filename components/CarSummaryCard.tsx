import React from 'react';
import { Car } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface CarSummaryCardProps {
    car: Car;
}

const CarSummaryCard: React.FC<CarSummaryCardProps> = ({ car }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-2xl shadow-md border p-4">
            <div className="flex items-center gap-4">
                <img src={car.image} alt={t(car.nameKey)} className="w-24 h-24 object-cover rounded-lg" />
                <div>
                    <p className="font-bold text-lg text-slate-800">{t(car.nameKey)}</p>
                    <p className="text-sm text-gray-500 mt-1">{t('carRental')}</p>
                    <p className="text-xs text-gray-500 mt-2">{t('pickupDate')}: ۱۴۰۳/۱۰/۰۵</p>
                    <p className="text-xs text-gray-500">{t('returnDate')}: ۱۴۰۳/۱۰/۰۸</p>
                </div>
            </div>
        </div>
    );
};

export default CarSummaryCard;