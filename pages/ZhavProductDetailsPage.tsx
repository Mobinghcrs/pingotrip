import React, { useContext, useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_ZHAV_PRODUCTS } from '../constants';
import { ZhavContext } from '../contexts/ZhavContext';
import { ArrowLeftIcon, ShoppingCartIcon, CheckIcon, HomeIcon } from '../assets/icons';

const ZhavProductDetailsPage = () => {
    const { productId } = useParams<{ productId: string }>();
    const { t, localizeDigits, isRtl } = useTranslation();
    const navigate = useNavigate();
    const zhavContext = useContext(ZhavContext);
    const [added, setAdded] = useState(false);

    const product = MOCK_ZHAV_PRODUCTS.find(p => p.id === Number(productId));

    if (!product) {
        return <Navigate to="/zhav-gold-gallery" replace />;
    }
    if (!zhavContext) return null;
    
    const { addToCart, cart } = zhavContext;

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };
    
    const isItemInCart = cart.some(item => item.id === product.id);

    return (
        <div className="bg-slate-50 text-slate-800 min-h-screen">
             <header className="bg-sky-900 text-white sticky top-0 z-40 shadow-md">
                <div className="px-2 h-16 flex items-center justify-between relative">
                    <Link to="/" className="p-2 rounded-full hover:bg-white/10">
                        <HomeIcon className="w-6 h-6" />
                    </Link>
                    <h1 className="text-lg font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 text-center truncate">{t(product.nameKey)}</h1>
                    <div className="flex items-center gap-2">
                        <Link to="/zhav-gold-gallery/cart" className="relative p-2 rounded-full hover:bg-white/10">
                            <ShoppingCartIcon className="w-6 h-6" />
                            {cart.length > 0 && <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center border-2 border-sky-900">{localizeDigits(cart.length)}</span>}
                        </Link>
                        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10">
                           <ArrowLeftIcon className={`w-6 h-6 ${isRtl ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="pb-28">
                <div className="bg-gray-200">
                    <img src={product.image} alt={t(product.nameKey)} className="w-full aspect-square object-cover" />
                </div>

                <div className="p-4 space-y-4">
                    <div className="bg-white rounded-xl shadow-md border p-4">
                        <h2 className="text-2xl font-bold text-slate-800">{t(product.nameKey)}</h2>
                        <p className="text-slate-600 mt-2 text-sm">{t(product.descriptionKey)}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md border p-4">
                        <div className="grid grid-cols-3 divide-x divide-gray-200 text-center">
                            <div>
                                <p className="text-sm text-gray-500">{t('weight')}</p>
                                <p className="font-bold text-slate-800">{localizeDigits(product.weight)} {t('gram')}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t('karat')}</p>
                                <p className="font-bold text-slate-800">{localizeDigits(product.karat)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t('productCode')}</p>
                                <p className="font-bold text-slate-800">Z-{product.id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border-t p-3">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">{t('totalPrice')}</p>
                        <p className="text-xl font-bold text-sky-900">{localizeDigits(product.price.toLocaleString())} {t('toman')}</p>
                    </div>
                    <button 
                        onClick={handleAddToCart}
                        disabled={added || isItemInCart}
                        className={`px-6 py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors duration-300 w-48 shadow-lg ${
                            added || isItemInCart
                            ? 'bg-green-600 text-white shadow-green-600/30'
                            : 'bg-sky-900 text-white hover:bg-sky-800 shadow-sky-900/30'
                        }`}
                    >
                        {added || isItemInCart ? <CheckIcon className="w-6 h-6"/> : <ShoppingCartIcon className="w-6 h-6"/>}
                        {added || isItemInCart ? t('addedToCart') : t('addToCart')}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ZhavProductDetailsPage;