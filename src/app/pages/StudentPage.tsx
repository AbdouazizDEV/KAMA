import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { BookOpen, Wifi, Users, Wallet, ArrowRight, CheckCircle, GraduationCap } from 'lucide-react';
import { Link } from 'react-router';

export function StudentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1565490129165-bd6a24996c25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdW5pdmVyc2l0eSUyMHN0dWRlbnRzJTIwY2FtcHVzJTIwaGFwcHl8ZW58MXx8fHwxNzcxMDEwNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Étudiants heureux"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27]/90 via-[#0A0E27]/70 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00A86B]/20 border border-[#00A86B]/50 backdrop-blur-md mb-6">
              <GraduationCap size={20} className="text-[#00A86B]" />
              <span className="text-[#00A86B] font-bold tracking-wide text-sm uppercase">Programme KAMA Étudiant</span>
            </div>
            
            <h1 className="font-montserrat font-bold text-5xl md:text-7xl mb-6 leading-tight">
              Étudiez l'esprit <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] to-[#00A86B]">
                tranquille
              </span>
            </h1>
            
            <p className="text-gray-300 text-xl mb-8 leading-relaxed">
              Trouvez un logement abordable, proche de votre campus et vérifié par nos équipes. 
              Des studios modernes aux colocations conviviales, tout est pensé pour votre réussite.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/search?type=student">
                <Button className="h-14 px-8 text-lg font-bold rounded-xl bg-[#00A86B] hover:bg-[#008F5A] text-white shadow-lg shadow-[#00A86B]/30">
                  Trouver un logement
                </Button>
              </Link>
              <Button variant="outline" className="h-14 px-8 text-lg font-bold rounded-xl border-white text-white hover:bg-white/10">
                Comment ça marche ?
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-[#0A0E27] mb-4">
              Pourquoi choisir KAMA Étudiant ?
            </h2>
            <p className="text-gray-500 text-lg">
              Nous savons que la vie étudiante peut être stressante. Votre logement ne devrait pas l'être.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Wallet, title: "Prix Abordables", desc: "Des loyers négociés spécialement pour les budgets étudiants." },
              { icon: Wifi, title: "Wifi Haut Débit", desc: "Connexion fibre incluse dans la plupart de nos logements partenaires." },
              { icon: Users, title: "Colocations Vérifiées", desc: "Trouvez des colocataires compatibles grâce à notre système de matching." },
              { icon: BookOpen, title: "Proche Campus", desc: "Logements situés à moins de 30 minutes des grandes écoles." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#E6F7F1] flex items-center justify-center text-[#00A86B] mb-6">
                  <feature.icon size={28} />
                </div>
                <h3 className="font-bold text-xl text-[#0A0E27] mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE SECTION */}
      <section className="py-24 bg-[#0A0E27] text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00A86B] to-[#0066CC] rounded-3xl blur-2xl opacity-30 transform rotate-3" />
              <img 
                src="https://images.unsplash.com/photo-1767800766055-1cdbd2e351b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdHVkZW50JTIwZG9ybSUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzEwMTA2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Chambre étudiante moderne" 
                className="relative z-10 rounded-3xl shadow-2xl w-full"
              />
              
              <div className="absolute -bottom-10 -right-10 z-20 bg-white text-[#0A0E27] p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white" />
                    ))}
                  </div>
                  <div className="font-bold text-lg">+500</div>
                </div>
                <p className="font-medium text-sm">Étudiants logés cette année à Libreville</p>
              </div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="font-montserrat font-bold text-4xl mb-6">
                Plus qu'un simple toit
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                En rejoignant la communauté KAMA Étudiant, vous accédez à un écosystème conçu pour faciliter votre vie quotidienne et vos études.
              </p>

              <div className="space-y-4">
                {[
                  "Garantie simplifiée (pas besoin de 3 mois de caution)",
                  "Assistance juridique incluse",
                  "Accès aux espaces de coworking partenaires",
                  "Réductions sur les services de déménagement"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle className="text-[#00A86B] shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Button className="mt-10 bg-[#FFB800] hover:bg-[#E5A600] text-[#0A0E27] font-bold h-12 px-8 rounded-xl">
                Rejoindre le programme
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-[#0A0E27] mb-8">
            Prêt à emménager ?
          </h2>
          <div className="flex justify-center gap-4">
             <Link to="/search">
               <Button className="bg-[#0A0E27] text-white hover:bg-[#1A1F3A] h-14 px-10 rounded-xl font-bold text-lg shadow-xl">
                 Voir les annonces
               </Button>
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
