import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  lastLogin?: string;
  status: string;
  permissions: string[];
  preferences: {
    notifications: boolean;
    twoFactorAuth: boolean;
    theme: string;
  };
  company?: string;
  department?: string;
  title?: string;
  subscription?: {
    plan: string;
    status: string;
    validUntil: string;
  };
  adminLevel?: number;
  managedClients?: string[];
  securityClearance?: string;
  systemAccess?: {
    console: boolean;
    debug: boolean;
    development: boolean;
  };
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS = {
  'client@example.com': {
    id: 'client-1',
    email: 'client@example.com',
    password: 'password123',
    name: 'John Smith',
    role: 'client',
    company: 'Acme Corp',
    avatar: '/avatars/client.jpg',
    lastLogin: '2024-03-20T10:30:00Z',
    status: 'active',
    permissions: [
      'view_dashboard',
      'view_reports',
      'view_documents',
      'download_reports',
      'view_calendar',
      'view_compliance',
      'manage_profile',
      'request_support'
    ],
    preferences: {
      notifications: true,
      twoFactorAuth: false,
      theme: 'light'
    },
    subscription: {
      plan: 'business',
      status: 'active',
      validUntil: '2025-03-20'
    }
  },
  'admin@example.com': {
    id: 'admin-1',
    email: 'admin@example.com',
    password: 'password345',
    name: 'Sarah Johnson',
    role: 'admin',
    department: 'Account Management',
    avatar: '/avatars/admin.jpg',
    lastLogin: '2024-03-21T09:15:00Z',
    status: 'active',
    permissions: [
      'view_dashboard',
      'view_reports',
      'view_documents',
      'manage_users',
      'manage_reports',
      'manage_compliance',
      'create_reports',
      'edit_reports',
      'delete_reports',
      'manage_calendar',
      'view_analytics',
      'export_data',
      'manage_notifications',
      'access_api',
      'view_audit_logs'
    ],
    preferences: {
      notifications: true,
      twoFactorAuth: true,
      theme: 'system'
    },
    adminLevel: 2,
    managedClients: ['client-1', 'client-2', 'client-3']
  },
  'master@example.com': {
    id: 'master-1',
    email: 'master@example.com',
    password: 'password678',
    name: 'Alex Thompson',
    role: 'master',
    title: 'System Administrator',
    avatar: '/avatars/master.jpg',
    lastLogin: '2024-03-21T11:00:00Z',
    status: 'active',
    permissions: [
      'view_dashboard',
      'view_reports',
      'view_documents',
      'manage_users',
      'manage_reports',
      'manage_compliance',
      'manage_admins',
      'system_settings',
      'audit_logs',
      'manage_roles',
      'manage_permissions',
      'system_backup',
      'system_restore',
      'manage_integrations',
      'manage_security',
      'manage_billing',
      'view_analytics',
      'manage_templates',
      'manage_api_keys',
      'manage_webhooks',
      'manage_automation',
      'full_system_access'
    ],
    preferences: {
      notifications: true,
      twoFactorAuth: true,
      theme: 'dark'
    },
    securityClearance: 'highest',
    systemAccess: {
      console: true,
      debug: true,
      development: true
    },
    emergencyContact: {
      name: 'IT Department',
      phone: '888-555-0000'
    }
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          // In a real app, validate token with backend
          const mockUser = {
            id: '1',
            email: 'demo@example.com',
            name: 'Demo User',
            role: 'client'
          };
          setUser(mockUser);
        } catch (error) {
          localStorage.removeItem('auth_token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const user = MOCK_USERS[email.toLowerCase()];
    
    if (user && user.password === password) {
      // Remove sensitive data before storing in state
      const { 
        password: _, 
        emergencyContact: __,
        ...safeUserData 
      } = user;

      // Store additional data in localStorage
      localStorage.setItem('auth_token', 'mock_jwt_token');
      localStorage.setItem('user_role', user.role);
      localStorage.setItem('user_preferences', JSON.stringify(user.preferences));
      localStorage.setItem('last_login', new Date().toISOString());

      setUser(safeUserData);
      navigate('/dashboard');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 