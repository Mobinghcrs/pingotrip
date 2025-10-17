
import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { BalanceSheetReportData } from '../../../types';
import { PrinterIcon, ArrowDownCircleIcon } from '../../../assets/icons';

interface BalanceSheetReportProps {
    reportData: BalanceSheetReportData;
    onPrint: () => void;
    onDownload: () => void;
}

export const BalanceSheetReport: React.FC<BalanceSheetReportProps> = ({ reportData, onPrint, onDownload }) => {
    const { t, localizeDigits } = useTranslation();

    const renderRow = (labelKey: string, value: number, isTotal = false) => (
        <div className={`flex justify-between py-2 ${isTotal ? 'font-bold border-t-2 pt-3' : 'border-b border-dashed'}`}>
            <span>{t(labelKey)}</span>
            <span>{localizeDigits(value.toLocaleString())}</span>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-md border p-6 mt-6 animate-fade-in-down">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">{t('balanceSheet')}</h3>
                 <div className="flex gap-2">
                    <button onClick={onPrint} className="flex items-center gap-2 bg-gray-200 text-slate-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300">
                        <PrinterIcon className="w-5 h-5" />
                        <span>{t('print')}</span>
                    </button>
                    <button onClick={onDownload} className="flex items-center gap-2 bg-gray-200 text-slate-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300">
                        <ArrowDownCircleIcon className="w-5 h-5" />
                        <span>{t('download')}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Assets */}
                <div>
                    <h4 className="font-bold text-lg text-green-700 mt-4 mb-2">{t('assets')}</h4>
                    <div className="space-y-1">
                        {renderRow('cash', reportData.assets.cash)}
                        {renderRow('accountsReceivable', reportData.assets.accountsReceivable)}
                        {renderRow('totalAssets', reportData.assets.total, true)}
                    </div>
                </div>

                {/* Liabilities & Equity */}
                <div>
                    <h4 className="font-bold text-lg text-red-700 mt-4 mb-2">{t('liabilities')}</h4>
                    <div className="space-y-1">
                        {renderRow('accountsPayable', reportData.liabilities.accountsPayable)}
                        {renderRow('totalLiabilities', reportData.liabilities.total, true)}
                    </div>

                    <h4 className="font-bold text-lg text-blue-700 mt-6 mb-2">{t('equity')}</h4>
                    <div className="space-y-1">
                        {renderRow('ownerEquity', reportData.equity.ownerEquity)}
                        {renderRow('totalEquity', reportData.equity.total, true)}
                    </div>

                    <div className="border-t-4 border-double my-4"></div>
                    {renderRow('totalLiabilitiesAndEquity', reportData.liabilities.total + reportData.equity.total, true)}
                </div>
            </div>
        </div>
    );
};
