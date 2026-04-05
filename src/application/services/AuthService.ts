import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { User } from '../../domain/entities/User';

/**
 * Service applicatif pour l'authentification
 * Respect du principe SRP : une seule responsabilité (gestion de l'authentification)
 * Respect du principe DIP : dépend d'une abstraction (IAuthRepository)
 */
export class AuthService {
  constructor(private authRepository: IAuthRepository) {}

  /**
   * Récupère la session actuelle
   */
  async getCurrentSession(): Promise<{ user: User | null; session: any | null }> {
    return this.authRepository.getSession();
  }

  /**
   * Inscrit un nouvel utilisateur
   */
  async signUp(email: string, password: string, name?: string): Promise<{ user: User | null; error: any }> {
    // Validation
    if (!email || !password) {
      return { user: null, error: { message: 'Email and password are required' } };
    }

    if (password.length < 6) {
      return { user: null, error: { message: 'Password must be at least 6 characters' } };
    }

    return this.authRepository.signUp(email, password, { name });
  }

  /**
   * Connecte un utilisateur
   */
  async signIn(email: string, password: string): Promise<{ user: User | null; error: any }> {
    // Validation
    if (!email || !password) {
      return { user: null, error: { message: 'Email and password are required' } };
    }

    return this.authRepository.signIn(email, password);
  }

  /**
   * Connecte avec OAuth
   */
  async signInWithOAuth(provider: string): Promise<{ error: any }> {
    if (!provider) {
      return { error: { message: 'Provider is required' } };
    }

    return this.authRepository.signInWithOAuth(provider);
  }

  /**
   * Déconnecte l'utilisateur
   */
  async signOut(): Promise<{ error: any }> {
    return this.authRepository.signOut();
  }

  /**
   * Écoute les changements d'état d'authentification
   */
  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return this.authRepository.onAuthStateChange(callback);
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  async isAuthenticated(): Promise<boolean> {
    const { user } = await this.getCurrentSession();
    return user !== null;
  }
}
