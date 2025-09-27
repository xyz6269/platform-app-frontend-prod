import React from 'react';
import SimpleLoader from './SimpleLoader';

const InlineLoader = ({ 
  isLoading, 
  children, 
  loaderSize = "w-8 h-8",
  className = "min-h-[200px]" 
}) => {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <SimpleLoader size={loaderSize} />
      </div>
    );
  }

  return children;
};

export default InlineLoader;