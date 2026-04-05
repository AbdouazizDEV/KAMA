import { useState, useEffect } from 'react';
import { useServices } from '../contexts/ServiceContext';
import { Listing, ListingFilters } from '../../domain/entities/Listing';

/**
 * Hook personnalisé pour la gestion des listings
 * Respect du principe SRP : séparation de la logique de récupération des données
 */
export function useListings() {
  const { listingService } = useServices();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listingService.getAllListings();
      setListings(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load listings'));
    } finally {
      setLoading(false);
    }
  };

  return { listings, loading, error, refetch: loadListings };
}

/**
 * Hook pour rechercher des listings avec filtres
 */
export function useSearchListings(filters: ListingFilters) {
  const { listingService } = useServices();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    searchListings();
  }, [JSON.stringify(filters)]);

  const searchListings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listingService.searchListings(filters);
      setListings(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search listings'));
    } finally {
      setLoading(false);
    }
  };

  return { listings, loading, error, refetch: searchListings };
}

/**
 * Hook pour récupérer un listing par ID
 */
export function useListing(id: string | undefined) {
  const { listingService } = useServices();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    loadListing();
  }, [id]);

  const loadListing = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await listingService.getListingById(id);
      setListing(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load listing'));
    } finally {
      setLoading(false);
    }
  };

  return { listing, loading, error, refetch: loadListing };
}

/**
 * Hook pour récupérer les listings d'un propriétaire
 */
export function useOwnerListings(ownerId: string | undefined) {
  const { listingService } = useServices();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ownerId) {
      setLoading(false);
      return;
    }

    loadOwnerListings();
  }, [ownerId]);

  const loadOwnerListings = async () => {
    if (!ownerId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await listingService.getOwnerListings(ownerId);
      setListings(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load owner listings'));
    } finally {
      setLoading(false);
    }
  };

  return { listings, loading, error, refetch: loadOwnerListings };
}
