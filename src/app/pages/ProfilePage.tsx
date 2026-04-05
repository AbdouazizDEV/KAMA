import { useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Edit, Settings, LogOut, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { useAuth } from '../../presentation/hooks/useAuth';
import { useOwnerListings } from '../../presentation/hooks/useListings';

export function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const { listings } = useOwnerListings(user?.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      toast.error("Veuillez vous connecter pour accéder à votre profil");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    toast.success("Déconnexion réussie");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-[#00A86B]" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner">
                  <img 
                    src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-[#00A86B] text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Edit size={16} />
                </button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="font-montserrat font-bold text-3xl text-[#0A0E27] mb-2">
                  {user?.name || "Utilisateur KAMA"}
                </h1>
                <p className="text-gray-500 mb-4 flex items-center justify-center md:justify-start gap-2">
                  <MapPin size={16} /> Libreville, Gabon
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <Button variant="outline" className="rounded-full border-gray-200 hover:bg-gray-50">
                    <Settings size={16} className="mr-2" /> Paramètres
                  </Button>
                  <Button variant="ghost" className="rounded-full text-red-500 hover:bg-red-50 hover:text-red-600" onClick={handleLogout}>
                    <LogOut size={16} className="mr-2" /> Déconnexion
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Coordonnées</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail size={18} className="text-[#00A86B]" />
                    <span className="truncate">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={18} className="text-[#00A86B]" />
                    <span>+241 07 00 00 00</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#00A86B]/10 rounded-2xl p-6 border border-[#00A86B]/20">
                <h3 className="font-bold text-[#008F5A] mb-2">Devenir Hôte</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Gagnez de l'argent en louant votre bien sur KAMA.
                </p>
                <Button className="w-full bg-[#00A86B] hover:bg-[#008F5A] text-white font-bold" onClick={() => navigate('/host')}>
                  Commencer
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-xl">Mes Activités</h2>
                </div>

                {listings.length > 0 ? (
                   <div className="space-y-4">
                     {listings.map(item => (
                       <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all">
                         <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                           {item.image ? (
                             <img src={item.image} alt="" className="w-full h-full object-cover" />
                           ) : (
                             <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">IMG</div>
                           )}
                         </div>
                         <div>
                           <h4 className="font-bold text-[#0A0E27] line-clamp-1">{item.title}</h4>
                           <p className="text-sm text-gray-500 mb-2">{item.location}</p>
                           <span className="text-[#00A86B] font-bold text-sm">{item.price} FCFA</span>
                         </div>
                       </div>
                     ))}
                   </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                      <User size={32} />
                    </div>
                    <h3 className="text-gray-900 font-medium mb-1">Aucune activité récente</h3>
                    <p className="text-gray-400 text-sm">Vos réservations et annonces apparaîtront ici.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
