import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { SearchFilters } from '@/types';

interface FiltersContextValue {
  filters: SearchFilters;
  updateFilters: (next: Partial<SearchFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: SearchFilters = {
  placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
  locationLabel: 'Sydney',
  minRating: 0,
  query: ''
};

const FiltersContext = createContext<FiltersContextValue | undefined>(undefined);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const value = useMemo<FiltersContextValue>(
    () => ({
      filters,
      updateFilters: (next) => setFilters((prev) => ({ ...prev, ...next })),
      resetFilters: () => setFilters(defaultFilters)
    }),
    [filters]
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within FiltersProvider');
  }
  return context;
}