import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Home, DollarSign, BarChart3, Image as ImageIcon, Loader2, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useAuth } from '../../presentation/hooks/useAuth';
import { useOwnerListings } from '../../presentation/hooks/useListings';
import { useServices } from '../../presentation/contexts/ServiceContext';
import { CreateListingDto } from '../../domain/entities/Listing';

export function HostPage() {
  const { user, loading: authLoading } = useAuth();
  const { listings, loading: listingsLoading, refetch } = useOwnerListings(user?.id);
  const { listingService } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    beds: '',
    baths: '',
    area: '',
    image: '',
    category: 'Appartement'
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
      toast.error("Connectez-vous pour accéder à l'espace hôte");
    }
  }, [user, authLoading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);

    try {
      const listingDto: CreateListingDto = {
        title: formData.title,
        price: parseInt(formData.price),
        location: formData.location,
        description: formData.description,
        beds: parseInt(formData.beds) || 0,
        baths: parseInt(formData.baths) || 0,
        area: parseInt(formData.area) || 0,
        image: formData.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        category: formData.category,
      };

      await listingService.createListing(listingDto, user.id);
      await refetch();
      
      setIsModalOpen(false);
      toast.success("Annonce publiée avec succès !");
      
      // Reset form
      setFormData({
        title: '',
        price: '',
        location: '',
        description: '',
        beds: '',
        baths: '',
        area: '',
        image: '',
        category: 'Appartement'
      });
      
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erreur lors de la publication");
    } finally {
      setSubmitting(false);
    }
  };

  const loading = authLoading || listingsLoading;

  if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <Loader2 className="animate-spin text-[#00A86B]" size={48} />
       </div>
     );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="font-montserrat font-bold text-3xl text-[#0A0E27]">Tableau de bord Hôte</h1>
            <p className="text-gray-500 mt-2">Gérez vos biens et suivez vos performances.</p>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#00A86B] hover:bg-[#008F5A] text-white font-bold h-12 px-6 rounded-xl shadow-lg shadow-[#00A86B]/20"
          >
            <Plus className="mr-2" /> Créer une annonce
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <Home size={20} />
              </div>
              <span className="text-gray-500 font-medium">Annonces actives</span>
            </div>
            <div className="text-3xl font-bold text-[#0A0E27]">{listings.length}</div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#00A86B]">
                <DollarSign size={20} />
              </div>
              <span className="text-gray-500 font-medium">Revenus (Mensuel)</span>
            </div>
            <div className="text-3xl font-bold text-[#0A0E27]">0 FCFA</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                <BarChart3 size={20} />
              </div>
              <span className="text-gray-500 font-medium">Vues totales</span>
            </div>
            <div className="text-3xl font-bold text-[#0A0E27]">0</div>
          </div>
        </div>

        {/* Listings List */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-xl text-[#0A0E27]">Mes Annonces</h2>
          </div>
          
          {listings.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <Home size={32} />
              </div>
              <p className="text-lg font-medium mb-1">Vous n'avez pas encore d'annonce</p>
              <p className="text-sm">Commencez par ajouter votre premier bien immobilier.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {listings.map((item) => (
                <div key={item.id} className="p-6 flex flex-col md:flex-row gap-6 items-center hover:bg-gray-50 transition-colors">
                  <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 w-full text-center md:text-left">
                    <h3 className="font-bold text-lg text-[#0A0E27] mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{item.location}</p>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
                      <span>{item.price.toLocaleString()} FCFA</span>
                      <span>•</span>
                      <span>{item.category || 'Logement'}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">Modifier</Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* CREATE LISTING MODAL */}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
              <Dialog.Title className="text-2xl font-bold leading-none tracking-tight">Ajouter une annonce</Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500">
                Remplissez les détails de votre bien immobilier.
              </Dialog.Description>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Titre de l'annonce</label>
                <Input name="title" value={formData.title} onChange={handleInputChange} required placeholder="ex: Villa moderne avec piscine" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Prix (FCFA / mois)</label>
                  <Input name="price" type="number" value={formData.price} onChange={handleInputChange} required placeholder="500000" />
                </div>
                <div>
                   <label className="text-sm font-medium mb-1 block">Catégorie</label>
                   <select 
                     name="category"
                     value={formData.category}
                     onChange={handleInputChange}
                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                   >
                     <option value="Appartement">Appartement</option>
                     <option value="Maison">Maison</option>
                     <option value="Villa">Villa</option>
                     <option value="Terrain">Terrain</option>
                     <option value="Bureau">Bureau</option>
                   </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Localisation</label>
                <Input name="location" value={formData.location} onChange={handleInputChange} required placeholder="ex: Sablière, Libreville" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                   <label className="text-sm font-medium mb-1 block">Chambres</label>
                   <Input name="beds" type="number" value={formData.beds} onChange={handleInputChange} placeholder="3" />
                </div>
                <div>
                   <label className="text-sm font-medium mb-1 block">SDB</label>
                   <Input name="baths" type="number" value={formData.baths} onChange={handleInputChange} placeholder="2" />
                </div>
                <div>
                   <label className="text-sm font-medium mb-1 block">Surface (m²)</label>
                   <Input name="area" type="number" value={formData.area} onChange={handleInputChange} placeholder="150" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Image (URL)</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <Input 
                    name="image" 
                    value={formData.image} 
                    onChange={handleInputChange} 
                    placeholder="https://..." 
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Laissez vide pour une image par défaut.</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Décrivez votre bien..."
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Annuler</Button>
                <Button type="submit" className="bg-[#00A86B] hover:bg-[#008F5A] text-white" disabled={submitting}>
                  {submitting ? <Loader2 className="animate-spin mr-2" /> : null}
                  Publier
                </Button>
              </div>
            </form>

            <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
