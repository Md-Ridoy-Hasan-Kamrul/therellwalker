import React, { createContext, useContext } from 'react';

const TradeContext = createContext();

export const useTradeContext = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error('useTradeContext must be used within a TradeProvider');
  }
  return context;
};

export const TradeProvider = ({ children }) => {
  // TradeContext is now simplified - all data comes from backend APIs
  // No need to manage local state since we're using real backend

  const value = {
    // Context can be used for shared trade-related utilities if needed
    // For now, it's a placeholder for future enhancements
  };

  return (
    <TradeContext.Provider value={value}>{children}</TradeContext.Provider>
  );
};
