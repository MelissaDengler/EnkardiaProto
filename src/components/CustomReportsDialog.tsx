import { useState } from 'react';
import { X, FileText, Download, Filter } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface CustomReportsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomReportsDialog({ isOpen, onClose }: CustomReportsDialogProps) {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const metrics = [
    { id: 'revenue', name: 'Revenue', category: 'Income' },
    { id: 'expenses', name: 'Expenses', category: 'Income' },
    { id: 'gross_profit', name: 'Gross Profit', category: 'Income' },
    { id: 'net_profit', name: 'Net Profit', category: 'Income' },
    { id: 'cash_flow', name: 'Cash Flow', category: 'Cash' },
    { id: 'working_capital', name: 'Working Capital', category: 'Cash' },
    { id: 'accounts_receivable', name: 'Accounts Receivable', category: 'Balance Sheet' },
    { id: 'accounts_payable', name: 'Accounts Payable', category: 'Balance Sheet' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Create Custom Report</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]">
                <option>Detailed Analysis</option>
                <option>Summary Report</option>
                <option>Comparison Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]">
                <option>Last 12 Months</option>
                <option>Year to Date</option>
                <option>Custom Range</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Select Metrics</h3>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((metric) => (
                <label
                  key={metric.id}
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedMetrics.includes(metric.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMetrics([...selectedMetrics, metric.id]);
                      } else {
                        setSelectedMetrics(selectedMetrics.filter(id => id !== metric.id));
                      }
                    }}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">{metric.name}</div>
                    <div className="text-xs text-gray-500">{metric.category}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {selectedMetrics.length} metrics selected
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                disabled={selectedMetrics.length === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white
                  ${selectedMetrics.length === 0 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/_0.9)]'
                  } transition-colors`}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 