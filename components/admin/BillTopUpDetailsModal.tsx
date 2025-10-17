import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { AdminBillPayment, AdminTopUpPurchase } from '../../types';
import { 
    XIcon, UserIcon, FileTextIcon, DollarSignIcon, EditIcon, ReceiptIcon, SmartphoneIcon
} from '../../assets/icons';

interface BillTopUpDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: AdminBillPayment | AdminTopUpPurchase;
    type: 'bill' | 'topup';
    onSave: (updatedItem: AdminBillPayment | AdminTopUpPurchase) => void;
}

const BillTopUpDetailsModal: React.FC<BillTopUpDetailsModalProps> = ({ isOpen, onClose, item, type, onSave }) => {
    const { t, localizeDigits } = useTranslation();
    const [editableItem, setEditableItem] = useState(item);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as AdminBillPayment['status'];
        setEditableItem(prev => ({ ...prev, status: newStatus }));
    };
    
    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableItem(prev => ({ ...prev, notes: e.target.value }));
    };

    const handleSaveChanges = () => {
        onSave(editableItem);
    };

    if (!isOpen) return null;

    const isBill = type === 'bill';
    const billDetails = isBill ? (item as AdminBillPayment).details : null;
    const topUpDetails = !isBill ? (item as AdminTopUpPurchase).details : null;

    const statusOptions: (AdminBillPayment['status'])[] = ['pending', 'approved', 'rejected'];
    const statusStyles: { [key in AdminBillPayment['status']]: string } = {
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
                    <h2 className="text-xl font-bold text-slate-800">{t('transactionDetails')} - <span className="font-mono text-sky-800">{item.transactionId}</span></h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                </header>

                <main className="p-6 overflow-y-auto space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                            {isBill ? <ReceiptIcon className="w-5 h-5"/> : <SmartphoneIcon className="w-5 h-5"/>}
                            {isBill ? t('billDetails') : t('topUpDetailsLabel')}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem label={t('customerName')} value={item.customerName} />
                            <DetailItem label={t('date')} value={localizeDigits(item.date)} />
                            {isBill && billDetails && (
                                <>
                                    <DetailItem label={t('billType')} value={t(`${billDetails.type}Bill`)} />
                                    <DetailItem label={t('billId')} value={localizeDigits(billDetails.billId)} />
                                    <DetailItem label={t('paymentId')} value={localizeDigits(billDetails.paymentId)} />
                                    <DetailItem label={t('amount')} value={`${localizeDigits(billDetails.amount.toLocaleString())} ${t('rial')}`} />
                                </>
                            )}
                             {!isBill && topUpDetails && (
                                <>
                                    <DetailItem label={t('mobileNumber')} value={localizeDigits(topUpDetails.mobileNumber)} />
                                    <DetailItem label={t('operator')} value={t(topUpDetails.operator)} />
                                    <DetailItem label={t('amount')} value={`${localizeDigits(topUpDetails.amount.toLocaleString())} ${t('toman')}`} />
                                </>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><FileTextIcon className="w-5 h-5"/>{t('notes')}</h3>
                        <textarea
                            value={editableItem.notes || ''}
                            onChange={handleNotesChange}
                            rows={3}
                            className="w-full p-2 border-2 rounded-md bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                            placeholder={t('internalNotes') + '...'}
                        />
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                         <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2"><EditIcon className="w-5 h-5"/>{t('updateStatus')}</h3>
                         <select
                            value={editableItem.status}
                            onChange={handleStatusChange}
                            className={`w-full p-3 border-2 rounded-lg font-semibold appearance-none ${statusStyles[editableItem.status]}`}
                        >
                            {statusOptions.map(opt => <option key={opt} value={opt}>{t(opt)}</option>)}
                        </select>
                    </div>
                </main>

                <footer className="flex justify-end p-4 border-t bg-white rounded-b-2xl">
                    <button onClick={handleSaveChanges} className="bg-sky-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-800 transition-colors">{t('saveChanges')}</button>
                </footer>
            </div>
        </div>
    );
};

export default BillTopUpDetailsModal;