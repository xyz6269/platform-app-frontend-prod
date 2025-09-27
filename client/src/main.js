import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import App from './App';
import InscriptionPage from './pages/Inscription.jsx';
import LoginPage from './pages/Login.jsx';
import MembersArea from './members/App';
import RequireAuth from './components/RequireAuth';
import ErrorPage from './pages/ErrorPage';
import ConditionalLoader from './components/ConditionalLoader';
import { LoadingProvider } from './components/LoadingProvider';
import './members/index.css';
import ComingSoonPage from './pages/ComingSoon.jsx';

const PAGE_TITLES = {
  '/': 'Home',
  '/inscription': 'Register',
  '/connexion': 'Login',
  '/soon': 'Coming Soon',
  '/members': 'Members Area',
};

function AppContent() {
  const location = useLocation();
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  
  // Gestion des titres
  useEffect(() => {
    let pageTitle = 'Home';
    
    if (location.pathname.startsWith('/members')) {
      pageTitle = 'Members Area';
    } else if (!PAGE_TITLES[location.pathname]) {
      pageTitle = '404 Not Found';
    } else {
      pageTitle = PAGE_TITLES[location.pathname];
    }
    
    document.title = `AIS - ${pageTitle}`;
  }, [location.pathname]);

  // Loading lors du changement de route (optionnel)
  useEffect(() => {
    setIsRouteLoading(true);
    const timer = setTimeout(() => setIsRouteLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <ConditionalLoader 
      isLoading={isRouteLoading}
      showOnRefresh={true}  // Afficher seulement lors du rechargement
      showOnRoute={false}   // Ne pas afficher lors des changements de route
      minLoadingTime={800}  // Temps minimum d'affichage
    >
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/inscription' element={<InscriptionPage />} />
        <Route path='/connexion' element={<LoginPage />} />
        <Route path='/soon' element={<ComingSoonPage />} />
        <Route path='/members/*' element={<RequireAuth><MembersArea /></RequireAuth>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </ConditionalLoader>
  );
}

function Main() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default Main;