import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { formatCurrency } from '../utils/formatters';

interface RevenueChartProps {
  data: Array<{ month: string; amount: number }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="dashboard-card h-[300px]">
      <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary-light))" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="hsl(var(--primary-light))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--navy-200))" />
          <XAxis dataKey="month" stroke="hsl(var(--navy-600))" />
          <YAxis stroke="hsl(var(--navy-600))" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid hsl(var(--navy-200))',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="hsl(var(--primary))" 
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 