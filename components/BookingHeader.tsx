import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, HomeIcon } from '../assets/icons';
import { useTranslation } from '../hooks/useTranslation';

interface BookingHeaderProps {
  title: string;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const { language } = useTranslation();
  const isRtl = language === 'fa' || language === 'ar';

  return (
    <header className="bg-sky-900 text-white sticky top-0 z-40 shadow-md">
      <div className="px-2 h-16 flex items-center justify-between relative">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/10">
          <ArrowLeftIcon className={`w-6 h-6 ${isRtl ? 'rotate-180' : ''}`} />
        </button>
        <h1 className="text-lg font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 text-center truncate">{title}</h1>
        <button onClick={() => navigate('/')} className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/10">
          <HomeIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default BookingHeader;