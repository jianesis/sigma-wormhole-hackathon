// SwapContext.tsx
"use client"; // Make this file a client component

import { createContext, useContext, useState } from "react";

interface SwapContextType {
  isSwapOpen: boolean;
  setIsSwapOpen: (isOpen: boolean) => void;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export const SwapProvider = ({ children }: any) => {
  const [isSwapOpen, setIsSwapOpen] = useState(false);

  return (
    <SwapContext.Provider value={{ isSwapOpen, setIsSwapOpen }}>
      {children}
    </SwapContext.Provider>
  );
};

// Custom hook for easy access to context
export const useSwap = () => {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error("useSwap must be used within a SwapProvider");
  }
  return context;
};
