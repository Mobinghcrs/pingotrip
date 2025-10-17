import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { AdminGiftCardPurchase } from '../../types';
import { 
    XIcon, UserIcon, GiftIcon, DollarSignIcon, EditIcon, FileTextIcon
} from '../../assets/icons';

interface GiftCardPurchaseDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    purchase: AdminGiftCardPurchase;
    onSave: (updatedPurchase: AdminGiftCardPurchase) => void;
}

const GiftCardPurchaseDetailsModal: React.FC<GiftCardPurchaseDetailsModalProps> = ({ isOpen, onClose, purchase, onSave }) => {
    const { t, localizeDigits } = useTranslation();
    const [editablePurchase, setEditablePurchase] = useState<AdminGiftCardPurchase>(purchase);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as AdminGiftCardPurchase['status'];
        setEditablePurchase(prev => ({ ...prev, status: newStatus }));
    };
    
    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditablePurchase(prev => ({ ...prev, giftCardCode: e.target.value }));
    };

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditablePurchase(prev => ({ ...prev, notes: e.target.value }));
    };

    const handleSaveChanges = () => {
        if (editablePurchase.status === 'approved' && (!editablePurchase.giftCardCode || editablePurchase.giftCardCode.trim() === '')) {
            alert(t('enterGiftCardCode'));
            return;
        }
        onSave(editablePurchase);
    };

    if (!isOpen) return null;

    const statusOptions: AdminGiftCardPurchase['status'][] = ['pending', 'approved', 'rejected'];
    const statusStyles: { [key in AdminGiftCardPurchase['status']]: string } = {
        approved: 'bg-green-100 text-green-800 border-green-300',
        rejected: 'bg-red-100 text-red-800 border-red-300',
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };

    const DetailItem = ({ label, value }: { label: string, value: string }) => (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-semibold text-slate-800">{value}</p>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-down" style={{animationDuration: '0.2s'}} onClick={onClose}>
            <div className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b bg-white rounded-t-2xl">
                    <h2 className="text-xl font-bold text-slate-800">{t('purchaseDetails')} - <span className="font-mono text-sky-800">{purchase.purchaseId}</span></h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                </header>

                <main className="p-6 overflow-y-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><UserIcon className="w-5 h-5"/>{t('customer')}</h3>
                            <div className="space-y-3">
                                <DetailItem label={t('customerName')} value={purchase.customerName} />
                                <DetailItem label={t('purchaseDate')} value={localizeDigits(purchase.purchaseDate)} />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><GiftIcon className="w-5 h-5"/>{t('cardDetails')}</h3>
                            <div className="space-y-3">
                                <DetailItem label={t('type')} value={t(purchase.card.brandKey)} />
                                <DetailItem label={t('amount')} value={`${purchase.card.currency === 'USD' ? '$' : '€'}${purchase.card.amount}`} />
                                <DetailItem label={t('region')} value={t(purchase.card.region.toLowerCase())} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><DollarSignIcon className="w-5 h-5"/>{t('priceSummary')}</h3>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-600">{t('totalPrice')}</span>
                            <span className="text-2xl font-bold text-sky-900">{localizeDigits(purchase.priceToman.toLocaleString())} {t('toman')}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><FileTextIcon className="w-5 h-5"/>{t('notes')}</h3>
                        <textarea
                            value={editablePurchase.notes || ''}
                            onChange={handleNotesChange}
                            rows={3}
                            className="w-full p-2 border-2 rounded-md bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                            placeholder={t('notes') + '...'}
                        />
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                         <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><EditIcon className="w-5 h-5"/>{t('updateStatus')}</h3>
                         <select
                            value={editablePurchase.status}
                            onChange={handleStatusChange}
                            className={`w-full p-3 border-2 rounded-lg font-semibold appearance-none ${statusStyles[editablePurchase.status]}`}
                        >
                            {statusOptions.map(opt => <option key={opt} value={opt}>{t(opt)}</option>)}
                        </select>
                        
                        {editablePurchase.status === 'approved' && (
                            <div className="mt-4 animate-fade-in-down">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('giftCardCode')}</label>
                                <input 
                                    type="text"
                                    value={editablePurchase.giftCardCode || ''}
                                    onChange={handleCodeChange}
                                    readOnly={purchase.status === 'approved'}
                                    placeholder={t('enterGiftCardCode')}
                                    className="w-full p-2 border-2 rounded-md bg-white font-mono tracking-wider focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                                />
                            </div>
                        )}
                    </div>
                </main>

                <footer className="flex justify-end p-4 border-t bg-white rounded-b-2xl">
                    <button onClick={handleSaveChanges} className="bg-sky-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-800 transition-colors">{t('saveChanges')}</button>
                </footer>
            </div>
        </div>
    );
};

export default GiftCardPurchaseDetailsModal;