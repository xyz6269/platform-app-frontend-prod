import React, { useState, useEffect } from 'react';
import SimpleLoader from './SimpleLoader';

const ConditionalLoader = ({ 
  children, 
  isLoading = false,
  minLoadingTime = 500, // Temps minimum de chargement
  showOnRefresh = true,  // Afficher lors du rechargement de page
  showOnRoute = false,   // Afficher lors du changement de route
  className = "fixed inset-0 bg-cyber-dark/90 backdrop-blur-sm z-50"
}) => {
  const [shouldShowLoader, setShouldShowLoader] = useState(false);
  const [hasShownInitial, setHasShownInitial] = useState(false);

  useEffect(() => {
    // Détecter si c'est un rechargement de page
    const isPageRefresh = !hasShownInitial && (
      performance.navigation?.type === 1 || // Navigation type reload
      performance.getEntriesByType('navigation')[0]?.type === 'reload' ||
      !window.history.state // Premier chargement
    );

    // Décider si on doit afficher le loader
    if (isLoading || (isPageRefresh && showOnRefresh)) {
      setShouldShowLoader(true);
      setHasShownInitial(true);
      
      // Timer minimum pour éviter les flashs
      const timer = setTimeout(() => {
        if (!isLoading) {
          setShouldShowLoader(false);
        }
      }, minLoadingTime);
      
      return () => clearTimeout(timer);
    } else {
      setShouldShowLoader(false);
    }
  }, [isLoading, showOnRefresh, minLoadingTime, hasShownInitial]);

  // Masquer le loader quand isLoading devient false
  useEffect(() => {
    if (!isLoading && shouldShowLoader) {
      const timer = setTimeout(() => {
        setShouldShowLoader(false);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, shouldShowLoader]);

  if (!shouldShowLoader) {
    return children;
  }

  return (
    <>
      {/* Overlay de chargement */}
      <div className={className}>
        <SimpleLoader size="w-20 h-20" className="h-full" />
      </div>
      {/* Contenu (caché pendant le chargement) */}
      <div className={shouldShowLoader ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        {children}
      </div>
    </>
  );
};

export default ConditionalLoader;