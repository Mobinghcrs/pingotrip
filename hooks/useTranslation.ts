

import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
// FIX: Correct import path
import { translations } from '../constants';

export const useTranslation = () => {
  const { language } = useContext(LanguageContext);
  // FIX: Add isRtl to the hook to provide a centralized way of checking for RTL languages.
  const isRtl = language === 'fa' || language === 'ar';

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const localizeDigits = (text: string | number): string => {
    if (language !== 'fa') {
      return String(text);
    }
    return String(text).replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);
  };

  return { t, language, localizeDigits, isRtl };
};