import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, AuthState } from '@/types';
import { apiService } from '@/services/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: 'student' | 'admin') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing user on app load
    const checkAuth = async () => {
      try {
        const response = await apiService.getMe();
        if (response.success) {
          setAuthState({
            user: response.data,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        // Fallback to localStorage if API is not available
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setAuthState({
            user: JSON.parse(savedUser),
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await apiService.login({ email, password });
      
      if (response.success) {
        setAuthState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }

      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      // Fallback to demo users if API is not available
      const demoUsers = [
        { id: '1', email: 'student@example.com', password: 'password', name: 'John Student', role: 'student' },
        { id: '2', email: 'admin@example.com', password: 'password', name: 'Admin User', role: 'admin' }
      ];
      
      const user = demoUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const userData = { id: user.id, email: user.email, name: user.name, role: user.role };
        localStorage.setItem('user', JSON.stringify(userData));
        setAuthState({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }

      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    role: 'student' | 'admin'
  ): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await apiService.register({ email, password, name, role });
      
      if (response.success) {
        setAuthState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }

      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    apiService.clearToken();
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
