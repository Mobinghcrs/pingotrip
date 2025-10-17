

import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
// FIX: Correct import path
import { MOCK_HOTELS } from '../constants';
import { BookingContext } from '../contexts/BookingContext';
import { StarIcon, MapPinIcon, WifiIcon, ParkingSquareIcon, UtensilsIcon, DumbbellIcon } from '../assets/icons';

// FIX: Changed AmenityIconProps from an interface to a type alias with an intersection to correctly include React.Attributes for the `key` prop.
type AmenityIconProps = {
    amenity: string;
} & React.Attributes;

const AmenityIcon: React.FC<{ amenity: string }> = ({ amenity }) => {
    const { t } = useTranslation();
    const iconProps = { className: "w-6 h-6 text-cyan-600" };
    const icons: { [key: string]: React.ReactNode } = {
        wifi: <WifiIcon {...iconProps} />,
        parking: <ParkingSquareIcon {...iconProps} />,
        restaurant: <UtensilsIcon {...iconProps} />,
        gym: <DumbbellIcon {...iconProps} />,
    };
    return (
        <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center border border-cyan-100">
                {icons[amenity] || null}
            </div>
            <span className="text-xs text-slate-600 mt-1.5">{t(amenity)}</span>
        </div>
    );
};

const HotelDetailsPage = () => {
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const { t, language } = useTranslation();
    const bookingContext = useContext(BookingContext);

    const hotel = MOCK_HOTELS.find(h => h.id === parseInt(hotelId || ''));

    if (!hotel) {
        return <div>Hotel not found</div>;
    }
    
    if (!bookingContext) {
        return null;
    }

    const { selectHotel } = bookingContext;

    const handleSelect = () => {
        selectHotel(hotel);
        navigate('/hotel-review');
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('hotelDetails')} />
            <main className="pb-28">
                <div className="w-full h-56 bg-gray-200">
                    <img src={hotel.images?.[0] || hotel.image} alt={t(hotel.nameKey)} className="w-full h-full object-cover"/>
                </div>
                
                <div className="p-4 space-y-4">
                    <div className="bg-white rounded-2xl shadow-md border p-4">
                        <h1 className="text-2xl font-extrabold text-slate-800">{t(hotel.nameKey)}</h1>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                          <MapPinIcon className="w-4 h-4"/>
                          <span>{t(hotel.locationKey)}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                            {Array.from({ length: hotel.rating }).map((_, i) => (
                                <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-md border p-4">
                        <h2 className="text-lg font-bold text-slate-800 mb-2">{t('aboutHotel')}</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">{hotel.description}</p>
                    </div>

                    {hotel.amenities && hotel.amenities.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-md border p-4">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">{t('amenities')}</h2>
                            <div className="grid grid-cols-4 gap-4">
                                {hotel.amenities.map(amenity => <AmenityIcon key={amenity} amenity={amenity} />)}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="p-4 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">{t('startsFrom')}</p>
                        <p className="text-xl font-bold text-slate-800">
                            {hotel.price.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR')}
                            <span className="text-sm font-normal ms-1">{t('rial')}</span>
                        </p>
                    </div>
                    <button onClick={handleSelect} className="bg-sky-900 text-white py-2.5 px-6 rounded-lg font-bold hover:bg-sky-800 transition-transform hover:scale-105 duration-300 shadow-md shadow-sky-900/30">
                        {t('selectRoom')}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default HotelDetailsPage;