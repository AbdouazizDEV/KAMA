import { IListingRepository } from '../../domain/repositories/IListingRepository';
import { Listing, ListingFilters, CreateListingDto } from '../../domain/entities/Listing';
import { fetchWithAuth, SERVER_URL } from '../../app/lib/supabase';
import { MOCK_LISTINGS } from '../../app/services/data';

/**
 * Implémentation concrète du repository de listings utilisant Supabase
 * Respect du principe DIP : implémente l'interface définie dans le domaine
 */
export class SupabaseListingRepository implements IListingRepository {
  async getAll(): Promise<Listing[]> {
    try {
      const res = await fetchWithAuth('/listings');
      if (!res.ok) {
        console.warn(`Server returned status ${res.status}. Falling back to mock data.`);
        return MOCK_LISTINGS;
      }
      
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : MOCK_LISTINGS;
    } catch (error) {
      console.warn('Fetch error, using mock data:', error);
      return MOCK_LISTINGS;
    }
  }

  async getById(id: string): Promise<Listing | null> {
    try {
      const res = await fetchWithAuth(`/listings/${id}`);
      if (!res.ok) {
        // Fallback to mock data
        const mock = MOCK_LISTINGS.find(l => l.id === id);
        return mock || null;
      }
      return await res.json();
    } catch (error) {
      console.warn('Listing fetch failed, trying mock:', error);
      const mock = MOCK_LISTINGS.find(l => l.id === id);
      return mock || null;
    }
  }

  async getFiltered(filters: ListingFilters): Promise<Listing[]> {
    const allListings = await this.getAll();
    
    return allListings.filter(listing => {
      // Filter by Type
      if (filters.types && filters.types.length > 0) {
        if (!listing.type || !filters.types.includes(listing.type)) {
          return false;
        }
      }
      
      // Filter by Price
      if (filters.priceRange) {
        const price = Number(listing.price);
        if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
          return false;
        }
      }

      // Filter by Beds
      if (filters.beds !== undefined && listing.beds < filters.beds) {
        return false;
      }

      // Filter by Baths
      if (filters.baths !== undefined && listing.baths < filters.baths) {
        return false;
      }

      // Filter by Location
      if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      return true;
    });
  }

  async getByOwnerId(ownerId: string): Promise<Listing[]> {
    try {
      const res = await fetch(`${SERVER_URL}/listings`);
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.filter((l: Listing) => l.owner_id === ownerId);
      }
      return [];
    } catch (error) {
      console.error('Error loading listings', error);
      return [];
    }
  }

  async create(listing: CreateListingDto, ownerId: string): Promise<Listing> {
    const { data: { session } } = await import('../../app/lib/supabase').then(m => m.supabase.auth.getSession());
    
    if (!session) {
      throw new Error('No session');
    }

    const payload = {
      ...listing,
      owner_id: ownerId,
      isNew: true,
      host: {
        name: session.user.user_metadata?.full_name || 'Hôte',
        image: session.user.user_metadata?.avatar_url || 'https://i.pravatar.cc/150',
        joined: new Date().getFullYear().toString(),
        verified: true
      }
    };

    const res = await fetch(`${SERVER_URL}/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error('Failed to create listing');
    }

    return await res.json();
  }

  async update(id: string, listing: Partial<CreateListingDto>): Promise<Listing> {
    const { data: { session } } = await import('../../app/lib/supabase').then(m => m.supabase.auth.getSession());
    
    if (!session) {
      throw new Error('No session');
    }

    const res = await fetch(`${SERVER_URL}/listings/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(listing)
    });

    if (!res.ok) {
      throw new Error('Failed to update listing');
    }

    return await res.json();
  }

  async delete(id: string): Promise<void> {
    const { data: { session } } = await import('../../app/lib/supabase').then(m => m.supabase.auth.getSession());
    
    if (!session) {
      throw new Error('No session');
    }

    const res = await fetch(`${SERVER_URL}/listings/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });

    if (!res.ok) {
      throw new Error('Failed to delete listing');
    }
  }
}
