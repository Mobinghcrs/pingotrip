import React, { useContext } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { CheckCircleIcon } from '../assets/icons';
import { ZhavProduct } from '../types';
import { ZhavContext } from '../contexts/ZhavContext';


const ZhavConfirmationPage = () => {
    const { t, localizeDigits } = useTranslation();
    const location = useLocation();
    const zhavContext = useContext(ZhavContext);

    const orderState = location.state as { orderId: string; total: number; items: ZhavProduct[]; paymentMethod: string } | null;

    if (!orderState) {
        return <Navigate to="/zhav-gold-gallery" replace />;
    }
    
    // Clear cart on confirmation page load
    React.useEffect(() => {
        if (zhavContext) {
            zhavContext.clearCart();
        }
    }, [zhavContext]);


    const { orderId, total, items, paymentMethod } = orderState;

    const getPaymentMethodName = (method: string) => {
        switch (method) {
            case 'wallet':
                return t('pingoWallet');
            case 'bank':
                return t('bankGateway');
            case 'credit':
                return t('pingoCredit');
            default:
                return '';
        }
    };


    return (
        <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col items-center justify-center text-center p-4">
            <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold text-slate-800">{t('orderSuccessTitle')}</h1>
            <p className="text-gray-600 mt-2 mb-6 max-w-xs">{t('orderSuccessMessage')}</p>

            <div className="bg-white rounded-xl shadow-lg border p-4 w-full text-start space-y-3 mb-6">
                <div className="flex justify-between items-center bg-cyan-50 p-2 rounded-lg">
                    <span className="text-sm text-cyan-800">{t('orderId')}</span>
                    <span className="font-mono text-cyan-800 font-bold">{orderId}</span>
                </div>
                <div>
                    {items.map(item => (
                        <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-200 last:border-b-0">
                            <img src={item.image} alt={t(item.nameKey)} className="w-12 h-12 rounded-md object-cover" />
                            <div className="flex-grow">
                                <p className="font-semibold text-sm text-slate-800">{t(item.nameKey)}</p>
                            </div>
                            <p className="text-sm text-gray-600 font-semibold">{localizeDigits(item.price.toLocaleString())}</p>
                        </div>
                    ))}
                </div>
                 <div className="flex justify-between items-center pt-2 font-semibold text-sm border-t border-gray-200">
                    <p className="text-gray-600">{t('paymentMethod')}</p>
                    <p className="text-slate-800">{getPaymentMethodName(paymentMethod)}</p>
                </div>
                 <div className="flex justify-between items-center pt-2 font-bold text-lg border-t border-gray-200">
                    <p className="text-slate-800">{t('totalPrice')}</p>
                    <p className="text-sky-900">{localizeDigits(total.toLocaleString())} {t('toman')}</p>
                </div>
            </div>

            <Link to="/zhav-gold-gallery" className="w-full bg-sky-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-800 transition-colors">
                {t('backToGallery')}
            </Link>
        </div>
    );
};

export default ZhavConfirmationPage;