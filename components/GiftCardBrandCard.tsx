import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { GiftCardBrand } from '../types';

interface GiftCardBrandCardProps {
    brand: GiftCardBrand;
}

const GiftCardBrandCard: React.FC<GiftCardBrandCardProps> = ({ brand }) => {
    const { t } = useTranslation();
    
    return (
        <Link 
            to={`/currency-services/gift-cards/${brand.id}`} 
            className="bg-white rounded-2xl shadow-md border p-4 flex flex-col items-center justify-center text-center group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-cyan-300"
        >
            <img src={brand.image} alt={t(brand.nameKey)} className="w-20 h-20 object-contain mb-3" />
            <h3 className="font-bold text-slate-800">{t(brand.nameKey)}</h3>
        </Link>
    );
};

export default GiftCardBrandCard;