import { useReducer, useEffect, useCallback } from 'react';
import type { Reducer } from 'react';

/**
 * usePersistentReducer — wraps useReducer and syncs state to localStorage
 * on every dispatch. State is restored from localStorage on mount.
 */
export function usePersistentReducer<S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
  storageKey: string
): [S, React.Dispatch<A>] {
  // Lazy initializer: restore from localStorage if available
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? (JSON.parse(stored) as S) : initialState;
    } catch {
      return initialState;
    }
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Ignore storage errors (e.g. private browsing quota)
    }
  }, [state, storageKey]);

  const stableDispatch = useCallback(dispatch, [dispatch]);
  return [state, stableDispatch];
}
