import { useState } from 'react';
import { ChevronDown, ChevronRight, TrendingDown, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ProfitLossItem {
  id: string;
  name: string;
  currentAmount: number;
  previousAmount: number;
  percentageChange: number;
  children?: ProfitLossItem[];
}

interface ProfitLossTableProps {
  data: {
    periodStart: string;
    periodEnd: string;
    previousPeriodStart: string;
    previousPeriodEnd: string;
    items: ProfitLossItem[];
    summary: {
      grossProfit: { current: number; previous: number; percentageChange: number };
      netProfit: { current: number; previous: number; percentageChange: number };
      grossMargin: { current: number; previous: number; percentageChange: number };
    };
  };
}

export function ProfitLossTable({ data }: ProfitLossTableProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['income', 'expenses']));

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderPLItem = (item: ProfitLossItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <>
        <tr className={`hover:bg-gray-50 ${level > 0 ? 'text-sm' : 'font-medium'}`}>
          <td className="py-2 px-4">
            <div className="flex items-center" style={{ paddingLeft: `${level * 20}px` }}>
              {hasChildren && (
                <button
                  onClick={() => toggleItem(item.id)}
                  className="p-1 hover:bg-gray-100 rounded-full mr-2"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
              {!hasChildren && <span className="w-6" />}
              {item.name}
            </div>
          </td>
          <td className="py-2 px-4 text-right">{formatCurrency(item.currentAmount)}</td>
          <td className="py-2 px-4 text-right">{formatCurrency(item.previousAmount)}</td>
          <td className="py-2 px-4 text-right">
            <div className="flex items-center justify-end space-x-1">
              {item.percentageChange > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={item.percentageChange > 0 ? 'text-green-600' : 'text-red-600'}>
                {Math.abs(item.percentageChange)}%
              </span>
            </div>
          </td>
        </tr>
        {hasChildren &&
          isExpanded &&
          item.children?.map((child) => renderPLItem(child, level + 1))}
      </>
    );
  };

  const prepareChartData = () => {
    return [
      {
        name: 'Revenue',
        current: data.items.find(i => i.id === 'income')?.currentAmount || 0,
        previous: data.items.find(i => i.id === 'income')?.previousAmount || 0,
      },
      {
        name: 'Expenses',
        current: data.items.find(i => i.id === 'expenses')?.currentAmount || 0,
        previous: data.items.find(i => i.id === 'expenses')?.previousAmount || 0,
      },
      {
        name: 'Net Profit',
        current: data.summary.netProfit.current,
        previous: data.summary.netProfit.previous,
      },
    ];
  };

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div>
          <h2 className="text-xl font-semibold">Profit & Loss Statement</h2>
          <p className="text-sm text-gray-500">
            {new Date(data.periodStart).toLocaleDateString()} -{' '}
            {new Date(data.periodEnd).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Gross Margin</p>
            <p className="text-xl font-semibold text-[hsl(var(--primary))]">
              {data.summary.grossMargin.current}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Net Profit</p>
            <p className="text-xl font-semibold text-green-600">
              {formatCurrency(data.summary.netProfit.current)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={prepareChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => formatCurrency(value).split('.')[0]} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `${label}`}
              />
              <Bar name="Current Period" dataKey="current" fill="hsl(var(--primary))" />
              <Bar name="Previous Period" dataKey="previous" fill="hsl(var(--primary) / 0.3)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mt-8">
          {[
            {
              label: 'Revenue Growth',
              value: data.items.find(i => i.id === 'income')?.percentageChange || 0,
              color: 'text-green-600',
            },
            {
              label: 'Expense Growth',
              value: data.items.find(i => i.id === 'expenses')?.percentageChange || 0,
              color: 'text-yellow-600',
            },
            {
              label: 'Profit Growth',
              value: data.summary.netProfit.percentageChange,
              color: 'text-blue-600',
            },
          ].map((metric) => (
            <div key={metric.label} className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">{metric.label}</p>
              <p className={`text-2xl font-semibold ${metric.color}`}>
                {metric.value > 0 ? '+' : ''}{metric.value}%
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="table-container custom-scrollbar">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[hsl(var(--navy-50))]">
              <tr>
                <th className="table-header text-left">Account</th>
                <th className="table-header text-right">Current Period</th>
                <th className="table-header text-right">Previous Period</th>
                <th className="table-header text-right">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {data.items.map((item) => renderPLItem(item))}
              <tr className="table-row">
                <td className="table-cell font-medium">Gross Profit</td>
                <td className="table-cell text-right">{formatCurrency(data.summary.grossProfit.current)}</td>
                <td className="table-cell text-right">{formatCurrency(data.summary.grossProfit.previous)}</td>
                <td className={`table-cell text-right ${
                  data.summary.grossProfit.percentageChange > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.summary.grossProfit.percentageChange > 0 ? '+' : ''}{data.summary.grossProfit.percentageChange}%
                </td>
              </tr>
              <tr className="table-row">
                <td className="table-cell font-medium">Net Profit</td>
                <td className="table-cell text-right">{formatCurrency(data.summary.netProfit.current)}</td>
                <td className="table-cell text-right">{formatCurrency(data.summary.netProfit.previous)}</td>
                <td className={`table-cell text-right ${
                  data.summary.netProfit.percentageChange > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.summary.netProfit.percentageChange > 0 ? '+' : ''}{data.summary.netProfit.percentageChange}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 