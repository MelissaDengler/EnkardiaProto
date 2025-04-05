import { useState } from 'react';
import { 
  X, AlertCircle, CheckCircle, Clock, FileText, 
  Download, Filter, Search, Calendar, ArrowUpRight,
  Bell, CheckCircle2, AlertTriangle, Plus
} from 'lucide-react';
import { formatDate, formatCurrency } from '../utils/formatters';
import { complianceData, complianceReports } from '../mockData';

interface ComplianceDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComplianceDialog({ isOpen, onClose }: ComplianceDialogProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'returns' | 'certificates' | 'alerts'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: string) => {
    const colors = {
      up_to_date: 'bg-green-50 text-green-600',
      pending: 'bg-yellow-50 text-yellow-600',
      overdue: 'bg-red-50 text-red-600',
      attention_needed: 'bg-orange-50 text-orange-600',
      active: 'bg-green-50 text-green-600',
      draft: 'bg-blue-50 text-blue-600',
      expired: 'bg-red-50 text-red-600'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-50 text-gray-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Compliance Dashboard</h2>
              <p className="text-sm text-gray-500 mt-1">
                Last updated: {formatDate(new Date().toISOString())}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
                <Bell className="h-4 w-4" />
                Set Alerts
              </button>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Up to Date</span>
              </div>
              <p className="text-2xl font-bold text-green-700">{complianceData.summary.upToDate}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-600 mb-2">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Pending</span>
              </div>
              <p className="text-2xl font-bold text-yellow-700">{complianceData.summary.pending}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Overdue</span>
              </div>
              <p className="text-2xl font-bold text-red-700">{complianceData.summary.overdue}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Total Items</span>
              </div>
              <p className="text-2xl font-bold text-blue-700">{complianceData.summary.totalItems}</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search compliance items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
              >
                <option value="all">All Status</option>
                <option value="up_to_date">Up to Date</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
                <Download className="h-4 w-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
                <Calendar className="h-4 w-4" />
                Calendar View
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 border-b mb-6">
            {[
              { id: 'overview', label: 'Overview', icon: CheckCircle2 },
              { id: 'returns', label: 'Tax Returns', icon: FileText },
              { id: 'certificates', label: 'Certificates', icon: CheckCircle },
              { id: 'alerts', label: 'Alerts & Reminders', icon: Bell },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 font-medium flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--primary))]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content with Scroll */}
          <div className="overflow-y-auto max-h-[calc(90vh-300px)] pr-2 custom-scrollbar">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Upcoming Deadlines Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    Upcoming Deadlines
                  </h3>
                  <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-yellow-800">VAT Return Due Soon</h4>
                        <p className="text-sm text-yellow-700">Due in 5 days - April 25, 2024</p>
                      </div>
                      <button className="px-3 py-1.5 bg-white text-yellow-700 border border-yellow-200 rounded-lg text-sm hover:bg-yellow-50">
                        Take Action
                      </button>
                    </div>
                  </div>
                </div>

                {/* Existing Items List */}
                {complianceData.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          item.priority === 'high' ? 'bg-red-100 text-red-600' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      <p className="text-sm text-gray-500">Due: {formatDate(item.dueDate)}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      item.status === 'up_to_date' ? 'bg-green-50 text-green-600' :
                      item.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                      item.status === 'overdue' ? 'bg-red-50 text-red-600' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="text-sm text-[hsl(var(--primary))] hover:underline">
                        View Details
                      </button>
                      <button className="text-sm text-[hsl(var(--primary))] hover:underline">
                        Set Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'returns' && (
              <div className="space-y-4">
                {/* Quick Actions */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Tax Returns</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary))] text-white rounded-lg hover:bg-[hsl(var(--primary))/.9]">
                    <Plus className="h-4 w-4" />
                    New Return
                  </button>
                </div>
                
                {/* Returns Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {complianceReports.taxReturns.map((taxReturn) => (
                    <div key={taxReturn.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{taxReturn.type}</h3>
                          <p className="text-sm text-gray-500">Period: {taxReturn.period}</p>
                          <p className="text-sm text-gray-500">Due: {formatDate(taxReturn.dueDate)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          taxReturn.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                          taxReturn.status === 'draft' ? 'bg-blue-50 text-blue-600' :
                          'bg-green-50 text-green-600'
                        }`}>
                          {taxReturn.status}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <button className="flex-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
                          View Details
                        </button>
                        <button className="flex-1 px-3 py-1.5 text-sm bg-[hsl(var(--primary))] text-white rounded-lg hover:bg-[hsl(var(--primary))/.9]">
                          Continue Filing
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'certificates' && (
              <div className="space-y-4">
                {complianceReports.certificates.map((cert) => (
                  <div key={cert.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{cert.type}</h3>
                        <p className="text-sm text-gray-500">
                          Valid: {formatDate(cert.issueDate)} - {formatDate(cert.expiryDate)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        cert.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              All systems up to date
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border rounded-lg hover:bg-white">
                View Audit Log
              </button>
              <button className="px-4 py-2 bg-[hsl(var(--primary))] text-white rounded-lg hover:bg-[hsl(var(--primary))/.9]">
                Schedule Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 