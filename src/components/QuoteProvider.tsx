'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface QuoteContextType {
  isOpen: boolean;
  preselectedVehicle: string | null;
  openQuote: (vehicle?: string) => void;
  closeQuote: () => void;
}

const QuoteContext = createContext<QuoteContextType>({
  isOpen: false,
  preselectedVehicle: null,
  openQuote: () => {},
  closeQuote: () => {},
});

export function useQuote() {
  return useContext(QuoteContext);
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedVehicle, setPreselectedVehicle] = useState<string | null>(null);

  const openQuote = useCallback((vehicle?: string) => {
    setPreselectedVehicle(vehicle ?? null);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeQuote = useCallback(() => {
    setIsOpen(false);
    setPreselectedVehicle(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <QuoteContext.Provider value={{ isOpen, preselectedVehicle, openQuote, closeQuote }}>
      {children}
    </QuoteContext.Provider>
  );
}
