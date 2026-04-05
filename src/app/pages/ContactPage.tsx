import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-[#0A0E27] mb-6">Contactez-nous</h1>
              <p className="text-gray-600 text-lg">
                Notre équipe est à votre écoute pour vous accompagner dans tous vos projets immobiliers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12 bg-[#00A86B] text-white">
                <h2 className="text-2xl font-bold mb-8">Nos Coordonnées</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Siège Social</h3>
                      <p className="text-white/80">Quartier Louis, Boulevard Triomphal<br/>BP 1234 Libreville, Gabon</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                      <p className="text-white/80">+241 01 23 45 67</p>
                      <p className="text-white/80">+241 74 00 00 00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-white/80">contact@kama-gabon.com</p>
                      <p className="text-white/80">support@kama-gabon.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-12 border-t border-white/10">
                  <h3 className="font-semibold text-lg mb-4">Suivez-nous</h3>
                  <div className="flex gap-4">
                    {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                      <div key={social} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                        <span className="sr-only">{social}</span>
                        {/* Icons would go here */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-[#0A0E27] mb-6">Envoyez-nous un message</h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">Nom complet</label>
                      <Input id="name" placeholder="Jean Dupont" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                      <Input id="email" type="email" placeholder="jean@exemple.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-700">Sujet</label>
                    <Input id="subject" placeholder="Renseignement sur un bien" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Comment pouvons-nous vous aider ?"
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full bg-[#00A86B] hover:bg-[#008F5A] text-white h-12 text-lg">
                    Envoyer le message <Send size={18} className="ml-2" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
