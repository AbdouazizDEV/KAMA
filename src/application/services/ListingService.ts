import { IListingRepository } from '../../domain/repositories/IListingRepository';
import { Listing, ListingFilters, CreateListingDto } from '../../domain/entities/Listing';

/**
 * Service applicatif pour la gestion des listings
 * Respect du principe SRP : une seule responsabilité (gestion des listings)
 * Respect du principe DIP : dépend d'une abstraction (IListingRepository)
 */
export class ListingService {
  constructor(private listingRepository: IListingRepository) {}

  /**
   * Récupère tous les listings
   */
  async getAllListings(): Promise<Listing[]> {
    return this.listingRepository.getAll();
  }

  /**
   * Récupère un listing par son ID
   */
  async getListingById(id: string): Promise<Listing | null> {
    if (!id) {
      throw new Error('Listing ID is required');
    }
    return this.listingRepository.getById(id);
  }

  /**
   * Récupère les listings avec filtres
   */
  async searchListings(filters: ListingFilters): Promise<Listing[]> {
    return this.listingRepository.getFiltered(filters);
  }

  /**
   * Récupère les listings d'un propriétaire
   */
  async getOwnerListings(ownerId: string): Promise<Listing[]> {
    if (!ownerId) {
      throw new Error('Owner ID is required');
    }
    return this.listingRepository.getByOwnerId(ownerId);
  }

  /**
   * Crée un nouveau listing
   */
  async createListing(listing: CreateListingDto, ownerId: string): Promise<Listing> {
    // Validation
    if (!listing.title || !listing.location || !listing.price) {
      throw new Error('Title, location, and price are required');
    }

    if (listing.price <= 0) {
      throw new Error('Price must be greater than 0');
    }

    return this.listingRepository.create(listing, ownerId);
  }

  /**
   * Met à jour un listing
   */
  async updateListing(id: string, listing: Partial<CreateListingDto>): Promise<Listing> {
    if (!id) {
      throw new Error('Listing ID is required');
    }
    return this.listingRepository.update(id, listing);
  }

  /**
   * Supprime un listing
   */
  async deleteListing(id: string): Promise<void> {
    if (!id) {
      throw new Error('Listing ID is required');
    }
    return this.listingRepository.delete(id);
  }

  /**
   * Récupère les listings en vedette (premiers N)
   */
  async getFeaturedListings(count: number = 3): Promise<Listing[]> {
    const allListings = await this.getAllListings();
    return allListings.slice(0, count);
  }
}
