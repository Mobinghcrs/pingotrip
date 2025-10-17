import React, { useState } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminHeader from '../../../components/admin/AdminHeader';
import { ProfitAndLossReportData, BalanceSheetReportData } from '../../../types';
import { MOCK_PROFIT_LOSS_DATA, MOCK_BALANCE_SHEET_DATA } from '../../../constants';
import { ProfitLossReport } from '../../../components/admin/accounting/ProfitLossReport';
import { BalanceSheetReport } from '../../../components/admin/accounting/BalanceSheetReport';

const AccountingReportsPage = () => {
    const { t } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [reportType, setReportType] = useState('profit_loss');
    const [generatedReport, setGeneratedReport] = useState<'profit_loss' | 'balance_sheet' | null>(null);

    const handleGenerateReport = () => {
        setGeneratedReport(reportType as 'profit_loss' | 'balance_sheet');
    };

    const renderReport = () => {
        if (generatedReport === 'profit_loss') {
            return <ProfitLossReport reportData={MOCK_PROFIT_LOSS_DATA} onPrint={() => alert('Printing...')} onDownload={() => alert('Downloading...')} />;
        }
        if (generatedReport === 'balance_sheet') {
            return <BalanceSheetReport reportData={MOCK_BALANCE_SHEET_DATA} onPrint={() => alert('Printing...')} onDownload={() => alert('Downloading...')} />;
        }
        return null;
    };

    return (
        <div className="relative min-h-screen bg-slate-100">
            <AdminSidebar 
                isSidebarOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)}
                activeTab="accounting-reports"
            />
            <div className="md:mr-64">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('reports')}</h2>
                    
                    <div className="bg-white rounded-xl shadow-md border p-6">
                        <div className="flex items-end gap-4">
                            <div className="flex-grow">
                                <label htmlFor="report-type" className="block text-sm font-semibold text-gray-700 mb-1">{t('reportType')}</label>
                                <select 
                                    id="report-type"
                                    value={reportType}
                                    onChange={(e) => setReportType(e.target.value)}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                                >
                                    <option value="profit_loss">{t('profitLossStatement')}</option>
                                    <option value="balance_sheet">{t('balanceSheet')}</option>
                                </select>
                            </div>
                            <button 
                                onClick={handleGenerateReport}
                                className="bg-sky-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-800 transition-colors"
                            >
                                {t('generateReport')}
                            </button>
                        </div>
                    </div>

                    {renderReport()}
                </main>
            </div>
        </div>
    );
};

export default AccountingReportsPage;