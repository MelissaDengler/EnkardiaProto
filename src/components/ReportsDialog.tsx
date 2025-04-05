import { useState } from 'react';
import { X, Download, FileText, Calendar, Filter } from 'lucide-react';
import { formatDate } from '../utils/formatters';

interface ReportsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportsDialog({ isOpen, onClose }: ReportsDialogProps) {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState('last_month');
  const [format, setFormat] = useState('pdf');

  const reports = [
    {
      id: 'pl',
      title: 'Profit & Loss Statement',
      description: 'Detailed income and expenses report',
      size: '245 KB',
      lastGenerated: '2024-03-15',
    },
    {
      id: 'bs',
      title: 'Balance Sheet',
      description: 'Assets, liabilities and equity overview',
      size: '180 KB',
      lastGenerated: '2024-03-15',
    },
    {
      id: 'cf',
      title: 'Cash Flow Statement',
      description: 'Cash movement and liquidity analysis',
      size: '156 KB',
      lastGenerated: '2024-03-15',
    },
    {
      id: 'tax',
      title: 'Tax Summary Report',
      description: 'Tax obligations and payments overview',
      size: '198 KB',
      lastGenerated: '2024-03-15',
    },
  ];

  const handleDownload = () => {
    // Implement download logic
    console.log('Downloading reports:', selectedReports);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Download Reports</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
              >
                <option value="last_month">Last Month</option>
                <option value="last_quarter">Last Quarter</option>
                <option value="ytd">Year to Date</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-3">
            <h3 className="font-medium">Available Reports</h3>
            <div className="space-y-2">
              {reports.map((report) => (
                <label
                  key={report.id}
                  className="flex items-start p-3 border rounded-lg hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedReports.includes(report.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedReports([...selectedReports, report.id]);
                      } else {
                        setSelectedReports(selectedReports.filter(id => id !== report.id));
                      }
                    }}
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <div className="font-medium">{report.title}</div>
                    <div className="text-sm text-gray-500">{report.description}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Last generated: {formatDate(report.lastGenerated)} • {report.size}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {selectedReports.length} reports selected
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                disabled={selectedReports.length === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white
                  ${selectedReports.length === 0 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/_0.9)]'
                  } transition-colors`}
              >
                <Download className="h-4 w-4" />
                Download Selected
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 