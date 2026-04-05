import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { Construction } from 'lucide-react';

export function ComingSoonPage({ title = "Page en construction" }: { title?: string }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
          <Construction className="text-[#00A86B]" size={48} />
        </div>
        <h1 className="font-montserrat font-bold text-3xl md:text-5xl text-[#0A0E27] mb-6">
          {title}
        </h1>
        <p className="text-gray-500 text-lg max-w-lg mb-10">
          Nous travaillons activement sur cette fonctionnalité pour vous offrir la meilleure expérience possible. 
          Revenez très bientôt !
        </p>
        <Link to="/">
          <Button className="h-14 px-8 text-lg font-bold rounded-xl bg-gradient-to-r from-[#00A86B] to-[#0066CC]">
            Retour à l'accueil
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
