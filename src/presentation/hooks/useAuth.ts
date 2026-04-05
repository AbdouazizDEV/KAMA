import { useState, useEffect } from 'react';
import { useServices } from '../contexts/ServiceContext';
import { User } from '../../domain/entities/User';

/**
 * Hook personnalisé pour l'authentification
 * Respect du principe SRP : séparation de la logique d'authentification
 */
export function useAuth() {
  const { authService } = useServices();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadSession();
    
    // Écouter les changements d'état d'authentification
    const unsubscribe = authService.onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const loadSession = async () => {
    try {
      setLoading(true);
      setError(null);
      const { user: currentUser } = await authService.getCurrentSession();
      setUser(currentUser);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load session'));
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      setError(null);
      const { user: newUser, error: signUpError } = await authService.signUp(email, password, name);
      if (signUpError) {
        throw new Error(signUpError.message || 'Sign up failed');
      }
      setUser(newUser);
      return { user: newUser, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error('Sign up failed');
      setError(errorMessage);
      return { user: null, error: errorMessage };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { user: signedInUser, error: signInError } = await authService.signIn(email, password);
      if (signInError) {
        throw new Error(signInError.message || 'Sign in failed');
      }
      setUser(signedInUser);
      return { user: signedInUser, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error('Sign in failed');
      setError(errorMessage);
      return { user: null, error: errorMessage };
    }
  };

  const signInWithOAuth = async (provider: string) => {
    try {
      setError(null);
      const { error: oauthError } = await authService.signInWithOAuth(provider);
      if (oauthError) {
        throw new Error(oauthError.message || 'OAuth sign in failed');
      }
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error('OAuth sign in failed');
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error: signOutError } = await authService.signOut();
      if (signOutError) {
        throw new Error(signOutError.message || 'Sign out failed');
      }
      setUser(null);
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error('Sign out failed');
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  const isAuthenticated = async () => {
    return await authService.isAuthenticated();
  };

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    isAuthenticated,
    refetch: loadSession,
  };
}
