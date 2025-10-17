import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { HealthService } from '../../types';
import { XIcon } from '../../assets/icons';

interface HealthServiceFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: HealthService | null;
    onSave: (service: HealthService) => void;
}

const HealthServiceFormModal: React.FC<HealthServiceFormModalProps> = ({ isOpen, onClose, service, onSave }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<Omit<HealthService, 'id'>>({
        nameKey: '',
        price: 0,
    });

    useEffect(() => {
        if (service) {
            setFormData(service);
        } else {
            setFormData({ nameKey: '', price: 0 });
        }
    }, [service, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: service?.id || '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <form className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                <header className="flex items-center justify-between p-4 border-b bg-white rounded-t-2xl">
                    <h2 className="text-xl font-bold text-slate-800">{service ? t('editService') : t('addNewService')}</h2>
                    <button type="button" onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                </header>

                <div className="p-6 overflow-y-auto space-y-4">
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('serviceName')}</label>
                        <input type="text" name="nameKey" value={formData.nameKey} onChange={handleChange} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        <p className="text-xs text-gray-500 mt-1">Note: This should be a translation key.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('price')} ({t('rial')})</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                    </div>
                </div>

                <footer className="flex justify-end p-4 border-t bg-white rounded-b-2xl">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors mr-3">{t('cancel')}</button>
                    <button type="submit" className="bg-sky-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-800 transition-colors">{t('saveChanges')}</button>
                </footer>
            </form>
        </div>
    );
};

export default HealthServiceFormModal;