import { useState } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { taxCalendarData } from '../mockData';

interface TaxCalendarDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaxCalendarDialog({ isOpen, onClose }: TaxCalendarDialogProps) {
  const [view, setView] = useState<'calendar' | 'list'>('list');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Tax Calendar</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setView('list')}
                className={`px-3 py-1 rounded-lg ${
                  view === 'list' 
                    ? 'bg-[hsl(var(--primary))] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`px-3 py-1 rounded-lg ${
                  view === 'calendar' 
                    ? 'bg-[hsl(var(--primary))] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Calendar View
              </button>
            </div>
            <select className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]">
              <option>Next 30 Days</option>
              <option>Next Quarter</option>
              <option>Next 6 Months</option>
            </select>
          </div>

          <div className="space-y-4">
            {taxCalendarData.upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    event.type === 'payment' ? 'bg-blue-50 text-blue-600' :
                    event.type === 'filing' ? 'bg-purple-50 text-purple-600' :
                    'bg-orange-50 text-orange-600'
                  }`}>
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-500">Due: {formatDate(event.dueDate)}</p>
                    {event.amount && (
                      <p className="text-sm font-medium text-gray-700">
                        Amount: {formatCurrency(event.amount)}
                      </p>
                    )}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  event.status === 'upcoming' ? 'bg-yellow-50 text-yellow-600' :
                  event.status === 'completed' ? 'bg-green-50 text-green-600' :
                  'bg-red-50 text-red-600'
                }`}>
                  {event.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 