import { motion } from "motion/react";
import {
  MapPin,
  BedDouble,
  Bath,
  Car,
  ArrowRight,
  Video,
  Share2,
  ShieldCheck,
  Star,
  Calendar,
  CheckCircle2,
  Wifi,
  Maximize,
  Home,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import type { Listing } from "./FeaturedListingCard";
import { formatPrice } from "../../lib/utils";

interface PropertyDetailsModalProps {
  listing: Listing;
}

export function PropertyDetailsModal({
  listing,
}: PropertyDetailsModalProps) {
  // Mock amenities based on listing type
  const amenities = [
    { icon: Wifi, label: "Haut Débit" },
    { icon: ShieldCheck, label: "Sécurisé 24/7" },
    { icon: Car, label: "Parking" },
    { icon: CheckCircle2, label: "Meublé" },
    { icon: Maximize, label: "Climatisation" },
    { icon: Star, label: "Service Concierge" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#00A86B] hover:text-[#008F5A] font-semibold gap-1 pr-0 group/btn cursor-pointer"
        >
          Voir détails
          <ArrowRight
            size={16}
            className="transition-transform group-hover/btn:translate-x-1"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] lg:max-w-[90vw] xl:max-w-[1400px] w-full p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border-white/20 sm:rounded-3xl gap-0 shadow-2xl">
        <div className="flex flex-col md:flex-row h-[92vh]">
          {/* Left Column: Media */}
          <div className="w-full md:w-4/12 relative bg-gray-100 overflow-hidden group h-72 md:h-auto">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

            <div className="absolute top-4 left-4 flex gap-2">
              {listing.isPremium && (
                <span className="bg-[#FFB800] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  PREMIUM
                </span>
              )}
              {listing.isNew && (
                <span className="bg-[#0066CC] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  NOUVEAU
                </span>
              )}
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <Video size={18} />
                </div>
                {listing.has3D && (
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/30">
                    Visite 3D Incluse
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold font-montserrat leading-tight mb-1">
                {listing.title}
              </h2>
              <div className="flex items-center gap-1.5 text-gray-200 text-sm">
                <MapPin size={14} />
                {listing.location}
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="w-full md:w-8/12 flex flex-col h-full bg-white/50">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-white/80 backdrop-blur-sm sticky top-0 z-10">
              <div>
                <DialogTitle className="text-xl font-bold text-[#0A0E27] mb-1">
                  Détails de la propriété
                </DialogTitle>
                <DialogDescription className="text-gray-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" />
                  Disponible immédiatement
                </DialogDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#00A86B] font-mono">
                  {formatPrice(listing.price)}
                </div>
                <span className="text-sm text-gray-400">
                  / mois
                </span>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-2 hover:border-[#00A86B]/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#00A86B]/10 flex items-center justify-center text-[#00A86B]">
                    <BedDouble size={20} />
                  </div>
                  <div className="text-center">
                    <span className="block font-bold text-gray-800">
                      {listing.beds}
                    </span>
                    <span className="text-xs text-gray-500">
                      Chambres
                    </span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-2 hover:border-[#00A86B]/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#0066CC]/10 flex items-center justify-center text-[#0066CC]">
                    <Bath size={20} />
                  </div>
                  <div className="text-center">
                    <span className="block font-bold text-gray-800">
                      {listing.baths}
                    </span>
                    <span className="text-xs text-gray-500">
                      Salles de bain
                    </span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-2 hover:border-[#00A86B]/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#FFB800]/10 flex items-center justify-center text-[#FFB800]">
                    <Maximize size={20} />
                  </div>
                  <div className="text-center">
                    <span className="block font-bold text-gray-800">
                      {listing.area}
                    </span>
                    <span className="text-xs text-gray-500">
                      Mètres carrés
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Info size={18} className="text-[#00A86B]" />À
                  propos de ce bien
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Découvrez cette magnifique propriété située au
                  cœur de {listing.location.split(",")[0]}.
                  Alliant confort moderne et design élégant, cet
                  espace de {listing.area}m² offre une
                  luminosité exceptionnelle et des finitions
                  haut de gamme. Idéal pour une famille ou des
                  professionnels cherchant un cadre de vie
                  privilégié. L'accès sécurisé et les
                  équipements complets vous garantissent une
                  tranquillité d'esprit absolue.
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Star size={18} className="text-[#00A86B]" />
                  Équipements & Services
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
                    >
                      <item.icon
                        size={16}
                        className="text-[#00A86B]"
                      />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent Card */}
              <div className="bg-[#0A0E27] text-white p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-[#00A86B] rounded-full blur-[60px] opacity-20" />
                <div className="w-12 h-12 rounded-full border-2 border-[#00A86B] overflow-hidden flex-shrink-0">
                  <img
                    src={`https://i.pravatar.cc/150?u=${listing.id}`}
                    alt="Agent"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg">
                    Sarah M.
                  </div>
                  <div className="text-xs text-gray-400">
                    Agent Immobilier Agréé
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-[#00A86B] hover:bg-[#008F5A] text-white border-none shadow-lg shadow-[#00A86B]/20"
                >
                  Contacter
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-10 flex gap-3">
              <Button
                variant="outline"
                className="flex-1 gap-2 border-gray-200 hover:bg-gray-50 hover:text-[#00A86B]"
              >
                <Share2 size={16} />
                Partager
              </Button>
              <Button className="flex-[2] bg-[#0A0E27] hover:bg-[#1a2151] text-white gap-2 shadow-xl shadow-[#0A0E27]/20">
                <Calendar size={16} />
                Réserver une visite
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}