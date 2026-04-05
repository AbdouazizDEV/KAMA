import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { ArrowRight, CheckCircle2, Building2, Users, Globe2 } from 'lucide-react';
import { Link } from 'react-router';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1726696513898-11473822d211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHYWJvbiUyMGxhbmRzY2FwZSUyMG1vZGVybiUyMGNpdHklMjBsaWJyZXZpbGxlfGVufDF8fHx8MTc3MTAyMjA1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Libreville Skyline" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27]/90 to-[#0A0E27]/40" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10 pt-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Réinventer l'immobilier <span className="text-[#00A86B]">au Gabon</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                KAMA connecte propriétaires et locataires à travers une expérience digitale premium, sécurisée et innovante.
              </p>
              <Link to="/search">
                <Button className="bg-[#00A86B] hover:bg-[#008F5A] text-white px-8 py-6 text-lg rounded-xl">
                  Explorer nos biens
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-[#0A0E27] mb-6">Notre Vision</h2>
                <div className="w-20 h-1 bg-[#FFB800] mb-8"></div>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Né de la volonté de moderniser le marché immobilier gabonais, KAMA fusionne technologie de pointe et connaissance approfondie du terrain.
                </p>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Nous croyons que trouver un logement à Libreville, Port-Gentil ou Franceville devrait être aussi simple et transparent que de commander un VTC. Notre plateforme élimine les intermédiaires superflus et garantit la fiabilité des annonces grâce à nos processus de vérification rigoureux.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Visites virtuelles 3D immersives",
                    "Paiements sécurisés via mobile money & carte",
                    "Contrats digitalisés et signature électronique",
                    "Support client local 7j/7"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="text-[#00A86B] flex-shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-[#FFB800]/20 rounded-3xl -z-10 transform rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1758519289174-72721d274e4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjB0ZWFtJTIwbWVldGluZyUyMG1vZGVybnxlbnwxfHx8fDE3NzEwMjIwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                  alt="KAMA Team" 
                  className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats / Features */}
        <section className="py-20 bg-[#0A0E27] text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="w-16 h-16 bg-[#0066CC]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0066CC]">
                  <Building2 size={32} />
                </div>
                <h3 className="text-4xl font-bold mb-2">500+</h3>
                <p className="text-gray-400">Biens d'exception</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="w-16 h-16 bg-[#00A86B]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00A86B]">
                  <Users size={32} />
                </div>
                <h3 className="text-4xl font-bold mb-2">10k+</h3>
                <p className="text-gray-400">Utilisateurs actifs</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="w-16 h-16 bg-[#FFB800]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#FFB800]">
                  <Globe2 size={32} />
                </div>
                <h3 className="text-4xl font-bold mb-2">9</h3>
                <p className="text-gray-400">Provinces couvertes</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Gallery */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#0A0E27] mb-4">L'Excellence Immobilière</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Des villas de luxe à la Sablière aux appartements modernes au Centre-Ville.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
              <div className="h-full rounded-2xl overflow-hidden relative group">
                 <img 
                  src="https://images.unsplash.com/photo-1622015663084-307d19eabbbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjB2aWxsYSUyMHRyb3BpY2FsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MTAyMjA2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                  alt="Luxury Villa" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl font-bold">Résidences Premium</h3>
                  <p className="text-gray-200">La Sablière, Libreville</p>
                </div>
              </div>
              <div className="grid grid-rows-2 gap-4 h-full">
                <div className="rounded-2xl overflow-hidden relative group h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                    alt="Modern Office" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                     <h3 className="text-white text-xl font-bold">Espaces Professionnels</h3>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden relative group h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200" 
                    alt="Apartment" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                     <h3 className="text-white text-xl font-bold">Appartements Citadins</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#00A86B] text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Prêt à trouver votre bien idéal ?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Rejoignez des milliers de Gabonais qui ont déjà fait confiance à KAMA pour leur projet immobilier.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link to="/search">
                <Button className="bg-white text-[#00A86B] hover:bg-gray-100 px-8 py-6 text-lg rounded-xl font-bold w-full md:w-auto">
                  Parcourir les annonces
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl font-bold w-full md:w-auto">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
