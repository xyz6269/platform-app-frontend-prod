import { useState, useEffect, createContext, useContext } from 'react';

// Context pour l'état de chargement global
export const LoadingContext = createContext();

export const useAppLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useAppLoading must be used within LoadingProvider');
  }
  return context;
};

// Hook pour détecter les états de chargement
export const useLoadingState = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    // Détecter la fin du chargement initial
    const handleLoad = () => {
      setTimeout(() => setIsInitialLoad(false), 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return {
    isInitialLoad,
    isRouteChanging,
    isDataLoading,
    setIsRouteChanging,
    setIsDataLoading
  };
};