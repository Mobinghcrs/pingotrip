import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ZhavContext } from '../contexts/ZhavContext';
import { ArrowLeftIcon, Trash2Icon } from '../assets/icons';
import BookingHeader from '../components/BookingHeader';

const ZhavCartPage = () => {
    const { t, localizeDigits, isRtl } = useTranslation();
    const navigate = useNavigate();
    const zhavContext = useContext(ZhavContext);
    if (!zhavContext) return null;
    
    const { cart, removeFromCart } = zhavContext;
    
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const shipping = 0; // Assuming free shipping for luxury items
    const total = subtotal + shipping;

    return (
        <div className="bg-slate-50 text-slate-800 min-h-screen">
            <BookingHeader title={t('shoppingCart')} />

            <main className="p-4 pb-40">
                {cart.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-lg text-gray-500">{t('cartIsEmpty')}</p>
                        <Link to="/zhav-gold-gallery" className="mt-4 inline-block bg-sky-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-800 transition-colors">
                            {t('browseProducts')}
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="space-y-3">
                            {cart.map(item => (
                                <div key={item.id} className="bg-white rounded-xl p-3 flex items-center gap-4 shadow-sm border">
                                    <img src={item.image} alt={t(item.nameKey)} className="w-20 h-20 rounded-lg object-cover" />
                                    <div className="flex-grow">
                                        <p className="font-bold text-slate-800">{t(item.nameKey)}</p>
                                        <p className="text-md text-cyan-600 font-bold mt-1">{localizeDigits(item.price.toLocaleString())} {t('toman')}</p>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <Trash2Icon className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-3">
                            <h2 className="text-lg font-bold text-slate-800 mb-2">{t('orderSummary')}</h2>
                            <div className="flex justify-between text-slate-600"><p>{t('subtotal')}</p><p>{localizeDigits(subtotal.toLocaleString())} {t('toman')}</p></div>
                            <div className="flex justify-between text-slate-600"><p>{t('shipping')}</p><p>{t('free')}</p></div>
                            <div className="border-t border-gray-200 my-2"></div>
                            <div className="flex justify-between font-bold text-slate-800 text-lg"><p>{t('totalPrice')}</p><p>{localizeDigits(total.toLocaleString())} {t('toman')}</p></div>
                        </div>
                    </div>
                )}
            </main>
            
            {cart.length > 0 && (
                <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border-t p-3">
                    <button 
                        onClick={() => navigate('/zhav-gold-gallery/checkout')}
                        className="w-full bg-sky-900 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-sky-800 transition-colors shadow-lg shadow-sky-900/30"
                    >
                        {t('proceedToCheckout')}
                    </button>
                </footer>
            )}
        </div>
    );
};

export default ZhavCartPage;