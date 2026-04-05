import { motion } from 'motion/react';
import { Heart, MapPin, BedDouble, Bath, Car, Video } from 'lucide-react';
import { cn, formatPrice } from '../../lib/utils';
import { Link } from 'react-router';
import { PropertyDetailsModal } from './PropertyDetailsModal';

export interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  area: number;
  image: string;
  isNew?: boolean;
  isPremium?: boolean;
  has3D?: boolean;
  type?: string;
}

interface ListingCardProps {
  listing: Listing;
}

export function FeaturedListingCard({ listing }: ListingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative h-64 overflow-hidden">
        <Link to={`/listing/${listing.id}`}>
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {listing.isPremium && (
            <span className="bg-gradient-to-r from-[#FFB800] to-[#FF8C00] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              ★ PREMIUM
            </span>
          )}
          {listing.isNew && (
            <span className="bg-[#0066CC] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
              NOUVEAU
            </span>
          )}
        </div>

        {/* Actions */}
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white shadow-lg transition-all group-hover:scale-110">
          <Heart size={20} className="fill-current transition-colors" />
        </button>

        {listing.has3D && (
          <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold shadow-lg">
            <Video size={14} /> Visite 3D
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-montserrat font-bold text-lg text-[#0A0E27] line-clamp-1 group-hover:text-[#00A86B] transition-colors">
              <Link to={`/listing/${listing.id}`}>{listing.title}</Link>
            </h3>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
              <MapPin size={14} className="text-[#00A86B]" />
              {listing.location}
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono font-bold text-xl text-[#00A86B]">
              {formatPrice(listing.price)}
            </div>
            <span className="text-xs text-gray-400">/ mois</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-100 mb-4">
          <div className="flex flex-col items-center gap-1">
            <BedDouble size={20} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">{listing.beds} Pièces</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-gray-100 pl-4">
            <Bath size={20} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">{listing.baths} Bains</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-gray-100 pl-4">
            <Car size={20} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">{listing.area} m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img src={`https://i.pravatar.cc/150?u=${listing.id}`} alt="Owner" className="w-full h-full object-cover" />
            </div>
            <div className="text-xs text-gray-500">
              <span className="block font-semibold text-gray-700">Sarah M.</span>
              Propr. vérifié
            </div>
          </div>
          
          <PropertyDetailsModal listing={listing} />
        </div>
      </div>
    </motion.div>
  );
}
