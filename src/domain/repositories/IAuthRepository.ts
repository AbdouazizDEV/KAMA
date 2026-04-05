import { User } from '../entities/User';

/**
 * Interface du repository pour l'authentification
 * Respect du principe DIP : les couches supérieures dépendent d'abstractions
 */
export interface IAuthRepository {
  /**
   * Récupère la session actuelle
   */
  getSession(): Promise<{ user: User | null; session: any | null }>;

  /**
   * Inscrit un nouvel utilisateur
   */
  signUp(email: string, password: string, metadata?: { name?: string }): Promise<{ user: User | null; error: any }>;

  /**
   * Connecte un utilisateur
   */
  signIn(email: string, password: string): Promise<{ user: User | null; error: any }>;

  /**
   * Connecte avec OAuth (Google, etc.)
   */
  signInWithOAuth(provider: string): Promise<{ error: any }>;

  /**
   * Déconnecte l'utilisateur
   */
  signOut(): Promise<{ error: any }>;

  /**
   * Écoute les changements d'état d'authentification
   */
  onAuthStateChange(callback: (user: User | null) => void): () => void;
}
