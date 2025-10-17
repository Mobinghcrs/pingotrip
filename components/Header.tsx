import React, { useState, useContext } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { LanguageContext } from '../contexts/LanguageContext';
import { ChevronDownIcon } from '../assets/icons';
// FIX: Correct import path
import { Language } from '../types';

const languages: { code: Language; name: string }[] = [
  { code: 'fa', name: 'فارسی' },
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
];

const Header = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const selectedLanguage = languages.find(l => l.code === language);

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a href="/#/" className="text-2xl font-bold text-orange-500">Pingo Trip</a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#/travel" className="text-gray-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium">{t('travelHome')}</a>
              {/* FIX: Use 'flightsHeader' key to get the correct plural translation and avoid conflicts. */}
              <a href="#/flights" className="text-gray-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium">{t('flightsHeader')}</a>
              <a href="#/hotels" className="text-gray-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium">{t('hotels')}</a>
              <a href="#" className="text-gray-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium">{t('tours')}</a>
            </nav>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-2 border dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span>{selectedLanguage?.name}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            {isLangOpen && (
              <div className="absolute top-full mt-2 end-0 bg-white dark:bg-slate-900 border dark:border-slate-700 rounded-lg shadow-lg w-32">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className="block w-full text-start px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;