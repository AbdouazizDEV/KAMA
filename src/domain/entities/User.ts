/**
 * Entité de domaine : User
 * Représente un utilisateur dans le système
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  phone?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  phone?: string;
  location?: string;
}
