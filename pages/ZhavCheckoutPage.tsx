import React, { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ZhavContext } from '../contexts/ZhavContext';
import BookingHeader from '../components/BookingHeader';
import PaymentOption from '../components/PaymentOption';
import { WalletIcon, CreditCardIcon, LandmarkIcon } from '../assets/icons';

const ZhavCheckoutPage = () => {
    const { t, localizeDigits } = useTranslation();
    const navigate = useNavigate();
    const zhavContext = useContext(ZhavContext);
    const [selectedMethod, setSelectedMethod] = useState('bank');
    
    if (!zhavContext) return null;
    
    const { cart } = zhavContext;

    if (cart.length === 0) {
        return <Navigate to="/zhav-gold-gallery" replace />;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    const handleConfirmOrder = (e: React.FormEvent) => {
        e.preventDefault();
        const orderId = `ZHV-${Date.now()}`;
        navigate('/zhav-gold-gallery/confirmation', { state: { orderId, total, items: cart, paymentMethod: selectedMethod } });
    };

    return (
        <div className="bg-slate-50 text-slate-800 min-h-screen">
            <BookingHeader title={t('checkout')} />

            <main className="p-4 pb-28 space-y-4">
                <form onSubmit={handleConfirmOrder}>
                    <div className="bg-white rounded-xl shadow-md border p-4">
                        <h2 className="text-lg font-bold text-slate-800 mb-3">{t('shippingInfo')}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('fullName')}</label>
                                <input type="text" required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                             <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('shippingAddress')}</label>
                                <textarea required rows={3} className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"></textarea>
                            </div>
                             <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('phoneNumber')}</label>
                                <input type="tel" required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                            </div>
                        </div>
                    </div>
                </form>

                <div className="bg-white rounded-xl shadow-md border p-4">
                    <h2 className="text-lg font-bold text-slate-800 mb-3">{t('paymentMethod')}</h2>
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
            </main>
            
            <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border-t p-3">
                 <div className="flex justify-between items-center px-1 mb-2">
                    <span className="text-sm text-gray-500">{t('totalPrice')}</span>
                    <span className="text-xl font-bold text-sky-900">{localizeDigits(total.toLocaleString())} {t('toman')}</span>
                </div>
                <button 
                    onClick={handleConfirmOrder}
                    className="w-full bg-sky-900 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-sky-800 transition-colors shadow-lg shadow-sky-900/30"
                >
                    {t('confirmAndPay')}
                </button>
            </footer>
        </div>
    );
};

export default ZhavCheckoutPage;