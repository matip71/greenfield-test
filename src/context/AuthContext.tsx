import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/data/types';
import { usePersistentReducer } from '@/hooks/usePersistentReducer';

/* ---- State ---- */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = { user: null, isAuthenticated: false };

/* ---- Actions ---- */
type AuthAction =
  | { type: 'SIGN_IN'; payload: User }
  | { type: 'SIGN_UP'; payload: User }
  | { type: 'SIGN_OUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<Pick<User, 'firstName' | 'lastName'>> };

/* ---- Reducer ---- */
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SIGN_IN':
    case 'SIGN_UP':
      return { user: action.payload, isAuthenticated: true };

    case 'SIGN_OUT':
      return { user: null, isAuthenticated: false };

    case 'UPDATE_PROFILE':
      if (!state.user) return state;
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    default:
      return state;
  }
}

/* ---- Context ---- */
interface AuthContextValue {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  signIn: (user: User) => void;
  signUp: (user: User) => void;
  signOut: () => void;
  updateProfile: (updates: Partial<Pick<User, 'firstName' | 'lastName'>>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = usePersistentReducer(authReducer, initialState, 'shopco_auth');

  const signIn = (user: User) => dispatch({ type: 'SIGN_IN', payload: user });
  const signUp = (user: User) => dispatch({ type: 'SIGN_UP', payload: user });
  const signOut = () => dispatch({ type: 'SIGN_OUT' });
  const updateProfile = (updates: Partial<Pick<User, 'firstName' | 'lastName'>>) =>
    dispatch({ type: 'UPDATE_PROFILE', payload: updates });

  return (
    <AuthContext.Provider value={{ state, dispatch, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
