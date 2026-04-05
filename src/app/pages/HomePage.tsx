import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Building, Home, Trees, Car, ArrowRight, Star, ChevronDown, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { CategoryCard } from '../components/CategoryCard';
import { FeaturedListingCard } from '../components/FeaturedListingCard';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Link } from 'react-router';
import { useListings } from '../../presentation/hooks/useListings';

const CATEGORIES = [
  { title: 'Appartements', count: '1,234', icon: Building, image: 'https://images.unsplash.com/photo-1757439402190-99b73ac8e807?w=600&h=400&fit=crop' },
  { title: 'Maisons', count: '856', icon: Home, image: 'https://images.unsplash.com/photo-1580387128798-a5abad264ac4?w=600&h=400&fit=crop' },
  { title: 'Terrains', count: '432', icon: Trees, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop' },
  { title: 'Véhicules', count: '120', icon: Car, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop' },
];

export function HomePage() {
  const [activeTab, setActiveTab] = useState('rent');
  const { listings, loading } = useListings();
  const featuredListings = listings.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1765475467677-579353b25ce0?w=1920&h=1080&fit=crop"
            alt="Libreville Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27]/70 via-[#0A0E27]/50 to-[#0A0E27]/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-montserrat font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight tracking-tight"
          >
            Trouvez votre <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A86B] to-[#0066CC]">
              logement idéal
            </span> au Gabon
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-gray-200 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light"
          >
            La première plateforme digitale pour l'immobilier premium.
            Simple, sécurisé et transparent.
          </motion.p>

          {/* Search Bar Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 md:p-6 shadow-2xl max-w-4xl mx-auto border border-white/20"
          >
            {/* Search Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-100 pb-4">
              <button
                onClick={() => setActiveTab('rent')}
                className={`pb-2 px-4 font-semibold text-lg transition-colors relative ${
                  activeTab === 'rent' ? 'text-[#00A86B]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Louer
                {activeTab === 'rent' && (
                  <motion.div layoutId="underline" className="absolute bottom-[-17px] left-0 right-0 h-1 bg-[#00A86B] rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('buy')}
                className={`pb-2 px-4 font-semibold text-lg transition-colors relative ${
                  activeTab === 'buy' ? 'text-[#00A86B]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Acheter
                {activeTab === 'buy' && (
                  <motion.div layoutId="underline" className="absolute bottom-[-17px] left-0 right-0 h-1 bg-[#00A86B] rounded-full" />
                )}
              </button>
            </div>

            {/* Search Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4 relative group">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block pl-3">Localisation</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-[#00A86B]" size={20} />
                  <input
                    type="text"
                    placeholder="Ville, Quartier..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/20 transition-shadow"
                  />
                </div>
              </div>

              <div className="md:col-span-3 relative border-l border-gray-100 pl-4">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block pl-3">Type</label>
                 <div className="relative">
                   <Home className="absolute left-3 top-3 text-[#00A86B]" size={20} />
                   <select className="w-full pl-10 pr-8 py-3 bg-gray-50 rounded-xl font-medium text-gray-800 focus:outline-none appearance-none cursor-pointer">
                     <option>Appartement</option>
                     <option>Maison</option>
                     <option>Villa</option>
                     <option>Terrain</option>
                   </select>
                   <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                 </div>
              </div>

              <div className="md:col-span-3 relative border-l border-gray-100 pl-4">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block pl-3">Budget Max</label>
                 <div className="relative">
                   <span className="absolute left-3 top-3 text-[#00A86B] font-bold">₣</span>
                   <input
                    type="number"
                    placeholder="Budget"
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 rounded-xl font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none"
                  />
                 </div>
              </div>

              <div className="md:col-span-2">
                <Link to="/search">
                  <Button className="w-full h-14 bg-gradient-to-r from-[#00A86B] to-[#0066CC] hover:shadow-lg hover:shadow-[#00A86B]/30 transition-all rounded-xl text-lg font-bold">
                    <Search className="mr-2" size={20} />
                    Chercher
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Biens immobiliers', value: '1,234+' },
            { label: 'Propriétaires', value: '567' },
            { label: 'Locations réussies', value: '2.3k' },
            { label: 'Villes couvertes', value: '9' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-mono font-bold text-[#0A0E27] mb-2">{stat.value}</div>
              <div className="text-gray-500 font-medium uppercase text-sm tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <section className="py-24 bg-[#F7FAFC]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-montserrat font-bold text-4xl text-[#0A0E27] mb-4">Explorez par catégorie</h2>
              <p className="text-gray-500 text-lg max-w-xl">
                Que vous cherchiez un appartement en ville ou une villa au bord de mer, nous avons ce qu'il vous faut.
              </p>
            </div>
            <Button variant="ghost" className="text-[#00A86B] font-semibold hidden md:flex">
              Voir toutes les catégories <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <CategoryCard {...cat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent z-0" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div>
              <span className="text-[#00A86B] font-bold tracking-wider uppercase mb-2 block">Premium Selection</span>
              <h2 className="font-montserrat font-bold text-4xl text-[#0A0E27]">Biens en vedette</h2>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
               <Button variant="outline" className="rounded-full w-12 h-12 p-0 flex items-center justify-center border-gray-200">
                 <ArrowRight className="rotate-180" size={20} />
               </Button>
               <Button variant="outline" className="rounded-full w-12 h-12 p-0 flex items-center justify-center border-[#0A0E27] bg-[#0A0E27] text-white hover:bg-[#0A0E27]/90 hover:text-white">
                 <ArrowRight size={20} />
               </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-center text-gray-400 py-10">
                Chargement des annonces...
              </div>
            ) : (
              featuredListings.map((listing) => (
                <FeaturedListingCard key={listing.id} listing={listing} />
              ))
            )}
            {!loading && featuredListings.length === 0 && (
              <div className="col-span-3 text-center text-gray-400 py-10">
                Aucune annonce disponible
              </div>
            )}
          </div>
        </div>
      </section>

      {/* INNOVATION SECTION */}
      <section className="py-24 bg-[#0A0E27] text-white overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00A86B]/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0066CC]/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-8 leading-tight">
                L'immobilier rencontre <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A86B] to-[#FFB800]">
                  l'innovation
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                KAMA redéfinit l'expérience immobilière au Gabon grâce aux technologies de pointe.
                Visitez des biens sans vous déplacer et signez vos contrats en toute sécurité.
              </p>

              <div className="space-y-8">
                {[
                  { title: 'Visites Virtuelles 3D', desc: 'Explorez chaque recoin comme si vous y étiez.', icon: '🎥' },
                  { title: 'Contrats Intelligents', desc: 'Sécurisés par la blockchain pour une transparence totale.', icon: '🔗' },
                  { title: 'Assistant IA', desc: 'Une aide personnalisée 24/7 pour votre recherche.', icon: '🤖' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-default"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-3xl shadow-inner border border-white/10">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.div 
                initial={{ rotate: -5 }}
                whileInView={{ rotate: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1593696140829-c38b9ca39d53?w=800&h=1000&fit=crop" 
                  alt="App Mobile KAMA" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Floating Card */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#10B981] flex items-center justify-center">
                      <CheckCircle className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Transaction Réussie</div>
                      <div className="text-green-400 text-sm">Paiement sécurisé confirmé</div>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-[#10B981]" 
                    />
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFB800] rounded-full opacity-20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-[#00A86B] to-[#0066CC] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-white mb-8">
                Prêt à trouver votre chez-vous ?
              </h2>
              <p className="text-white/90 text-xl mb-10 leading-relaxed">
                Rejoignez des milliers de Gabonais qui ont trouvé leur bonheur sur KAMA.
                Commencez votre recherche dès maintenant.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link to="/search">
                  <Button className="bg-white text-[#00A86B] hover:bg-gray-100 h-14 px-8 text-lg font-bold rounded-xl shadow-lg">
                    Parcourir les annonces
                  </Button>
                </Link>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 h-14 px-8 text-lg font-bold rounded-xl">
                  Devenir Propriétaire
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
