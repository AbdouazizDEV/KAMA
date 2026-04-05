import React, { createContext, useContext, ReactNode } from 'react';
import { ListingService } from '../../application/services/ListingService';
import { AuthService } from '../../application/services/AuthService';
import { IListingRepository } from '../../domain/repositories/IListingRepository';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';

/**
 * Context pour l'injection de dépendances
 * Respect du principe DIP : injection des dépendances via Context API
 */
interface ServiceContextValue {
  listingService: ListingService;
  authService: AuthService;
}

const ServiceContext = createContext<ServiceContextValue | undefined>(undefined);

interface ServiceProviderProps {
  listingRepository: IListingRepository;
  authRepository: IAuthRepository;
  children: ReactNode;
}

/**
 * Provider pour les services
 * Permet l'injection de dépendances dans toute l'application
 */
export function ServiceProvider({ listingRepository, authRepository, children }: ServiceProviderProps) {
  const listingService = new ListingService(listingRepository);
  const authService = new AuthService(authRepository);

  const value: ServiceContextValue = {
    listingService,
    authService,
  };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
}

/**
 * Hook pour accéder aux services
 */
export function useServices(): ServiceContextValue {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
}
