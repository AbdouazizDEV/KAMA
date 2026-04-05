import { Link } from 'react-router';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Footer() {
  return (
    <footer className="bg-[#0A0E27] text-white pt-24 pb-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#00A86B] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                K
              </div>
              <span className="font-montserrat font-bold text-2xl tracking-tight text-white">
                KAMA
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              La première plateforme immobilière premium au Gabon. 
              Transactions sécurisées, visites virtuelles 3D et expérience utilisateur inégalée.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00A86B] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00A86B] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00A86B] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00A86B] transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6 text-white">Explorer</h4>
            <ul className="space-y-4">
              <li><Link to="/search" className="text-gray-400 hover:text-[#00A86B] transition-colors">Louer un bien</Link></li>
              <li><Link to="/buy" className="text-gray-400 hover:text-[#00A86B] transition-colors">Acheter un bien</Link></li>
              <li><Link to="/host" className="text-gray-400 hover:text-[#00A86B] transition-colors">Proposer un bien</Link></li>
              <li><Link to="/map" className="text-gray-400 hover:text-[#00A86B] transition-colors">Carte interactive</Link></li>
              <li><Link to="/new" className="text-gray-400 hover:text-[#00A86B] transition-colors">Nouveautés</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6 text-white">Entreprise</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-[#00A86B] transition-colors">À propos de KAMA</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-[#00A86B] transition-colors">Carrières</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-[#00A86B] transition-colors">Blog & Actualités</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-[#00A86B] transition-colors">Presse</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#00A86B] transition-colors">Nous contacter</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6 text-white">Restez informé</h4>
            <p className="text-gray-400 text-sm mb-4">
              Recevez les meilleures offres et actualités immobilières chaque semaine.
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Votre email" 
                className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:ring-[#00A86B]"
              />
              <Button className="w-full bg-[#00A86B] hover:bg-[#008F5A] text-white">
                S'abonner
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 KAMA Group. Tous droits réservés. Fièrement développé à Libreville.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Conditions</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Plan du site</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
