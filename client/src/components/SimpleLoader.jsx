import React from 'react';

const SimpleLoader = ({ size = "w-16 h-16", className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`relative ${size}`}>
        {/* Anneau extérieur */}
        <div className="absolute inset-0 border-4 border-transparent border-t-cyber-blue rounded-full animate-spin"></div>
        {/* Anneau du milieu */}
        <div className="absolute inset-2 border-4 border-transparent border-t-blue-400 rounded-full animate-spin-reverse"></div>
        {/* Anneau intérieur */}
        <div className="absolute inset-4 border-4 border-transparent border-t-cyan-300 rounded-full animate-spin"></div>
        
      </div>
    </div>
  );
};

export default SimpleLoader;