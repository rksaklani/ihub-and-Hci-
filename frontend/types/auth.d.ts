export interface UseAuthReturn {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: any | null;
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; data?: any; error?: any }>;
  logout: () => Promise<{ success: boolean; error?: any }>;
  requireAuth: (redirectTo?: string) => void;
  requireAdmin: (redirectTo?: string) => void;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isLoadingUser: boolean;
}

declare module '@/hooks/useAuth' {
  export function useAuth(): UseAuthReturn;
}

