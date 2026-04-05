import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { ListingPage } from './pages/ListingPage';
import { ProfilePage } from './pages/ProfilePage';
import { HostPage } from './pages/HostPage';
import { StudentPage } from './pages/StudentPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { ServiceProvider } from '../presentation/contexts/ServiceContext';
import { SupabaseListingRepository } from '../infrastructure/repositories/SupabaseListingRepository';
import { SupabaseAuthRepository } from '../infrastructure/repositories/SupabaseAuthRepository';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import { ComingSoonPage } from './pages/ComingSoonPage';
import { Navigate } from 'react-router';

// Initialisation des repositories (injection de dépendances)
const listingRepository = new SupabaseListingRepository();
const authRepository = new SupabaseAuthRepository();

export default function App() {
  return (
    <ServiceProvider 
      listingRepository={listingRepository}
      authRepository={authRepository}
    >
      <Router>
        <ScrollToTop />
        <Toaster position="top-center" richColors />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/listing/:id" element={<ListingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/host" element={<HostPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Redirects */}
        <Route path="/buy" element={<Navigate to="/search" replace />} />
        <Route path="/rent" element={<Navigate to="/search" replace />} />
        <Route path="/map" element={<Navigate to="/search" replace />} />
        <Route path="/new" element={<Navigate to="/search" replace />} />
        
        {/* Coming Soon Pages */}
        <Route path="/careers" element={<ComingSoonPage title="Carrières chez KAMA" />} />
        <Route path="/blog" element={<ComingSoonPage title="Blog & Actualités" />} />
        <Route path="/press" element={<ComingSoonPage title="Espace Presse" />} />
        <Route path="/privacy" element={<ComingSoonPage title="Confidentialité" />} />
        <Route path="/terms" element={<ComingSoonPage title="Conditions d'utilisation" />} />
        <Route path="/sitemap" element={<ComingSoonPage title="Plan du site" />} />
        
        {/* Fallback for any other route */}
        <Route path="*" element={<ComingSoonPage title="Page introuvable" />} />
      </Routes>
    </Router>
    </ServiceProvider>
  );
}
