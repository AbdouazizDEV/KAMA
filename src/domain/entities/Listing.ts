/**
 * Entité de domaine : Listing
 * Représente un bien immobilier dans le système
 */
export interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  area: number;
  image: string;
  images?: string[];
  type?: string;
  category?: string;
  isNew?: boolean;
  isPremium?: boolean;
  has3D?: boolean;
  rating?: number;
  reviews?: number;
  description?: string;
  amenities?: string[];
  host?: Host;
  owner_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Host {
  name: string;
  image: string;
  joined: string;
  verified: boolean;
}

export interface ListingFilters {
  types?: string[];
  priceRange?: [number, number];
  beds?: number;
  baths?: number;
  amenities?: string[];
  location?: string;
}

export interface CreateListingDto {
  title: string;
  price: number;
  location: string;
  description: string;
  beds: number;
  baths: number;
  area: number;
  image: string;
  category: string;
  amenities?: string[];
}
