import { useState, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FeaturedListingCard } from '../components/FeaturedListingCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { SlidersHorizontal, Map as MapIcon, ChevronDown, Check, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as Slider from '@radix-ui/react-slider';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useSearchListings } from '../../presentation/hooks/useListings';
import { ListingFilters } from '../../domain/entities/Listing';

function FilterSection({ title, children, defaultOpen = true }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center justify-between w-full font-montserrat font-semibold text-[#0A0E27] mb-4"
      >
        {title}
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SearchPage() {
  const [priceRange, setPriceRange] = useState([500000, 50000000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Utilisation du hook personnalisé avec filtres
  const filters: ListingFilters = useMemo(() => ({
    types: selectedTypes.length > 0 ? selectedTypes : undefined,
    priceRange: priceRange,
  }), [selectedTypes, priceRange]);

  const { listings: filteredListings, loading } = useSearchListings(filters);

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      
      <div className="flex">
        {/* SIDEBAR FILTERS - Desktop */}
        <aside className="hidden lg:block w-80 bg-white border-r border-gray-200 h-[calc(100vh-80px)] sticky top-20 overflow-y-auto p-6 scrollbar-thin">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-montserrat font-bold text-xl">Filtres</h2>
            <button 
              onClick={() => { setSelectedTypes([]); setPriceRange([500000, 50000000]); }}
              className="text-sm text-[#00A86B] font-medium hover:underline"
            >
              Réinitialiser
            </button>
          </div>


          <FilterSection title="Type de bien">
            <div className="space-y-3">
              {['Appartement', 'Maison', 'Villa', 'Terrain', 'Bureau', 'Logement Étudiant', 'Véhicule'].map((type) => (
                <div key={type} className="flex items-center gap-3">
                  <Checkbox.Root 
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() => toggleType(type)}
                    className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center data-[state=checked]:bg-[#00A86B] data-[state=checked]:border-[#00A86B]"
                  >
                    <Checkbox.Indicator>
                      <Check size={14} className="text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label 
                    className="text-gray-600 cursor-pointer select-none"
                    onClick={() => toggleType(type)}
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Prix (FCFA)">
            <div className="px-2 pt-4 pb-2">
              <Slider.Root 
                className="relative flex items-center select-none w-full h-5" 
                value={priceRange}
                max={50000000} 
                step={500000}
                onValueChange={setPriceRange}
              >
                <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
                  <Slider.Range className="absolute bg-[#00A86B] rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-[#00A86B] shadow-md rounded-full hover:bg-gray-50 focus:outline-none focus:shadow-[0_0_0_4px_rgba(0,168,107,0.2)]" />
                <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-[#00A86B] shadow-md rounded-full hover:bg-gray-50 focus:outline-none focus:shadow-[0_0_0_4px_rgba(0,168,107,0.2)]" />
              </Slider.Root>
              <div className="flex justify-between mt-4 text-sm font-mono text-gray-500">
                <span>{(priceRange[0] / 1000).toFixed(0)}k</span>
                <span>{(priceRange[1] / 1000000).toFixed(1)}M+</span>
              </div>
            </div>
          </FilterSection>

          <FilterSection title="Nombre de pièces">
            <div className="flex gap-2">
              {[1, 2, 3, 4, '5+'].map((num) => (
                <button 
                  key={num} 
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#00A86B] hover:text-[#00A86B] hover:bg-[#E6F7F1] transition-colors focus:bg-[#00A86B] focus:text-white"
                >
                  {num}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Équipements">
             <div className="grid grid-cols-2 gap-3">
              {['Parking', 'Piscine', 'Jardin', 'Clim', 'Gardien', 'Wifi'].map((feat) => (
                <div key={feat} className="flex items-center gap-2">
                  <Checkbox.Root className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center data-[state=checked]:bg-[#00A86B] data-[state=checked]:border-[#00A86B]">
                    <Checkbox.Indicator>
                      <Check size={10} className="text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label className="text-sm text-gray-600 cursor-pointer">{feat}</label>
                </div>
              ))}
            </div>
          </FilterSection>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="font-montserrat font-bold text-2xl text-[#0A0E27]">
                Logements à Libreville
              </h1>
              <p className="text-gray-500 mt-1">{filteredListings.length} résultats trouvés</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button variant="outline" className="lg:hidden flex-1 gap-2">
                <SlidersHorizontal size={18} /> Filtres
              </Button>
              <Button variant="outline" className="hidden md:flex gap-2">
                Trier par: Pertinence <ChevronDown size={16} />
              </Button>
              <Button className="flex-1 md:flex-none gap-2 bg-[#0A0E27] text-white hover:bg-[#1A1F3A]">
                <MapIcon size={18} /> Carte
              </Button>
            </div>
          </div>

          {/* Results Grid */}
          {loading ? (
             <div className="flex justify-center py-20">
               <Loader2 className="animate-spin text-[#00A86B]" size={48} />
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredListings.map((listing, i) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <FeaturedListingCard listing={listing} />
                </motion.div>
              ))}
              {filteredListings.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-500">
                  <p className="text-xl font-semibold mb-2">Aucune annonce trouvée</p>
                  <p>Essayez de modifier vos filtres.</p>
                  <Button 
                    variant="link" 
                    className="text-[#00A86B] mt-4"
                    onClick={() => { setSelectedTypes([]); setPriceRange([500000, 50000000]); }}
                  >
                    Réinitialiser tous les filtres
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Load More */}
          {filteredListings.length > 0 && (
            <div className="mt-12 text-center">
              <Button size="lg" variant="outline" className="border-2 border-[#00A86B] text-[#00A86B] font-bold px-12 hover:bg-[#E6F7F1]">
                Charger plus de résultats
              </Button>
            </div>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
