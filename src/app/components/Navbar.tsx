import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Bell, MessageSquare, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../../lib/utils';
import * as Avatar from '@radix-ui/react-avatar';
import { AuthModal } from './AuthModal';
import { toast } from 'sonner';
import { useAuth } from '../../presentation/hooks/useAuth';
import kamaLogo from '@/images/KAMAlogo1.jpeg';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast.success("Déconnexion réussie");
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Louer', href: '/search?type=rent' },
    { name: 'Acheter', href: '/search?type=buy' },
    { name: 'Proposer un bien', href: '/host' },
    { name: 'Programme Étudiant', href: '/student' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
          scrolled || !isHome
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-gray-100 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={kamaLogo}
              alt="KAMA — logo"
              className="h-12 w-auto sm:h-14 md:h-16 object-contain rounded-lg group-hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#00A86B]",
                  scrolled || !isHome ? "text-gray-600" : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className={scrolled || !isHome ? "text-gray-600" : "text-white"}>
              <Search className="w-5 h-5" />
            </Button>
            
            {user ? (
              <>
                <Button variant="ghost" size="icon" className={scrolled || !isHome ? "text-gray-600" : "text-white"}>
                  <Bell className="w-5 h-5" />
                </Button>
                
                <div className="h-8 w-[1px] bg-gray-200 mx-2" />
                
                <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-black/5 p-1 rounded-full transition-colors group relative">
                  <Avatar.Root className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <Avatar.Image
                      className="w-full h-full object-cover"
                      src={user.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"}
                      alt="User"
                    />
                    <Avatar.Fallback className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <User className="w-4 h-4" />
                    </Avatar.Fallback>
                  </Avatar.Root>

                  {/* Dropdown for Logout */}
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg">
                      <LogOut size={16} /> Déconnexion
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Button 
                onClick={() => setAuthOpen(true)}
                className="bg-[#00A86B] hover:bg-[#008F5A] text-white font-bold"
              >
                Connexion
              </Button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className={cn(
              "md:hidden p-2 rounded-md",
              scrolled || !isHome ? "text-gray-900" : "text-white"
            )}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-white z-[60] flex flex-col"
            >
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <img
                  src={kamaLogo}
                  alt="KAMA — logo"
                  className="h-14 w-auto object-contain rounded-lg"
                />
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.href} 
                    className="text-2xl font-medium text-[#0A0E27]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <hr className="border-gray-100 my-4" />
                
                {user ? (
                  <>
                    <Link to="/profile" className="flex items-center gap-4 text-lg font-medium text-gray-600">
                      <User className="w-6 h-6" /> Mon Profil
                    </Link>
                    <Link to="/messages" className="flex items-center gap-4 text-lg font-medium text-gray-600">
                      <MessageSquare className="w-6 h-6" /> Messages
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-4 text-lg font-medium text-red-500">
                      <LogOut className="w-6 h-6" /> Déconnexion
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthOpen(true);
                    }}
                    className="flex items-center gap-4 text-lg font-medium text-[#00A86B]"
                  >
                    <User className="w-6 h-6" /> Connexion / Inscription
                  </button>
                )}
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <Button className="w-full bg-[#00A86B] hover:bg-[#008F5A] text-white py-6 text-lg">
                  Publier une annonce
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
