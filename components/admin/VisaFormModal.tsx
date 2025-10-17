import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { VisaService } from '../../types';
import { XIcon } from '../../assets/icons';

interface VisaFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    visa: VisaService | null;
    onSave: (visa: VisaService) => void;
}

const VisaFormModal: React.FC<VisaFormModalProps> = ({ isOpen, onClose, visa, onSave }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<Omit<VisaService, 'id'>>({
        country: '',
        visaType: '',
        price: 0,
        processingTime: 0,
        image: ''
    });

    useEffect(() => {
        if (visa) {
            setFormData(visa);
        } else {
            setFormData({ country: '', visaType: 'tourist', price: 0, processingTime: 0, image: '' });
        }
    }, [visa, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: visa?.id || 0 });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <form className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                <header className="flex items-center justify-between p-4 border-b bg-white rounded-t-2xl">
                    <h2 className="text-xl font-bold text-slate-800">{visa ? t('editVisa') : t('addNewVisa')}</h2>
                    <button type="button" onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                </header>

                <div className="p-6 overflow-y-auto space-y-4">
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('country')}</label>
                        <input type="text" name="country" value={formData.country} onChange={handleChange} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('visaType')}</label>
                        <input type="text" name="visaType" value={formData.visaType} onChange={handleChange} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('price')} ({t('rial')})</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('processingTime')} ({t('days')})</label>
                            <input type="number" name="processingTime" value={formData.processingTime} onChange={handleChange} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('imageURL')}</label>
                        <input type="text" name="image" value={formData.image} onChange={handleChange} required className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none" />
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

export default VisaFormModal;