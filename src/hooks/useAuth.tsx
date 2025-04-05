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
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS = {
  'client@example.com': {
    id: 'client-1',
    email: 'client@example.com',
    password: 'password123',
    name: 'John Client',
    role: 'client',
    permissions: ['view_dashboard', 'view_reports', 'view_documents']
  },
  'admin@example.com': {
    id: 'admin-1',
    email: 'admin@example.com',
    password: 'password345',
    name: 'Sarah Admin',
    role: 'admin',
    permissions: [
      'view_dashboard', 
      'view_reports', 
      'view_documents',
      'manage_users',
      'manage_reports',
      'manage_compliance'
    ]
  },
  'master@example.com': {
    id: 'master-1',
    email: 'master@example.com',
    password: 'password678',
    name: 'Master User',
    role: 'master',
    permissions: [
      'view_dashboard', 
      'view_reports', 
      'view_documents',
      'manage_users',
      'manage_reports',
      'manage_compliance',
      'manage_admins',
      'system_settings',
      'audit_logs'
    ]
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
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('auth_token', 'mock_jwt_token');
      localStorage.setItem('user_role', user.role);
      setUser(userWithoutPassword);
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