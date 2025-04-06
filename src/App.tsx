import React, { useState } from 'react';
import {
  BarChart3,
  Upload,
  FileText,
  Phone,
  Mail,
  PlusCircle,
  Building2,
  TrendingUp,
  DollarSign,
  ChevronRight,
  Calendar,
  Bell,
  LogOut,
  HelpCircle,
  MinusCircle,
  RefreshCw,
  CheckCircle2,
  ArrowUpRight,
  FileBarChart,
  AlertCircle,
  Download,
  Filter,
} from 'lucide-react';
import { userData, profitAndLossData, financialKPIs } from './mockData';
import { formatCurrency, formatDate } from './utils/formatters';
import { RevenueChart } from './components/RevenueChart';
import { getDocumentStatusColor, getPriorityColor } from './mockData';
import { ProfitLossTable } from './components/ProfitLossTable';
import { ReportsDialog } from './components/ReportsDialog';
import { CustomReportsDialog } from './components/CustomReportsDialog';
import { TaxCalendarDialog } from './components/TaxCalendarDialog';
import { ComplianceDialog } from './components/ComplianceDialog';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { LoginForm } from './components/LoginForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ForgotPassword } from './components/ForgotPassword';
import { NewRequestMenu } from './components/NewRequestMenu';
import { UploadDialog } from './components/UploadDialog';
import { ExportOptions } from './components/ExportOptions';

function App() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const unreadNotifications = userData.notifications.filter(n => !n.read).length;
  const [showReportsDialog, setShowReportsDialog] = useState(false);
  const [showCustomReportsDialog, setShowCustomReportsDialog] = useState(false);
  const [showTaxCalendarDialog, setShowTaxCalendarDialog] = useState(false);
  const [showComplianceDialog, setShowComplianceDialog] = useState(false);
  const [showNewRequestMenu, setShowNewRequestMenu] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  // Define metrics array
  const metrics = [
    {
      label: 'Gross Profit',
      value: formatCurrency(userData.summary.grossProfit.current),
      change: `${userData.summary.grossProfit.percentageChange}%`,
      isPositive: userData.summary.grossProfit.percentageChange > 0
    },
    {
      label: 'Net Profit',
      value: formatCurrency(userData.summary.netProfit.current),
      change: `${userData.summary.netProfit.percentageChange}%`,
      isPositive: userData.summary.netProfit.percentageChange > 0
    },
    {
      label: 'Gross Margin',
      value: `${userData.summary.grossMargin.current}%`,
      change: `${userData.summary.grossMargin.percentageChange}%`,
      isPositive: userData.summary.grossMargin.percentageChange > 0
    },
    {
      label: 'Operating Expenses',
      value: formatCurrency(userData.summary.operatingExpenses.current),
      change: `${userData.summary.operatingExpenses.percentageChange}%`,
      isPositive: userData.summary.operatingExpenses.percentageChange < 0 // Note: for expenses, negative change is positive
    }
  ];

  const handleXeroSync = () => {
    setIsSyncing(true);
    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50">
                  {/* Header */}
                  <header className="bg-gradient-to-r from-[hsl(var(--navy-600))] to-[hsl(var(--navy-700))] shadow-md sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Building2 className="h-8 w-8 text-[hsl(var(--primary-light))]" />
                          <span className="ml-2 text-2xl font-semibold text-white">Enkardia</span>
                        </div>
                        <nav className="flex items-center space-x-4">
                          <button 
                            className="relative p-2 text-gray-300 hover:text-white
                                     hover:bg-white/10 rounded-lg transition-all duration-200"
                            onClick={() => setShowNotifications(!showNotifications)}
                          >
                            <Bell className="h-5 w-5" />
                            {unreadNotifications > 0 && (
                              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 
                                           rounded-full flex items-center justify-center text-xs text-white">
                                {unreadNotifications}
                              </span>
                            )}
                          </button>
                          <button 
                            className="flex items-center gap-2 px-4 py-2 
                                     bg-[hsl(var(--primary-light))] text-white rounded-lg
                                     hover:bg-[hsl(var(--primary))] 
                                     active:bg-[hsl(var(--primary-dark))]
                                     transition-all duration-200"
                            onClick={() => setShowNewRequestMenu(true)}
                          >
                            <PlusCircle className="h-5 w-5" />
                            New Request
                          </button>
                          <button className="p-2 text-gray-300 hover:text-white
                                          hover:bg-white/10 rounded-lg transition-all duration-200">
                            <LogOut className="h-5 w-5" />
                          </button>
                        </nav>
                      </div>
                    </div>
                  </header>

                  {/* Main Content */}
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                      <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {userData.clientName}
                      </h1>
                      <p className="mt-2 text-gray-600">
                        Here's an overview of your financial performance
                      </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex space-x-4 mb-8 border-b">
                      {['overview', 'financials', 'documents'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-4 py-2 font-medium capitalize ${
                            activeTab === tab
                              ? 'text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--primary))]'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Overview Tab Content */}
                    {activeTab === 'overview' && (
                      <div className="space-y-10">
                        <div className="max-w-[1200px] mx-auto space-y-10">
                          {/* Stats Card */}
                          <div className="card-premium card-transition w-full overflow-hidden">
                            <div className="card-header-premium p-6 sm:p-8 bg-gradient-to-r from-[hsl(var(--navy-600))] to-[hsl(var(--navy-700))]">
                              <h2 className="text-2xl font-bold text-white">Performance Overview</h2>
                            </div>
                            <div className="p-6 sm:p-8">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="glass-effect p-6 rounded-xl hover:shadow-md transition-all duration-300
                                             border border-[hsl(var(--navy-100))] hover:border-[hsl(var(--navy-200))]">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[hsl(var(--navy-600))] text-sm font-medium">Revenue YTD</span>
                                    <div className="p-2 rounded-lg bg-[hsl(var(--gray-soft))]">
                                      <TrendingUp className="h-5 w-5 text-[hsl(var(--navy-600))]" />
                                    </div>
                                  </div>
                                  <span className="text-2xl font-bold text-gray-900 mt-3 block">{formatCurrency(userData.stats.revenueYTD)}</span>
                                  <span className="text-sm text-green-600 flex items-center gap-1 mt-2">
                                    <ArrowUpRight className="h-4 w-4" />
                                    +{userData.stats.revenueGrowth}% vs last year
                                  </span>
                                </div>

                                <div className="glass-effect p-6 rounded-xl hover:shadow-md transition-all duration-300
                                             border border-[hsl(var(--navy-100))] hover:border-[hsl(var(--navy-200))]">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[hsl(var(--navy-600))] text-sm font-medium">Profit Margin</span>
                                    <div className="p-2 rounded-lg bg-[hsl(var(--gray-soft))]">
                                      <DollarSign className="h-5 w-5 text-[hsl(var(--navy-600))]" />
                                    </div>
                                  </div>
                                  <span className="text-2xl font-bold text-gray-900 mt-3 block">24.8%</span>
                                  <span className="text-sm text-[hsl(var(--primary))]">Industry avg: 22%</span>
                                </div>

                                <div className="glass-effect p-6 rounded-xl hover:shadow-md transition-all duration-300
                                             border border-[hsl(var(--navy-100))] hover:border-[hsl(var(--navy-200))]">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[hsl(var(--navy-600))] text-sm font-medium">Open Requests</span>
                                    <div className="p-2 rounded-lg bg-[hsl(var(--gray-soft))]">
                                      <FileText className="h-5 w-5 text-orange-500" />
                                    </div>
                                  </div>
                                  <span className="text-2xl font-bold text-gray-900 mt-3 block">3</span>
                                  <span className="text-sm text-gray-500">2 pending review</span>
                                </div>

                                <div className="glass-effect p-6 rounded-xl hover:shadow-md transition-all duration-300
                                             border border-[hsl(var(--navy-100))] hover:border-[hsl(var(--navy-200))]">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[hsl(var(--navy-600))] text-sm font-medium">Next Review</span>
                                    <div className="p-2 rounded-lg bg-[hsl(var(--gray-soft))]">
                                      <Calendar className="h-5 w-5 text-purple-500" />
                                    </div>
                                  </div>
                                  <span className="text-2xl font-bold text-gray-900 mt-3 block">Apr 15</span>
                                  <span className="text-sm text-gray-500">Quarterly Review</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Revenue Chart - Enhanced styling */}
                          <div className="card-premium card-transition">
                            <div className="card-header-premium p-6 bg-gradient-to-r from-[hsl(var(--navy-600))] to-[hsl(var(--navy-700))]">
                              <h2 className="text-xl font-bold text-white">Revenue Trend</h2>
                            </div>
                            <div className="p-6">
                              <RevenueChart data={userData.stats.monthlyRevenue} />
                            </div>
                          </div>

                          {/* Upcoming Tasks - Enhanced styling */}
                          <div className="card-premium card-transition">
                            <div className="card-header-premium p-6 bg-gradient-to-r from-[hsl(var(--navy-600))] to-[hsl(var(--navy-700))]">
                              <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white">Upcoming Tasks</h2>
                                <button className="text-sm text-white/80 hover:text-white transition-colors">
                                  View All
                                </button>
                              </div>
                            </div>
                            <div className="p-6">
                              <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar-premium">
                                {userData.upcomingTasks.map((task) => (
                                  <div key={task.id} 
                                    className="glass-effect p-4 rounded-xl hover:shadow-md transition-all duration-300
                                             border border-[hsl(var(--navy-100))] hover:border-[hsl(var(--navy-200))]
                                             flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                                        {task.priority}
                                      </div>
                                      <div>
                                        <p className="font-medium">{task.title}</p>
                                        <p className="text-sm text-gray-500">Due: {formatDate(task.dueDate)}</p>
                                      </div>
                                    </div>
                                    <button className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-dark))] transition-colors text-sm">
                                      Complete
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions at the bottom */}
                          <div className="card-premium card-transition">
                            <div className="card-header-premium p-6 bg-gradient-to-r from-[hsl(var(--navy-600))] to-[hsl(var(--navy-700))]">
                              <h3 className="text-xl font-bold text-white">Quick Actions</h3>
                            </div>
                            <div className="p-6 sm:p-8">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <button 
                                  onClick={() => setShowUploadDialog(true)}
                                  className="glass-effect h-[72px] flex items-center justify-between px-6
                                           hover:shadow-md transition-all duration-300
                                           border border-[hsl(var(--navy-100))] hover:border-[hsl(var(--navy-200))]
                                           rounded-xl"
                                >
                                  <div className="flex items-center gap-3">
                                    <Upload className="h-5 w-5 text-[hsl(var(--navy-600))]" />
                                    <span className="font-medium text-gray-900">Upload Documents</span>
                                  </div>
                                  <ArrowUpRight className="h-5 w-5 text-[hsl(var(--navy-600))]" />
                                </button>

                                <button 
                                  onClick={() => setShowReportsDialog(true)}
                                  className="glass-effect h-[72px] flex items-center justify-between px-6
                                           hover:shadow-md transition-all duration-300
                                           border border-[hsl(var(--navy-100))] hover:border-[hsl(var(--navy-200))]
                                           rounded-xl"
                                >
                                  <div className="flex items-center gap-3">
                                    <FileBarChart className="h-5 w-5 text-[hsl(var(--navy-600))]" />
                                    <span className="font-medium text-gray-900">Generate Report</span>
                                  </div>
                                  <ArrowUpRight className="h-5 w-5 text-[hsl(var(--navy-600))]" />
                                </button>

                                <button 
                                  onClick={() => setShowTaxCalendarDialog(true)}
                                  className="glass-effect h-[72px] flex items-center justify-between px-6
                                           hover:shadow-md transition-all duration-300
                                           border border-[hsl(var(--navy-100))] hover:border-[hsl(var(--navy-200))]
                                           rounded-xl"
                                >
                                  <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-[hsl(var(--navy-600))]" />
                                    <span className="font-medium text-gray-900">Tax Calendar</span>
                                  </div>
                                  <ArrowUpRight className="h-5 w-5 text-[hsl(var(--navy-600))]" />
                                </button>

                                <button 
                                  onClick={() => setShowComplianceDialog(true)}
                                  className="glass-effect h-[72px] flex items-center justify-between px-6
                                           hover:shadow-md transition-all duration-300
                                           border border-[hsl(var(--navy-100))] hover:border-[hsl(var(--navy-200))]
                                           rounded-xl"
                                >
                                  <div className="flex items-center gap-3">
                                    <AlertCircle className="h-5 w-5 text-[hsl(var(--navy-600))]" />
                                    <span className="font-medium text-gray-900">Compliance Check</span>
                                  </div>
                                  <ArrowUpRight className="h-5 w-5 text-[hsl(var(--navy-600))]" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Financials Tab Content */}
                    {activeTab === 'financials' && (
                      <div className="space-y-10">
                        {/* Container for all financial cards */}
                        <div className="max-w-[1200px] mx-auto space-y-10">
                          {/* P&L Card First - Enhanced styling */}
                          <div className="card-premium card-transition w-full overflow-hidden">
                            <div className="card-header-premium p-6 sm:p-8 bg-gradient-to-r from-[hsl(var(--navy-600))] to-[hsl(var(--navy-700))]">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="space-y-2">
                                  <h2 className="text-2xl font-bold text-white">
                                    Profit & Loss Statement
                                  </h2>
                                  <p className="text-[hsl(var(--navy-200))] text-sm flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1">
                                      <RefreshCw className="h-4 w-4" />
                                      Last synced:
                                    </span>
                                    Today at 09:45 AM
                                  </p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                                  <div className="flex items-center gap-2 text-sm text-green-400 
                                               bg-[hsla(var(--navy-900))/0.3] backdrop-blur-sm 
                                               px-4 py-2 rounded-full border border-green-400/20
                                               shadow-inner">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span className="whitespace-nowrap">Connected to Xero</span>
                                  </div>
                                  <button 
                                    onClick={handleXeroSync}
                                    disabled={isSyncing}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 rounded-lg
                                             bg-white/10 hover:bg-white/15 backdrop-blur-sm
                                             border border-white/10 hover:border-white/20
                                             text-white transition-all duration-200
                                             disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                                    {isSyncing ? 'Syncing...' : 'Sync with Xero'}
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Controls section - Enhanced styling */}
                            <div className="glass-effect p-6 sm:p-8 border-b border-[hsl(var(--navy-100))]">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                                  <select className="filter-select min-w-[180px] shadow-sm">
                                    <option>Last 12 Months</option>
                                    <option>This Year</option>
                                    <option>Last Year</option>
                                    <option>Custom Range</option>
                                  </select>
                                  <select className="filter-select min-w-[180px] shadow-sm">
                                    <option>All Accounts</option>
                                    <option>Operating Only</option>
                                    <option>Investment Only</option>
                                  </select>
                                </div>
                                <div className="relative z-10">
                                  <ExportOptions data={profitAndLossData} />
                                </div>
                              </div>
                            </div>

                            {/* Table container - Enhanced styling */}
                            <div className="p-6 sm:p-8 bg-white backdrop-blur-sm overflow-x-auto">
                              <ProfitLossTable data={profitAndLossData} />
                            </div>
                          </div>

                          {/* Overview Section - Enhanced styling */}
                          <div className="card-premium transform transition-all duration-300 hover:shadow-lg">
                            <div className="card-header-premium p-6 bg-gradient-to-r from-[hsl(var(--navy-600))] to-[hsl(var(--navy-700))]">
                              <h3 className="text-xl font-bold text-white">Financial Overview</h3>
                            </div>
                            <div className="p-6 sm:p-8">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                                {metrics.map((metric, index) => (
                                  <div key={index} 
                                    className="glass-effect p-6 rounded-xl hover:shadow-md transition-all duration-300
                                             border border-[hsl(var(--navy-100))] hover:border-[hsl(var(--navy-200))]"
                                  >
                                    <p className="text-[hsl(var(--navy-600))] text-sm font-medium">{metric.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-3">{metric.value}</p>
                                    <p className={`text-sm mt-3 flex items-center gap-1
                                      ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                      <ArrowUpRight className="h-4 w-4" />
                                      {metric.isPositive ? '+' : ''}{metric.change}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* KPI Section - Enhanced styling */}
                          <div className="card-premium transform transition-all duration-300 hover:shadow-lg">
                            <div className="card-header-premium p-6 bg-gradient-to-r from-[hsl(var(--navy-600))] to-[hsl(var(--navy-700))]">
                              <h3 className="text-xl font-bold text-white">Key Performance Indicators</h3>
                            </div>
                            <div className="p-6 sm:p-8">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {/* Operating Margin */}
                                <div className="glass-effect p-6 rounded-xl">
                                  <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-medium text-gray-900">Operating Margin</h4>
                                    <div className="p-2 rounded-lg bg-[hsl(var(--gray-soft))]">
                                      <BarChart3 className="h-5 w-5 text-[hsl(var(--navy-600))]" />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-end justify-between">
                                      <span className="text-3xl font-bold text-gray-900">{financialKPIs.operatingMargin.current}%</span>
                                      <span className={`text-sm ${financialKPIs.operatingMargin.change > 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                                        <ArrowUpRight className="h-4 w-4" />
                                        {financialKPIs.operatingMargin.change > 0 ? '+' : ''}{financialKPIs.operatingMargin.change}%
                                      </span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-[hsl(var(--navy-600))] rounded-full" 
                                        style={{ width: `${financialKPIs.operatingMargin.current}%` }} 
                                      />
                                    </div>
                                    <p className="text-sm text-gray-500">Target: {financialKPIs.operatingMargin.target}%</p>
                                  </div>
                                </div>

                                {/* Working Capital Ratio */}
                                <div className="glass-effect p-6 rounded-xl">
                                  <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-medium text-gray-900">Working Capital Ratio</h4>
                                    <div className="p-2 rounded-lg bg-[hsl(var(--gray-soft))]">
                                      <DollarSign className="h-5 w-5 text-[hsl(var(--navy-600))]" />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-end justify-between">
                                      <span className="text-3xl font-bold text-gray-900">{financialKPIs.workingCapitalRatio.current}</span>
                                      <span className={`text-sm ${financialKPIs.workingCapitalRatio.change > 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                                        <ArrowUpRight className="h-4 w-4" />
                                        {financialKPIs.workingCapitalRatio.change > 0 ? '+' : ''}{financialKPIs.workingCapitalRatio.change}
                                      </span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-[hsl(var(--navy-600))] rounded-full" 
                                        style={{ width: `${(financialKPIs.workingCapitalRatio.current / 3) * 100}%` }} 
                                      />
                                    </div>
                                    <p className="text-sm text-gray-500">Industry avg: {financialKPIs.workingCapitalRatio.industryAvg}</p>
                                  </div>
                                </div>

                                {/* Debt to Equity */}
                                <div className="glass-effect p-6 rounded-xl">
                                  <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-medium text-gray-900">Debt to Equity</h4>
                                    <div className="p-2 rounded-lg bg-[hsl(var(--gray-soft))]">
                                      <TrendingUp className="h-5 w-5 text-[hsl(var(--navy-600))]" />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-end justify-between">
                                      <span className="text-3xl font-bold text-gray-900">{financialKPIs.debtToEquity.current}</span>
                                      <span className={`text-sm ${financialKPIs.debtToEquity.change < 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                                        <ArrowUpRight className="h-4 w-4" />
                                        {financialKPIs.debtToEquity.change}
                                      </span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-[hsl(var(--navy-600))] rounded-full" 
                                        style={{ width: `${(financialKPIs.debtToEquity.current / financialKPIs.debtToEquity.target) * 100}%` }} 
                                      />
                                    </div>
                                    <p className="text-sm text-gray-500">Target: less than {financialKPIs.debtToEquity.target}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Documents Tab Content */}
                    {activeTab === 'documents' && (
                      <div className="max-w-[1200px] mx-auto">
                        <div className="card-premium">
                          <div className="card-header-premium p-6">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-bold text-white">Financial Documents</h3>
                              <button 
                                onClick={() => setShowUploadDialog(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg
                                         bg-white/10 hover:bg-white/15 backdrop-blur-sm
                                         border border-white/10 hover:border-white/20
                                         text-white transition-all duration-200"
                              >
                                <Upload className="h-4 w-4" />
                                Upload New
                              </button>
                            </div>
                          </div>
                          <div className="p-6">
                            {/* Document filters */}
                            <div className="flex gap-4 mb-6">
                              <select className="filter-select">
                                <option>All Documents</option>
                                <option>Tax Documents</option>
                                <option>Financial Statements</option>
                                <option>Reports</option>
                              </select>
                              <select className="filter-select">
                                <option>Sort by Date</option>
                                <option>Sort by Name</option>
                                <option>Sort by Status</option>
                              </select>
                            </div>
                            
                            <div className="space-y-4">
                              {userData.recentDocuments.map((doc) => (
                                <div key={doc.id} 
                                  className="glass-effect hover-float p-4 rounded-lg flex items-center justify-between"
                                >
                                  <div className="flex items-center space-x-4">
                                    <FileText className="h-6 w-6 text-[hsl(var(--primary))]" />
                                    <div>
                                      <h4 className="font-medium">{doc.title}</h4>
                                      <div className="flex items-center space-x-3 mt-1">
                                        <span className="text-sm text-gray-500">{formatDate(doc.date)}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${getDocumentStatusColor(doc.status)}`}>
                                          {doc.status.replace('_', ' ')}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <button className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))/.8]">
                                    Download
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </main>

                  {/* Reports Dialog */}
                  <ReportsDialog 
                    isOpen={showReportsDialog} 
                    onClose={() => setShowReportsDialog(false)} 
                  />
                  <CustomReportsDialog 
                    isOpen={showCustomReportsDialog} 
                    onClose={() => setShowCustomReportsDialog(false)} 
                  />
                  <TaxCalendarDialog 
                    isOpen={showTaxCalendarDialog} 
                    onClose={() => setShowTaxCalendarDialog(false)} 
                  />
                  <ComplianceDialog 
                    isOpen={showComplianceDialog} 
                    onClose={() => setShowComplianceDialog(false)} 
                  />

                  {/* New Request Menu */}
                  <NewRequestMenu 
                    isOpen={showNewRequestMenu} 
                    onClose={() => setShowNewRequestMenu(false)} 
                  />

                  {/* Upload Dialog */}
                  <UploadDialog 
                    isOpen={showUploadDialog}
                    onClose={() => setShowUploadDialog(false)}
                  />
                </div>
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;