import React, { createContext } from 'react';
import { useLoadingState } from '../hooks/useAppLoading';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const loadingState = useLoadingState();

  return (
    <LoadingContext.Provider value={loadingState}>
      {children}
    </LoadingContext.Provider>
  );
};