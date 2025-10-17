import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { ProfitAndLossReportData } from '../../../types';
import { PrinterIcon, ArrowDownCircleIcon } from '../../../assets/icons';

interface ProfitLossReportProps {
    reportData: ProfitAndLossReportData;
    onPrint: () => void;
    onDownload: () => void;
}

export const ProfitLossReport: React.FC<ProfitLossReportProps> = ({ reportData, onPrint, onDownload }) => {
    const { t, localizeDigits } = useTranslation();

    const renderRow = (labelKey: string, value: number, isTotal = false, isPositive = true) => {
        const valueColor = isPositive ? 'text-green-600' : 'text-red-600';
        return (
            <div className={`flex justify-between py-2 ${isTotal ? 'font-bold border-t-2 pt-3' : 'border-b border-dashed'}`}>
                <span>{t(labelKey)}</span>
                <span className={isTotal ? (isPositive ? 'text-green-700' : 'text-red-700') : valueColor}>
                    {localizeDigits(Math.abs(value).toLocaleString())}
                </span>
            </div>
        );
    };
    
    return (
        <div className="bg-white rounded-xl shadow-md border p-6 mt-6 animate-fade-in-down">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">{t('profitLossStatement')}</h3>
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

            <div className="space-y-3">
                <h4 className="font-bold text-lg text-green-700 mt-4">{t('revenue')}</h4>
                {renderRow('flightSales', reportData.revenue.flightSales)}
                {renderRow('hotelSales', reportData.revenue.hotelSales)}
                {/* FIX: Use renamed key `reportTotalRevenue` to avoid conflicts. */}
                {renderRow('reportTotalRevenue', reportData.revenue.total, true)}

                <h4 className="font-bold text-lg text-red-700 mt-6">{t('operatingExpenses')}</h4>
                {renderRow('marketing', reportData.expenses.marketing, false, false)}
                {renderRow('salaries', reportData.expenses.salaries, false, false)}
                {/* FIX: Use renamed key `reportTotalExpenses` to avoid conflicts. */}
                {renderRow('reportTotalExpenses', reportData.expenses.total, true, false)}

                <div className="border-t-4 border-double my-4"></div>

                {renderRow('netIncome', reportData.netIncome, true, reportData.netIncome >= 0)}
            </div>
        </div>
    );
};