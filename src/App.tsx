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
import { userData, profitAndLossData } from './mockData';
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
                  <header className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Building2 className="h-8 w-8 text-[hsl(var(--primary))]" />
                          <span className="ml-2 text-2xl font-semibold text-gray-900">Enkardia</span>
                        </div>
                        <nav className="flex items-center space-x-4">
                          <button 
                            className="relative p-2 text-gray-600 hover:text-[hsl(var(--primary))]"
                            onClick={() => setShowNotifications(!showNotifications)}
                          >
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                          </button>
                          <button className="action-button">
                            <PlusCircle className="h-5 w-5" />
                            New Request
                          </button>
                          <button className="p-2 text-gray-600 hover:text-[hsl(var(--primary))]">
                            <LogOut className="h-5 w-5" />
                          </button>
                        </nav>
                      </div>
                    </div>
                    
                    {/* Notifications dropdown */}
                    {showNotifications && (
                      <div className="absolute right-4 mt-2 w-80 bg-white rounded-lg shadow-lg border p-4">
                        <h3 className="font-medium mb-2">Notifications</h3>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                          <div className="text-sm p-2 hover:bg-gray-50 rounded">
                            <p className="font-medium">New report available</p>
                            <p className="text-gray-500">Q1 2024 Financial Report is ready for review</p>
                          </div>
                          <div className="text-sm p-2 hover:bg-gray-50 rounded">
                            <p className="font-medium">Upcoming Review</p>
                            <p className="text-gray-500">Quarterly review scheduled for Apr 15</p>
                          </div>
                        </div>
                      </div>
                    )}
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
                      {['overview', 'documents', 'tasks', 'team', 'financials'].map((tab) => (
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

                    {/* Quick Actions */}
                    {activeTab === 'overview' && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <button className="dashboard-card flex items-center justify-between group">
                            <div className="flex items-center">
                              <div className="p-3 rounded-full bg-blue-50">
                                <Upload className="h-6 w-6 text-[hsl(var(--primary))]" />
                              </div>
                              <span className="ml-4 font-medium">Upload Documents</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[hsl(var(--primary))]" />
                          </button>

                          <button className="dashboard-card flex items-center justify-between group">
                            <div className="flex items-center">
                              <div className="p-3 rounded-full bg-blue-50">
                                <FileText className="h-6 w-6 text-[hsl(var(--primary))]" />
                              </div>
                              <span className="ml-4 font-medium">View Reports</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[hsl(var(--primary))]" />
                          </button>

                          <button className="dashboard-card flex items-center justify-between group">
                            <div className="flex items-center">
                              <div className="p-3 rounded-full bg-blue-50">
                                <BarChart3 className="h-6 w-6 text-[hsl(var(--primary))]" />
                              </div>
                              <span className="ml-4 font-medium">Financial Dashboard</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[hsl(var(--primary))]" />
                          </button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                          <div className="stat-card">
                            <div className="flex items-center justify-between">
                              <span className="stat-label">Revenue YTD</span>
                              <TrendingUp className="h-5 w-5 text-green-500" />
                            </div>
                            <span className="stat-value">{formatCurrency(userData.stats.revenueYTD)}</span>
                            <span className="text-sm text-green-600">
                              +{userData.stats.revenueGrowth}% vs last year
                            </span>
                          </div>

                          <div className="stat-card">
                            <div className="flex items-center justify-between">
                              <span className="stat-label">Profit Margin</span>
                              <DollarSign className="h-5 w-5 text-[hsl(var(--primary))]" />
                            </div>
                            <span className="stat-value">24.8%</span>
                            <span className="text-sm text-[hsl(var(--primary))]">Industry avg: 22%</span>
                          </div>

                          <div className="stat-card">
                            <div className="flex items-center justify-between">
                              <span className="stat-label">Open Requests</span>
                              <FileText className="h-5 w-5 text-orange-500" />
                            </div>
                            <span className="stat-value">3</span>
                            <span className="text-sm text-gray-500">2 pending review</span>
                          </div>

                          <div className="stat-card">
                            <div className="flex items-center justify-between">
                              <span className="stat-label">Next Review</span>
                              <Calendar className="h-5 w-5 text-purple-500" />
                            </div>
                            <span className="stat-value">Apr 15</span>
                            <span className="text-sm text-gray-500">Quarterly Review</span>
                          </div>
                        </div>

                        {/* Revenue Chart */}
                        <div className="mb-8">
                          <RevenueChart data={userData.stats.monthlyRevenue} />
                        </div>

                        {/* Upcoming Tasks */}
                        <div className="dashboard-card mb-8">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
                            <button className="text-sm text-[hsl(var(--primary))] hover:underline">
                              View All
                            </button>
                          </div>
                          <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                            {userData.upcomingTasks.map((task) => (
                              <div key={task.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <div className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                  </div>
                                  <div>
                                    <p className="font-medium">{task.title}</p>
                                    <p className="text-sm text-gray-500">Due: {formatDate(task.dueDate)}</p>
                                  </div>
                                </div>
                                <button className="text-[hsl(var(--primary))] hover:underline text-sm">
                                  Complete
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Documents Tab Content */}
                    {activeTab === 'documents' && (
                      <div className="space-y-6">
                        {/* Upload Section */}
                        <div className="dashboard-card">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h2 className="text-xl font-semibold">Upload Documents</h2>
                              <p className="text-sm text-gray-500 mt-1">
                                Supported formats: PDF, DOCX, XLSX (max 10MB)
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <button 
                                className="text-sm text-gray-500 hover:text-[hsl(var(--primary))] flex items-center gap-2"
                                onClick={() => document.getElementById('folderUpload')?.click()}
                              >
                                <Upload className="h-4 w-4" />
                                Upload Folder
                              </button>
                              <button 
                                className="action-button"
                                onClick={() => document.getElementById('fileUpload')?.click()}
                              >
                                <Upload className="h-5 w-5" />
                                Upload Files
                              </button>
                            </div>
                          </div>

                          {/* Hidden File Inputs */}
                          <input
                            type="file"
                            id="fileUpload"
                            className="hidden"
                            multiple
                            accept=".pdf,.docx,.xlsx"
                            onChange={(e) => {
                              // Handle file upload
                              const files = e.target.files;
                              if (files) {
                                // You would typically handle the upload here
                                console.log('Files selected:', files);
                              }
                            }}
                          />
                          <input
                            type="file"
                            id="folderUpload"
                            className="hidden"
                            // @ts-ignore - webkitdirectory is not in the types
                            webkitdirectory=""
                            directory=""
                            onChange={(e) => {
                              // Handle folder upload
                              const files = e.target.files;
                              if (files) {
                                // You would typically handle the upload here
                                console.log('Folder selected:', files);
                              }
                            }}
                          />

                          {/* Drag and Drop Zone */}
                          <div 
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[hsl(var(--primary))] transition-colors"
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.add('border-[hsl(var(--primary))]');
                            }}
                            onDragLeave={(e) => {
                              e.currentTarget.classList.remove('border-[hsl(var(--primary))]');
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.remove('border-[hsl(var(--primary))]');
                              const files = e.dataTransfer.files;
                              if (files) {
                                // You would typically handle the upload here
                                console.log('Files dropped:', files);
                              }
                            }}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <Upload className="h-8 w-8 text-gray-400" />
                              <p className="text-gray-600">
                                Drag and drop your files here, or{' '}
                                <button 
                                  className="text-[hsl(var(--primary))] hover:underline"
                                  onClick={() => document.getElementById('fileUpload')?.click()}
                                >
                                  browse
                                </button>
                              </p>
                              <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
                            </div>
                          </div>
                        </div>

                        {/* Recent Documents Heading */}
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-semibold">Recent Documents</h2>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Search documents..."
                              className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                            />
                            <select className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]">
                              <option value="all">All Types</option>
                              <option value="report">Reports</option>
                              <option value="document">Documents</option>
                              <option value="strategy">Strategy</option>
                            </select>
                          </div>
                        </div>

                        {/* Documents list container */}
                        <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                          {userData.recentDocuments.map((doc) => (
                            <div key={doc.id} className="dashboard-card hover-card">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <FileText className="h-8 w-8 text-[hsl(var(--primary))]" />
                                  <div>
                                    <h3 className="font-medium">{doc.title}</h3>
                                    <div className="flex items-center space-x-3 mt-1">
                                      <span className="text-sm text-gray-500">{formatDate(doc.date)}</span>
                                      <span className="text-sm text-gray-500">{doc.size}</span>
                                      <span className={`px-2 py-1 rounded-full text-xs ${getDocumentStatusColor(doc.status)}`}>
                                        {doc.status.replace('_', ' ')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <button className="action-button">Download</button>
                                  <button className="action-button">View</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Section */}
                    <div className="dashboard-card mb-8">
                      <h2 className="text-xl font-semibold mb-6">
                        Your Enkardia Team
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {userData.team.map((member) => (
                          <div key={member.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-12 h-12 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-lg">{member.name}</h3>
                              <p className="text-sm text-gray-500 mb-3">{member.role}</p>
                              <div className="flex space-x-3">
                                <button 
                                  className="text-gray-600 hover:text-[hsl(var(--primary))] p-2 rounded-full hover:bg-gray-100"
                                  onClick={() => setShowContactInfo(member.id)}
                                >
                                  <Phone className="h-4 w-4" />
                                </button>
                                <button 
                                  className="text-gray-600 hover:text-[hsl(var(--primary))] p-2 rounded-full hover:bg-gray-100"
                                  onClick={() => window.location.href = `mailto:${member.email}`}
                                >
                                  <Mail className="h-4 w-4" />
                                </button>
                              </div>
                              {showContactInfo === member.id && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                                  <p className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    {member.phone}
                                  </p>
                                  <p className="flex items-center gap-2 mt-1">
                                    <Mail className="h-4 w-4" />
                                    {member.email}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Financials Tab Content */}
                    {activeTab === 'financials' && (
                      <div className="space-y-8">
                        {/* Sync Status Header */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-2xl font-semibold text-gray-900">Financial Overview</h2>
                            <p className="text-sm text-gray-500 mt-1">
                              Last synced with Xero: Today at 09:45 AM
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <CheckCircle2 className="h-4 w-4" />
                              Connected to Xero
                            </div>
                            <button 
                              onClick={handleXeroSync}
                              disabled={isSyncing}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium
                                ${isSyncing 
                                  ? 'bg-gray-50 text-gray-400 border-gray-200' 
                                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                } transition-colors`}
                            >
                              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                              {isSyncing ? 'Syncing...' : 'Sync with Xero'}
                            </button>
                          </div>
                        </div>

                        {/* Quick Actions Bar */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <button 
                            onClick={() => setShowReportsDialog(true)}
                            className="flex items-center justify-between p-4 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <FileBarChart className="h-5 w-5 text-[hsl(var(--primary))]" />
                              <span>Download Reports</span>
                            </div>
                            <Download className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => setShowCustomReportsDialog(true)}
                            className="flex items-center justify-between p-4 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Filter className="h-5 w-5 text-[hsl(var(--primary))]" />
                              <span>Custom Reports</span>
                            </div>
                            <ArrowUpRight className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => setShowTaxCalendarDialog(true)}
                            className="flex items-center justify-between p-4 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Calendar className="h-5 w-5 text-[hsl(var(--primary))]" />
                              <span>Tax Calendar</span>
                            </div>
                            <ArrowUpRight className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => setShowComplianceDialog(true)}
                            className="flex items-center justify-between p-4 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <AlertCircle className="h-5 w-5 text-[hsl(var(--primary))]" />
                              <span>Compliance</span>
                            </div>
                            <ArrowUpRight className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Financial Health Score */}
                        <div className="dashboard-card">
                          <div className="flex items-start justify-between mb-6">
                            <div>
                              <h3 className="text-lg font-semibold">Financial Health Score</h3>
                              <p className="text-sm text-gray-500">Based on key performance metrics</p>
                            </div>
                            <button className="text-sm text-[hsl(var(--primary))] hover:underline">View Details</button>
                          </div>
                          <div className="flex items-center gap-8">
                            <div className="relative w-32 h-32">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold text-[hsl(var(--primary))]">85</span>
                              </div>
                              <svg className="w-full h-full transform -rotate-90">
                                <circle
                                  cx="64"
                                  cy="64"
                                  r="56"
                                  stroke="currentColor"
                                  strokeWidth="8"
                                  fill="none"
                                  className="text-gray-100"
                                />
                                <circle
                                  cx="64"
                                  cy="64"
                                  r="56"
                                  stroke="currentColor"
                                  strokeWidth="8"
                                  fill="none"
                                  strokeDasharray="352"
                                  strokeDashoffset="52.8"
                                  className="text-[hsl(var(--primary))]"
                                />
                              </svg>
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-4">
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500">Liquidity Ratio</p>
                                <p className="text-xl font-semibold text-green-600">2.5</p>
                                <p className="text-xs text-gray-500">Industry avg: 2.1</p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500">Debt to Equity</p>
                                <p className="text-xl font-semibold text-blue-600">0.8</p>
                                <p className="text-xs text-gray-500">Industry avg: 1.2</p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500">Asset Turnover</p>
                                <p className="text-xl font-semibold text-purple-600">1.8</p>
                                <p className="text-xs text-gray-500">Industry avg: 1.5</p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500">Cash Flow Ratio</p>
                                <p className="text-xl font-semibold text-orange-600">1.4</p>
                                <p className="text-xs text-gray-500">Industry avg: 1.1</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Add before the P&L Table */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <select className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]">
                              <option>Last 12 Months</option>
                              <option>This Year</option>
                              <option>Last Year</option>
                              <option>Custom Range</option>
                            </select>
                            <select className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]">
                              <option>All Accounts</option>
                              <option>Operating Only</option>
                              <option>Investment Only</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
                              <Download className="h-4 w-4" />
                            </button>
                            <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
                              Print
                            </button>
                          </div>
                        </div>

                        {/* P&L Table with Chart */}
                        <div className="overflow-hidden rounded-lg">
                          <ProfitLossTable data={profitAndLossData} />
                        </div>

                        {/* Financial Insights Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="dashboard-card">
                              <h3 className="text-lg font-semibold mb-6">
                                Key Performance Indicators
                              </h3>
                              <div className="space-y-4">
                                {[
                                  {
                                    label: 'Operating Margin',
                                    value: '18.2%',
                                    change: '+2.1%',
                                    status: 'positive'
                                  },
                                  {
                                    label: 'Working Capital',
                                    value: formatCurrency(245000),
                                    change: '+8.5%',
                                    status: 'positive'
                                  },
                                  {
                                    label: 'Accounts Receivable',
                                    value: formatCurrency(89000),
                                    change: '-5.2%',
                                    status: 'negative'
                                  },
                                  {
                                    label: 'Cash Flow from Operations',
                                    value: formatCurrency(156000),
                                    change: '+12.3%',
                                    status: 'positive'
                                  }
                                ].map((kpi) => (
                                  <div key={kpi.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                      <p className="font-medium">{kpi.label}</p>
                                      <p className="text-2xl font-semibold">{kpi.value}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-sm ${
                                      kpi.status === 'positive' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                    }`}>
                                      {kpi.change}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="dashboard-card">
                              <h3 className="text-lg font-semibold mb-4">
                                Upcoming Financial Tasks
                              </h3>
                              <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                {userData.upcomingTasks.map((task) => (
                                  <div key={task.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                      <div className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                                        {task.priority}
                                      </div>
                                      <div>
                                        <p className="font-medium">{task.title}</p>
                                        <p className="text-sm text-gray-500">Due: {formatDate(task.dueDate)}</p>
                                      </div>
                                    </div>
                                    <button className="text-[hsl(var(--primary))] hover:underline text-sm">
                                      Action
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="dashboard-card bg-[hsl(var(--primary)_/_0.05)]">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold mb-2">Need Financial Advice?</h3>
                                  <p className="text-gray-600 mb-4">
                                    Schedule a consultation with your financial advisor to discuss your business performance and strategy.
                                  </p>
                                </div>
                                <span className="text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 p-2 rounded-full">
                                  <Phone className="h-5 w-5" />
                                </span>
                              </div>
                              <div className="flex gap-3">
                                <button className="action-button flex-1">Schedule Meeting</button>
                                <button className="border border-[hsl(var(--primary))] text-[hsl(var(--primary))] px-4 py-2 rounded-lg hover:bg-[hsl(var(--primary))]/5 transition-colors">
                                  Message
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="dashboard-card">
                          <h2 className="text-xl font-semibold mb-6">
                            <div className="flex items-center gap-3">
                              <HelpCircle className="h-6 w-6 text-[hsl(var(--primary))]" />
                              Frequently Asked Questions
                            </div>
                          </h2>
                          <div className="space-y-4">
                            {[
                              {
                                id: 'gross-profit',
                                question: 'What is Gross Profit?',
                                answer: 'Gross profit is your total revenue minus the cost of goods sold (COGS). It represents how much money you make from selling your products or services before accounting for operating expenses.'
                              },
                              {
                                id: 'operating-expenses',
                                question: 'What are Operating Expenses?',
                                answer: "Operating expenses include all costs associated with running your business that aren't directly tied to producing your goods or services. This includes rent, salaries, utilities, and administrative costs."
                              },
                              {
                                id: 'net-profit',
                                question: 'How is Net Profit calculated?',
                                answer: 'Net profit is calculated by subtracting all expenses (including operating expenses, tax, and interest) from your total revenue. It represents your true bottom line profit.'
                              },
                              {
                                id: 'margin',
                                question: 'What is a good profit margin?',
                                answer: "A good profit margin varies by industry. Generally, a net profit margin above 20% is considered excellent, 10-20% is good, and 5-10% is average. However, it's best to compare your margins with industry standards."
                              }
                            ].map(faq => (
                              <div key={faq.id} className="border rounded-lg">
                                <button
                                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                >
                                  <span className="font-medium text-left">{faq.question}</span>
                                  {expandedFaq === faq.id ? (
                                    <MinusCircle className="h-5 w-5 text-gray-400" />
                                  ) : (
                                    <PlusCircle className="h-5 w-5 text-gray-400" />
                                  )}
                                </button>
                                {expandedFaq === faq.id && (
                                  <div className="px-4 py-3 bg-gray-50 text-gray-600 border-t">
                                    {faq.answer}
                                  </div>
                                )}
                              </div>
                            ))}
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