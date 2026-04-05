import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { 
  MapPin, Share2, Heart, ArrowLeft, Star, BedDouble, Bath, Car, Maximize, 
  Wifi, Tv, Snowflake, Utensils, Waves, Dumbbell, ShieldCheck, Calendar, Info, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../../lib/utils';
import { toast } from 'sonner';
import { DayPicker } from 'react-day-picker';
import { fr } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import { useListing } from '../../presentation/hooks/useListings';

export function ListingPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [dateRange, setDateRange] = useState<any>();
  const { listing, loading } = useListing(id);

  const handleBook = () => {
    toast.success('Demande de réservation envoyée !');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-[#00A86B]" size={48} />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <Navbar />
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Annonce introuvable</h1>
          <Link to="/search">
            <Button>Retour aux recherches</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Fallback for amenities icons map
  const getIcon = (name: string) => {
    const map: any = {
      'Wifi Fibre': Wifi,
      'Climatisation': Snowflake,
      'Piscine': Waves,
      'Parking': Car,
      'Cuisine équipée': Utensils,
      'Salle de sport': Dumbbell,
      'Smart TV': Tv,
      'Sécurité 24/7': ShieldCheck,
    };
    return map[name] || Info;
  };

  // Ensure images array exists
  const images = listing?.images || (listing?.image ? [listing.image] : []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* GALLERY HEADER */}
      <div className="pt-24 pb-8 container mx-auto px-6">
        <div className="mb-6">
          <Link to="/search" className="inline-flex items-center text-gray-500 hover:text-[#00A86B] font-medium transition-colors mb-4">
            <ArrowLeft size={18} className="mr-2" /> Retour aux résultats
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="font-montserrat font-bold text-2xl md:text-4xl text-[#0A0E27] leading-tight max-w-4xl">
              {listing.title}
            </h1>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-50 border-gray-200">
                <Share2 size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full border-gray-200 transition-colors ${isFavorite ? 'bg-red-50 text-red-500 border-red-200' : 'hover:bg-gray-50'}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 text-sm md:text-base text-gray-600">
            <span className="flex items-center gap-1 font-medium text-[#0A0E27]">
              <Star size={16} className="fill-[#FFB800] text-[#FFB800]" /> {listing.rating || 'N/A'}
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="underline decoration-gray-300 underline-offset-4">{listing.reviews || 0} avis</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="flex items-center gap-1">
              <MapPin size={16} className="text-[#00A86B]" /> {listing.location}
            </span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative">
          <div className="md:col-span-2 md:row-span-2 relative h-full">
            <img 
              src={images[0]} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
              onClick={() => setSelectedImage(0)}
            />
          </div>
          {images.slice(1, 5).map((img: string, i: number) => (
             <div key={i} className="hidden md:block relative h-full">
               <img 
                 src={img} 
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                 onClick={() => setSelectedImage(i + 1)}
               />
             </div>
          ))}
          {/* Fill remaining slots if images < 5 */}
          {Array.from({ length: Math.max(0, 4 - (images.length - 1)) }).map((_, i) => (
             <div key={`placeholder-${i}`} className="hidden md:block relative h-full bg-gray-100" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24 flex flex-col lg:flex-row gap-16 relative">
        {/* LEFT CONTENT */}
        <div className="lg:w-2/3 space-y-12">
          
          {/* Key Features */}
          <div className="flex justify-between py-8 border-t border-b border-gray-100">
             <div className="flex flex-col gap-2">
               <h3 className="font-bold text-lg text-[#0A0E27]">Logement entier</h3>
               <p className="text-gray-500">Hôte : {listing.host?.name || 'KAMA'}</p>
             </div>
             
             <div className="flex gap-8">
               <div className="flex flex-col items-center justify-center w-20 p-2 rounded-xl bg-gray-50">
                 <BedDouble className="mb-2 text-[#00A86B]" />
                 <span className="font-bold text-[#0A0E27]">{listing.beds}</span>
                 <span className="text-xs text-gray-500">Chambres</span>
               </div>
               <div className="flex flex-col items-center justify-center w-20 p-2 rounded-xl bg-gray-50">
                 <Bath className="mb-2 text-[#00A86B]" />
                 <span className="font-bold text-[#0A0E27]">{listing.baths}</span>
                 <span className="text-xs text-gray-500">Bains</span>
               </div>
               <div className="flex flex-col items-center justify-center w-20 p-2 rounded-xl bg-gray-50">
                 <Maximize className="mb-2 text-[#00A86B]" />
                 <span className="font-bold text-[#0A0E27]">{listing.area}</span>
                 <span className="text-xs text-gray-500">m²</span>
               </div>
             </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="font-montserrat font-bold text-2xl text-[#0A0E27] mb-6">À propos de ce logement</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
              {listing.description || "Aucune description disponible."}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="font-montserrat font-bold text-2xl text-[#0A0E27] mb-6">Ce que propose ce logement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {(listing.amenities || []).map((amenity: string) => {
                const Icon = getIcon(amenity);
                return (
                  <div key={amenity} className="flex items-center gap-4 text-gray-600 py-2 border-b border-gray-50 last:border-0">
                    <Icon size={24} className="text-gray-400" />
                    <span className="text-lg">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Host */}
          {listing.host && (
            <div className="bg-gray-50 rounded-2xl p-8 flex items-start gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img src={listing.host.image} alt={listing.host.name} className="w-full h-full object-cover" />
                </div>
                {listing.host.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-[#00A86B] text-white p-1 rounded-full border-2 border-white">
                    <ShieldCheck size={12} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-montserrat font-bold text-xl text-[#0A0E27] mb-1">Hôte : {listing.host.name}</h3>
                <p className="text-gray-500 text-sm mb-4">Membre depuis {listing.host.joined} • Taux de réponse : 100%</p>
                <Button variant="outline" className="border-gray-300 hover:bg-white">Contacter l'hôte</Button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT STICKY SIDEBAR (Booking) */}
        <div className="lg:w-1/3 relative">
          <div className="sticky top-24">
            <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 md:p-8">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="font-mono font-bold text-3xl text-[#00A86B]">{formatPrice(listing.price)}</span>
                  <span className="text-gray-500 text-sm font-medium"> / mois</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-[#0A0E27]">
                  <Star size={14} className="fill-[#FFB800] text-[#FFB800]" /> {listing.rating || 'N/A'}
                  <span className="text-gray-400 font-normal">({listing.reviews || 0} avis)</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                <div className="flex border-b border-gray-200">
                  <div className="flex-1 p-3 border-r border-gray-200">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Arrivée</label>
                    <input type="date" className="w-full text-sm font-medium focus:outline-none" />
                  </div>
                  <div className="flex-1 p-3">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Départ</label>
                    <input type="date" className="w-full text-sm font-medium focus:outline-none" />
                  </div>
                </div>
                <div className="p-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Voyageurs</label>
                  <select className="w-full text-sm font-medium focus:outline-none bg-white">
                    <option>1 voyageur</option>
                    <option>2 voyageurs</option>
                    <option>3 voyageurs</option>
                  </select>
                </div>
              </div>

              <Button 
                onClick={handleBook}
                className="w-full h-14 bg-gradient-to-r from-[#00A86B] to-[#0066CC] hover:shadow-lg hover:scale-[1.02] transition-all text-lg font-bold rounded-xl mb-4"
              >
                Réserver maintenant
              </Button>
              
              <div className="text-center text-xs text-gray-500 mb-6">
                Aucun montant ne sera débité pour le moment
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span className="underline decoration-dotted">Loyer x 1 mois</span>
                  <span>{formatPrice(listing.price)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="underline decoration-dotted">Frais de service KAMA</span>
                  <span>{formatPrice(listing.price * 0.05)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                   <span className="underline decoration-dotted">Caution</span>
                   <span>{formatPrice(listing.price * 2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-[#0A0E27] pt-4 border-t border-gray-100 mt-4">
                  <span>Total (1er mois)</span>
                  <span>{formatPrice(listing.price * 3.05)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-xl flex items-center gap-3">
               <div className="text-[#FFB800]">
                 <Star className="fill-current w-6 h-6" />
               </div>
               <div className="text-sm text-gray-600">
                 <span className="font-bold text-[#0A0E27]">C'est une perle rare.</span> Ce type de bien est très demandé.
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
