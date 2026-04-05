import { Listing, ListingFilters, CreateListingDto } from '../entities/Listing';

/**
 * Interface du repository pour les listings
 * Respect du principe DIP : les couches supérieures dépendent d'abstractions
 */
export interface IListingRepository {
  /**
   * Récupère tous les listings
   */
  getAll(): Promise<Listing[]>;

  /**
   * Récupère un listing par son ID
   */
  getById(id: string): Promise<Listing | null>;

  /**
   * Récupère les listings avec filtres
   */
  getFiltered(filters: ListingFilters): Promise<Listing[]>;

  /**
   * Récupère les listings d'un propriétaire
   */
  getByOwnerId(ownerId: string): Promise<Listing[]>;

  /**
   * Crée un nouveau listing
   */
  create(listing: CreateListingDto, ownerId: string): Promise<Listing>;

  /**
   * Met à jour un listing
   */
  update(id: string, listing: Partial<CreateListingDto>): Promise<Listing>;

  /**
   * Supprime un listing
   */
  delete(id: string): Promise<void>;
}
