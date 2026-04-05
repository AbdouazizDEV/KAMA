import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { User } from '../../domain/entities/User';
import { supabase } from '../../app/lib/supabase';

/**
 * Implémentation concrète du repository d'authentification utilisant Supabase
 * Respect du principe DIP : implémente l'interface définie dans le domaine
 */
export class SupabaseAuthRepository implements IAuthRepository {
  async getSession(): Promise<{ user: User | null; session: any | null }> {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      return { user: null, session: null };
    }

    const user: User = {
      id: session.user.id,
      email: session.user.email || '',
      name: session.user.user_metadata?.name || session.user.user_metadata?.full_name,
      avatar_url: session.user.user_metadata?.avatar_url,
      created_at: session.user.created_at,
    };

    return { user, session };
  }

  async signUp(email: string, password: string, metadata?: { name?: string }): Promise<{ user: User | null; error: any }> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: metadata?.name,
        },
      },
    });

    if (error || !data.user) {
      return { user: null, error };
    }

    const user: User = {
      id: data.user.id,
      email: data.user.email || '',
      name: data.user.user_metadata?.name,
      avatar_url: data.user.user_metadata?.avatar_url,
      created_at: data.user.created_at,
    };

    return { user, error: null };
  }

  async signIn(email: string, password: string): Promise<{ user: User | null; error: any }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return { user: null, error };
    }

    const user: User = {
      id: data.user.id,
      email: data.user.email || '',
      name: data.user.user_metadata?.name || data.user.user_metadata?.full_name,
      avatar_url: data.user.user_metadata?.avatar_url,
      created_at: data.user.created_at,
    };

    return { user, error: null };
  }

  async signInWithOAuth(provider: string): Promise<{ error: any }> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider as 'google' | 'github' | 'facebook',
    });

    return { error };
  }

  async signOut(): Promise<{ error: any }> {
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.user_metadata?.full_name,
          avatar_url: session.user.user_metadata?.avatar_url,
          created_at: session.user.created_at,
        };
        callback(user);
      } else {
        callback(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }
}
