import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { AdminZhavOrder } from '../../types';
import { 
    XIcon, UserIcon, FileTextIcon, DollarSignIcon, EditIcon, MailIcon, PhoneIcon, TruckIcon
} from '../../assets/icons';

interface ZhavOrderDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: AdminZhavOrder;
    onSave: (updatedOrder: AdminZhavOrder) => void;
}

const ZhavOrderDetailsModal: React.FC<ZhavOrderDetailsModalProps> = ({ isOpen, onClose, order, onSave }) => {
    const { t, localizeDigits } = useTranslation();
    const [editableOrder, setEditableOrder] = useState<AdminZhavOrder>(order);
    
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as AdminZhavOrder['status'];
        setEditableOrder(prev => ({ ...prev, status: newStatus }));
    };
    
    const handleTrackingNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableOrder(prev => ({ ...prev, trackingNumber: e.target.value }));
    };

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableOrder(prev => ({ ...prev, notes: e.target.value }));
    };

    const handleSaveChanges = () => {
        onSave(editableOrder);
    };

    if (!isOpen) return null;

    const statusOptions: AdminZhavOrder['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    const statusStyles: { [key in AdminZhavOrder['status']]: string } = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        processing: 'bg-blue-100 text-blue-800 border-blue-300',
        shipped: 'bg-purple-100 text-purple-800 border-purple-300',
        delivered: 'bg-green-100 text-green-800 border-green-300',
        cancelled: 'bg-red-100 text-red-800 border-red-300',
    };

    const DetailItem = ({ label, value }: { label: string, value: string }) => (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-semibold text-slate-800">{value}</p>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-down" style={{animationDuration: '0.2s'}} onClick={onClose}>
            <div className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b bg-white rounded-t-2xl">
                    <h2 className="text-xl font-bold text-slate-800">{t('orderDetails')} - <span className="font-mono text-sky-800">{order.orderId}</span></h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                </header>

                <main className="p-6 overflow-y-auto space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><UserIcon className="w-5 h-5"/>{t('shippingInformation')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <DetailItem label={t('fullName')} value={order.shippingInfo.fullName} />
                            <DetailItem label={t('phone')} value={localizeDigits(order.shippingInfo.phone)} />
                            <div className="sm:col-span-2">
                                <DetailItem label={t('address')} value={order.shippingInfo.address} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><FileTextIcon className="w-5 h-5"/>{t('orderedItems')}</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                           {order.items.map(item => (
                               <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                                   <img src={item.image} alt={t(item.nameKey)} className="w-12 h-12 rounded-md object-cover"/>
                                   <div className="flex-grow">
                                       <p className="font-semibold text-sm">{t(item.nameKey)}</p>
                                       <p className="text-xs text-gray-500">{t('weight')}: {localizeDigits(item.weight)}{t('gram')}</p>
                                   </div>
                                   <p className="font-semibold text-sm">{localizeDigits(item.price.toLocaleString())} {t('toman')}</p>
                               </div>
                           ))}
                        </div>
                         <div className="flex justify-between items-center pt-3 font-bold text-lg border-t mt-3">
                            <p className="text-slate-800">{t('totalPrice')}</p>
                            <p className="text-sky-900">{localizeDigits(order.totalPrice.toLocaleString())} {t('toman')}</p>
                        </div>
                    </div>

                     <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><TruckIcon className="w-5 h-5"/>{t('shippingManagement')}</h3>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('trackingNumber')}</label>
                            <input 
                                type="text"
                                value={editableOrder.trackingNumber || ''}
                                onChange={handleTrackingNumberChange}
                                className="w-full p-2 border-2 rounded-md bg-white font-mono"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-4">
                         <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><EditIcon className="w-5 h-5"/>{t('updateStatus')}</h3>
                         <select
                            value={editableOrder.status}
                            onChange={handleStatusChange}
                            className={`w-full p-3 border-2 rounded-lg font-semibold appearance-none ${statusStyles[editableOrder.status]}`}
                        >
                            {statusOptions.map(opt => <option key={opt} value={opt}>{t(opt)}</option>)}
                        </select>
                    </div>

                     <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4">{t('internalNotes')}</h3>
                        <textarea
                            value={editableOrder.notes || ''}
                            onChange={handleNotesChange}
                            rows={3}
                            className="w-full p-2 border-2 rounded-md bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                            placeholder={t('notes') + '...'}
                        />
                    </div>
                </main>

                <footer className="flex justify-end p-4 border-t bg-white rounded-b-2xl">
                    <button onClick={handleSaveChanges} className="bg-sky-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-800 transition-colors">{t('saveChanges')}</button>
                </footer>
            </div>
        </div>
    );
};

export default ZhavOrderDetailsModal;