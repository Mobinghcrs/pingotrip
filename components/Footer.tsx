import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-800 dark:bg-slate-900 text-white mt-12 py-8">
      <div className="container mx-auto px-4 text-center">
        <p>{t('copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;