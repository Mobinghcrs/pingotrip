import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_ZHAV_PRODUCTS } from '../constants';
import { ZhavProduct } from '../types';
import { ShoppingCartIcon, ArrowLeftIcon, HomeIcon } from '../assets/icons';
import { ZhavContext } from '../contexts/ZhavContext';

const ZhavGoldGalleryPage = () => {
    const { t, localizeDigits, isRtl } = useTranslation();
    const navigate = useNavigate();
    const [filter, setFilter] = useState<'all' | ZhavProduct['category']>('all');
    const zhavContext = useContext(ZhavContext);

    const categories: ('all' | ZhavProduct['category'])[] = ['all', 'necklaces', 'rings', 'bracelets', 'earrings'];

    const filteredProducts = filter === 'all'
        ? MOCK_ZHAV_PRODUCTS
        : MOCK_ZHAV_PRODUCTS.filter(p => p.category === filter);

    return (
        <div className="bg-slate-50 min-h-screen">
            <header className="bg-sky-900 text-white sticky top-0 z-40 shadow-md">
                <div className="px-2 h-16 flex items-center justify-between relative">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="p-2 rounded-full hover:bg-white/10">
                            <HomeIcon className="w-6 h-6" />
                        </Link>
                        <Link to="/zhav-gold-gallery/cart" className="relative p-2 rounded-full hover:bg-white/10">
                            <ShoppingCartIcon className="w-6 h-6" />
                            {zhavContext && zhavContext.cart.length > 0 &&
                                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center border-2 border-sky-900">
                                    {localizeDigits(zhavContext.cart.length)}
                                </span>
                            }
                        </Link>
                    </div>
                    <h1 className="text-lg font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 text-center truncate">{t('zhavGoldGallery')}</h1>
                    <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10">
                        <ArrowLeftIcon className={`w-6 h-6 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </header>
            
            <main className="p-4">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800">{t('zhavGoldGallery')}</h1>
                    <p className="mt-1 text-slate-500 text-sm">{t('zhavGalleryTitle')}</p>
                </div>

                <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 -mx-4 px-4">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`py-2 px-5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 flex-shrink-0 ${
                                filter === cat
                                    ? 'bg-sky-900 text-white shadow-md shadow-sky-900/20'
                                    : 'bg-white text-slate-700 border hover:bg-gray-100'
                            }`}
                        >
                            {t(cat === 'all' ? 'allProducts' : cat)}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 animate-fade-in-down">
                    {filteredProducts.map(product => (
                        <Link key={product.id} to={`/zhav-gold-gallery/product/${product.id}`} className="block group bg-white rounded-2xl shadow-md border overflow-hidden">
                            <div className="rounded-t-2xl overflow-hidden aspect-square">
                                <img src={product.image} alt={t(product.nameKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="p-3">
                                <h3 className="font-bold text-slate-800 text-sm truncate">{t(product.nameKey)}</h3>
                                <p className="text-md text-cyan-600 font-bold mt-1">{localizeDigits(product.price.toLocaleString())} {t('toman')}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ZhavGoldGalleryPage;