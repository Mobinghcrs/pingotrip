import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_GIFT_CARD_BRANDS, MOCK_GIFT_CARDS } from '../constants';
import { BookingContext } from '../contexts/BookingContext';
import BookingHeader from '../components/BookingHeader';
import { GiftCard } from '../types';

const GiftCardDetailsPage = () => {
    const { brandId } = useParams<{ brandId: string }>();
    const navigate = useNavigate();
    const { t, localizeDigits, language } = useTranslation();
    const bookingContext = useContext(BookingContext);

    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

    const brand = MOCK_GIFT_CARD_BRANDS.find(b => b.id === brandId);
    const availableCards = MOCK_GIFT_CARDS.filter(c => c.brandId === brandId);
    
    const selectedCard = availableCards.find(c => c.id === selectedCardId);

    if (!brand) return <Navigate to="/currency-services/gift-cards" replace />;
    if (!bookingContext) return null;

    const { updateGiftCardPurchase } = bookingContext;

    const handleSelectCard = (card: GiftCard) => {
        setSelectedCardId(card.id);
    };
    
    const handleBuyNow = () => {
        if (!selectedCard) return;
        const purchase = {
            selectedGiftCard: selectedCard,
            transactionId: `PG-GC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        };
        updateGiftCardPurchase(purchase);
        navigate('/gift-card-review');
    };

    const groupedCards = availableCards.reduce((acc, card) => {
        (acc[card.region] = acc[card.region] || []).push(card);
        return acc;
    }, {} as Record<string, GiftCard[]>);

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t(brand.nameKey)} />
            <main className="p-4 pb-28">
                <div className="bg-white rounded-2xl shadow-md border p-4 flex flex-col items-center">
                    <img src={brand.image} alt={t(brand.nameKey)} className="w-24 h-24 object-contain mb-2" />
                    <h1 className="text-2xl font-bold text-slate-800">{t(brand.nameKey)}</h1>
                </div>
                
                <div className="mt-6">
                    <h2 className="text-lg font-bold text-slate-700 mb-3 px-1">{t('selectAmountAndRegion')}</h2>
                    <div className="space-y-4">
                        {Object.entries(groupedCards).map(([region, cards]) => (
                            <div key={region} className="bg-white rounded-2xl shadow-sm border p-4">
                                <h3 className="font-semibold text-cyan-800 bg-cyan-50 px-3 py-1 rounded-md inline-block mb-3">{t('region')}: {t(region.toLowerCase())}</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {/* FIX: Add type assertion to fix map error on unknown type. */}
                                    {(cards as GiftCard[]).map(card => (
                                        <button
                                            key={card.id}
                                            onClick={() => handleSelectCard(card)}
                                            className={`p-3 border-2 rounded-lg text-center transition-all ${selectedCardId === card.id ? 'bg-cyan-500 text-white border-cyan-500 shadow-lg' : 'border-gray-200 hover:border-cyan-300'}`}
                                        >
                                            <p className="font-bold text-lg">{card.currency === 'USD' ? '$' : '€'}{localizeDigits(card.amount)}</p>
                                            <p className="text-xs">{localizeDigits(card.priceToman.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR'))} {t('toman')}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            {selectedCard && (
                <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-3">
                    <div className="flex justify-between items-center px-1 mb-2">
                         <span className="text-sm text-gray-600">{t('totalPrice')}</span>
                         <span className="text-xl font-bold text-sky-900">{localizeDigits(selectedCard.priceToman.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR'))} {t('toman')}</span>
                    </div>
                    <button onClick={handleBuyNow} className="w-full bg-sky-900 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-sky-900/40 hover:bg-sky-800 transition-all duration-200 active:scale-95">
                        {t('bookNow')}
                    </button>
                </footer>
            )}
        </div>
    );
};

export default GiftCardDetailsPage;