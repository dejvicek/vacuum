import { createContext, useContext, useState, useEffect, useCallback, type ReactNode, type FC } from 'react';
import { authApi } from '@/api/auth';
import { tokenStorage } from '@/api/auth/token-storage';
import type { User, AuthRequestDto, SignupRequestDto } from '@/api/auth/types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signin: (credentials: AuthRequestDto) => Promise<void>;
  signup: (credentials: SignupRequestDto) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  readonly children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const initializeAuth = useCallback(async () => {
    const token = tokenStorage.getToken();
    const storedUser = tokenStorage.getUser();

    if (token && storedUser) {
      try {
        await authApi.getProfile();
        setUser(storedUser);
      } catch {
        tokenStorage.clear();
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const signin = useCallback(async (credentials: AuthRequestDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.signin(credentials);
      setUser(response.user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'auth.errors.signin';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (credentials: SignupRequestDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.signup(credentials);
      setUser(response.user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'auth.errors.signup';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    signin,
    signup,
    logout,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
