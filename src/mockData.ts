export const userData = {
  clientName: "Herman Miny",
  company: "Anderson Consulting LLC",
  stats: {
    revenueYTD: 524790,
    revenueGrowth: 12.3,
    profitMargin: 24.8,
    industryAvgMargin: 22,
    openRequests: 3,
    pendingReviews: 2,
    monthlyRevenue: [
      { month: 'Jan', amount: 41000 },
      { month: 'Feb', amount: 45000 },
      { month: 'Mar', amount: 52000 },
      { month: 'Apr', amount: 48000 },
      { month: 'May', amount: 51000 },
      { month: 'Jun', amount: 55000 },
    ],
    nextReview: {
      date: "2024-04-15",
      type: "Quarterly Review",
      agenda: [
        "Financial Performance Review",
        "Investment Strategy Update",
        "Tax Planning Discussion"
      ]
    }
  },
  notifications: [
    {
      id: 1,
      type: "report",
      title: "New report available",
      message: "Q1 2024 Financial Report is ready for review",
      date: "2024-03-20",
      read: false
    },
    {
      id: 2,
      type: "review",
      title: "Upcoming Review",
      message: "Quarterly review scheduled for Apr 15",
      date: "2024-03-18",
      read: false
    },
    {
      id: 3,
      type: "document",
      title: "Document Signed",
      message: "Tax planning document has been signed",
      date: "2024-03-15",
      read: true
    }
  ],
  team: [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Account Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100",
      phone: "+1 (555) 123-4567",
      email: "sarah.j@enkardia.com",
      availability: "Available",
      nextAvailable: null
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Financial Advisor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100",
      phone: "+1 (555) 987-6543",
      email: "michael.c@enkardia.com",
      availability: "In Meeting",
      nextAvailable: "2:30 PM"
    }
  ],
  recentDocuments: [
    {
      id: 1,
      title: "Q1 2024 Financial Report",
      date: "2024-03-15",
      type: "report",
      status: "pending_review",
      size: "2.4 MB"
    },
    {
      id: 2,
      title: "Tax Planning Document",
      date: "2024-03-10",
      type: "document",
      status: "signed",
      size: "1.8 MB"
    },
    {
      id: 3,
      title: "Investment Strategy 2024",
      date: "2024-03-01",
      type: "strategy",
      status: "approved",
      size: "3.1 MB"
    }
  ],
  upcomingTasks: [
    {
      id: 1,
      title: "Review Q1 Financial Report",
      dueDate: "2024-03-25",
      priority: "high",
      status: "pending"
    },
    {
      id: 2,
      title: "Sign Updated Investment Policy",
      dueDate: "2024-03-28",
      priority: "medium",
      status: "pending"
    },
    {
      id: 3,
      title: "Schedule Tax Planning Meeting",
      dueDate: "2024-04-05",
      priority: "low",
      status: "pending"
    }
  ],
  summary: {
    grossProfit: {
      current: 241450,
      previous: 211111,
      percentageChange: 14.4
    },
    netProfit: {
      current: 130200,
      previous: 102344,
      percentageChange: 27.2
    },
    grossMargin: {
      current: 48.4,
      previous: 47.4,
      percentageChange: 2.1
    },
    operatingExpenses: {
      current: 394590,
      previous: 364890,
      percentageChange: -8.1
    }
  }
};

interface StatusColors {
  pending_review: string;
  signed: string;
  approved: string;
  draft: string;
  [key: string]: string;
}

const statusColors: StatusColors = {
  pending_review: "text-yellow-600 bg-yellow-50",
  signed: "text-green-600 bg-green-50",
  approved: "text-blue-600 bg-blue-50",
  draft: "text-gray-600 bg-gray-50"
};

export const getDocumentStatusColor = (status: string): string => {
  return statusColors[status] || "text-gray-600 bg-gray-50";
};

interface PriorityColors {
  high: string;
  medium: string;
  low: string;
  [key: string]: string;
}

const priorityColors: PriorityColors = {
  high: "text-red-600 bg-red-50",
  medium: "text-yellow-600 bg-yellow-50",
  low: "text-green-600 bg-green-50"
};

export const getPriorityColor = (priority: string): string => {
  return priorityColors[priority] || "text-gray-600 bg-gray-50";
};

type ProfitLossItem = {
  id: string;
  name: string;
  currentAmount: number;
  previousAmount: number;
  percentageChange: number;
  children?: ProfitLossItem[];
};

export const profitAndLossData = {
  periodStart: "2024-01-01",
  periodEnd: "2024-03-31",
  previousPeriodStart: "2023-01-01",
  previousPeriodEnd: "2023-03-31",
  items: [
    {
      id: "income",
      name: "Income",
      currentAmount: 524790,
      previousAmount: 467234,
      percentageChange: 12.3,
      children: [
        {
          id: "operating-revenue",
          name: "Operating Revenue",
          currentAmount: 498230,
          previousAmount: 445678,
          percentageChange: 11.8,
        },
        {
          id: "other-income",
          name: "Other Income",
          currentAmount: 26560,
          previousAmount: 21556,
          percentageChange: 23.2,
        }
      ]
    },
    {
      id: "expenses",
      name: "Expenses",
      currentAmount: 394590,
      previousAmount: 364890,
      percentageChange: 8.1,
      children: [
        {
          id: "cogs",
          name: "Cost of Goods Sold",
          currentAmount: 256780,
          previousAmount: 234567,
          percentageChange: 9.5,
        },
        {
          id: "operating-expenses",
          name: "Operating Expenses",
          currentAmount: 98450,
          previousAmount: 92345,
          percentageChange: 6.6,
          children: [
            {
              id: "salaries",
              name: "Salaries & Wages",
              currentAmount: 45670,
              previousAmount: 42345,
              percentageChange: 7.9,
            },
            {
              id: "rent",
              name: "Rent & Utilities",
              currentAmount: 28780,
              previousAmount: 27890,
              percentageChange: 3.2,
            },
            {
              id: "other-expenses",
              name: "Other Expenses",
              currentAmount: 24000,
              previousAmount: 22110,
              percentageChange: 8.5,
            }
          ]
        },
        {
          id: "depreciation",
          name: "Depreciation",
          currentAmount: 39360,
          previousAmount: 37978,
          percentageChange: 3.6,
        }
      ]
    }
  ],
  summary: {
    grossProfit: {
      current: 241450,
      previous: 211111,
      percentageChange: 14.4
    },
    netProfit: {
      current: 130200,
      previous: 102344,
      percentageChange: 27.2
    },
    grossMargin: {
      current: 48.4,
      previous: 47.4,
      percentageChange: 2.1
    }
  }
};

type ComplianceStatus = 'up_to_date' | 'pending' | 'overdue' | 'attention_needed';
type ComplianceCategory = 'tax' | 'regulatory' | 'financial' | 'governance';

interface ComplianceItem {
  id: string;
  title: string;
  dueDate: string;
  status: ComplianceStatus;
  category: ComplianceCategory;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface TaxCalendarEvent {
  id: string;
  title: string;
  dueDate: string;
  type: 'payment' | 'filing' | 'review';
  amount?: number;
  status: 'upcoming' | 'completed' | 'overdue';
  description: string;
}

interface TaxCalculation {
  year: number;
  quarter: number;
  estimates: {
    revenue: number;
    expenses: number;
    taxableIncome: number;
    estimatedTax: number;
    vatPayable: number;
    provisionalTax: number;
  };
  deductions: {
    category: string;
    amount: number;
    description: string;
  }[];
  credits: {
    type: string;
    amount: number;
    description: string;
  }[];
}

export const complianceData = {
  summary: {
    totalItems: 12,
    upToDate: 8,
    pending: 2,
    overdue: 1,
    attentionNeeded: 1,
  },
  items: [
    {
      id: 'comp-1',
      title: 'VAT Return Filing',
      dueDate: '2024-04-25',
      status: 'upcoming' as const,
      category: 'tax' as const,
      description: 'Submit VAT return for Q1 2024',
      priority: 'high' as const,
    },
    {
      id: 'comp-2',
      title: 'Annual Financial Statements',
      dueDate: '2024-06-30',
      status: 'pending' as const,
      category: 'financial' as const,
      description: 'Prepare and submit annual financial statements',
      priority: 'high' as const,
    },
    {
      id: 'comp-3',
      title: 'Tax Clearance Certificate',
      dueDate: '2024-05-15',
      status: 'up_to_date' as const,
      category: 'tax' as const,
      description: 'Renew tax clearance certificate',
      priority: 'medium' as const,
    },
    // Add more compliance items...
  ],
};

export const taxCalendarData = {
  upcomingEvents: [
    {
      id: 'tax-1',
      title: 'Provisional Tax Payment',
      dueDate: '2024-04-30',
      type: 'payment' as const,
      amount: 45600,
      status: 'upcoming' as const,
      description: 'Second provisional tax payment for 2024',
    },
    {
      id: 'tax-2',
      title: 'VAT Return',
      dueDate: '2024-04-25',
      type: 'filing' as const,
      amount: 28900,
      status: 'upcoming' as const,
      description: 'VAT return for March 2024',
    },
    // Add more tax calendar events...
  ],
  recentPayments: [
    {
      id: 'payment-1',
      title: 'VAT Payment',
      date: '2024-03-25',
      amount: 32450,
      status: 'completed',
      reference: 'VAT-2024-03',
    },
    // Add more payments...
  ],
};

export const taxCalculatorData: TaxCalculation = {
  year: 2024,
  quarter: 1,
  estimates: {
    revenue: 524790,
    expenses: 394590,
    taxableIncome: 130200,
    estimatedTax: 36456,
    vatPayable: 28900,
    provisionalTax: 45600,
  },
  deductions: [
    {
      category: 'Capital Allowances',
      amount: 15000,
      description: 'Equipment and vehicle depreciation',
    },
    {
      category: 'Operating Expenses',
      amount: 98450,
      description: 'General business expenses',
    },
    {
      category: 'Employee Benefits',
      amount: 12500,
      description: 'Staff training and development',
    },
  ],
  credits: [
    {
      type: 'Skills Development',
      amount: 5000,
      description: 'Training program credits',
    },
    {
      type: 'Small Business',
      amount: 7500,
      description: 'Small business tax credit',
    },
  ],
};

export const complianceReports = {
  taxReturns: [
    {
      id: 'return-1',
      type: 'VAT',
      period: 'March 2024',
      dueDate: '2024-04-25',
      status: 'pending',
      lastUpdated: '2024-03-20',
    },
    {
      id: 'return-2',
      type: 'Provisional Tax',
      period: 'YE 2024',
      dueDate: '2024-04-30',
      status: 'draft',
      lastUpdated: '2024-03-15',
    },
    // Add more returns...
  ],
  certificates: [
    {
      id: 'cert-1',
      type: 'Tax Clearance',
      issueDate: '2023-05-15',
      expiryDate: '2024-05-15',
      status: 'active',
    },
    // Add more certificates...
  ],
  filings: [
    {
      id: 'filing-1',
      type: 'Annual Returns',
      dueDate: '2024-06-30',
      status: 'upcoming',
      assignedTo: 'Sarah Johnson',
    },
    // Add more filings...
  ],
};

export const financialKPIs = {
  operatingMargin: {
    current: 32.8,
    change: 2.4,
    target: 30,
  },
  workingCapitalRatio: {
    current: 1.8,
    change: 0.3,
    industryAvg: 1.5,
  },
  debtToEquity: {
    current: 0.45,
    change: -0.05,
    target: 0.5,
  }
}; 